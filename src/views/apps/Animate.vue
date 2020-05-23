<!--
// 
// Animate.vue
// _________________________
//
//	Create CSS animation/keyframes
//
//		The Animate page uses it's own not-really-reusable CSS layout
//			Most other pages use the app-page-split setup - looks similar, but this had to be specific with the timeline
//
//  	Functions: 
//  		getTransformString()
//  			Called any time a transform prop is changed. It makes a string of all transform properties into one.
//  		saveStep()
//  			Backdoor trigger to force change - not exactly sure why.
//  		newStep()
//  			Enables mouse-click on timeline to add a new step - processes the click
//  		deleteStep()
//    			Delete current selected step
// 			runAnimation
// 			 	Stops other functions and begins animation
// 			pauseAnimation
// 				Pauses animation - can be resumed, unlike stopping
// 			getTimelinePosition
// 				Called when adding a step, while hovering timeline to get mouse position to find step %
// 			roundValue(val)
// 				round val to 0.1, and if it's greater than 99%, round to 100% to make the final step
// 			toggleTiming(type)
// 				Some animation timing inputs are toggles and not text inputs, this cycles through the options
// 			toggleOption(option)
// 				Toggle top tab/option popups
// 			resetAnimation
// 				Resets everything to default
// 			saveAnimation
// 				Saves animation to local storage
// 			loadAllSaved
// 				loads local storage and gets items w/prefix animation_
// 			loadAnimation
// 				Loads selected animation from local storage into editor
// 			deleteAnimationFromStorage
// 				deleted selected animation from local storage
// 			openPreset(index)
// 				Loads preset at index value in array
// 			newUserPreset()
// 				If new user chooses to load preset in new user modal
// 			copyOutput
// 				copies output to user's clipboard
//
// -->

<template>
	<div id="animateApp">	
		
		<!-- Main stage with animated element -->
		<div id="animateMain">
			<div id="animateLeft">

				<!-- HeaderBar -->
				<div id="animateTop">
					<!-- left siide, export, settings, etc. -->
					<!-- Show settings -->
					<button id="showSaveLoadButton" aria-label="Save or Load Animation" class="button small" @click="toggleOption('saveLoad')" v-bind:class="[options.saveLoad ? 'red' : 'invert']">
						<i v-bind:class="{'fas fa-save': !options.saveLoad, 'fas fa-times-circle': options.saveLoad}"></i>
						<span>Save/Load</span>
					</button>
					<!-- Edit Target -->
					<button id="showEditTargetButton" aria-label="Edit Target Element" class="button small" @click="toggleOption('editTarget')" v-bind:class="[options.editTarget ? 'red' : 'yellow']">
						<i v-bind:class="{'fas fa-bullseye': !options.editTarget, 'fas fa-times-circle': options.editTarget}"></i>
						<span>Target</span>
					</button>
					<!-- Show output -->
					<button id="showOutputButton" aria-label="Show Output CSS" class="button small" @click="toggleOption('output')" v-bind:class="[options.output ? 'red' : 'green']">
						<i v-bind:class="{'fas fa-brackets-curly': !options.output, 'fas fa-times-circle': options.output}"></i>
						<span>Get CSS</span>
					</button>
					<!-- Spacer -->
					<div class="flex-spacer"></div>
					<!-- Toggle properties -->
					<button id="mobilePropertyToggle" aria-label="Show Property Editor" class="button small" @click="togglePropSidebar = !togglePropSidebar" v-bind:class="[togglePropSidebar ? 'red' : 'blue']">
						<i v-bind:class="{'fas fa-edit': !togglePropSidebar, 'fas fa-angle-double-right': togglePropSidebar}"></i>
						<span>{{togglePropSidebar ? 'Hide Editor' : 'Editor'}}</span>
					</button>
				</div>


				<!-- 
					========================
					Settings contatiners
					========================
				-->
				<!--  Basic settings -->
				<!--  show/hide with  options.saveLoad -->
				<transition name="fromtop">
					<div class="settings-display" v-if="options.saveLoad">
						<!-- Save current animation -->
						<div class="field">
							<label for="newAnimationSaveName">
								Save your Animation
								<!-- <small class="block">You can save your animation configuration and come back to it later</small> -->
							</label>
							<!-- animation name -->
							<input id="newAnimationSaveName" aria-label="Save as Name" type="text" v-model="animationToSaveName" maxlength="12" placeholder="MyAnimation"/>
							<button aria-label="Save Animation" class="button blue small mtop-xs" @click="saveAnimation()">
								<i class="far fa-save"></i>
								<span>Save</span>
							</button>
							<transition name="basic">
								<div class="badge red mleft-xs" v-if="savedAnimations && savedAnimations.includes('animation_' + animationToSaveName)">
									<i class="far fa-code-branch"></i>
									<span>Overwriting "{{animationToSaveName}}"</span>
								</div>
							</transition>
						</div>
						<!-- Saved animations -->
						<div class="field mtop-xs">
							<label>
								Load a Saved Animation
								<small v-if="!savedAnimations[0]" class="block">You don't have any saved animations yet</small>
							</label>
							<div class="saved-list">
								<div class="saved-item" v-for="(name, index) in savedAnimations" :key="index">
									<span @click="loadAnimation(name)">{{name.substr(10)}}</span>
									<i class="far fa-times delete-saved-item" @click.self.prevent="deleteAnimationFromStorage(name)"></i>
								</div>
							</div>
						</div>
						<!-- Preset animations -->
						<div class="field mtop-xs">
							<label>
								 Preset Animations
							</label>
							<div class="saved-list">
								<div class="saved-item" v-for="(preset, index) in presetAnimations" :key="index" :class="preset.animationClass">
									<span @click="openPreset(index)">{{preset.name}}</span>
									<i class="preset-icon" :class="[preset.targetClass]"></i>
								</div>
							</div>
							<!-- Reset Everything -->
							<div class="flex flex-end">
								<button aria-label="Save Animation" class="button red small mtop-xs" @click="resetEverything()">
									<i class="fas fa-skull-crossbones"></i>
									<span>Reset Everything</span>
								</button>
							</div>
							
						</div>
						
					</div>
				</transition>
				<!--  Edit Target -->
				<!--  show/hide with options.editTarget -->
				<transition name="fromtop">
					<div class="settings-display" v-if="options.editTarget">
						<!-- Custom Target -->
						<div class="field">
							<label for="customTarget">
								Target Element
								<small class="block">Change the content of element you're animating</small>
							</label>
							<!-- target html -->
							<div class="target-el-open">&lt;div id="targetElement"&gt;</div>
							<textarea v-model="customTargetCode" id="customTarget" class="code"></textarea>
							<div class="target-el-close">&lt;/div&gt;</div>
						</div>
						<!-- Custom Target CSS -->
						<div class="field">
							<label for="customTargetCSS">
								Target CSS
								<small class="block">Modify the target element's default CSS</small>
							</label>
							<!-- target css -->
							<textarea class="code big" v-model="customTargetStyles"></textarea>
						</div>
					</div>
				</transition>
				<!--  CSS output -->
				<!--  show/hide with  options.output -->
				<transition name="fromtop">
					<div class="settings-display" v-show="options.output">
						<!-- Output CSS -->
						<pre id="outputCSS">
							<!-- 
								///////////////////////////
								CSS output
								///////////////////////////
							-->
							<b>/* Copy this @keyframes block to your CSS*/</b>
							<!-- Keyframe definition block -->
							<div>@keyframes yourAnimation &#123;</div>
								<!-- For each keyframe step -->
								<div v-for="(step, index) in computedCSSOutput" v-bind:key="index">
									<!-- Step percent and open bracket -->
									<div>&nbsp;&nbsp;&nbsp;&nbsp;{{step.timelinePosition.left}}&#123;</div>
									<!-- Property loop -->
									<div v-for="(prop, index) in step.properties" v-bind:key="index">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{index.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()}}: {{prop}};</div>
									<!-- Step end bracket -->
									<div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
								</div>
							&#125; <!-- End keyframe block -->
							
							<br/>
							<br/>

							<div><b>/* Add the animation: property to whichever element you want to animate */</b></div>
							<!-- Animation timing -->
							<div>#elementToAnimate&#123;</div>
								<div>&nbsp;&nbsp;&nbsp;&nbsp;animation: yourAnimation {{animationProperties.duration}} {{animationProperties.timing}}  {{animationProperties.delay}} {{animationProperties.iterations}}  {{animationProperties.direction}}  {{animationProperties.fillMode}};</div>
							&#125;

							<!-- Perspective -->
							<span v-if="perspective">
								<br/>
								<br/>
								<div><b>/* If you used any 3d transformations: */</b></div>
								<div><b>/* add your perspective to the ~Parent element~ */</b></div>
								<div>perspective: {{perspective}}</div>
							</span>
						</pre>

						<!-- Copy to clipboard button -->
						<button class="button small green fit" @click="copyOutput()">
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
						<div id="targetCenterAlign" :class="{'perspective': perspective}">
							<span id="targetElement" v-bind:style="selectedKeyframeCSS.properties" v-bind:class="{'pause': animationPaused}" v-html="customTargetCode"></span>
						</div>
					</div>
				</div>
			</div> <!-- / animate left -->

			<!-- 
				//////////////////////////
				Right hand side
				Element property editor 
				//////////////////////////
			-->
			<div id="animateRight">
				<div id="animateSidebar" v-bind:class="{'toggled': togglePropSidebar}" v-touch:swipe.right="() => togglePropSidebar = false">
					<!-- Top of sidebar - 50px height to match buttons on left -->
					<h4 id="animateSidebarTop">
						<span>CSS Properties</span> 
						<span>{{roundValue(currentStep.left)}}%</span>
					</h4>
					<div id="animateSidebarProperties">

						<!-- Property loops -->
						<!-- First for transform props, then the rest -->
						<div v-for="(group, name) in fields" :key="name">
							<button class="property-header" @click="propertiesToggles[group.toggle] = !propertiesToggles[group.toggle]" v-bind:class="{'active': propertiesToggles[group.toggle]}">
								<i v-bind:class="propertiesToggles[group.toggle] == 1 ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
								<span>{{name}}</span>
								<i :class="['mleft-xs ' + group.icon]"></i>
							</button>
							<transition name="basic">
								<div class="property-group" v-if="propertiesToggles[group.toggle]">
									<div class="field-set" v-for="(field, index) in group.props" :key="index">
										<!-- Tooltip -->
										<Tooltip :link="field.tooltipLink" v-if="field.tooltipText">
											<b>{{field.tooltipText}}</b>
											<span class="code" v-if="field.tooltipCode">{{field.tooltipCode}}</span>
											<span class="code example" v-if="field.tooltipExample">{{field.tooltipExample}}</span>
										</Tooltip>
										<label :for="'field' + field.model">{{index}}</label>
										<div class="input-wrapper">
											<!-- Transform Props -->
											<input v-if="field.transform" type="text" :id="'field' + field.model" :placeholder="field.placeholder" v-model="keyframes[currentStep.left].transformProps[field.model]" @input="getTransformString()" :maxlength="field.maxLength && field.maxLength">
											<!-- Regular Props -->
											<input v-if="!field.transform && field.model" type="text" :id="'field' + field.model" :placeholder="field.placeholder" v-model="keyframes[currentStep.left].properties[field.model]" @input="saveStep()" :maxlength="field.maxLength && field.maxLength">
											<!-- Other Props -->
											<!-- Perspective -->
											<input v-if="field.perspective" v-model="perspective" type="text" :id="'transformOrigin' + index" :placeholder="field.placeholder" @input="saveStep()" :maxlength="field.maxLength && field.maxLength">
										</div>
									</div>
								</div>
							</transition>
						</div>

						<!-- Spacer -->
						<div class="mtop-md"></div>
					</div>
				</div>
			</div><!-- / animate right -->
		</div> <!-- / animate main -->
		
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
					<button aria-label="Add new step" class="button" @click="addingStep = !addingStep;" v-bind:class="{'red' : addingStep, 'invert': !addingStep}">
						<i class="far" v-bind:class="{'fa-plus-circle' : !addingStep, 'fa-times-circle': addingStep}"></i>
						<span v-if="!addingStep">Add Step</span>
						<span v-else>Cancel</span>
					</button>
					<button aria-label="Delete current step" class="button red" @click="deleteStep()" v-if="Object.keys(this.keyframes)[1] && currentStep.left != '0.0%'">
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

				<!-- Flex spacer -->
				<div class="flex-grow"></div>

				<!-- Right side, pause -->
				<div class="preview-button" v-if="animationPlaying">
					<button class="button mleft-xs" @click="pauseAnimation()" v-bind:class="{'green': animationPaused, 'yellow': !animationPaused}">
						<i v-bind:class="{'far fa-pause': !animationPaused, 'far fa-play': animationPaused}"></i>
						<span v-if="!animationPaused">Pause</span>
						<span v-else>Resume</span>
					</button>
				</div>
				<!-- Right side, play/stop -->
				<div class="preview-button">
					<button class="button green" @click="runAnimation()" v-bind:class="{'stop-button': animationPlaying, 'red': animationPlaying}">
						<i v-bind:class="{'far fa-play': !animationPlaying, 'far fa-stop-circle': animationPlaying}"></i>
						<span v-if="!animationPlaying">Play</span>
						<span v-else>Stop</span>
					</button>
				</div>
				
			</div>

			<!-- Timeline -->
			<div id="animateTimeline" @mousemove.self="addingStep && getTimelinePosition();" @click.self="addingStep && newStep();" v-bind:class="{'add-step': addingStep}" v-if="!$store.getters.device.softKeyboardVisible">
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
				<div class="timeline-marker step" v-for="(step, index) in keyframes" 
					v-bind:style="step.timelinePosition" :key="step.id" 
					@mouseenter="hideAddStep = true" 
					@mouseleave="hideAddStep = false" 
					@click="currentStep.left = index;">

					<b>{{roundValue(step.timelinePosition.left)}}</b>
				</div>

				<!-- Marker that shows location when hovering - must be in after other makers so it responds to ~ sibling css selector -->
				<div class="timeline-marker new" v-bind:style="timelinePosition">
					<b>{{roundValue(timelinePosition.left)}}</b>
				</div>
			</div>
		</div>


		<!-- Append Styles to page -->
		<v-style>
			.timeline-marker.animated{
				animation: animationTicker {{animationProperties.duration}} linear {{animationProperties.delay}} {{animationProperties.iterations}} {{animationProperties.direction}} {{animationProperties.fillMode}};
				animation-play-state: {{ animationPlaying ? 'running' : 'paused' }};
			}
			{{customTargetStyles}}
		</v-style>
		<!-- Only add animation if it's playing -->
		<!-- Otherwise  -->
		<v-style v-if="animationPlaying">
			{{rawOutputCSS}}

			#targetElement{
				animation: yourAnimation {{animationProperties.duration}} {{animationProperties.timing}} {{animationProperties.delay}} {{animationProperties.iterations}} {{animationProperties.direction}} {{animationProperties.fillMode}};
				animation-play-state: {{ animationPlaying ? 'running' : 'paused' }};
			}
		</v-style>
		
		<!-- Perspective -->
		<v-style v-if="perspective">
			.perspective{
				perspective: {{perspective}};
			}
		</v-style>


		<!-- Help modal -->
		<!-- <Help
			v-bind:show="$store.getters.global.showHelp"
			title="Animation Tips"
			:slides="$store.getters.userPreferences.totalVisits == 1 ? 2 : 1"
			:newUser="$store.getters.userPreferences.totalVisits == 1"
			@dismissed="$store.getters.global.showHelp = false"> -->
		<Help
			v-bind:show="$store.getters.global.showHelp"
			title="Tips & Tricks"
			:slides="1"
			:color="newUserHelp ? 'green' : 'invert'"
			:newUser="newUserHelp"
			:dismissText="newUserHelp ? 'Just Let Me Start' : 'Close Help'"
			:dismissIcon="newUserHelp ? 'far fa-thumbs-up' : 'far fa-times'"
			@dismissed="$store.getters.global.showHelp = false"
			@newUserViewed="$store.getters.userPreferences.viewed.animateIntro = true; newUserHelp = false;">
			
			<!-- 
				Welcome for new users
			 -->
			<template v-slot:newUser>
				<!-- New user message -->
				<div id="animateHelpNewUser">
					<!-- Floating Ghost -->
					<i class="fal fa-ghost" id="animateHelpGhost"></i>

					<div id="animateHelpBody">
						<h3>Create an Animation</h3>
						<p class="small padding-none ptop-sm">
							It looks like this is your first time here. You should be at least a little familiar with CSS @keyframe animations or it might be tricky for you.
						</p>
						<p class="small light padding-none ptop-xs pbottom-md">
							You can read some tips or load an example animation before you start.
						</p>
						<!-- Help & Tour -->
						<div class="flex flex-horizontal flex-around">
							<button class="button small transparent" @click="newUserHelp = false;">
								<i class="far fa-book-spells"></i>
								<span>See Some Tips</span>
							</button>
							<button class="button small transparent" @click="newUserPreset()">
								<i class="far fa-camera-movie"></i>
								<span>Load Example</span>
							</button>
						</div>
					</div>
				</div>
			</template>

			<!-- Help slide 1 -->
			<template v-slot:one>
				<!-- Help tips -->
				<div class="help-tips">
					<!-- Syntax tip -->
					<div class="tip">
						<i class="far fa-brackets-curly tip-icon"></i>
						<div class="tip-text">
							<span>If a property isn't working, make sure you have the correct syntax, and there's no target CSS overwriting it.</span>
						</div>
					</div>
					<!-- Property tip -->
					<div class="tip">
						<i class="far fa-badge-percent tip-icon"></i>
						<div class="tip-text">
							<span>If you use a property, make sure it has a value at every step - even if it's the same value.</span>
						</div>
					</div>
					<!-- Shorthand -->
					<div class="tip">
						<i class="far fa-spell-check tip-icon"></i>
						<div class="tip-text">
							<span>Many properties can accept multiple values. So <code>5px</code> would be valid for the <code>margin</code> property, and so would <code>5px 15px 25px 35px</code>.</span>
						</div>
					</div>
					<!-- More soon -->
					<div class="tip">
						<i class="far fa-sparkles tip-icon"></i>
						<div class="tip-text">
							<span>I'll be adding a better help section & tutorials soon.</span>
						</div>
					</div>
				</div>
			</template>

		</Help> <!-- End Help -->


	</div>
</template>

<script>
// Conponents
import Tooltip from "@/components/ui/Tooltip";
import Help from "@/components/ui/Help";

// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
import screenResizeMixin from "@/components/mixins/ui/screenResizeMixin.js";
// Keyboard shortcuts
import shortcut, { PRIMARY, SHIFT } from "@/components/mixins/keyboardShortcutsMixin.js";

// Data broken into separate file because it was long
import data from "@/views/apps/apps-data/animate.js";

export default {
	
	name: "animateApp",


	components: {
		Tooltip,
		Help,
	},

	mixins: [
		metaMixin,
		screenResizeMixin,
		preferencesMixin,

		// Save shortcut
		// Opens save window if no name, saves if name
		shortcut('s', PRIMARY, function(event) {
			// Prevent save event
			event.preventDefault();

			if(this.animationToSaveName){
				this.saveAnimation();
			}else{
				this.toggleOption('saveLoad');
				this.hello("Give your animation a name, then you can use the shortcut.", "far fa-save")
			}
		}),
		// Start/Stop animation shortcut
		shortcut('enter', function(event) {
			this.runAnimation();
		}),
		shortcut('enter', SHIFT, function(event) {
			this.pauseAnimation();
		}),
	],

	// External data
	data() {
		return data;
	},

	mounted() {
		let _this = this;

		_this.updateMeta("Animate | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")
		// If user has never visited this page, show them help w/new user message
		// After delay to wait for localstorage
		setTimeout(function(){
			if(!_this.$store.getters.userPreferences.viewed.animateIntro){
				_this.newUserHelp = true;
				_this.$store.getters.global.showHelp = true;
			}
		}, 400)
	},

	computed: {

		// Clean keyframes to generate output
		computedCSSOutput: function () {
			// Reference backdoor var so it recomputes when that changes.
			this.backdoor;

			let _this = this;
			let css = [];

			var copySteps = _.cloneDeep(_this.keyframes);

			for (var step in copySteps) {
				// transformProps
				delete copySteps[step]['transformProps']; 

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
			return _.orderBy(css, ['timelinePosition.left'], ['asc']);
			// return css;
		},
		// Get CSS as string from output
		rawOutputCSS: function () {
			// Reference backdoor var so it recomputes when that changes.
			this.backdoor;
			if(document.getElementById("outputCSS")){
				var fullCSSString = document.getElementById("outputCSS").innerHTML.toString().replace(/&nbsp;/g,'').replace(/(<([^>]+)>)/ig,"");
			}else{
				var fullCSSString = "";
			}

			// Return
			return fullCSSString;
		},
		// CSS for selected keyframe
		selectedKeyframeCSS: function () {
			// Reference backdoor var so it recomputes when that changes.
			this.backdoor;

			let _this = this;

			var currentFrame = _.cloneDeep(_this.keyframes[this.currentStep.left]);

			// transformProps
			delete currentFrame['transformProps']; 

			// Remove erased props
			for (var prop in currentFrame.properties) {
				// If prop doesn't have value, delete it
				if(!currentFrame.properties[prop]){
					delete currentFrame.properties[prop]; 
				}
			}

			// Return
			return currentFrame;
		},

	},

	watch: {
		
	},
	
	methods: {

		////////////////////////
		// Transform String  //
		//////////////////////
		// Make Transform String from transform props - called on change to a transform prop
		getTransformString: function(){

			// Shorthand transform props
			var props = this.keyframes[this.currentStep.left].transformProps;
			var keys = Object.keys(props);


			// Store props in array
			var transformArray = [];

			// loop through keys, get properties, format and add to array
			keys.forEach(function(prop) {
				if(props[prop]){
					transformArray.push(prop + "(" + props[prop] + ")");
				}
			});

			// Make string from array
			var string = transformArray.join(' ');

			// Save to keyframes
			this.keyframes[this.currentStep.left].properties.transform = string;

			// Save step
			this.saveStep();
		},

		////////////////////////
		// Step Functions
		///////////////////////
		// Save current step
		saveStep: function(){
			this.backdoor++;
		},

		// Save new step, duplicating last selected props
		newStep: function(){

			// Prev position and new/clicked pos
			var pos = this.timelinePosition.left;
			var oldPos = this.currentStep.left;

			// Round to 100
			if(parseFloat(pos) > 99.5){
				pos = "100%";
			}

			var propsToSave = _.cloneDeep(this.keyframes[oldPos]);
			propsToSave['timelinePosition']['left'] = pos;


			// Save changes to keyframes at new step 
			this.keyframes[pos] = propsToSave;
			this.currentStep.left = pos; 

			// Save step and calculate new output
			this.saveStep();

			// // No longer adding
			this.addingStep = false;
		},

		// Delete selected Step
		deleteStep: function(){

			var stepToDelete = parseFloat(this.currentStep.left);

			if(Object.keys(this.keyframes)[0]){
				if(stepToDelete == "0.0"){
					// Can't delete step at 0
					this.hello("You must have a step at 0%", "far fa-exclamation-triangle")
				}else{
					delete this.keyframes[stepToDelete]

					// Save step and calculate new output
					this.saveStep();
				}
				// Change to 0% step
				this.currentStep.left = Object.keys(this.keyframes)[0];
				
			}else{
				return;
			}
		},

		////////////////////////
		// Animation Functions
		///////////////////////
		// Play/stop animation
		runAnimation: function(){
			this.backdoor++;
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

		//////////////////////
		// Options toggles //
		////////////////////
		toggleOption: function(opt){

			// get local storage if that option is opened.
			if(opt == "saveLoad" && !this.options.saveLoad){
				this.loadAllSaved();
			}

			// If user clicked already open option, close it
			if(this.options[opt] == true){
				this.options[opt] = false;
			}else{
				// Set all false
				this.options = {
					output: false,
					saveLoad: false,
					editTarget: false,
				}

				// Then open clicked option
				this.options[opt] = true;
			}
		},


		////////////////////
		////////////////////
		// Save / Load
		////////////////////
		////////////////////
		// Reset everything - target styles, keyframes, select step 1
		resetEverything: function(){
			this.keyframes = {
				'0.0%': {
					"timelinePosition": {
						"left": "0.0%"
					},
					"transformProps": {
					},
					"properties": {
					}
				}
			};
			this.customTargetStyles = "#targetElement{\n    color:var(--text);\n    border-radius: 50%;\n    height: 100px;\n    width: 100px;\n    font-size: 65px;\n    transform-origin: center center;    \n}",
			this.customTargetCode = "<i class='far fa-ghost kft'></i>",
			this.currentStep.left = "0.0%"
			this.hello("Everything has been reset.", "far fa-skull-crossbones")
			this.options.saveLoad = false;
		},
		// Save to local storage
		saveAnimation: function(){
			var animationData = {
				date: new Date(),
				customTargetCode: this.customTargetCode,
				customTargetStyles: this.customTargetStyles,
				keyframes: this.keyframes,
				animationProperties: this.animationProperties,
			}
			var stringified = JSON.stringify(animationData)
			localStorage.setItem('animation_' + this.animationToSaveName.replace(/\s/g, ''), stringified);

			this.toast("Animation Saved", "Your animation has been saved into your browser's local storage.", "", "far fa-save");
			this.options.saveLoad = false;
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

			this.savedAnimations = values;
		},

		// Load previously saved animation
		loadAnimation: function(name){
			var animation = localStorage.getItem(name);

			var parsed = JSON.parse(animation)
			this.keyframes = parsed.keyframes;
			this.customTargetStyles = parsed.customTargetStyles;
			this.customTargetCode = parsed.customTargetCode;
			this.animationProperties = parsed.animationProperties;
			// Set name to overwrite
			this.animationToSaveName = name.substr(10);
			// // this.allProperties = animation;

			this.toast(name.substr(10) + " Loaded", "Your animation has been loaded.", "", "far fa-cloud-download");
			this.options.saveLoad = false;
		},
		// Delete saved animation
		deleteAnimationFromStorage: function(name){
			localStorage.removeItem(name);
			this.toast("Animation Deleted", name.substr(10) + " has been deleted from your saved animations.", "red", "far fa-trash-alt");
			this.options.saveLoad = false;
		},

		// Open preset
		openPreset: function(index){
			var preset = this.presetAnimations[index];

			// Set values
			this.keyframes = preset.keyframes;
			this.customTargetStyles = preset.targetStyles;
			this.animationProperties = preset.animationProperties;
			this.customTargetCode = "<i class='" + preset.targetClass + " kft'></i>";

			// Close tab, alert
			this.options.saveLoad = false;
			this.hello(preset.name + " is ready to play!", preset.targetClass)
		},

		// New user start with preset
		newUserPreset: function(){
			this.openPreset(0); 
			this.$store.getters.userPreferences.viewed.animateIntro = true; 
			this.newUserHelp = false;
			this.$store.getters.global.showHelp = false;
		},

		// Copy output to clipboard
		copyOutput: function(){
			// Create input element, append text, copy text, remove element
			var copyContent = document.getElementById('outputCSS').innerText;
			this.copyToClipboard("Your Animation CSS", copyContent)
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

		// Wrapper to split top (Stage/Properties) with Bottom (Timeline)
		#animateMain{
			flex-grow: 3;
			display: flex;
			justify-content: space-between;
			position: relative;
			overflow: auto;
			box-sizing: border-box;
			padding: 0 0;
			overflow: hidden;
			background-color: var(--background);

			#animateLeft{
				display: flex;
				flex-direction: column;
				flex-grow: 3;

				// Top bar - control buttons
				#animateTop{
					display: flex;
					justify-content: flex-start;
					border-bottom: var(--borderWidth) solid var(--border);
					width: 100%;
					background-color: var(--layer);

					button{
						border-radius: 0;
						border-left: none;
						border-top: none;
						border-bottom: none;

						&:last-child{
							margin-right: 0;
						}

						i{
							width: 16px;
						}

						// Increase size mobile
						@media (max-width: @screenMD) {
							height: 38px;
						}
					}

					// Spacer - grows empty space
					.flex-spacer{
						flex-grow: 3;
						@media (max-width: @screenSM) {
							display: none;
						}
					}

					// Editor button - only visible on mobile to toggle sidebar
					#mobilePropertyToggle{
						align-self: flex-end;
						border-left: var(--borderWidth) solid var(--border);
						width: 130px;
						display: none;

						@media (max-width: @screenMD) {
							display: block;
						}
						@media (max-width: @screenSM) {
							flex-grow: 3;
							border-left: none;
							width: auto;
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
					transition: var(--transition);
					width: 100%;
					padding: 0 0 40px 0;

					// Remove right padding on mobile
					@media (max-width: @screenMD) {
						padding-right: 0;
					}

					#targetStage{
						border-radius: var(--borderRadius);
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;

						// To flex align the target elementt center without effecting margin
						#targetCenterAlign{
							display: flex;
							justify-content: center;
							
							// Element that's being animated
							#targetElement{
								z-index: 3;
								transition: 0.2s cubic-bezier(0.5, 0.1, 0.8, 1);
								
								// Specific target element that it starts with
								.kft{
									display: flex;
									flex-direction: column;
									height: 100%;
									width: 100%;
									justify-content: center;
									text-align: center;
								}
							}
						}
					}
				}
			}

			// Right side
			#animateRight{
				
				///////////////////////////////
				//    Sidebar/Properties    //
				/////////////////////////////
			

				// Actual sidebar body
				#animateSidebar{
					width: 420px;
					background-color: var(--layer);
					height: 100%;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
					padding: 0 0;
					transition: var(--bezierTransition);
					z-index: 10;
					border-left: var(--borderWidth) solid var(--border);

					// Shrink a bit below XL
					@media (max-width: @screenXL) {
						width: 340px;
					}

					// Hide on mobile
					@media (max-width: @screenMD) {
						position: absolute;
						right: -375px;
						width: 350px;
						z-index: 50;
						height: calc(~'100% - 39px');
						margin-top: calc(~'0% + 39px');
						background-color: var(--transparent);
					}
					@media (max-width: @screenSM) {
						position: absolute;
						right: -100%;
						width: 80%;
					}

					&.toggled{
						right: 0;
						transition: var(--bezierTransition);
					}

					// Top of sidebar, title
					#animateSidebarTop{
						display: flex;
						width: 100%;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 15px 15px 15px 15px;
						letter-spacing: 0.3px;

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
							// border-bottom: var(--borderWidth) solid var(--border);
							transition: var(--transition);
							color: var(--text);

							span{
								text-decoration: underline;
							}

							i{
								position: relative;
								top: 2px;
								transform: scale(1.2);
								margin-right: 8px;
							}

							&:after{
								content: '.';
								font-size: 0px;
								display: block;
								flex-grow: 3;
								height: 1px;
								position: relative;
								top: 9px;
								margin-left: 2.5%;
								background: var(--border);
							}

							&:hover{
								transition: var(--transition);

								i.fa-chevron-circle-up,
								i.fa-chevron-circle-down{
									font-weight: 900;
								}
							}
						}

						// Collapsible group that holds related properties
						.property-group{
							box-sizing: border-box;
							padding: 0px 0 0 0;
							// overflow: hidden;

							// Adjust fields
							.field-set{
								padding: 6px 15px 6px 40px;
								box-sizing: border-box;
								// background-color: var(--text);
								display: flex;
								justify-content: space-between;
								width: 100%;

								// Adjust tooltip position
								.tooltip{
									margin-top: 8px;
								}

								label{
									flex-grow: 3;
									width: 100%;
									display: flex;
									flex-direction: column;
									justify-content: center;
								}

								.input-wrapper{
									width: 50%;
									min-width: 50%;

									input{
										width: 100%;
										font-family: var(--mono);
										font-size: 14px;
										letter-spacing: 0px;
									}
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
			background-color: var(--layer);
			border-top: var(--borderWidth) solid var(--border);
			height: fit-content;
			min-height: fit-content;

			// Add side padding on mobile
			@media (max-width: @screenSM) {
			}


			// Controls
			#animationControls{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				border-bottom: var(--borderWidth) solid var(--border);
				background-color: var(--layer);

				// Add and delete step buttons
				.steps{
					display: flex;
					// Button width
				}
				// Play/pause buttons
				.preview-button{
					display: flex;
					justify-content: flex-end;

					.stop-button{
						border-left: none;
					}
				}

				// Buttons
				.button{
					border-radius: 0;
					border-top: none;
					border-bottom: none;
				}

				// Timing inputs
				.timing{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					font-family: var(--systemFont);
					margin-right: 15px;
					flex-grow: 3;

					// Move timing to top on mobile
					@media (max-width: @screenMD) {
						order: -1;
						width: 100%;
						padding: 5px 0 12px 0;
						margin-right: 0;
						border-bottom: var(--borderWidth) solid var(--border);
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
						top: -1px;

						// Label hidden until hover
						label{
							font-size: 11.5px;
							letter-spacing: -0.2px;
							display: block;
							box-sizing: border-box;
							padding: 0 0px 0 0;
							color: var(--max);
							user-select: none;
							position: absolute;
							top: 38px;
							width: fit-content;
							white-space: pre;
							width: 100%;
							font-weight: 600;
							text-align: center;
							opacity: 0;
							transition: var(--transition);
							pointer-events: none;

							@media (max-width: @screenSM) {
								top: 32px;
							}
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
							color: var(--max);
							padding: 0;
							width: 100%;
							text-align: center;
							// text-decoration: underline;
							overflow: visible;
							text-overflow: ellipsis;
							border-bottom: 2px dotted var(--text);

							&:hover,
							&:focus{
								border-color: var(--border);
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
				border-radius: var(--borderRadius);
				box-sizing: border-box;
				position: relative;
				transition: 0s ease;
				border: var(--borderWidth) solid var(--border);
				width: 95%;
				margin: 15px 0 25px 2.5%;
				background-color: var(--background);


				@media (max-width: @screenMD) {
					width: 93%;
					margin: 15px 0 15px 3.5%;
				}
				@media (max-width: @screenSM) {
					width: 90%;
					margin: 15px 0 15px 5%;
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
						color: var(--background);
						justify-content: center;
						font-family: var(--systemFont);
						pointer-events: none;
					}
				}
				// Changes for new step
				// No pointer events
				.timeline-marker.new{
					display: none;
					background-color: var(--green);
					pointer-events: none;

					b{
						color: var(--black);
						background-color: var(--green);
					}
				}
				// Regular and current step
				.timeline-marker.step,
				.timeline-marker.current{
					z-index: 15;
					background-color: var(--text);

					b{
						background-color: var(--text);
						color: var(--background);
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
		padding: 0 20px 20px 0;
		font-size: 13px;
		line-height: 17px;
		overflow: auto;
		white-space: nowrap;
		font-family: var(--mono) !important;
		color: var(--white);
		font-weight: 500;

		span{
			line-height: 13px;
			letter-spacing: 0.3px;
		}

		span,div,p{
			// white-space: pre;
		}
		
		// B tags are comments
		b{
			font-weight: 600;
			color: var(--white);
			opacity: 0.5;
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



	/////////////////////
	//  Help Modal    //
	///////////////////
	
	#animateHelpNewUser{
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		height: 100%;

		#animateHelpGhost{
			animation: error-ghost 2s ease-in-out 0s infinite alternate none;
			font-size: 80px;
			text-align: center;
			margin: 2vh 0 25px 0;

			// Shrink a bit on mobile
			@media (max-width: @screenSM) {
				font-size: 65px;
				margin: 15px 0 35px 0;
			}
		}
		#animateHelpBody{
			margin-bottom: 2vh;

			h1,h2,h3,h4{
				text-align: center;
			}
			// Shrink margin on mobile
			@media (max-width: @screenSM) {
				margin: 0 0 15px 0;
			}
		}
	}

	/////////////////////
	//    Settings    //
	///////////////////
	// Toggle-able settings over stage
	.settings-display{
		display: flex;
		flex-direction: column;
		width: 400px;
		bottom: border-box;
		max-height: 90%;
		max-height: calc(~'100% - 50px');
		height: fit-content;
		background-color: var(--popup);
		padding: 15px;
		transform-origin: top center;
		border-radius: var(--borderRadius);
		box-sizing: border-box;
		position: absolute;
		top: 40px;
		left: 10px;
		overflow: auto;
		z-index: 55;
		border: var(--borderWidth) solid rgba(205,205,255,0.25) !important;

		// Full width mobile
		@media (max-width: @screenSM) {
			width: 90vw;
			min-width: 90vw;
			max-width: 90vw;
			width: calc(~'100vw - 20px');
			min-width: calc(~'100vw - 20px');
			max-width: calc(~'100vw - 20px');
		}

		label, h1, h2, h3, h4, h5, h6, p{
			color: var(--white);
		}

		
		// Textareas
		textarea,input{
			font-size: 14px;
			font-family: var(--mono);
			line-height: 15px;
		}
		textarea.small{
			min-height: 60px;
		}
		textarea.big{
			min-height: 160px;
		}

		.field{
			label small{
				margin: 4px 0 4px 0;
			}
		}


		// Change target element textarea to show non-editable targetElement wrapper
		.target-el-open,
		.target-el-close{
			position: relative;
			top: 30px;
			font-size: 14px;
			font-family: var(--mono);
			line-height: 15px;
			color: var(--black);
			opacity: 0.5;
			box-sizing: border-box;
			padding: 5px;
			user-select: none;
		}
		.target-el-open{
			margin-top: -24px;
		}
		.target-el-close{
			top: -15px;
			margin-top: -15px;
			background-color: transparent;
			border-top: none;
		}
		#customTarget{
			box-sizing: border-box;
			padding: 30px 10px 30px 30px;
			white-space: pre;
			min-height: 80px;
		}
	}



	// Preset animations for preview
	@keyframes preset-spooky {
		0.0%{
			transform: scale(1) translate(0, 0) skew(0deg);
		}
		5.1%{
			transform: scale(1) translate(0, 0) skew(-12deg);
		}
		39.9%{
			transform: scale(1) translate(30px, 0) skew(-5deg);
		}
		95.1%{
			transform: scale(1) translate(0, 0) skew(12deg);
		}
		99.6%{
			transform: scale(1) translate(0, 0) skew(0deg);
		}
		45.3%{
			transform: scale(1) translate(30px, -2px) skew(0deg);
		}
		50.3%{
			transform: scale(1) translate(30px, 0px) skew(0deg);
		}
		55.3%{
			transform: scale(1) translate(30px, -4px) skew(0deg);
		}
		60.3%{
			transform: scale(1) translate(30px, 0px) skew(5deg);
		}
	}

	@keyframes preset-heart {
		0.0%{
			transform: scale(1);
		}
		40.3%{
			transform: scale(1.35);
		}
		60.1%{
			transform: scale(1.15);
		}
		79.6%{
			transform: scale(1.35);
		}
		99.5%{
			transform: scale(1);
		}
		20.1%{
			transform: scale(1);
		}
	}

	@keyframes preset-jet {
		0.0%{
			transform: translate(0, 0) rotate(0deg) scale(1);
		}
		14.7%{
			transform: translate(30px, 0) rotate(0deg) scale(1);
		}
		99.7%{
			transform: translate(300px, -50px) rotate(-20deg) scale(0);
		}
		26.3%{
			transform: translate(300px, -50px) rotate(-20deg) scale(0);
		}
	}

	.preset-spooky:hover .preset-icon{
		animation: preset-spooky 6s ease 0s infinite normal forwards;
	}
	.preset-jet:hover .preset-icon{
		animation: preset-jet 4s linear 0s infinite normal forwards;
	}
	.preset-heart:hover .preset-icon{
		animation: preset-heart 2s ease 0s infinite normal forwards;
	}


</style>