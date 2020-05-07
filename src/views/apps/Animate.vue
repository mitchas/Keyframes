<!--
// 
// Animate.vue
// _________________________
//
//	Create CSS animation/keyframes
//
//		The Animate page uses it's own not-really-reusable CSS layout
//			Most other pages use the page-split setup - looks similar, but this had to be specific with the timeline
//
// -->

<template>
	<div id="animateApp">	

		<!-- HeaderBar -->
		<div id="animateTop">
			<!-- left siide, export, settings, etc. -->
			<!-- Show settings -->
			<button id="showSaveLoadButton" aria-label="Save or Load Animation" class="button small" @click="viewSaveLoad()" v-bind:class="[showSaveLoad ? 'red' : 'grey']">
				<i class="far fa-adjust" v-bind:class="{'fa-save': !showSaveLoad, 'fa-chevron-circle-up': showSaveLoad}"></i>
				<span>Save/Load</span>
			</button>
			<!-- Edit Target -->
			<button id="showEditTargetButton" aria-label="Edit Target Element" class="button small" @click="editTarget()" v-bind:class="[showEditTarget ? 'red' : 'grey']">
				<i class="far" v-bind:class="{'fa-bullseye': !showEditTarget, 'fa-chevron-circle-up': showEditTarget}"></i>
				<span>Target Element</span>
			</button>
			<!-- Show output -->
			<button id="showOutputButton" aria-label="Show Output CSS" class="button small" @click="viewOutput()" v-bind:class="{'red': showOutput}">
				<i class="far" v-bind:class="{'fa-file-code': !showOutput, 'fa-chevron-circle-up': showOutput}"></i>
				<span>Get CSS</span>
			</button>
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
			<transition name="fromtop">
				<div class="settings-display save-load" v-if="showSaveLoad">
					<h3>Save your animation</h3>
					<p>You can save your animation configuration and come back to it later.</p>
					<div id="saveAnimationField">
						<input id="newAnimationSaveName" aria-label="Save as Name" type="text" v-model="animationToSaveName" maxlength="12" placeholder="MyAnimation"/>
						<button aria-label="Save Animation" class="button green" @click="saveAnimation()">
							<i class="far fa-save"></i>
							<span>Save</span>
						</button>
					</div>
					<!-- Load -->
					<h3 class="mbottom-xs mtop-sm">Load saved animation</h3>
					<div id="savedAnimationsList">
						<div class="animation" v-for="(name, index) in savedAnimations" :key="index">
							<span @click="loadAnimation(name)">{{name.substr(10)}}</span>
							<i class="far fa-times" @click.self.prevent="deleteAnimationFromStorage(name)"></i>
						</div>
						<p v-if="!savedAnimations.length" class="text-light">You don't have any saved</p>
					</div>
					
				</div>
			</transition>
			<!--  Edit Target -->
			<!--  show/hide with showEditTarget -->
			<transition name="fromtop">
				<div class="settings-display" v-if="showEditTarget">
					<h3>Content</h3>
					<p>Change the content inside the target element</p>
					<input type="text" v-model="customTargetCode" class="mbottom-sm code"/>
					<h3>CSS</h3>
					<p>Add CSS to modify the target element.</p>
					<textarea class="code" v-model="customTargetStyles"></textarea>
				</div>
			</transition>
			<!--  CSS output -->
			<!--  show/hide with  showOutput -->
			<transition name="fromtop">
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
<span v-for="(step, index) in computedCSSOutput" v-bind:key="index">
    {{step.timelinePosition.left}}{
        <span v-for="(prop, index) in step.properties" v-bind:key="index">{{index.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()}}: {{prop}};
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

				<!-- Copy to clipboard button -->
				<button class="button small green" @click="copyOutput()">
					<i class="far fa-copy"></i>
					<span>Copy to Clipboard</span>
				</button>
				</div>
			</transition>

			<!-- Stage wrapper -->
			<div id="animateStage">
				<!-- 
					////////////////////////
					////////////////////////
					Target Element
					////////////////////////
					////////////////////////
				 -->
				<div id="targetStage">
					<div id="targetCenterAlign">
						<span id="targetElement" v-bind:style="allProperties" v-bind:class="{'pause': animationPaused}">
							<span v-html="customTargetCode"></span>
						</span>
					</div>
				</div>
			</div>

			<!-- 
				//////////////////////////
				Right hand side
				Element property editor 
				//////////////////////////
			-->
			<button id="toggleAnimateSidebar" @click="togglePropSidebar = !togglePropSidebar" v-bind:class="{'toggled': togglePropSidebar}">
				<i class="fas" v-bind:class="{'fa-chevron-double-right': togglePropSidebar, 'fa-chevron-double-left': !togglePropSidebar}"></i>
			</button>
			<div id="animateSidebar" v-bind:class="{'toggled': togglePropSidebar}">
				<!-- Top of sidebar - 50px height to match buttons on left -->
				<h4 id="animateSidebarTop">
					<span>CSS Properties</span> 
					<span>{{roundValue(currentStep.left)}}%</span>
				</h4>

				<div id="animateSidebarProperties">
					<button class="property-header" @click="propertiesToggles.transform = !propertiesToggles.transform" v-bind:class="{'active':propertiesToggles.transform}">
						<i v-bind:class="propertiesToggles.transform == 1 ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
						<span>Transform</span>
					</button>
					<!-- Transform fields -->
					<transition name="tab">
						<div class="property-group" v-if="propertiesToggles.transform">

							<!-- Rotate -->
							<div class="field-set">
								<label>Rotate</label>
								<div class="input-wrapper">
									<input type="text" id="transformRotate" placeholder="45deg" v-model="allProperties.transformProps.rotate" @input="saveStep()" maxlength="10">
								</div>
							</div>
							<!-- Scale -->
							<div class="field-set">
								<label>Scale</label>
								<div class="input-wrapper">
									<input type="text" id="transformScale" placeholder="1.5" v-model="allProperties.transformProps.scale" @input="saveStep()" maxlength="6">
								</div>
							</div>
							<!-- Translate -->
							<div class="field-set">
								<label>Translate</label>
								<div class="input-wrapper">
									<input type="text" id="transformTranslate" placeholder="50px, 100px" v-model="allProperties.transformProps.translate" @input="saveStep()" maxlength="12">
								</div>
							</div>
							<!-- Skew -->
							<div class="field-set">
								<label>Skew</label>
								<div class="input-wrapper">
									<input type="text" id="transformSkew" placeholder="-45deg" v-model="allProperties.transformProps.skew" @input="saveStep()">
								</div>
							</div>
							<!-- Transform Origin -->
							<div class="field-set">
								<label>Transform Origin</label>
								<div class="input-wrapper">
									<input type="text" id="transformOrigin" placeholder="bottom left" v-model="allProperties.transformOrigin" @input="saveStep()" maxlength="22">
								</div>
							</div>
						</div>
					</transition> <!-- End transform: -->
					<!-- 
						Colors & Text
					 -->
					<button class="property-header" @click="propertiesToggles.colors = !propertiesToggles.colors" v-bind:class="{'active':propertiesToggles.colors}">
						<i v-bind:class="propertiesToggles.colors ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
						<span>Colors & Text</span>
					</button>
					<!-- Colors & Text Fields-->
					<transition name="tab">
						<div class="property-group" v-if="propertiesToggles.colors">
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
					</transition> <!-- End colorors & Fonts -->

					<!-- 
						Sizing and spacing
					 -->
					<button class="property-header" @click="propertiesToggles.sizing = !propertiesToggles.sizing" v-bind:class="{'active':propertiesToggles.sizing}">
						<i v-bind:class="propertiesToggles.sizing ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
						<span>Sizing & Spacing</span>
					</button>
					<!-- Sizing and spacing -->
					<transition name="tab">
						<div class="property-group" v-if="propertiesToggles.sizing">
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
					</transition> <!-- End Sizing & Spacing -->

					<!-- 
						Borders
					 -->
					<button class="property-header" @click="propertiesToggles.borders = !propertiesToggles.borders" v-bind:class="{'active':propertiesToggles.borders}">
						<i v-bind:class="propertiesToggles.borders ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
						<span>Borders</span>
					</button>
					<!-- Borders -->
					<transition name="tab">
						<div class="property-group" v-if="propertiesToggles.borders">
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
		
		<!-- 
			//////////////////////
			Footer & Timeline
			/////////////////////	
		-->
		<div id="animateFooter">

			<!-- Controls -->
			<div id="animationControls">
				<!-- Left side, add step -->
				<div class="steps">
					<button aria-label="Add new step" class="button mright-xs" @click="addingStep = !addingStep;" v-bind:class="{'active' : addingStep}">
						<i class="far" v-bind:class="{'fa-plus-circle' : !addingStep, 'fa-times-circle': addingStep}"></i>
						<span v-if="!addingStep">Add Step</span>
						<span v-else>Cancel</span>
					</button>
					<button aria-label="Delete current step" class="button red" @click="deleteStep()" v-if="Object.keys(this.steps)[1] && currentStep.left != '0.0'">
						<i class="far fa-trash-alt"></i>
						<span>Delete {{roundValue(currentStep.left)}}%</span>
					</button>
				</div>

				<!-- Edit timing -->
				<div class="timing">
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

				<!-- Right side, pause -->
				<div class="preview-button" v-if="animationPlaying">
					<button class="button green mleft-xs" @click="pauseAnimation()" v-bind:class="{'green': animationPaused}">
						<i v-bind:class="{'far fa-pause': !animationPaused, 'far fa-play': animationPaused}"></i>
						<span v-if="!animationPaused">Pause</span>
						<span v-else>Resume</span>
					</button>
				</div>
				<!-- Right side, play/stop -->
				<div class="preview-button">
					<button class="button green mleft-xs" @click="runAnimation()" v-bind:class="{'stop-button': animationPlaying, 'red': animationPlaying}">
						<i v-bind:class="{'far fa-play': !animationPlaying, 'far fa-stop-circle': animationPlaying}"></i>
						<span v-if="!animationPlaying">Play</span>
						<span v-else>Stop</span>
					</button>
				</div>
				
			</div>

			<!-- Timeline -->
			<div id="animateTimeline" @mousemove.self="addingStep && getTimelinePosition();" @click.self="addingStep && newStep();" v-bind:class="{'add-step': addingStep}" v-if="!$store.getters.softKeyboard">
				<!-- Animated marker that progresses with animation -->
				<div class="timeline-marker animated" v-if="animationPlaying" v-bind:class="{'pause': animationPaused}">
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

	{{customTargetStyles}}
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
import metaMixin from "@/components/mixins/metaMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
import screenResizeMixin from "@/components/mixins/ui/screenResizeMixin.js";

export default {
	name: "animateApp",

	components: {
	},

	mixins: [
		metaMixin,
		screenResizeMixin,
		preferencesMixin,
	],

	data() {
		return {
			// Which tab are they editing
			propertiesToggles: {
				transform: true,
				colors: false,
				sizing: false,
				borders: false
			},
			// Prop sidebar hides on mobile
			togglePropSidebar: false,
			// Show Output modal or not
			showOutput: false,
			// Hold css output generated
			rawOutputCSS: null,
			// Enable hover timeline to add step
			addingStep: false,
			// When hovering an existing step
			hideAddStep: false,
			// Animation currently playing, and/or paused
			animationPlaying: false,
			animationPaused: false,
			// Collapsible settings
			showSaveLoad: false,
			// Show modal to edit target
			showEditTarget: false,
			// Custom CSS for target
			customTargetStyles: "#targetElement{\n    display: inline-flex;\n    flex-direction: column;\n    justify-content: center;\n    width: 80px;\n    height: 80px;\n    background-color: #0c4570;\n    color: #FFFFFF;\n    text-align: center;\n    border-radius: 50%;\n    font-size: 42px;\n    transition: 0.5s ease;\n}",
			customTargetCode: "<i class='fal fa-hand-peace'></i>",
			// Animation name to save
			animationToSaveName: null,
			// Previously saved animations
			savedAnimations: null,
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
			},

			// Backdoor to reference to update computed property - not really actually used
			backdoor: 0,
		};
	},

	mounted() {
		this.updateMeta("Animate | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")

		// Create date and format (remove spaces, remove year)
		var dateName = new Date().toDateString().replace(/\s/g, '');
		this.animationToSaveName =  "" + dateName.substring(0,dateName.length - 4).substring(3,dateName.length - 4) + "-x" + (Math.floor(Math.random() * 666)+100).toString();
	},

	computed: {

		// Clean steps to generate output
		computedCSSOutput: function () {
			// Reference backdoor var so it recomputes when that changes.
			this.backdoor;

			let _this = this;
			// let css = _this.steps;
			let css = [];

			var copySteps = _this.steps;
			// var copySteps = _.cloneDeep(_this.steps);

			for (var step in copySteps) {
				console.log(copySteps[step])
				// transformProps
				delete copySteps[step].properties.transformProps; 

				// Remove erased props
				for (var prop in copySteps[step].properties) {
					// If prop doesn't have value, delete it
					if(!copySteps[step].properties[prop]){
						delete copySteps[step].properties[prop]; 
					}
				}
				// Push cleaned prop to array
				css.push(copySteps[step])
			}

			// Return
			return css;
		},

	},

	watch: {
		
	},
	
	methods: {

		////////////////////////
		// Step Functions
		///////////////////////
		// Save current step
		saveStep: function(){
			var copyProps = _.cloneDeep(this.allProperties);

			// Format to make it easier to read later,
			// Add timeline position
			var propsToSave = {
				timelinePosition: {
					left: parseFloat(this.currentStep.left).toFixed(1) + "%"
				},
				properties: copyProps
			}

			// String to generate transform: prop
			var transformString = "";
			if(copyProps['transformProps']){
				for(var prop in copyProps['transformProps']) {
					if(copyProps['transformProps'][prop]){
						transformString = transformString + " " + prop + "(" + copyProps['transformProps'][prop] + ")"
					}
				}
				// Set prop in cleanprops
				this.allProperties.transform = transformString;
				copyProps.transform = transformString;
			}

				
			// Save changes to steps at current step 
			this.steps[this.currentStep.left] = propsToSave;

			// Get text content of output to apply to targetElement
			var _this = this;

			var fullCSSString = document.getElementById("outputCSS").textContent;
			_this.rawOutputCSS = fullCSSString;
			_this.backdoor++;


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
			this.animationPaused = false;

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
			this.animationPaused = false;
			if(this.animationPlaying){
				this.runAnimation();
			}
		},

		// Pause animation temporarily
		pauseAnimation: function(){
			if(this.animationPaused){
				this.animationPaused = false;
			}else{
				this.animationPaused = true;
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
			var offset = _event.pageX - _event.target.offsetLeft;
			var result = ((offset / _event.target.offsetWidth) * 100).toFixed(1);
			
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
				this.loadAllSaved();
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
			var animationData = {
				date: new Date(),
				customTargetCode: this.customTargetCode,
				customTargetStyles: this.customTargetStyles,
				keyframeData: this.allProperties
			}
			var stringified = JSON.stringify(animationData)
			localStorage.setItem('animation_' + this.animationToSaveName.replace(/\s/g, ''), stringified);

			this.toast("Animation Saved", "Your animation has been saved into your browser's local storage.", "", "far fa-save");
			this.showSaveLoad = false;
		},
		// Load saved
		loadAllSaved: function(){
			// Get all saved animations
			// Loop through all local storage, save sttorage names of animattions
			// Animations begin with "animation_"
			var values = [];
			var keys = Object.keys(localStorage);
			var i = keys.length;
			while( i-- ){
				if(keys[i].startsWith("animation_")){
					values.push(keys[i]);
				}

			}
			console.log(values);

			this.savedAnimations = values;
		},

		// Load previously saved animation
		loadAnimation: function(name){
			var animation = localStorage.getItem(name);

			var parsed = JSON.parse(animation)
			this.allProperties = parsed.keyframeData;
			this.customTargetStyles = parsed.customTargetStyles;
			this.customTargetCode = parsed.customTargetCode;
			// // this.allProperties = animation;

			this.toast(name.substr(10) + " Loaded", "Your animation has been loaded.", "", "far fa-cloud-download");
			this.viewSaveLoad();
		},
		// Delete saved animation
		deleteAnimationFromStorage: function(name){
			localStorage.removeItem(name);
			this.viewSaveLoad();
		},


		// Copy output to clipboard
		copyOutput: function(){
			// Create input element, append text, copy text, remove element
			var copyContent = document.getElementById('outputCSS').innerText;
			this.copyToClipboard("The CSS", copyContent)
		},

	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	// Use this to toggle **Pause** on animations. Not full stops.
	.pause{
		animation-play-state: paused !important;
	}
	// Component wrapper
	#animateApp{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		max-height: 100%;
		// height: calc(~'100% - 70px');
		// max-height: calc(~'100% - 70px');
		box-sizing: border-box;
		height: 100%;

		// Top bar - control buttons
		#animateTop{
			position: absolute;
			z-index: 10;
			display: flex;
			justify-content: flex-start;
			height: 50px;

			// Center on mobile
			@media (max-width: @screenMD) {
				justify-content: center;
				left: 0;
				width: 100%;
			}

			button{
				margin-right: 15px;
				&:last-child{
					margin-right: 0;
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
			overflow: auto;
			box-sizing: border-box;
			padding: 0 0;
			overflow: hidden;

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
				background-color: var(--primary);
				transform-origin: top center;
				border-radius: var(--borderRadiusSmall);
				box-shadow: var(--shadow);
				box-sizing: border-box;
				position: absolute;
				top: 50px;
				z-index: 50;
				border: 1px solid var(--border);

				// Full with on sm
				@media (max-width: @screenSM) {
					width: 100%;
				}

				h3,p{
					color: var(--white);
				}

				// Settings headers
				h3{
					font-size: 16px;
					line-height: 16px;
					margin: 0;
					padding: 0;
					font-weight: 600;
				}
				p{
					margin: 0;
					padding: 4px 0 10px 0;
					line-height: 14px;
					font-size: 13px;
				}
				
				// Textareas
				textarea,input{
					font-size: 14px;
					font-family: var(--mono);
					line-height: 15px;
				}
				textarea{
					min-height: 180px;
				}

				// Save/load display
				&.save-load{
					width: 310px;

					// Full with on sm
					@media (max-width: @screenSM) {
						width: 100%;
					}


					// Input/button for save field
					#saveAnimationField{
						display: flex;
						width: 100%;
						overflow: hidden;
						margin-bottom: 15px;

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
							border-left: 1px solid var(--greenHover);
							padding-left: 6px;
							white-space: pre;
							
							i{
								margin-right: 8px;
								margin-left: 5px;
							}
						}
					}

					// Previously saved animation list - with delete button
					#savedAnimationsList{
						display: block;
						margin-top: 5px;
						width: 100%;

						.animation{
							width: 100%;
							display: flex;
							justify-content: space-between;
							padding: 0 10px 0 10px;
							box-sizing: border-box;
							color: var(--white);
							font-family: var(--mono);

							span{
								flex-grow: 3;
								font-size: 15px;
								letter-spacing: -0.2px;
								font-weight: 500;
								display: block;
								padding: 3px 0;
							}
							i{
								color: var(--white);
								opacity: 0;
								transition: var(--transition);
								font-size: 14px;
							}

							// Hover
							&:hover{
								cursor: pointer;

								span{
									text-decoration: underline;
								}

								i{
									opacity: 0.5; 
									transition: var(--transition);

									&:hover{
										color: var(--red);
										opacity: 1;
										transition: var(--transition);
									}
								}
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
				box-sizing: border-box;
				padding: 50px 50px 0 0;
				transition: var(--transition);

				// Remove right padding on mobile
				@media (max-width: @screenMD) {
					padding-right: 0;
				}

				#targetStage{
					border-radius: var(--borderRadiusSmall);
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-right: 50px;

					// To flex align the target elementt center without effecting margin
					#targetCenterAlign{
						display: flex;
						justify-content: center;
						
						// Element that's being animated
						#targetElement{
							// box-shadow: var(--shadow);
							z-index: 3;
						}
					}
				}
			}
			///////////////////////////////
			//    Sidebar/Properties    //
			/////////////////////////////
			// Toggle sidebar button
			#toggleAnimateSidebar{
				height: 40px;
				width: 40px;
				border-radius: 50%;
				position: absolute;
				font-size: 26px;
				background-color: var(--backgroundLayer);
				top: 50%;
				color: var(--textLight);
				transition: var(--transitionFast);
				display: none;

				@media (max-width: @screenMD) {
					right: 10px;
					display: block;
				}

				i{
					margin-right: 2px;
				}

				&.toggled{
					right: 355px;
					transition: var(--transitionFast);

					@media (max-width: @screenSM) {
						right: unset;
						left: 8%;
					}

					i{
						margin-right: 0;
					}
				}
			}
			#animateSidebar{
				width: 340px;
				background-color: var(--altBackground);
				box-shadow: var(--shadow);
				border: 1px solid var(--border);
				height: 100%;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				padding: 0 0;
				transition: var(--transitionFast);
				z-index: 10;
				border-radius: 10px;

				// Hide on mobile
				@media (max-width: @screenMD) {
					position: absolute;
					right: -375px;
					width: 350px;
					z-index: 50;
					background-color: var(--seeThrough);
				}
				@media (max-width: @screenSM) {
					position: absolute;
					right: -100%;
					width: 80%;
				}

				&.toggled{
					right: 0;
					transition: var(--transitionFast);
				}

				// Top of sidebar, title
				#animateSidebarTop{
					display: flex;
					width: 100%;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 15px 15px 15px 15px;
					letter-spacing: 0.3px;
					color: var(--white);

					span{
						&:last-child{
							font-family: var(--systemFont);
							font-weight: 800;
							letter-spacing: 0.8px;
						}
					}
				}

				// Collapsible CSS property fields
				#animateSidebarProperties{
					flex-grow: 3;
					overflow: auto;

					// Section header - click to collapse
					.property-header{
						display: flex;
						justify-content: flex-start;
						width: 100%;
						box-sizing: border-box;
						padding: 10px 15px 10px 15px;
						font-size: 14px;
						font-weight: 700;
						// border-bottom: 1px solid var(--border);
						color: var(--white);
						transition: var(--transition);

						span{
							text-decoration: underline;
						}

						i{
							position: relative;
							top: 2px;
							transform: scale(1.2);
							margin-right: 8px;
						}

						&:hover{
							color: var(--white);
							transition: var(--transition);

							i{
								font-weight: 900;
							}
						}
					}

					// Collapsible group that holds related properties
					.property-group{
						box-sizing: border-box;
						padding: 0px 0 18px 0;
						overflow: hidden;

						// Adjust fields
						.field-set{
							padding: 2px 15px 2px 40px;
							box-sizing: border-box;
							// background-color: var(--altBackground);
							display: flex;
							justify-content: space-between;
							width: 100%;

							label{
								flex-grow: 3;
								width: 100%;
								display: flex;
								flex-direction: column;
								justify-content: center;
								color: var(--white)
							}

							.input-wrapper{
								width: 50%;
								min-width: 50%;

								input{
									width: 100%;
									font-family: var(--mono);
									font-size: 14px;
									letter-spacing: 0px;
									// background-color: var(--background);
								}
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

			// Add side padding on mobile
			@media (max-width: @screenSM) {
				padding: 0 15px;
				box-sizing: border-box;
			
				// Shrink Buttons
				.button{
					font-size: 12px;
					padding: 0 8px;
					letter-spacing: 0px;
					height: 32px;
				}

			}


			// Controls
			#animationControls{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				// Add and delete step buttons
				.steps{
					display: flex;
					flex-grow: 3;
					// Button width
				}
				// Play/pause buttons
				.preview-button{
					display: flex;
					justify-content: flex-end;
				}

				// Timing inputs
				.timing{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					font-family: var(--systemFont);

					// Move timing to top on mobile
					@media (max-width: @screenMD) {
						order: -1;
						width: 100%;
						padding: 5px 0 22px 0;
					}

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
							top: 34px;
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
							border-radius: 0;
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
							border-bottom: 2px dotted var(--border);

							&:hover,
							&:focus{
								border-color: var(--borderHover);
							}
						}

						// Position absolute inputs
						input{
							position: absolute;
							border-radius: 0;
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
					&:hover,&:focus-within{
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
				margin: 15px 0 10px 0;
				box-shadow: var(--shadowLight);
				position: relative;
				transition: 0s ease;
				border: 1px solid var(--border);

				// Remove bottom padding on mobile
				@media (max-width: @screenMD) {
					padding: 15px 0 0 0;
				}

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
						width: 24px;
						height: 24px;
						border-radius: 2px;
						display: flex;
						flex-direction: column;
						color: var(--text);
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
						color: var(--white);
						background-color: var(--blue);
					}
				}
				// Regular and current step
				.timeline-marker.step,
				.timeline-marker.current{
					z-index: 15;
					background-color: var(--greyHover);

					b{
						background-color: var(--greyHover);
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
						color: var(--white);
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
					opacity: 1;
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
		padding: 0 15px 0 0;
		font-size: 14px;
		overflow: auto;
		white-space: pre-line;
		font-family: var(--mono) !important;
		color: var(--white);
		font-weight: 500;

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
		
		// B tags are comments
		b{
			font-weight: 500;
			color: var(--white);
			opacity: 0.6;
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