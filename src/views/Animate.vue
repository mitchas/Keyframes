<template>
	<div id="animateApp">	

		<!-- HeaderBar -->
		<div id="animateTop">
			<!-- left siide, export, settings, etc. -->
			<div class="left">
				<button id="showOutputButton" aria-label="Show Output CSS" class="button icon-left ui-button" @click="viewOutput()">
					<i class="far" v-bind:class="{'fa-file-code': !showOutput, 'fa-chevron-circle-up': showOutput}"></i>
					<span v-if="!showOutput">Output CSS</span>
					<span v-else>Hide CSS</span>
				</button>
<!-- Output Modal -->
<!-- Leave way over here because it's pre formatted -->
<div id="outputModal" v-bind:class="{'visible':showOutput}">

<!-- ////////////////////
/////////////////////////
		Output CSS 
/////////////////////////
/////////////////////////-->
<pre id="outputCSS">
@keyframes yourAnimation {
<span v-for="(data, index) in steps" v-bind:key="index">
  {{data.timelinePosition.left}}{
    <span v-for="(prop, index) in data.properties" v-bind:key="index" v-if="index != 'transformProps'">{{index.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()}}:{{prop}};
    </span>
  }
  </span>
}
<span>
#elementToAnimate{
  /* animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode]; */
  animation: yourAnimation {{animationProperties.duration}} {{animationProperties.timing}} {{animationProperties.delay}} {{animationProperties.iterations}} {{animationProperties.direction}} {{animationProperties.fillMode}};
}
</span>
</pre>
</div> <!-- End output modal -->


				<button aria-label="More Settings" class="button icon-left ui-button" @click="showSettings()" id="showSettingsButton">
					<i class="far fa-adjust" v-bind:class="{'fa-chevron-circle-down': !showingMoreSettings, 'fa-chevron-circle-up': showingMoreSettings}"></i>
					<span v-if="!showingMoreSettings">More Settings</span>
					<span v-else>Hide Settings</span>
				</button>
			</div>
			<!-- right side - info, tips, etc. -->
			<div class="right">
				
				<div class="keyframe-data">
					Properties at {{roundValue(currentStep.left)}}%
				</div>
			</div>
		</div>
		
		<!-- Main stage with animated element -->
		<div id="animateMain">

			<!-- Settings contatiner -->
			<!--  show/hide with  showingMoreSettings -->
			<transition name="settings">
				<div id="animateSettings" v-if="showingMoreSettings">
					<h2>Settings</h2>
				</div>
			</transition>

			<!-- Stage wrapper -->
			<transition name="settings">
				<div id="animateStage" v-bind:class="{'tabs-hidden': cssTab == 0}" v-if="!showingMoreSettings">
					<span id="targetElement" v-bind:style="allProperties">Hello</span>
					<!-- <span id="targetElement" :style="fullCSS"></span> -->
				</div>
			</transition>

			<!-- Element property editor -->
			<div id="elementProperties">
				
				<div class="side-tab-display">
					<div class="side-tabs">
						<button class="tab" @click="cssTab = 1;" v-bind:class="{'active':cssTab==1}">
							<i class="far fa-external-link-alt"></i>
						</button>
						<button class="tab" @click="cssTab = 2" v-bind:class="{'active':cssTab==2}">
							<i class="far fa-pencil-paintbrush"></i>
						</button>
						<button class="tab" @click="cssTab = 3" v-bind:class="{'active':cssTab==3}">
							<i class="far fa-expand-arrows"></i>
						</button>
						<button class="tab" @click="cssTab = 4" v-bind:class="{'active':cssTab==4}">
							<i class="far fa-border-style"></i>
						</button>
					</div>
					<!-- ////////////
						Transform 
					/////////////// -->
					<div class="tab-content" v-bind:class="{'visible': cssTab == 1}">
						<!-- Close tab -->
						<button class="close-tab" type="button" @click="cssTab = 0">
							<i class="fas fa-chevron-double-right"></i>
						</button>
						<!-- Title -->
						<div class="tab-title">
							<span>Transform</span>
							<i class="far fa-external-link-alt"></i>
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
								<input type="text" placeholder="50% 50%" v-model="allProperties.transformProps.transformOrigin" @input="saveStep()">
							</div>
						</div>
					</div>
					<!-- ////////////
						Colors & Fonts 
					/////////////// -->
					<div class="tab-content" v-bind:class="{'visible': cssTab == 2}">
						<!-- Close tab -->
						<button class="close-tab" type="button" @click="cssTab = 0">
							<i class="fas fa-chevron-double-right"></i>
						</button>
						<!-- Title -->
						<div class="tab-title">
							<span>Colors & Fonts</span>
							<i class="far fa-pencil-paintbrush"></i>
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
					<!-- ////////////
						Sizing and Spacing 
					/////////////// -->
					<div class="tab-content" v-bind:class="{'visible': cssTab == 3}">
						<!-- Close tab -->
						<button class="close-tab" type="button" @click="cssTab = 0">
							<i class="fas fa-chevron-double-right"></i>
						</button>
						<!-- Title -->
						<div class="tab-title">
							<span>Size & Spacing</span>
							<i class="far fa-expand-arrows"></i>
						</div>
						<!-- Width -->
						<div class="field-set">
							<label>Width</label>
							<div class="input-wrapper">
								<input type="text" placeholder="100px" v-model="allProperties.width" @input="saveStep()">
							</div>
						</div>
						<!-- Max Width -->
						<div class="field-set">
							<label>Max-Width</label>
							<div class="input-wrapper">
								<input type="text" placeholder="50px" v-model="allProperties.maxWidth" @input="saveStep()">
							</div>
						</div>
						<!-- Min Width -->
						<div class="field-set">
							<label>Min-Width</label>
							<div class="input-wrapper">
								<input type="text" placeholder="22%" v-model="allProperties.minWidth" @input="saveStep()">
							</div>
						</div>
						<!-- Height -->
						<div class="field-set">
							<label>Height</label>
							<div class="input-wrapper">
								<input type="text" placeholder="100px" v-model="allProperties.height" @input="saveStep()">
							</div>
						</div>
						<!-- Max Height -->
						<div class="field-set">
							<label>Max-Height</label>
							<div class="input-wrapper">
								<input type="text" placeholder="50px" v-model="allProperties.maxHeight" @input="saveStep()">
							</div>
						</div>
						<!-- Min Height -->
						<div class="field-set">
							<label>Min-Height</label>
							<div class="input-wrapper">
								<input type="text" placeholder="22%" v-model="allProperties.minHeight" @input="saveStep()">
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
					<div class="tab-content" v-bind:class="{'visible': cssTab == 4}">
						<!-- Close tab -->
						<button class="close-tab" type="button" @click="cssTab = 0">
							<i class="fas fa-chevron-double-right"></i>
						</button>
						<!-- Title -->
						<div class="tab-title">
							<span>Borders & Spacing</span>
							<i class="far fa-border-style"></i>
						</div>
						<!-- Border -->
						<div class="field-set">
							<label>Border</label>
							<div class="input-wrapper">
								<input type="text" placeholder="45deg" v-model="allProperties.transformProps.border" @input="saveStep()">
							</div>
						</div>
						<!-- Box Shadow -->
						<div class="field-set">
							<label>Box Shadow</label>
							<div class="input-wrapper">
								<input type="text" placeholder="45deg" v-model="allProperties.transformProps.boxShadow" @input="saveStep()">
							</div>
						</div>
						<!-- Outline -->
						<div class="field-set">
							<label>Outline</label>
							<div class="input-wrapper">
								<input type="text" placeholder="45deg" v-model="allProperties.transformProps.outline" @input="saveStep()">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Footer -->
		<div id="animateFooter">

			<!-- Controls -->
			<div id="animationControls">
				<!-- Left side, add step -->
				<div class="left">
					<button id="addStepButton"  aria-label="Add new step" class="button icon-left ui-button" @click="addingStep = !addingStep;" v-bind:class="{'red' : addingStep}">
						<i class="far" v-bind:class="{'fa-plus-circle' : !addingStep, 'fa-times-circle': addingStep}"></i>
						<span v-if="!addingStep">Add Step</span>
						<span v-else>Cancel</span>
					</button>
					<button id="deleteStepButton" aria-label="Delete current step" class="button icon-left ui-button" @click="deleteStep()" v-if="Object.keys(this.steps)[1] && currentStep.left != '0.0'">
						<i class="far fa-trash-alt"></i>
						<span>Delete Step</span>
					</button>
					
				</div>

				<!-- Right side, Timing, play/pause -->
				<div class="right">
					<div class="animation-prop">
						<input type="text" placeholder="3s" v-model="animationProperties.duration" @input="saveStep()"/>
						<label>Duration</label>
					</div>
					<div class="animation-prop">
						<input type="text" placeholder="infinite" v-model="animationProperties.iterations" @input="saveStep()"/>
						<label>Iterations</label>
					</div>
					<div class="animation-prop">
						<input type="text" placeholder="0s" v-model="animationProperties.delay" @input="saveStep()"/>
						<label>Delay</label>
					</div>
					<div class="animation-prop">
						<input type="text" placeholder="linear" v-model="animationProperties.timing" @input="saveStep()"/>
						<label>Timing</label>
					</div>
					<div class="animation-prop" @click="toggleTiming('direction')">
						<button class="fake-input" aria-label="Change animation direction">{{animationProperties.direction}}</button>
						<label>Direction</label>
					</div>
					<div class="animation-prop" @click="toggleTiming('fill')">
						<button class="fake-input" aria-label="Change animation fill mode">{{animationProperties.fillMode}}</button>
						<label>Fill Mode</label>
					</div>
					<button class="button icon-left icon-left ui-button" @click="runAnimation()" v-bind:class="{'pause': animationPlaying}" @input="saveStep()">
						<i class="fas" v-bind:class="{'fa-play': !animationPlaying, 'fa-pause': animationPlaying}"></i>
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
			showingMoreSettings: false,
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
				minWidth: null,
				maxWidth: null,
				height: null,
				minHeight: null,
				maxHeight: null,
				margin: null,
				padding: null,
				border: null,
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
			// If not already viewing output
			if(!this.showOutput){
				this.showOutput = true;
				this.$store.commit('showLightbox', true);
			}else{
				// Close it
				this.showOutput = false;
				this.$store.commit('showLightbox', false);
			}
		},

		// Settings
		showSettings: function(){
			if(this.showingMoreSettings){
				this.showingMoreSettings = false;
			}else{
				this.showingMoreSettings = true;
			}
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
		padding-bottom: 35px;

		@media (max-width: @screenMD) {
			padding-bottom: 0px;
		}

		// Top bar - control buttons
		#animateTop{
			display: flex;
			justify-content: space-between;
			height: 50px;

			// Left side - export, adjustments, etc
			.left{
				display: flex;
				position: relative;

				// Show output button - set width so it doesn't bounce around
				#showOutputButton{
					width: 110px;
					padding-right: 0;
					text-align: left;
					margin-right: 15px;
				}
				#showSettingsButton{
					width: 130px;
					padding-right: 0;
					text-align: left;
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
			/////////////////////
			//    Settings    //
			///////////////////
			// Toggle-able settings over stage
			#animateSettings{
				display: flex;
				width: 50%;
				width: calc(~'100% - 450px');
				background-color: var(--backgroundLayer);
				border: 1px solid var(--border);
				height: 160px;
				transform-origin: top center;
				border-radius: var(--borderRadiusSmall);
				box-shadow: var(--shadow);
				margin-bottom: 15px;
				box-sizing: border-box;
				padding: 15px;
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
					width: 50px;
					height: 50px;
					background-color: var(--primary);
					text-align: center;
					border-radius: var(--borderRadiusSmall);
					transition: 0.5s ease;
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
						border: 0px solid transparent;
						padding: 0px;
						transition: all 0.2s;
						position: absolute;
						right: 65px;
						padding: 10px 0;
						box-shadow: var(--shadow);
						min-height: 200px;
						max-height: 500px;
						transform-origin: right center;
						transform: scaleX(0);
						overflow: 0;

						// Add class visible to show
						&.visible{
							display: block;
							padding: 10px;
							max-width: 300px;
							width: 70vw;
							border: 1px solid var(--border);
							transition: all 0.2s 0.08s;
							transform: scaleX(1);
							opacity: 1;
						}

						// Close tab button
						// Element needed in each tab (for now)
						.close-tab{
							position: absolute;
							top: 0;
							left: -46px;
							width: 50px;
							height: 50px;
							font-size: 22px;
							color: var(--border);
							transition: var(--transition);

							&:hover{
								color: var(--borderHover);
								transition: var(--transition);
								width: 60px;
							}
						}

						// Header
						.tab-title{
							font-size: 20px;
							font-weight: bolder !important;
							letter-spacing: 0.5px;
							color: var(--text);
							display: flex;
							justify-content: space-between;
							padding-bottom: 15px;
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

				.left, .right{
					#addStepButton{
						margin: 0 15px 0 0;
						width: 100px;
						padding: 0;
					}
					#deleteStepButton{
						margin: 0 0 0 0;
					}
				}
				.left{
					display: flex;
				}
				.right{
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-end;

					button{
						margin-left: 10px;
						width: 90px;
						font-weight: bolder;

						&.pause{
							background-color: var(--red);
							color: var(--backgroundLayer);
							border-color: var(--redHover);

							&:hover{
								background-color: var(--redHover);
							}
						}
					}

					// Animation props
					.animation-prop{
						display: flex;
						margin: 0 10px 0 0;
						flex-direction: column;

						label{
							font-size: 11.5px;
							display: flex;
							letter-spacing: 0.1px;
							flex-direction: column;
							justify-content: center;
							font-weight: 500;
							opacity: 0.5;
							box-sizing: border-box;
							max-width: 75px;
							padding: 2px 0px 0 0;
							color: var(--textLight);
						}

						input,
						.fake-input{
							border-radius: 3px;
							padding: 0 0;
							letter-spacing: 0px;
							height: 30px;
							max-width: 56px;
							min-width: 56px;
							font-size: 13px;
							font-weight: 700;
							background-color: transparent;
							border: none;							
							color: var(--textLight);
							padding: 0;
							height: 20px;
							border-bottom: 2px dashed var(--border);

							&:hover,
							&:focus{
								border-color: var(--borderHover);
							}

							// Disabled
							&:disabled{
								border-color: transparent;

								&:hover{
									border-color: transparent;
									cursor: default;
								}
							}
						}
						.fake-input{
							overflow: visible;
							text-overflow: ellipsis;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							box-sizing: border-box;
							padding-bottom: 0px;
							margin: 0;

							&:hover{
								cursor: pointer;
							}
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
				margin: 15px 0 0 0;
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

	// Pre tweaks to fix output
	// Contained witthin #outputModal
	pre{
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

	////////////////////
	// Output modal
	////////////////////
	#outputModal{
		position: absolute;
		background-color: var(--primary);
		color: var(--textInvert);
		width: 90vw;
		max-width: 300px;
		height: 200px;
		top: 40px;
		transition: 0.15s ease-in;
		transform: scaleY(0);
		transform-origin: top center;
		pointer-events: none;
		border-radius: var(--borderRadiusSmall);
		box-shadow: var(--shadow);

		&.visible{
			transition: 0.15s ease-out;
			transform: scaleY(1);
			pointer-events: all;
		}

		// CSS Output
		#outputCSS{
			position: fixed;
			width: 100%;
			height: hidden;
			box-sizing: border-box;
			padding: 15px;
			font-size: 12px;
			overflow: auto;
			white-space: pre-line;
			font-family: monospace;

			span{
				line-height: 15px;
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
				line-height: 15px;
				letter-spacing: 0.3px;
				white-space: pre-line;
				background-color: pink;
			}
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