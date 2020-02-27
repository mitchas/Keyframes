<template>
	<div id="animateApp">	

		<!-- HeaderBar -->
		<div id="animateTop">
			<!-- left siide, export, settings, etc. -->
			<div class="left">
				<!-- Show settings -->
				<button id="showSaveLoadButton" aria-label="Save or Load Animation" class="button icon-left ui-button" @click="viewSaveLoad()" v-bind:class="{'active': showSaveLoad}">
					<i class="far fa-adjust" v-bind:class="{'fa-save': !showSaveLoad, 'fa-chevron-circle-up': showSaveLoad}"></i>
					<span>Save/Load</span>
				</button>
				<!-- Edit Target -->
				<button id="showEditTargetButton" aria-label="Edit Target Element" class="button icon-left ui-button" @click="editTarget()" v-bind:class="{'active': showEditTarget}">
					<i class="far" v-bind:class="{'fa-bullseye': !showEditTarget, 'fa-chevron-circle-up': showEditTarget}"></i>
					<span>Target Element</span>
				</button>
				<!-- Show output -->
				<button id="showOutputButton" aria-label="Show Output CSS" class="button icon-left ui-button" @click="viewOutput()" v-bind:class="{'active': showOutput}">
					<i class="far" v-bind:class="{'fa-file-code': !showOutput, 'fa-chevron-circle-up': showOutput}"></i>
					<span>Output CSS</span>
				</button>
			</div>
			<!-- right side - info, tips, etc. -->
			<div class="right">
				
				<div class="keyframe-data">
					<!-- Properties at {{roundValue(currentStep.left)}}% -->
				</div>
			</div>
		</div>
		
		<!-- Main stage with animated element -->
		<div id="animateMain">

			<!-- 
				========================
				Settings contatiners
				========================
			-->
			<!--  Basic settings -->
			<!--  show/hide with  showSaveLoad -->
			<transition name="settings">
				<div class="settings-display save-load" v-if="showSaveLoad">
					<h3>Save your animation</h3>
					<p>You can save your animation configuration and come back to it later.</p>
					<div id="saveAnimationField">
						<input id="newAnimationSaveName" aria-label="Save as Name" type="text" v-model="animationToSaveName" maxlength="12" placeholder="MyAnimation"/>
						<button aria-label="Save Animation" class="button" @click="saveAnimation()">
							<i class="far fa-save"></i>
							<span>Save</span>
						</button>
					</div>
				</div>
			</transition>
			<!--  Edit Target -->
			<!--  show/hide with showEditTarget -->
			<transition name="settings">
				<div class="settings-display" v-if="showEditTarget">
					<h3>Edit Target Element</h3>
				</div>
			</transition>
			<!--  CSS output -->
			<!--  show/hide with  showOutput -->
			<transition name="settings">
				<div class="settings-display" v-show="showOutput">
<!-- ////////////////////
/////////////////////////
		Output CSS 
/////////////////////////
/////////////////////////-->
<!-- leave over here because pre formatting -->
<pre id="outputCSS">
<b>/* Copy this @keyframes block to your CSS*/</b>

@keyframes yourAnimation {
<span v-for="(data, index) in steps" v-bind:key="index">
  {{data.timelinePosition.left}}{
    <span v-for="(prop, index) in data.properties" v-bind:key="index" v-if="index != 'transformProps'">{{index.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()}}:{{prop}};
    </span>
  }
  </span>
}

<b>/* Add the animation: property to whichever element you want to animate */</b>
<span>
#elementToAnimate{
  animation: yourAnimation {{animationProperties.duration}} {{animationProperties.timing}}  {{animationProperties.delay}} {{animationProperties.iterations}}  {{animationProperties.direction}}  {{animationProperties.fillMode}};
}
</span>
</pre>
				</div>
			</transition>

			<!-- Stage wrapper -->
			<div id="animateStage" v-bind:class="{'tabs-hidden': cssTab == 0}">
				<!-- 
					////////////////////////
					////////////////////////
					Target Element
					////////////////////////
					////////////////////////
				 -->
				<span id="targetElement" v-bind:style="allProperties">
					<i class="fal fa-hand-peace"></i>
				</span>
			</div>

			<!-- Element property editor -->
			<div id="elementProperties">
				
				<div class="side-tab-display">
					<div class="side-tabs">
						<button class="tab" @click="cssTab == 1 ? cssTab = 0 : cssTab = 1" v-bind:class="{'active':cssTab==1}">
							<i v-bind:class="cssTab == 1 ? 'far fa-times' : 'far fa-external-link-alt'"></i>
						</button>
						<button class="tab" @click="cssTab == 2 ? cssTab = 0 : cssTab = 2" v-bind:class="{'active':cssTab==2}">
							<i v-bind:class="cssTab == 2 ? 'far fa-times' : 'far fa-pencil-paintbrush'"></i>
						</button>
						<button class="tab" @click="cssTab == 3 ? cssTab = 0 : cssTab = 3" v-bind:class="{'active':cssTab==3}">
							<i v-bind:class="cssTab == 3 ? 'far fa-times' : 'far fa-expand-arrows'"></i>
						</button>
						<button class="tab" @click="cssTab == 4 ? cssTab = 0 : cssTab = 4" v-bind:class="{'active':cssTab==4}">
							<i v-bind:class="cssTab == 4 ? 'far fa-times' : 'far fa-border-style'"></i>
						</button>
					</div>
					<!-- ////////////
						Transform 
					/////////////// -->
					<transition name="tab">
						<div class="tab-content"  v-if="cssTab == 1">
							
							<!-- Title -->
							<div class="tab-title">
								<span>Transform: {{roundValue(currentStep.left)}}%</span>
							</div>
							<!-- Rotate -->
							<div class="field-set">
								<label>Rotate</label>
								<div class="input-wrapper">
									<input type="text" placeholder="45deg" v-model="allProperties.transformProps.rotate" @input="saveStep()">
								</div>
							</div>
							<!-- Scale -->
							<div class="field-set">
								<label>Scale</label>
								<div class="input-wrapper">
									<input type="text" placeholder="1.5" v-model="allProperties.transformProps.scale" @input="saveStep()">
								</div>
							</div>
							<!-- Translate -->
							<div class="field-set">
								<label>Translate</label>
								<div class="input-wrapper">
									<input type="text" placeholder="50px, 100px" v-model="allProperties.transformProps.translate" @input="saveStep()">
								</div>
							</div>
							<!-- Skew -->
							<div class="field-set">
								<label>Skew</label>
								<div class="input-wrapper">
									<input type="text" placeholder="-45deg" v-model="allProperties.transformProps.skew" @input="saveStep()">
								</div>
							</div>
							<!-- Transform Origin -->
							<div class="field-set">
								<label>Transform Origin</label>
								<div class="input-wrapper">
									<input type="text" placeholder="50% 50%" v-model="allProperties.transformOrigin" @input="saveStep()">
								</div>
							</div>
						</div>
					</transition>
					<!-- ////////////
						Colors & Fonts 
					/////////////// -->
					<transition name="tab">
						<div class="tab-content"  v-if="cssTab == 2">
							<!-- Title -->
							<div class="tab-title">
								<span>Colors & Fonts: {{roundValue(currentStep.left)}}%</span>
							</div>
							<!-- Background -->
							<div class="field-set">
								<label>Background</label>
								<div class="input-wrapper">
									<input type="text" placeholder="red" v-model="allProperties.background" @input="saveStep()">
								</div>
							</div>
							<!-- Opacity -->
							<div class="field-set">
								<label>Opacity</label>
								<div class="input-wrapper">
									<input type="text" placeholder="0.5" v-model="allProperties.opacity" @input="saveStep()">
								</div>
							</div>
							<!-- Color (Text) -->
							<div class="field-set">
								<label>Color (Text)</label>
								<div class="input-wrapper">
									<input type="text" placeholder="#0000FF" v-model="allProperties.color" @input="saveStep()">
								</div>
							</div>
							<!-- FontSize -->
							<div class="field-set">
								<label>Font Size</label>
								<div class="input-wrapper">
									<input type="text" placeholder="14px" v-model="allProperties.fontSize" @input="saveStep()">
								</div>
							</div>
						</div>
					</transition>
					<!-- ////////////
						Sizing and Spacing 
					/////////////// -->
					<transition name="tab">
						<div class="tab-content" v-if="cssTab == 3">
							<!-- Title -->
							<div class="tab-title">
								<span>Sizing: {{roundValue(currentStep.left)}}%</span>
							</div>
							<!-- Width -->
							<div class="field-set">
								<label>Width</label>
								<div class="input-wrapper">
									<input type="text" placeholder="100px" v-model="allProperties.width" @input="saveStep()">
								</div>
							</div>
							<!-- Height -->
							<div class="field-set">
								<label>Height</label>
								<div class="input-wrapper">
									<input type="text" placeholder="100px" v-model="allProperties.height" @input="saveStep()">
								</div>
							</div>
							<!-- Margin -->
							<div class="field-set">
								<label>Margin</label>
								<div class="input-wrapper">
									<input type="text" placeholder="15px 15px" v-model="allProperties.margin" @input="saveStep()">
								</div>
							</div>
							<!-- Padding -->
							<div class="field-set">
								<label>Padding</label>
								<div class="input-wrapper">
									<input type="text" placeholder="10px 0 0 0" v-model="allProperties.padding" @input="saveStep()">
								</div>
							</div>
						</div>
					</transition>
					<transition name="tab">
						<div class="tab-content" v-if="cssTab == 4">
							<!-- Title -->
							<div class="tab-title">
								<span>Borders & Spacing: {{roundValue(currentStep.left)}}%</span>
							</div>
							<!-- Border -->
							<div class="field-set">
								<label>Border</label>
								<div class="input-wrapper">
									<input type="text" placeholder="1px solid red" v-model="allProperties.border" @input="saveStep()">
								</div>
							</div>
							<!-- Border Radius -->
							<div class="field-set">
								<label>Border Radius</label>
								<div class="input-wrapper">
									<input type="text" placeholder="50%" v-model="allProperties.borderRadius" @input="saveStep()">
								</div>
							</div>
							<!-- Box Shadow -->
							<div class="field-set">
								<label>Box Shadow</label>
								<div class="input-wrapper">
									<input type="text" placeholder="5px 5px 10px 5px rgba(0,0,0,0.2)" v-model="allProperties.boxShadow" @input="saveStep()">
								</div>
							</div>
							<!-- Outline -->
							<div class="field-set">
								<label>Outline</label>
								<div class="input-wrapper">
									<input type="text" placeholder="2px solid rgba(0,0,0,0.2)" v-model="allProperties.outline" @input="saveStep()">
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
		
		<!-- Footer -->
		<div id="animateFooter">

			<!-- Controls -->
			<div id="animationControls">
				<!-- Left side, add step -->
				<div class="left">
					<button id="addStepButton"  aria-label="Add new step" class="button icon-left ui-button" @click="addingStep = !addingStep;" v-bind:class="{'active' : addingStep}">
						<i class="far" v-bind:class="{'fa-plus-circle' : !addingStep, 'fa-times-circle': addingStep}"></i>
						<span v-if="!addingStep">Add Step</span>
						<span v-else>Cancel</span>
					</button>
					<button id="deleteStepButton" aria-label="Delete current step" class="button icon-left ui-button" @click="deleteStep()" v-if="Object.keys(this.steps)[1] && currentStep.left != '0.0'">
						<i class="far fa-trash-alt"></i>
						<span>Delete Step</span>
					</button>
					
				</div>

				<!-- Middle, timing -->
				<div class="middle">
					<div class="animation-prop">
						<input type="text" placeholder="3s" v-model="animationProperties.duration" @input="saveStep()"/>
						<div class="set-width">{{animationProperties.duration}}</div>
						<label>Duration</label>
					</div>
					<div class="animation-prop">
						<input type="text" placeholder="infinite" v-model="animationProperties.iterations" @input="saveStep()"/>
						<div class="set-width">{{animationProperties.iterations}}</div>
						<label>Iterations</label>
					</div>
					<div class="animation-prop">
						<input type="text" placeholder="0s" v-model="animationProperties.delay" @input="saveStep()"/>
						<div class="set-width">{{animationProperties.delay}}</div>
						<label>Delay</label>
					</div>
					<div class="animation-prop">
						<input type="text" placeholder="linear" v-model="animationProperties.timing" @input="saveStep()"/>
						<div class="set-width">{{animationProperties.timing}}</div>
						<label>Timing</label>
					</div>
					<div class="animation-prop fake">
						<button class="click-toggle" @click="toggleTiming('direction')" aria-label="Change animation direction">
							{{animationProperties.direction}}
						</button>
						<label>Direction</label>
					</div>
					<div class="animation-prop fake">
						<button class="click-toggle" @click="toggleTiming('fill')" aria-label="Change animation fill mode">
							{{animationProperties.fillMode}}
						</button>
						<label>Fill Mode</label>
					</div>
				</div>

				<!-- Right side, play/pause -->
				<div class="right">
					<button class="button icon-left icon-left ui-button" id="animationButton" @click="runAnimation()" v-bind:class="{'pause': animationPlaying}" @input="saveStep()">
						<i v-bind:class="{'far fa-play': !animationPlaying, 'far fa-pause': animationPlaying}"></i>
						<span v-if="!animationPlaying">Play</span>
						<span v-else>Pause</span>
					</button>
				</div>
				
			</div>

			<!-- Timeline -->
			<div id="animateTimeline" @mousemove.self="addingStep && getTimelinePosition();" @click.self="addingStep && newStep();" v-bind:class="{'add-step': addingStep}">
				<!-- Animated marker that progresses with animation -->
				<div class="timeline-marker animated" v-if="animationPlaying">
				</div>

				<!-- Marker that shows current/selected step location -->
				<div class="timeline-marker current" v-bind:style="currentStep" 
					v-if="currentStep.left != null"
					@mouseenter="hideAddStep = true" 
					@mouseleave="hideAddStep = false">

					<b>{{roundValue(currentStep.left)}}</b>
				</div>

				<!-- V-for all other steps -->
				<div class="timeline-marker step" v-for="(step, index) in steps" 
					v-bind:style="step.timelinePosition" :key="step.id" 
					@mouseenter="hideAddStep = true" 
					@mouseleave="hideAddStep = false" 
					@click="changeStep(index)">

					<b>{{roundValue(step.timelinePosition.left)}}</b>
				</div>

				<!-- Marker that shows location when hovering - must be in after other makers so it responds to ~ sibling css selector -->
				<div class="timeline-marker new" v-bind:style="timelinePosition">
					<b>{{roundValue(timelinePosition.left)}}</b>
				</div>
			</div>
		</div>


<!-- steps:
<span>
{{steps}}
</span> -->

<!-- Append Styles to page -->
<v-style>
	{{rawOutputCSS}}
	.timeline-marker.animated{
		animation: animationTicker {{animationProperties.duration}} {{animationProperties.timing}} {{animationProperties.delay}} {{animationProperties.iterations}} {{animationProperties.direction}} {{animationProperties.fillMode}};
		animation-play-state: {{ animationPlaying ? 'running' : 'paused' }};
	}
</v-style>
<!-- Only add animation if it's playing -->
<!-- Otherwise  -->
<v-style v-if="animationPlaying">
	#targetElement{
		animation: yourAnimation {{animationProperties.duration}} {{animationProperties.timing}} {{animationProperties.delay}} {{animationProperties.iterations}} {{animationProperties.direction}} {{animationProperties.fillMode}};
		animation-play-state: {{ animationPlaying ? 'running' : 'paused' }};
	}
</v-style>

	</div>
</template>

<script>
// @ is an alias to /src
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "home",

	components: {
	},

	mixins: [
		toastMixin,
		metaMixin,
	],

	data() {
		return {
			// Which tab are they editing
			cssTab: 1,
			// Show Output modal or not
			showOutput: false,
			// Hold css output generated
			rawOutputCSS: null,
			// Enable hover timeline to add step
			addingStep: false,
			// When hovering an existing step
			hideAddStep: false,
			// Animation currently playing
			animationPlaying: false,
			// Collapsible settings
			showSaveLoad: false,
			// Show modal to edit target
			showEditTarget: false,
			// Animation name to save
			animationToSaveName: null,
			// Selected step position
			currentStep: {
				left: "0.0",
			},
			// Hover position on timeline
			timelinePosition: {
				left: "0.0"
			},

			// Properties
			// Holds all properties editable
			// Saved for each step
			allProperties: {
				transformProps:{
					rotate: null,
					scale: null,
					translate: null,
					skew: null,
				},
				transformOrigin: null,
				// Individual strings
				background: null,
				opacity: null,
				color: null,
				fontSize: null,
				width: null,
				height: null,
				margin: null,
				padding: null,
				border: null,
				borderRadius: null,
				boxShadow: null,
				outline: null,
				transform: null,
			},
			// Animation timing
			animationProperties: {
				duration: "3s",
				delay: "0s",
				iterations: "infinite",
				timing: "ease",
				direction: "normal",
				fillMode: "none"
			},
			// Timing options so users can toggle instead of type
			timingProps: {
				directionSelected: 0,
				fillModeSelectetd: 0,
				directions: [
					"normal", "reverse", "alternate", "alternate-reverse"
				],
				fillModes: [
					"normal", "none", "forwards", "backwards", "both"
				],
			},
			// Animation steps,
			// Holds all css at each step
			steps: {
				'0.0': {
					"timelinePosition": {
						"left": "0.0%"
					},
					"properties": {}
				}
			}
		};
	},

	mounted() {
		this.updateMeta("Animate | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")

		// if LG or smaller (992px), collapse sidebar on load
		if(window.innerWidth < 993){
			this.cssTab = 0;
		}

		// Create date and format (remove spaces, remove year)
		var dateName = new Date().toDateString().replace(/\s/g, '');
		this.animationToSaveName =  "" + dateName.substring(0,dateName.length - 4).substring(3,dateName.length - 4) + "-x" + (Math.floor(Math.random() * 666)+100).toString();
	},

	computed: {
	},

	watch: {
		
	},
	
	methods: {

		////////////////////////
		// Step Functions
		///////////////////////
		// Save current step
		saveStep: function(){
			console.log("SAVING STEP")

			// Debounce 500ms
			// if (this.timeout) clearTimeout(this.timeout); 
			// this.timeout = setTimeout(() => {
 
 
				var copyProps = _.cloneDeep(this.allProperties);
				var cleanProps = this.removeObjectsWithNull(copyProps);

				// Delete transform style string generated for targetElemetnt
				// delete cleanProps['transform'];

				// Delete transform nested object if no children (empty)
				if(cleanProps['transformProps']){
					// Count children
					var count = 0;
					for(var prop in cleanProps['transformProps']) {
						count ++;
					}
					// Delete if no data
					if(count == 0){
						delete cleanProps['transformProps'];
					}
				}

				// Format to make it easier to read later,
				// Add timeline position
				var propsToSave = {
					timelinePosition: {
						left: parseFloat(this.currentStep.left).toFixed(1) + "%"
					},
					properties: cleanProps
				}

				// String to generate transform: prop
				var transformString = "";
				if(cleanProps['transformProps']){
					for(var prop in cleanProps['transformProps']) {
						transformString = transformString + " " + prop + "(" + cleanProps['transformProps'][prop] + ")"
					}
					// Set prop in cleanprops
					this.allProperties.transform = transformString;
					cleanProps.transform = transformString;
				}

				
				// Save changes to steps at current step 
				this.steps[this.currentStep.left] = propsToSave;

				// Get text content of output to apply to targetElement
				var _this = this;

				setTimeout(function(){
					var fullCSSString = document.getElementById("outputCSS").textContent;
					_this.rawOutputCSS = fullCSSString;
				}, 500)

			// },500);

		},
		removeObjectsWithNull: function(obj) {
			return _(obj)
			.pickBy(_.isObject) // get only objects
			.mapValues(this.removeObjectsWithNull) // call only for values as objects
			.assign(_.omitBy(obj, _.isObject)) // save back result that is not object
			.omitBy(_.isNil) // remove null and undefined from object
			.value(); // get value
		},

		// Save new step, duplicating last selected props
		newStep: function(){

			var pos = this.timelinePosition.left;
			var oldPos = this.currentStep.left;

			var propsToSave = _.cloneDeep(this.steps[oldPos]);
			propsToSave['timelinePosition']['left'] = pos;

			// Save changes to steps at new step 
			this.steps[pos] = propsToSave;
			this.currentStep.left = pos; 

			// // No longer adding
			this.addingStep = false;
		},

		// Change step
		changeStep: function(index){
			// If index is 'delete', set it to 0 and DON'T saveStep()
			if(index == 'delete'){
				index = "0.0";
			}

			// then change to clicked step
			this.currentStep.left = index; 
			// And set allProps to the saved data
			var merged = {...this.allProperties, ...this.steps[index].properties};
			this.allProperties = merged;
		},

		// Delete selected Step
		deleteStep: function(){

			var stepToDelete = this.currentStep.left;

			if(Object.keys(this.steps)[0]){
				if(stepToDelete == "0.0"){
					// Can't delete step at 0
					console.log("Cannot delete 0% step.")
				}else{
					delete this.steps[stepToDelete]
				}
				// Change to 0% step
				this.currentStep.left = Object.keys(this.steps)[0];
				this.changeStep('delete');
			}else{
				return;
			}

			
		},

		////////////////////////
		// Animation Functions
		///////////////////////

		// Play/Pause animation
		runAnimation: function(){
			this.addingStep = false;

			// If it's already playing
			if(this.animationPlaying){
				// Set to false
				this.animationPlaying = false;
			}else{
				// Start it
				this.animationPlaying = true;

			} // End if animation playing
		},
		// Stop animation
		stopAnimation: function(){
			if(this.animationPlaying){
				this.runAnimation();
			}
		},
		

		////////////////////////
		// Other Functions
		///////////////////////

		// on mouseover, get the pointer position on timeline
		getTimelinePosition: function(){
			let _event = event;
			let _this = this;

			// Current position - offset, divided by width, gives
			// position as decimal. Convert that to percent,
			// Then conver to nearest 0.5.
			// console.log(_event)
			var offset = _event.pageX - _event.toElement.offsetLeft;
			var result = ((offset / _event.toElement.offsetWidth) * 100).toFixed(1);
			
			// Set
			_this.timelinePosition.left = parseFloat(result).toFixed(1) + "%";
		},
		// Round decimal value to 0 decimal places
		// To dispaly on hover
		roundValue: function(val){
			var float = parseFloat(val);
			// If greater than 99.5, switch to 100
			// Otherwise users cant click 100
			if(float >= 99.5){
				return 100;
			}else{
				return float.toFixed(0);
			}
		},

		// Timing toggles
		toggleTiming: function(type){
			// Cycles through available options when clicked
			if(type == "direction"){
				if(this.timingProps.directionSelected == this.timingProps.directions.length - 1){
					this.timingProps.directionSelected = 0;
				}else{
					this.timingProps.directionSelected++;
				}
				this.animationProperties.direction = this.timingProps.directions[this.timingProps.directionSelected];
			}else if(type == "fill"){
				if(this.timingProps.fillModeSelectetd == this.timingProps.fillModes.length - 1){
					this.timingProps.fillModeSelectetd = 0;
				}else{
					this.timingProps.fillModeSelectetd++;
				}
				this.animationProperties.fillMode = this.timingProps.fillModes[this.timingProps.fillModeSelectetd];
			}
		},

		// Output
		viewOutput: function(){
			// Hide others
			this.showSaveLoad = false;
			this.showEditTarget = false;

			// If not already viewing output
			if(!this.showOutput){
				this.showOutput = true;
			}else{
				// Close it
				this.showOutput = false;
			}
		},

		// Save/Load
		viewSaveLoad: function(){
			// Hide others
			this.showOutput = false;
			this.showEditTarget = false;

			if(this.showSaveLoad){
				this.showSaveLoad = false;
			}else{
				this.showSaveLoad = true;
			}
		},

		editTarget: function(){			
			// Hide others
			this.showSaveLoad = false;
			this.showOutput = false;

			if(this.showEditTarget){
				this.showEditTarget = false;
			}else{
				this.showEditTarget = true;
			}
		},

		////////////////////
		////////////////////
		// Save / Load
		////////////////////
		////////////////////
		saveAnimation: function(){
			var newAnimation = this.allProperties;
			localStorage.setItem('animation_' + this.animationToSaveName.replace(/\s/g, ''), "test");
		},

	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	// Component wrapper
	#animateApp{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		box-sizing: border-box;


		// Top bar - control buttons
		#animateTop{
			position: absolute;
			z-index: 10;
			display: flex;
			justify-content: space-between;
			height: 50px;

			// Left side - export, adjustments, etc
			.left{
				display: flex;
				position: relative;

				button{
					text-align: left;
					padding-right: 0;
					margin-right: 15px;

					&:last-child{
						margin-right: 0;
					}
				}
			}
			// Right side - info, tips, etc
			.right{
				.keyframe-data{
					text-align: right;
					font-size: 16px;
					box-sizing: border-box;
					padding-top: 15px;
					font-weight: 600;
					color: var(--text);
				}
			}
		}

		// Wrapper to split top (Stage/Properties) with Bottom (Timeline)
		#animateMain{
			flex-grow: 3;
			display: flex;
			justify-content: space-between;
			position: relative;
			border-radius: var(--borderRadius);
			margin-bottom: 15px;

			/////////////////////
			//    Settings    //
			///////////////////
			// Toggle-able settings over stage
			.settings-display{
				display: flex;
				flex-direction: column;
				width: 400px;
				bottom: border-box;
				padding: 15px;
				max-height: 90%;
				max-height: calc(~'100% - 50px');
				height: fit-content;
				background-color: var(--backgroundLayer);
				border: 1px solid var(--border);
				transform-origin: top center;
				border-radius: var(--borderRadiusSmall);
				box-shadow: var(--shadow);
				box-sizing: border-box;
				position: absolute;
				top: 44px;
				z-index: 50;

				// Settings headers
				h3{
					font-size: 16px;
					line-height: 16px;
					margin: 0;
					padding: 0;
					font-weight: 600;
				}

				// Generic text
				p{
					font-size: 12px;
					line-height: 14px;
				}

				// Save/load display
				&.save-load{
					width: 310px;

					// Input/button for save field
					#saveAnimationField{
						display: flex;
						width: 100%;
						overflow: hidden;

						input{
							flex-grow: 3;
							border-top-right-radius: 0;
							border-bottom-right-radius: 0;
							border-right: none;
						}

						button{
							height: 100%;
							border-top-left-radius: 0;
							border-bottom-left-radius: 0;
							border-left: 1px solid var(--text);
							padding-left: 6px;
							
							i{
								margin-right: 10px;
							}
						}
					}
				}
			}
			//////////////////
			//    Stage    //
			////////////////
			#animateStage{
				flex-grow: 3;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin: 0 auto;
				width: fit-content;
				max-width: fit-content;
				box-sizing: border-box;
				padding-left: 65px;
				transition: var(--transition);
				padding-right: 30px;

				// Add 300px padding right above Large desktop since there's enough space
				// Makes animated element look more centered
				@media (min-width: @screenLG) {
					padding-right: 365px;
				}

				// If user collapses tabs, remove large right padding
				&.tabs-hidden{
					@media (min-width: @screenLG) {
						padding-right: 0px;
						transition: var(--transition);
					}
				}

				// Element that's being animated
				#targetElement{
					display: inline-flex;
					flex-direction: column;
					justify-content: center;
					width: 80px;
					height: 80px;
					background-color: var(--primary);
					color: var(--background);
					letter-spacing: 0.5px;
					text-align: center;
					border-radius: 50%;
					font-size: 42px;
					transition: 0.5s ease;
					box-shadow: var(--shadow);
				}
			}
			////////////////////////////
			//    Property Editor    //
			//////////////////////////
			#elementProperties{

				// Tabs and tabs display
				// Tabs and tabs display
				.side-tab-display{
					display: flex;
					flex-direction: row-reverse;
					width: 50px;
					max-width: 50px;
					min-width: 50px;
					position: relative;
					// Make wider on mobile to match top dropdown
					@media (max-width: @screenMD) {
						width: 54px;
						max-width: 54px;
						min-width: 54px;
					}

					// Sidebar conaining the tab buttons
					.side-tabs{
						display: flex;
						flex-direction: column;
						min-width: 100%;
						box-sizing: border-box;

						// Clickable atbs
						.tab{
							height: 50px;
							display: flex;
							justify-content: center;
							border: none;
							padding: 0;
							background-color: var(--backgroundLayer);
							border: 1px solid var(--border);
							border-bottom: 1px solid transparent;
							transition: var(--transition);
							font-size: 18px;
							color: var(--text);

							&:first-child{
								border-top-left-radius: var(--borderRadiusSmall);
								border-top-right-radius: var(--borderRadiusSmall);
								// No top rightt border on mobile
								@media (max-width: @screenMD) {
									border-top-right-radius: 0px;
								}
							}
							&:last-child{
								border-bottom-left-radius: var(--borderRadiusSmall);
								border-bottom-right-radius: var(--borderRadiusSmall);
								border-bottom: 1px solid var(--border);
								// No bottom rightt border on mobile
								@media (max-width: @screenMD) {
									border-bottom-right-radius: 0px;
								}
							}

							// Hover
							&:hover{
								background-color: var(--background);
								transition: var(--transition);
								border-color: var(--primary);
								border-bottom: 1px solid var(--primary);
							}
							// Active ttab
							&.active{
								border-color: var(--primary);
								background-color: var(--primary);
								color: var(--background);
								transition: var(--transition);
							}
						}
					}
					// Content for each tab
					.tab-content{
						background-color: var(--backgroundLayer);
						border-radius: var(--borderRadiusSmall);
						box-sizing: border-box;
						flex-grow: 3;
						position: absolute;
						right: 65px;
						box-shadow: var(--shadow);
						min-height: 200px;
						max-height: 500px;
						transform-origin: top center;
						display: block;
						padding: 10px;
						max-width: 300px;
						width: 70vw;
						border: 1px solid var(--border);
						z-index: 30;

						// Header
						.tab-title{
							font-size: 16px;
							font-weight: bolder;
							letter-spacing: 0.5px;
							color: var(--text);
							display: block;
							padding: 5px 0 15px 0;
							text-align: center;

							span{
								display: flex;
								flex-direction: column;
								justify-content: center;
								flex-grow: 3;
							}
						}
					}
				}
			}
		}

		
		
		///////////////////
		//    Footer    //
		/////////////////
		#animateFooter{
			width: 100%;
			min-width: 100%;
			max-width: 100%;

			// Controls
			#animationControls{
				display: flex;
				justify-content: space-between;

				
				.left{
					display: flex;
					flex-grow: 3;
					// Button width
					#addStepButton{
						width: 100px;
					}
					#deleteStepButton{
						width: 114px;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;

					// Play/pause animation
					#animationButton{
						width: 82px;
						font-weight: bolder;

						i{
							margin-left: 2px;
						}

						// Make pause red
						&.pause{
							background-color: var(--red);
							color: var(--backgroundLayer);
							border-color: var(--redHover);

							&:hover{
								background-color: var(--redHover);
							}
						}
					}
					
				}

				// Middle, timing
				.middle{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					padding-right: 25px;
					// Animation props
					.animation-prop{
						display: flex;
						flex-direction: column;
						height: 34px;
						width: fit-content;
						position: relative;
						justify-content: center;
						margin: 0 4px;
						top: -2px;

						// Label hidden until hover
						label{
							font-size: 12px;
							display: block;
							box-sizing: border-box;
							padding: 0 0px 0 0;
							color: var(--textLighter);
							user-select: none;
							position: absolute;
							top: -4px;
							width: fit-content;
							white-space: pre;
							width: 100%;
							text-align: center;
							opacity: 0;
							transition: var(--transition);
							pointer-events: none;
						}

						// the text elements that show the value
						// either input or click toggle depending on field
						input,
						.set-width,
						.click-toggle{
							border-radius: 3px;
							height: 26px;
							font-size: 14px;
							font-weight: 700;
							background-color: transparent;
							border: none;							
							color: var(--textLight);
							padding: 0;
							width: 100%;
							text-align: center;
							// text-decoration: underline;
							overflow: visible;
							text-overflow: ellipsis;
							border-bottom: 2px dashed var(--border);

							&:hover,
							&:focus{
								border-color: var(--borderHover);
							}
						}

						// Position absolute inputs
						input{
							position: absolute;
						}
						
						// Changes for buttons
						.click-toggle{
							text-align: center;
							padding: 0 5px;
							user-select: none;

							&:hover{
								cursor: pointer;
							}
						}

						// Hidden text element that expands width of input
						.set-width{
							opacity: 0;
							color: transparent;
							border: none;
							padding: 0 5px;
							pointer-events: none
						}

						//Adjust width of each
						// duration, delay
						&:nth-child(1),
						&:nth-child(3){
							input,
							.set-width{ 
								min-width: 34px;
							}
						}
						// iterations, timing
						&:nth-child(2){
							input,
							.set-width{ 
								min-width:50px;
							}
						}
						&:nth-child(4){
							input,
							.set-width{ 
								min-width: 35px;
							}
						}
						// Direction and fill
						// They're toggles, so fit width
						&:nth-child(5),
						&:nth-child(6){
							width: fit-content;
						}
					}

					// Hover any field to show label
					&:hover{
						label{
							opacity: 1;
							transition: var(--transition);
						}
					}
				}
				
			}


			// Timeline
			#animateTimeline{
				height: 80px;
				background-color: var(--backgroundLayer);
				border-radius: 3px;
				box-sizing: border-box;
				padding: 15px;
				border: 1px solid var(--border);
				margin: 15px 0 15px 0;
				position: relative;
				transition: 0s ease;

				// Hover timeline, show position and percentage
				.timeline-marker.step,
				.timeline-marker.new,
				.timeline-marker.animated,
				.timeline-marker.current{
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 100%;
					width: 12px;
					position: absolute;
					margin-left: -6px;
					top: 0px;
					z-index: 10;
					box-shadow: var(--shadow);
					border-radius: 2px;

					// Percentage Label
					b{
						font-size: 12.5px;
						letter-spacing: 0.15px;
						font-weight: bold;
						width: fit-content;
						box-sizing: border-box;
						position: absolute;
						left: -6px;
						top: 50%;
						margin-top: -12px;
						text-align: center;
						background-color: var(--primary);
						width: 24px;
						height: 24px;
						border-radius: 2px;
						display: flex;
						flex-direction: column;
						color: var(--backgroundLayer);
						justify-content: center;
						font-family: var(--systemFont);
						pointer-events: none;
					}
				}
				// Changes for new step
				// No pointer events
				.timeline-marker.new{
					display: none;
					background-color: var(--blue);
					pointer-events: none;

					b{
						// color: var(--text);
						background-color: var(--blue);
					}
				}
				// Regular and current step
				.timeline-marker.step,
				.timeline-marker.current{
					z-index: 15;
					background-color: var(--primary);

					b{
						background-color: var(--primary);
					}

					&:hover{
						cursor: pointer;
						& ~ .new{
							display: none;
						}
					}
				}
				// Shrink non current step
				.timeline-marker.step{
					height: 80%;
					top: 10%;
					border-radius: 2px;
					width: 8px;
					margin-left: -4px;
					opacity: 0.65;
					transition: height 0.15s ease, top 0.15s ease;
					z-index: 11;

					b{
						left: -8px;
						// opacity: 0;
					}

					&:hover{
						opacity: 1;
						height: 90%;
						top: 5%;
						transition: height 0.15s ease, top 0.15s ease;

						b{
							opacity: 1;
						}
					}
				}
				.timeline-marker.current{
					z-index: 12;
					background-color: var(--blue);

					b{
						background-color: var(--blue);
					}
					&:hover{
						cursor: default;
					}
				}

				// Animated marker
				.timeline-marker.animated{
					height: 100%;
					border-radius: 2px;
					width: 8px;
					left: 50%;
					margin-left: -4px;
					z-index: 20;
					background-color: var(--red);
					opacity: 0.5;
				}

				// Hover timeline, show new marker
				&.add-step:hover {
					cursor: copy;
					border-color: var(--borderHover);

					// Show new again
					.new{
						display: flex;
					}
				}
			}
		}
	}

	////////////////////
	// Output Code
	////////////////////
	#outputCSS{
		width: 100%;
		height: hidden;
		box-sizing: border-box;
		padding: 15px 15px 0 15px;
		font-size: 13px;
		overflow: auto;
		white-space: pre-line;
		font-family: monospace;
		color: var(--text);
		font-weight: 600;

		span{
			line-height: 13px;
			letter-spacing: 0.3px;
			white-space: pre;
			position: relative;
			span{
				&:last-child{
					position: absolute;
				}
			}
		}
		pre{
			letter-spacing: 0.3px;
			white-space: pre-line;

			// Display inline last two rows, and first - 
			// This makes the ending semicolon stay on the last row
			// Also makes single-rows when necessary
			&:first-child,
			&:last-child,
			&:nth-last-child(2){
				display: inline;
			}

			// Override with class block
			&.block{
				display: block;
			}
		}
		// B tags are comments
		b{
			font-weight: 500;
			color: var(--textLightest);
		}
	}


	// Keyframes for red animated ticker
	@keyframes animationTicker{
		0%{
			left: 0%;
		}
		100%{
			left: 100%;
		}
	}
	



</style>