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
// 			viewOutput
// 			viewSaveLoad
// 			editTarget
// 				All three are for top tab controls - hides the others, shows selected.
// 			saveAnimation
// 				Saves animation to local storage
// 			loadAllSaved
// 				loads local storage and gets items w/prefix animation_
// 			loadAnimation
// 				Loads selected animation from local storage into editor
// 			deleteAnimationFromStorage
// 				deleted selected animation from local storage
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
					<button id="showSaveLoadButton" aria-label="Save or Load Animation" class="button small" @click="viewSaveLoad()" v-bind:class="[showSaveLoad ? 'red' : 'invert']">
						<i v-bind:class="{'fas fa-save': !showSaveLoad, 'fas fa-times-circle': showSaveLoad}"></i>
						<span>Save/Load</span>
					</button>
					<!-- Edit Target -->
					<button id="showEditTargetButton" aria-label="Edit Target Element" class="button small" @click="editTarget()" v-bind:class="[showEditTarget ? 'red' : 'yellow']">
						<i v-bind:class="{'fas fa-bullseye': !showEditTarget, 'fas fa-times-circle': showEditTarget}"></i>
						<span>Target</span>
					</button>
					<!-- Show output -->
					<button id="showOutputButton" aria-label="Show Output CSS" class="button small" @click="viewOutput()" v-bind:class="[showOutput ? 'red' : 'green']">
						<i v-bind:class="{'fas fa-brackets-curly': !showOutput, 'fas fa-times-circle': showOutput}"></i>
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
				<!--  show/hide with  showSaveLoad -->
				<transition name="fromtop">
					<div class="settings-display" v-if="showSaveLoad">
						<!-- Save current animation -->
						<div class="field">
							<label for="newAnimationSaveName">
								Save your Animation
								<small class="block">You can save your animation configuration and come back to it later</small>
							</label>
							<!-- animation name -->
							<input id="newAnimationSaveName" aria-label="Save as Name" type="text" v-model="animationToSaveName" maxlength="12" placeholder="MyAnimation"/>
							<button aria-label="Save Animation" class="button blue small mtop-xs" @click="saveAnimation()">
								<i class="far fa-save"></i>
								<span>Save</span>
							</button>
						</div>
						<!-- Saved animations -->
						<div class="field mtop-sm">
							<label>
								Load a Saved Animation
								<small v-if="!savedAnimations.length" class="block">You don't have any saved animations yet</small>
							</label>
							<div class="saved-list">
								<div class="saved-item" v-for="(name, index) in savedAnimations" :key="index">
									<i class="far fa-times" @click.self.prevent="deleteAnimationFromStorage(name)"></i>
									<span @click="loadAnimation(name)">{{name.substr(10)}}</span>
								</div>
							</div>
						</div>
						
					</div>
				</transition>
				<!--  Edit Target -->
				<!--  show/hide with showEditTarget -->
				<transition name="fromtop">
					<div class="settings-display" v-if="showEditTarget">
						<!-- Custom Target -->
						<div class="field">
							<label for="customTarget">
								Target Element
								<small class="block">Change the element you're animating</small>
							</label>
							<!-- target html -->
							<textarea v-model="customTargetCode" id="customTarget" class="mbottom-sm code small"></textarea>
						</div>
						<!-- Custom Target CSS -->
						<div class="field">
							<label for="customTargetCSS">
								Target CSS
								<small class="block">Modify the target Element's CSS</small>
							</label>
							<!-- target css -->
							<textarea class="code big" v-model="customTargetStyles"></textarea>
						</div>
					</div>
				</transition>
				<!--  CSS output -->
				<!--  show/hide with  showOutput -->
				<transition name="fromtop">
					<div class="settings-display" v-show="showOutput">
						<!-- Output CSS -->
						<pre id="outputCSS">
							<!-- 
								///////////////////////////
								CSS output
								///////////////////////////
							-->
							<b>/* Copy this @keyframes block to your CSS*/</b>
							<!-- Keyframe definition block -->
							<span>@keyframes yourAnimation &#123;</span>
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

							<!-- <b>/* Copy this @keyframes block to your CSS*/</b>

							@keyframes yourAnimation &#123;
							<span v-for="(step, index) in computedCSSOutput" v-bind:key="index">
								<span class="ltab-1">{{step.timelinePosition.left}}&#123;</span>
									<div v-for="(prop, index) in step.properties" v-bind:key="index" class="ltab-2">{{index.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()}}: {{prop}};</div>
								<span class="ltab-1">&#125;</span>
							</span>
							&#125;

							<b>/* Add the animation: property to whichever element you want to animate */</b>
							#elementToAnimate&#123;
								<span class="ltab-1">animation: yourAnimation {{animationProperties.duration}} {{animationProperties.timing}}  {{animationProperties.delay}} {{animationProperties.iterations}}  {{animationProperties.direction}}  {{animationProperties.fillMode}};</span>
							&#125; -->



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
				<div id="animateSidebar" v-bind:class="{'toggled': togglePropSidebar}">
					<!-- Top of sidebar - 50px height to match buttons on left -->
					<h4 id="animateSidebarTop">
						<span>CSS Properties</span> 
						<span>{{roundValue(currentStep.left)}}%</span>
					</h4>
					<div id="animateSidebarProperties">

						<!-- 
							2d Transform
						-->
						<button class="property-header" @click="propertiesToggles.transform = !propertiesToggles.transform" v-bind:class="{'active':propertiesToggles.transform}">
							<i v-bind:class="propertiesToggles.transform == 1 ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
							<span>Transform</span>
							<i class="mleft-xs far fa-expand-arrows"></i>
						</button>
						<!-- Transform fields -->
						<transition name="basic">
							<div class="property-group" v-if="propertiesToggles.transform">
								<!-- Transform Origin -->
								<div class="field-set">
									<label>Transform Origin</label>
									<div class="input-wrapper">
										<input type="text" id="transformOrigin" placeholder="bottom left" v-model="keyframes[currentStep.left].properties.transformOrigin" @input="saveStep()" maxlength="22">
									</div>
								</div>
								<!-- Rotate -->
								<div class="field-set">
									<label>Rotate</label>
									<div class="input-wrapper">
										<input type="text" id="transformRotate" placeholder="45deg" v-model="keyframes[currentStep.left].transformProps.rotate" @input="getTransformString();" maxlength="10">
									</div>
								</div>
								<!-- Scale -->
								<div class="field-set">
									<label>Scale</label>
									<div class="input-wrapper">
										<input type="text" id="transformScale" placeholder="1.5" v-model="keyframes[currentStep.left].transformProps.scale" @input="getTransformString();" maxlength="6">
									</div>
								</div>
								<!-- Translate -->
								<div class="field-set">
									<label>Translate</label>
									<div class="input-wrapper">
										<input type="text" id="transformTranslate" placeholder="50px, 100px" v-model="keyframes[currentStep.left].transformProps.translate" @input="getTransformString();" maxlength="12">
									</div>
								</div>
								<!-- Skew -->
								<div class="field-set">
									<label>Skew</label>
									<div class="input-wrapper">
										<input type="text" id="transformSkew" placeholder="-45deg" v-model="keyframes[currentStep.left].transformProps.skew" @input="getTransformString();">
									</div>
								</div>
							</div>
						</transition> <!-- End transform: -->
						<!-- 
							3d Transform
						-->
						<button class="property-header" @click="propertiesToggles.transform3d = !propertiesToggles.transform3d" v-bind:class="{'active':propertiesToggles.transform3d}">
							<i v-bind:class="propertiesToggles.transform3d == 1 ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
							<span>3d Transform</span>
							<i class="mleft-xs far fa-cube"></i>
						</button>
						<!-- 3dTransform fields -->
						<transition name="basic">
							<div class="property-group" v-if="propertiesToggles.transform3d">
								<!-- Perspective -->
								<div class="field-set">
									<label>Perspective</label>
									<div class="input-wrapper">
										<input type="text" id="perspective" placeholder="500px" v-model="perspective" @input="saveStep()" maxlength="22">
									</div>
								</div>
								<!-- Translate3d -->
								<div class="field-set">
									<label>Translate3d</label>
									<div class="input-wrapper">
										<input type="text" id="translate3d" placeholder="42px, -62px, -155px" v-model="keyframes[currentStep.left].transformProps.translate3d" @input="getTransformString();">
									</div>
								</div>
								<!-- scale3d -->
								<div class="field-set">
									<label>Scale3d</label>
									<div class="input-wrapper">
										<input type="text" id="scale3d" placeholder="1, 2, 5" v-model="keyframes[currentStep.left].transformProps.scale3d" @input="getTransformString();">
									</div>
								</div>
								<!-- rotate3d -->
								<div class="field-set">
									<label>Rotate3d</label>
									<div class="input-wrapper">
										<input type="text" id="rotate3d" placeholder="0, 1, 1, 45deg" v-model="keyframes[currentStep.left].transformProps.rotate3d" @input="getTransformString();">
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
							<i class="mleft-xs far fa-tint"></i>
						</button>
						<!-- Colors & Text Fields-->
						<transition name="basic">
							<div class="property-group" v-if="propertiesToggles.colors">
								<!-- Background -->
								<div class="field-set">
									<label>Background</label>
									<div class="input-wrapper">
										<input type="text" placeholder="red" v-model="keyframes[currentStep.left].properties.background" @input="saveStep()">
									</div>
								</div>
								<!-- Opacity -->
								<div class="field-set">
									<label>Opacity</label>
									<div class="input-wrapper">
										<input type="text" placeholder="0.5" v-model="keyframes[currentStep.left].properties.opacity" @input="saveStep()">
									</div>
								</div>
								<!-- Color (Text) -->
								<div class="field-set">
									<label>Color (Text)</label>
									<div class="input-wrapper">
										<input type="text" placeholder="#0000FF" v-model="keyframes[currentStep.left].properties.color" @input="saveStep()">
									</div>
								</div>
								<!-- FontSize -->
								<div class="field-set">
									<label>Font Size</label>
									<div class="input-wrapper">
										<input type="text" placeholder="14px" v-model="keyframes[currentStep.left].properties.fontSize" @input="saveStep()">
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
							<i class="mleft-xs far fa-sort-size-up"></i>
						</button>
						<!-- Sizing and spacing -->
						<transition name="basic">
							<div class="property-group" v-if="propertiesToggles.sizing">
								<!-- Width -->
								<div class="field-set">
									<label>Width</label>
									<div class="input-wrapper">
										<input type="text" placeholder="100px" v-model="keyframes[currentStep.left].properties.width" @input="saveStep()">
									</div>
								</div>
								<!-- Height -->
								<div class="field-set">
									<label>Height</label>
									<div class="input-wrapper">
										<input type="text" placeholder="100px" v-model="keyframes[currentStep.left].properties.height" @input="saveStep()">
									</div>
								</div>
								<!-- Margin -->
								<div class="field-set">
									<label>Margin</label>
									<div class="input-wrapper">
										<input type="text" placeholder="15px 15px" v-model="keyframes[currentStep.left].properties.margin" @input="saveStep()">
									</div>
								</div>
								<!-- Padding -->
								<div class="field-set">
									<label>Padding</label>
									<div class="input-wrapper">
										<input type="text" placeholder="10px 0 0 0" v-model="keyframes[currentStep.left].properties.padding" @input="saveStep()">
									</div>
								</div>
							</div>
						</transition> <!-- End Sizing & Spacing -->

						<!-- 
							Positioning
						-->
						<button class="property-header" @click="propertiesToggles.position = !propertiesToggles.position" v-bind:class="{'active':propertiesToggles.position}">
							<i v-bind:class="propertiesToggles.position ? 'far fa-chevron-circle-up' : 'far fa-chevron-circle-down'"></i>
							<span>Position</span>
							<i class="mleft-xs far fa-arrow-to-right"></i>
						</button>
						<!-- position -->
						<transition name="basic">
							<div class="property-group" v-if="propertiesToggles.position">
								<!-- Top -->
								<div class="field-set">
									<label>Top</label>
									<div class="input-wrapper">
										<input type="text" placeholder="15px" v-model="keyframes[currentStep.left].properties.top" @input="saveStep()">
									</div>
								</div>
								<!-- Right -->
								<div class="field-set">
									<label>Right</label>
									<div class="input-wrapper">
										<input type="text" placeholder="50%" v-model="keyframes[currentStep.left].properties.right" @input="saveStep()">
									</div>
								</div>
								<!-- Bottom -->
								<div class="field-set">
									<label>Bottom</label>
									<div class="input-wrapper">
										<input type="text" placeholder="10vh" v-model="keyframes[currentStep.left].properties.bottom" @input="saveStep()">
									</div>
								</div>
								<!-- Left -->
								<div class="field-set">
									<label>Left</label>
									<div class="input-wrapper">
										<input type="text" placeholder="25px" v-model="keyframes[currentStep.left].properties.left" @input="saveStep()">
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
							<i class="mleft-xs fas fa-border-style-alt"></i>
						</button>
						<!-- Borders -->
						<transition name="basic">
							<div class="property-group" v-if="propertiesToggles.borders">
								<!-- Border -->
								<div class="field-set">
									<label>Border</label>
									<div class="input-wrapper">
										<input type="text" placeholder="1px solid red" v-model="keyframes[currentStep.left].properties.border" @input="saveStep()">
									</div>
								</div>
								<!-- Border Radius -->
								<div class="field-set">
									<label>Border Radius</label>
									<div class="input-wrapper">
										<input type="text" placeholder="50%" v-model="keyframes[currentStep.left].properties.borderRadius" @input="saveStep()">
									</div>
								</div>
								<!-- Box Shadow -->
								<div class="field-set">
									<label>Box Shadow</label>
									<div class="input-wrapper">
										<input type="text" placeholder="5px 5px 10px 5px rgba(0,0,0,0.2)" v-model="keyframes[currentStep.left].properties.boxShadow" @input="saveStep()">
									</div>
								</div>
								<!-- Outline -->
								<div class="field-set">
									<label>Outline</label>
									<div class="input-wrapper">
										<input type="text" placeholder="2px solid rgba(0,0,0,0.2)" v-model="keyframes[currentStep.left].properties.outline" @input="saveStep()">
									</div>
								</div>
							</div>
						</transition>

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
					<button aria-label="Delete current step" class="button red" @click="deleteStep()" v-if="Object.keys(this.keyframes)[1] && currentStep.left != '0.0'">
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
				animation: animationTicker {{animationProperties.duration}} {{animationProperties.timing}} {{animationProperties.delay}} {{animationProperties.iterations}} {{animationProperties.direction}} {{animationProperties.fillMode}};
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
				transform3d: false,
				colors: false,
				sizing: false,
				position: false,
				borders: false,
			},
			// Prop sidebar hides on mobile
			togglePropSidebar: false,
			// Perspective for 3d transformations
			perspective: '',
			// Show Output modal or not
			showOutput: false,
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
			customTargetStyles: "#targetElement{\n   display: inline-flex;\n    flex-direction: column;\n    justify-content: center;\n    width: 80px;\n    height: 80px;\n    background-color: #0868FE;\n    color: #FFFFFF;\n    text-align: center;\n    border-radius: 50%;\n    font-size: 42px;\n    position: absolute;\n    transition: 0.5s ease;\n}",
			customTargetCode: "<i class='fal fa-ufo'></i>",
			// customTargetCode: "<i class='fal fa-alien-monster'></i>",
			// Animation name to save
			animationToSaveName: null,
			// Previously saved animations
			savedAnimations: null,
			// Selected step position
			currentStep: {
				left: "0.0%",
			},
			// Hover position on timeline
			timelinePosition: {
				left: "0.0%"
			},

			// Keyframes
			// Array of all steps and props
			keyframes: {
				'0.0%': {
					"timelinePosition": {
						"left": "0.0%"
					},
					"transformProps": {
					},
					"properties": {
					}
				}
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
			// Holds all css at each step
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
			return css;
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

			var propsToSave = _.cloneDeep(this.keyframes[oldPos]);
			propsToSave['timelinePosition']['left'] = pos;

			console.log(propsToSave)

			// Save changes to keyframes at new step 
			this.keyframes[pos] = propsToSave;
			this.currentStep.left = pos; 

			console.log(this.keyframes)

			// // No longer adding
			this.addingStep = false;
		},

		// Delete selected Step
		deleteStep: function(){

			var stepToDelete = this.currentStep.left;

			if(Object.keys(this.keyframes)[0]){
				if(stepToDelete == "0.0"){
					// Can't delete step at 0
					console.log("Cannot delete 0% step.")
				}else{
					delete this.keyframes[stepToDelete]
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
			var animationData = {
				date: new Date(),
				customTargetCode: this.customTargetCode,
				customTargetStyles: this.customTargetStyles,
				keyframes: this.keyframes
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
			this.keyframes = parsed.keyframes;
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
			this.copyToClipboard("Output CSS", copyContent)
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
					border-bottom: 1px solid var(--border);
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
						border-left: 1px solid var(--border);
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
						border-radius: var(--borderRadiusSmall);
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
								// box-shadow: var(--shadow);
								z-index: 3;
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
					transition: var(--transitionFast);
					z-index: 10;
					border-left: 1px solid var(--border);

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
						height: calc(~'100% - 31px');
						margin-top: calc(~'0% + 31px');
						background-color: var(--transparent);
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
							overflow: hidden;

							// Adjust fields
							.field-set{
								padding: 6px 15px 6px 40px;
								box-sizing: border-box;
								// background-color: var(--text);
								display: flex;
								justify-content: space-between;
								width: 100%;

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
			border-top: 1px solid var(--border);
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
				border-bottom: 1px solid var(--border);
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
						border-bottom: 1px solid var(--border);
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
				border-radius: 3px;
				box-sizing: border-box;
				position: relative;
				transition: 0s ease;
				border: 1px solid var(--border);
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
						color: var(--white);
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
						color: var(--white);
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
		line-height: 16px;
		overflow: auto;
		white-space: nowrap;
		font-family: var(--mono) !important;
		color: var(--white);
		font-weight: 600;

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
		background-color: var(--black);
		padding: 15px;
		transform-origin: top center;
		border-radius: 3px;
		box-shadow: var(--shadow);
		box-sizing: border-box;
		position: absolute;
		top: 40px;
		left: 10px;
		overflow: auto;
		z-index: 55;
		border: 1px solid rgba(205,205,255,0.25) !important;

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
			background-color: var(--background) !important;
			line-height: 15px;
			border: 1px solid rgba(205,205,255,0.25) !important;
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
	}


</style>