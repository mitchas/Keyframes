<!--
	Animations App
-->

<template>
	<div class="fixed-page" id="animationsApp">

		<!-- Secondary nav / Toolbar -->
		<nav class="secondary-nav">

			<!-- Gap -->
			<div class="spacer"></div>

			<!-- Loop for other secondary buttons -->
			<button v-for="(button, key) in secondary_nav" :key="key" @click="toggleSidebar(button.id)" 
				:class="{'notification-dot': false}">
				<i :class="view_sidebar == button.id ? 'fas fa-times' : button.icon"></i>
				<span class="hint left">{{button.title}}</span>
			</button>
		</nav>



		<div class="app-layout">

			<!-- Main Center Stage -->
			<div class="app-stage" id="animationStage" :style="'background: ' + working.background + ' !important;'">

				<!-- Animation View -->
				<div id="animationView">


					<!-- Animation Target Element -->
					<div id="targetWrapper" v-html="working.targetHTML"></div>
					<!-- Target CSS -->
					<v-style>{{working.targetCSS}}</v-style>
					<!-- Conditional CSS to control animation -->
					<!-- Generated Animation code on page -->
					<v-style>{{getKeyframeCode}}</v-style>
					<!-- If Stopped, apply active step styles to target -->
					<v-style v-if="!running">{{activeStepStyles}}</v-style>
					<!-- If Running, add animation prop -->
					<v-style v-if="running">
						#target{
							animation: yourAnimation {{working.duration}}{{working.time_unit}} {{working.timing == "custom" ? working.custom_timing : working.timing}} {{working.delay}}{{working.time_unit}} {{working.loop ? 'infinite' : working.iterations}} {{working.direction}} {{working.fill}};
						}
					</v-style>
					<!-- If it's paused, add prop -->
					<v-style v-if="paused">
						#target{animation-play-state: paused;}
					</v-style>
					<!-- 3d Prespective -->
					<v-style v-if="working.has_3d">
						#targetWrapper{
							perspective-origin: {{working.perspective_origin || "center"}};
							perspective: {{working.perspective}};
						}
						#target{ 
							backface-visibility: {{working.backface ? "visible" : "hidden"}};
						}
					</v-style>
					
				</div>

				<!-- Animation Timeline -->
				<div id="animationBottom">

					<!-- Top timeline controls -->
					<div id="timelineControls">
						<!-- <h2>{{computedElapsedTime}}s</h2> -->
						<button class="button small mright-xs" @click="runAnimation()" :class="{'green': !running || paused, 'yellow': running && !paused }">
							<i :class="{'fas fa-circle-play': !running || paused, 'fas fa-circle-pause': running && !paused }"></i>
							<span v-if="!running || paused"> Play </span>
							<span v-else>Pause</span>
						</button>
						<button class="button red small mright-xs" @click="stopAnimation()" :disabled="!running">
							<i class="fas fa-stop"></i>
							<span>Stop</span>
						</button>
						<!-- Space Gap -->
						<div class="flex grow"></div>
						<!-- Delete Step -->
						<button class="button grey small mright-xs" @click="deleteStep()">
							<i class="fas fa-trash"></i>
							<span>Delete {{active_step}}%</span>
						</button>
						<!-- Add Step -->
						<button class="button small" @click="adding_step = !adding_step" :class="{'invert': !adding_step, 'red': adding_step}">
							<i :class="{'fas fa-plus-circle': !adding_step, 'fas fa-times-circle': adding_step}"></i>
							<span>{{adding_step ? "Cancel" : "Add Step"}}</span>
						</button>
					</div>

					<!-- Timeline wrapper and ticks -->
					<div id="timelineWrapper">

						<!-- New Step buttons -->
						<div id="timelinePositions" v-if="adding_step">
							<button class="pos" v-for="i in 101" :key="i" @click="addStep(i-1)"><b>{{i - 1}}</b></button>
						</div>

						<!-- Ticks / Measurements -->
						<div id="timelineTicks">
							<div class="tick" v-for="i in 21" :key="i"><b>{{(i*5) - 5}}%</b></div>
						</div>

						<!-- Timeline body -->
						<div id="timelineBody" @mousemove.self="adding_step && debounceNewStep()" @click.self="adding_step && addStep();">

							<!-- Scrubber -->
							<div id="scrubber" :class="{'playing': running, 'paused': paused}"></div>
							<v-style v-if="running">
								#scrubber{
									animation: scrubAnimation {{working.duration}}{{working.time_unit}} {{working.timing == "custom" ? working.custom_timing : working.timing}} {{working.delay}}{{working.time_unit}} {{working.loop ? 'infinite' : working.iterations}} {{working.direction}} {{working.fill}};
								}
							</v-style>
							<v-style v-if="paused">
								#scrubber{
									animation-play-state: paused;
								}
							</v-style>
							<!-- Step Markers -->
							<button class="timeline-marker" v-for="(value, key) in working.steps" :key="key" :style="'left: ' + key + '%'" @click="active_step = key" :class="{'active': active_step == key}">
								<b>{{key}}</b>
							</button>

						</div>
					</div>

				</div>


			</div>


			<!-- Sidebar -->
			<div class="app-sidebar" :class="{'expanded': view_sidebar != null}">

				<transition-group name="basic">

					<!-- Animation Control -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'edit'" :key="0">

						<h3 class="flex between">
							<div class="pleft-sm">Edit Step</div>
							<div class="bolder text-primary text-large pright-sm">{{active_step}}%</div>
						</h3>
						<!-- Advanced Mode -->
						<div v-if="working.advanced_mode" class="padded flex grow" id="advancedEditor">
							<div class="tag inline small red">Advanced Mode</div>
							<textarea v-model="working.steps[active_step].css" class="pre code" :placeholder="'Write your CSS here \nfor step ' + active_step + '%'"></textarea>
						</div>
						<!-- Basic Mode -->
						<div class="app-sidebar-content-scroll padded" v-else>
							<div v-for="(field, prop) in css_props" :key="prop">
								<!-- Headers -->
								<h4 v-if="field.header" :class="{'ts' : prop != 'Transform', 'ntb': prop == 'Transform'}">{{prop}}</h4>
								<div class="prop__gap" v-if="field.header"></div>
								<!-- Fields -->
								<div v-else class="input-group max-width-small mbottom-xs mtop-xxs" :class="{'hidden': field.type == '3d' && !working.has_3d || field.type == '2d' && working.has_3d}">
									<span class="input-group-label small" :for="'anEdt' + prop">
										<Tooltip :link="field.link" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square" v-if="field.tooltip">
											<div>{{field.tooltip}}</div>
											<code v-if="field.example">{{field.example}}</code>
										</Tooltip>
										{{prop}}
									</span>
									<input type="text" :id="'anEdt' + prop" :placeholder="field.placeholder" v-model="working.steps[active_step].values[prop]"/>
								</div>
							</div>

							<!-- Spacer -->
							<div class="mtop-xl"></div>

						</div>
					</div>

					<!-- Animation Control -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'control'" :key="1">
						<h3>Animation Control</h3>

						<div class="app-sidebar-content-scroll padded">
							<!-- Duration -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="anDuration">
									Duration
									<Tooltip :link="'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration'" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
										<div>How long the animation will take from start to finish. (In {{working.time_unit == 's' ? "seconds" : "milliseconds"}})</div>
									</Tooltip>
								</span>
								<input type="number" id="anDuration" placeholder="2" v-model="working.duration"/>
							</div>
							<!-- Timing -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="anTiming">
									Timing
									<Tooltip :link="'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function'" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
										How an animation progresses through the duration of each cycle
									</Tooltip>
								</span>
								<div class="aselect">
									<select id="anTiming" v-model="working.timing">
										<option value="linear">Linear</option>
										<option value="ease">Ease</option>
										<option value="ease-in">Ease-In</option>
										<option value="ease-out">Ease-Out</option>
										<option value="ease-in-out">Ease-In-Out</option>
										<option value="step-start">Step-Start</option>
										<option value="step-End">Step-End</option>
										<option value="custom">Custom</option>
									</select>
								</div>
							</div>
							<div class="pleft-md" v-if="working.timing == 'custom'">
								<input type="text" class="mtop-xs" placeholder="cubic-bezier(n,n,n,n)" v-model="custom_timing"/>
							</div>

							<!-- Delay -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="anDelay">
									Delay
									<Tooltip :link="'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay'" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
										<div>Delay before the animation. (In {{working.time_unit == 's' ? "seconds" : "milliseconds"}})</div>
									</Tooltip>
								</span>
								<input type="number" id="anDelay" placeholder="2" v-model="working.delay"/>
							</div>
							<!-- Iterations -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="anInterations">
									Iterations
									<Tooltip :link="'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count'" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
										Number of times the animation will run.
									</Tooltip>
								</span>
								<input type="text" id="anInterations" placeholder="1" v-model="working.iterations" :disabled="working.loop"/>
							</div>
							<!-- Loop -->
							<div class="flex mtop-xs pleft-md end">
								<label class="vertical mright-sm" for="anLoop">Infinite / Loop</label>
								<input type="checkbox" id="anLoop" class="toggle yes-no" v-model="working.loop"/>
							</div>

							<!-- Direction -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="anDirection">
									Direction
									<Tooltip :link="'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction'" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
										The direction the animation runs.
									</Tooltip>
								</span>
								<div class="aselect">
									<select id="anDirection" v-model="working.direction">
										<option value="normal">Normal</option>
										<option value="reverse">Reverse</option>
										<option value="alternate">Alternate</option>
										<option value="alternate-reverse">Alternate-Reverse</option>
									</select>
								</div>
							</div>
							<!-- Fill Mode -->
							<div class="input-group max-width-small mtop-sm mbottom-xl">
								<span class="input-group-label small" for="anFill">
									Fill Mode
									<Tooltip :link="'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode'" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
										Sets how a CSS animation applies styles to its target before and after its execution.
									</Tooltip>
								</span>
								<div class="aselect">
									<select id="anFill" v-model="working.fill">
										<option value="none">None</option>
										<option value="forwards">Forwards</option>
										<option value="backwards">Backwards</option>
										<option value="both">Both</option>
									</select>
								</div>
							</div>

						</div>

					</div>

					<!-- Target Element -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'target'" :key="2">
						<h3>Target Element</h3>

						<div class="app-sidebar-content-scroll padded">
							<!-- Page BG Color -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="bgcolIn">Background</span>
								<input type="text" id="bgcolIn" v-model="working.background" placeholder="#FFFFFF"/>
							</div>
							<p class="small mtop-sm">
								You can change the HTML and CSS for the animation target element, just make sure the element(s) you want the animation to run on to use the <code>#target</code> ID. 
							</p>
							<!-- Target HTML -->
							<label class="mtop-sm">Target Element HTML</label>
							<textarea v-model="working.targetHTML" class="text-small code mtop-xxs pre"></textarea>
							<!-- Target CSS -->
							<label class="mtop-md">Target Element CSS</label>
							<textarea v-model="working.targetCSS" class="text-small code mtop-xxs tall mbottom-xl pre"></textarea>
						</div>
					</div>

					<!-- Get CSS -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'code'" :key="3">
						<h3>CSS @Keyframes</h3>
						<div class="app-sidebar-content-scroll">

							<div class="padded">
								<textarea :value="getKeyframeCode" class="pre text-small code mtop-sm" id="keyframeCSS" readonly></textarea>
								<button class="button small mtop-xs mbottom-md" @click="copyExportToClipboard('keyframeCSS')">
									<i class="fas fa-copy"></i>
									<span>Copy</span>
								</button>
							</div>

							<h4>Animation Property</h4>
							
							<div class="padded">
								<textarea :value="getAnimationCode" class="pre text-small code mtop-sm" id="animationCSS" readonly></textarea>
								<button class="button small mtop-xs" @click="copyExportToClipboard('animationCSS')">
									<i class="fas fa-copy"></i>
									<span>Copy</span>
								</button>
							</div>

						</div>
						
					</div>
					
					<!-- Save -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'save'" :key="4">
						<h3>Save</h3>
						<!-- Save Form -->
						<form @submit.prevent="saveAnimation" class="padded mbottom-md mtop-sm">
							<div class="button-input small">
								<input type="text" id="saveNameIn" placeholder="Name" v-model="name_to_save"/>
								<button class="button" :disabled="!name_to_save.length" :class="{'green' : editing_stored_key != null}">
									<i class="fas fa-floppy-disk"></i>
									<span>{{editing_stored_key != null ? "Save Changes" : "Save New"}}</span>
								</button>
							</div>
							<!-- Save as new -->
							<button type="button" v-if="editing_stored_key != null" @click="editing_stored_key = null" class="text-smaller align-center ptop-xxs text-primary">Or save as new Animation.</button>
						</form>

						<!-- Load existing -->
						<h3>Saved Animations</h3>
						<!-- Scrollable saved list -->
						<transition name="basicup">
							<div class="app-sidebar-content-scroll pbottom-lg ptop-sm" v-if="!$store.getters['Hold/isLoading']">
								<!-- Stored animations from local storage, loop to create display -->
									<div v-for="(animation, key) in stored_animations" class="saved-list mbottom-xs padded" :key="key" :class="{'active' : editing_stored_key == key}">
									<!-- Animation Info & Controls -->
									<div class="sl__bar">
										<button class="sl__i" @click="loadAnimation(animation, key)">
											<b>{{animation.name}}</b>
											{{$date(animation.saved).format("MMMM D YYYY - h:mma")}}
										</button>
										<!-- Controls -->
										<button class="sl__a red" title="Delete Animation" @click="$store.getters['User/preferences'].confirm_action ? confirm_delete_animation = key : deleteAnimation(key)"><i class="fas fa-trash-alt"></i></button>
									</div>
								</div>

								<!-- No stored animations -->
								<div class="padded mtop-xs" v-if="stored_animations && !Object.keys(stored_animations).length">
									<Callout icon="far fa-empty-set" size="small" color="red">
										<p class="small">You haven't saved anything yet.</p>
									</Callout>
								</div>	

							</div>
						</transition>


					</div>

					<!-- More -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'settings'" :key="5">
						<div class="app-sidebar-content-scroll">
							<h3>More</h3>

							<div class="padded mbottom-sm">
								<!-- Time Unit -->
								<div class="input-group max-width-small mtop-sm">
									<span class="input-group-label small" for="anUnits">Time Unit</span>
									<div class="aselect">
										<select v-model="working.time_unit" id="anUnit">
											<option value="s">Seconds</option>
											<option value="ms">Milliseconds</option>
										</select>
									</div>
								</div>

								<!-- Advanced Mode -->
								<div class="flex mtop-sm between">
									<label class="vertical" for="advancedTog">Advanced Mode</label>
									<input type="checkbox" id="advancedTog" class="toggle on-off" v-model="working.advanced_mode"/>
								</div>
								<p class="small">
									This will remove the default properties and inputs and allow you to write your own CSS at each step.
								</p>

								<!-- Enable 3d -->
								<div class="flex mtop-sm between">
									<label class="vertical" for="3dtog">Enable 3D</label>
									<input type="checkbox" id="3dtog" class="toggle on-off" v-model="working.has_3d"/>
								</div>
								<!-- 3d Prespective -->
								<transition name="basic">
									<div v-if="working.has_3d" class="mbottom-md">
										<!-- Perspective -->
										<div class="input-group max-width-small mtop-xs">
											<span class="input-group-label small" for="3dpers">
												<Tooltip link="https://developer.mozilla.org/en-US/docs/Web/CSS/perspective" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
													<div>When using 3d transformations, the perspective sets the distance between the z=0 plane and the user.</div>
												</Tooltip>
												Perspective
											</span>
											<input type="text" id="3dpers" placeholder="500px" v-model="working.perspective"/>
										</div>
										<!-- Origin -->
										<div class="input-group max-width-small mtop-xs">
											<span class="input-group-label small" for="3dpersOr">
												<Tooltip link="https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
													<div>Determines the position at which the viewer is looking.</div>
												</Tooltip>
												Origin
											</span>
											<input type="text" id="3dpersOr" placeholder="center" v-model="working.perspective_origin"/>
										</div>
										<!-- Backface -->
										<div class="flex mtop-sm between">
											<label class="vertical" for="backfacetog">
												<div class="flex">
													<Tooltip link="https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility" position="right" linkText="View on MDN" color="grey" icon="fas fa-info-square">
														<div>Sets whether the back face of an element is visible when turned towards the user.</div>
													</Tooltip>
													<div class="mleft-xs pleft-xxs">Backface Visibility</div>
												</div>
											</label>
											<input type="checkbox" id="backfacetog" class="toggle on-off" v-model="working.backface"/>
										</div>
									</div>
								</transition>

							</div>

							<h4>Demo Animations</h4>
							<div class="padded mbottom-sm">
								<p class="small">Loading a demo animation will clear your current animation.</p>
								<!-- Demos -->
								<div id="demoAnimations">
									
									<button class="demo-preview" @click="loadDemo('pulse')">
										<div class="demo-stage"><i class="fas fa-bullseye demo-pulse"></i></div>
										<label>Pulse</label>
									</button>
									<button class="demo-preview" @click="loadDemo('bounce')">
										<div class="demo-stage"><i class="fas fa-balloon demo-bounce"></i></div>
										<label>Bounce</label>
									</button>
									<button class="demo-preview" @click="loadDemo('spooky')">
										<div class="demo-stage"><i class="fas fa-ghost demo-spooky"></i></div>
										<label>Spooky</label>
									</button>
									<button class="demo-preview" @click="loadDemo('spin')">
										<div class="demo-stage"><i class="fas fa-cube demo-3d"></i></div>
										<label>3D Spin</label>
									</button>

								</div>
							</div>


							<!-- Gap -->
							<div class="mtop-md"></div>

							<h4>Danger</h4>
							<!-- Reset Animation -->
							<button class="button mtop-sm mbottom-md margin-auto block" @click="resetDefault()" :class="{'red' : resetting_default, 'grey': !resetting_default}">
								<i :class="{'far fa-exclamation-circle' : resetting_default, 'far fa-eraser' : !resetting_default}"></i>
								<span>{{resetting_default ? "Again to Confirm" : "Reset Animation"}}</span>
							</button>

							<h4>Keyboard Shortcuts</h4>
							<div class="padded mtop-sm mbottom-md">
								<div class="keyboard-shortcut mbottom-sm">
									<b @click="greet()">shift</b><i class="fas fa-plus"></i><b @click="greet()">enter</b><span>Play / Pause Animation</span>
								</div>
								<div class="keyboard-shortcut">
									<b @click="greet()">esc</b><span>Stop Animation</span>
								</div>
							</div>


							<!-- Help -->
							<h4>Help</h4>
							<p class="small padded mtop-sm">
								This is a visual tool to generate the CSS for a @keyframe animation using a video editor-like timeline. To use it, you should be at least somewhat familiar with how CSS @keyframe animations work.
							</p>
							<p class="small padded mtop-sm">
								You add steps, then modify CSS properties at each step. The animation runs and transitions between the property changes at each step.
							</p>
							<p class="small padded mtop-sm">
								For example, if you set the <code>color</code> to <code>red</code> at the 0% step, and change it to <code>blue</code> at the 100% step, the animation target will transition smoothly from red to blue when the animation runs.
							</p>
							<p class="small padded mtop-sm">
								You can control the animation speed and other properties in the Animation Control <i class="fas fa-dial"></i> tab.
							</p>
							<p class="small padded mtop-sm">
								Customize the target (element being animated) in the Target Element <i class="fas fa-bullseye"></i> tab. Keep in mind that @keyframe animations can be used on any (or multiple) elements - so editing the target is really just to preview it here.
							</p>
							<p class="small padded mtop-sm">
								Get the CSS output to add to your project in the CSS Output <i class="fas fa-code"></i> tab.
							</p>
							<a class="block mtop-md mbottom-lg text-small padded" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" target="_blank" title="MDN Docs for @keyframe animations">
								<i class="fas fa-external-link mright-xs"></i>
								<span>Learn about CSS @keyframes on MDN</span>
							</a>
						</div>
					</div>
				</transition-group>


			</div>

		</div>

		<!-- Confirm delete things -->
		<Confirm v-if="confirm_delete_animation != null" title="Are you sure?" icon="fas fa-exclamation-circle" color="red" confirmText="Delete It"  confirmIcon="fas fa-trash-alt" cancelText="No, Cancel" v-on:confirmFalse="confirm_delete_animation = null" v-on:confirmTrue="deleteAnimation(confirm_delete_animation);">
			<p class="no-padding">
				You are about to delete your saved animation <b>{{stored_animations[confirm_delete_animation].name}}</b>. <small class="block">This can <b>not</b> be undone.</small>
			</p>
		</Confirm>

	</div>
</template>

<script>
import _ from "lodash";

// Components
import Callout from "@/components/ui/Common/Callout";
import Tooltip from "@/components/ui/Common/Tooltip";
import Confirm from "@/components/ui/Modals/Confirm";

// Keyboard Shortcuts
import shortcut, { SHIFT } from "@/components/mixins/keyboard.js";


export default {
	name: "Animations",

	components: {
		Callout,
		Tooltip,
		Confirm,
	},

	mixins: [
		// Play/pause with enter
		shortcut("enter", SHIFT, function() {
			this.runAnimation();
		}),
		// Stop with escape
		shortcut("escape", function() {
			this.running = false;
			this.paused = false;
		}),

	],

	data() {
		return {
			// Controls
			running: false,
			paused: false,
			active_step: 0,
			adding_step: false,
			// Active Animation
			working: {
				background: "#FFFFFF",
				targetHTML: "<div id=\"target\">\n    <i class=\"fas fa-bullseye\">\n</div>",
				targetCSS: "#target{\n    display: block; \n    color: #0047DB; \n    font-size: 2em;\n}",
				time_unit: "s",
				advanced_mode: false,
				// 3d
				has_3d: false,
				perspective: "500px",
				backface: true,
				perspective_origin: "center",
				// Timing
				duration: "5",
				timing: "linear",
				custom_timing: "",
				delay: "0",
				iterations: 1,
				loop: true,
				direction: "normal",
				fill: "none",
				// Steps
				steps: {
					0: {
						"values": {},
						"css": "",
					},
					100: {
						"values": {},
						"css": "",
					}
				},
				
			},

			// UI
			view_sidebar: "edit",
			// Settings
			resetting_default: false,
			// Saving
			name_to_save: "",
			editing_stored_key: null,
			confirm_delete_animation: null, // key of stored animation
			stored_animations: [],

			// Loop Stuff
			// Secondary nav buttons
			secondary_nav: [
				{title: "Edit Properties", id: "edit",  icon: "fas fa-pen-to-square"},
				{title: "Animation Control", id: "control",  icon: "fas fa-dial"},
				{title: "Target Element", id: "target",  icon: "fas fa-bullseye"},
				{title: "Get CSS", id: "code",  icon: "fas fa-code"},
				{title: "Save / Load", id: "save",  icon: "fas fa-floppy-disk"},
				{title: "Settings", id: "settings",  icon: "fas fa-bars"},
			],
			// Non-Advanced mode CSS Props
			css_props: {
				"Transform":{
					header: true,
					icon: "fas fa-times",
				},
				"transform-origin": {
					placeholder: "center 15%",
					tooltip: "Position the transformation originates on the element.",
					example: "<x-offset> <y-offset*> <z-offset*>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin",
				},
				"scale": {
					type: "2d",
					placeholder: "1.25",
					tooltip: "Resizes the element on a 2d plane.",
					example: "<scaleX>, <scaleY*>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale",
				},
				"scale3d": {
					type: "3d",
					placeholder: "1.25, 1.5, 0.5",
					tooltip: "Resizes the element on a 3d plane.",
					example: "<scaleX>, <scaleY>, <scaleZ>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale3d",
				},
				"translate": {
					type: "2d",
					placeholder: "10%, 10%",
					tooltip: "Repositions an element in the horizontal and/or vertical directions.",
					example: "<x-offset>, <y-offset*>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/translate",
				},
				"translate3d": {
					type: "3d",
					placeholder: "15px, 25px, -12px",
					tooltip: "Repositions an element in 3D space.",
					example: "translate3d(tx, ty, tz)",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d",
				},
				"rotate": {
					type: "2d",
					placeholder: "90deg",
					tooltip: "Rotates element around a fixed point on a 2d plane.",
					example: "<value>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate",
				},
				"rotate3d": {
					type: "3d",
					placeholder: "1, 1, 1, 45deg",
					tooltip: "Rotates an element around a fixed axis in 3D space.",
					example: "<x>, <y>, <z>, <a>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d",
				},
				"skew": {
					type: "2d",
					placeholder: "15deg, 25deg",
					tooltip: "Skews the element on a 2d plane.",
					example: "<ax>, <ay>",
					link: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew",
				},
				"Design":{
					header: true,
					icon: "fas fa-times",
				},
				"color": {
					placeholder: "red",
				},
				"background": {
					placeholder: "green",
				},
				"opacity": {
					placeholder: "0.5",
				},
				"font-size": {
					placeholder: "1em",
				},
				"border": {
					placeholder: "1px solid black",
				},
				"border-radius": {
					placeholder: "5px",
				},
				"outline": {
					placeholder: "5px dashed blue",
				},
				"box-shadow": {
					placeholder: "0px 15px 25px -4px rgba(150, 150, 150, 0.24)",
				},
				// Size and position
				"Size, Shape, & Position":{
					header: true,
					icon: "fas fa-times",
				},
				"width": {
					placeholder: "100px",
				},
				"height": {
					placeholder: "50px",
				},
				"margin": {
					placeholder: "10px 10px",
				},
				"padding": {
					placeholder: "25px 15px 25px 0px",
				},
				"top": {
					placeholder: "10px",
				},
				"right": {
					placeholder: "0px",
				},
				"bottom": {
					placeholder: "1em",
				},
				"left": {
					placeholder: "100%",
				},

				
			},

		};
	},

	computed: {
		activeStepStyles(){
			// Advanced Mode
			if(this.working.advanced_mode){
				var code = "#target{" + this.working.steps[this.active_step].css +  "}";
				return  code;
			}else{
				// Basic Mode
				var code = "#target{";
				var transform = "";
				var scale3d = "";
				for (const [property, value] of Object.entries(this.working.steps[this.active_step].values)) {
					// Transform props
					if(value){
						var transformProps = ["rotate", "rotate3d", "translate", "translate3d", "scale", "scale3d", "skew"];
						if(transformProps.includes(property)){
							if(property == "scale3d"){
								scale3d = "scale3d(" + value.replace(/[;]+/g, "").trim()+ ")";
							}else{
								transform = transform + " " + property + "(" + value.replace(/[;]+/g, "").trim()+ ")";
							}

						// Regular props
						}else{
							code = code + property + ": " + value.replace(/[;]+/g, "").trim() + ";";
						}
					}
				}
			}
			// Add transform if it has changed
			if(transform || scale3d){
				code = code + "        transform:";
				if(scale3d){
					code = code + " " + scale3d;
				}
				code = code + " " + transform + ";\n";
			}
			code = code + "}";
			return code;
		},

		// Generated @keyframe animation
		getKeyframeCode(){
			// Advanced Mode
			if(this.working.advanced_mode){
				var code = "@keyframes yourAnimation{\n";
				for (const [step, properties] of Object.entries(this.working.steps)) {
					// Open Step Percent Line
					code = code + "    " + step + "% {\n";
					var lines = properties.css.split("\n");
					for (const line of lines) {
						code = code + "        " + line + "\n";
					}
					code = code + "    }\n";
				}
				code = code + "}";
				return code;
			}else{
				// Basic Mode
				var code = "@keyframes yourAnimation{\n";
				for (const [step, properties] of Object.entries(this.working.steps)) {

					// Special transform line
					var transform = "";
					var scale3d = "";

					// Open Step Percent Line
					code = code + "    " + step + "% {\n";
					// Loop for each property
					for (const [prop, value] of Object.entries(properties.values)) {
						if(value){
							// Transform props
							// 3d Props
							var transformProps = ["rotate", "rotate3d", "translate", "translate3d", "scale", "scale3d", "skew"];
							if(prop == "transform-origin"){
								null;
							}else if(transformProps.includes(prop)){
								if(prop == "scale3d"){
									scale3d = "scale3d(" + value.replace(/[;]+/g, "").trim()+ ")";
								}else{
									transform = transform + " " + prop + "(" + value.replace(/[;]+/g, "").trim()+ ")";
								}

							// Regular props
							}else{
								code = code + "        " + prop + ": " + value.replace(/[;]+/g, "").trim() + ";\n";
							}
						}
					}
					// Add transform if it has changed
					if(transform || scale3d){
						code = code + "        transform:";
						if(scale3d){
							code = code + " " + scale3d;
						}
						code = code + " " + transform + ";\n";
					}
					// Close Step
					code = code + "    }\n";
				}
				// Close Keyframe
				code = code + "}";
				
				return code;
			}
		},

		// Animation Property
		getAnimationCode(){
			var string = "#yourTargetElement{\n    animation: yourAnimation " + this.working.duration + this.working.time_unit + " ";
			if(this.working.timing == "custom"){
				string = string + this.working.custom_timing + " ";
			}else{
				string = string + this.working.timing + " ";
			}
			string = string + this.working.delay + this.working.time_unit + " ";
			if(this.working.loop){
				string = string + "infinite ";
			}else{
				string = string + this.working.iterations + " ";
			}
			string = string + this.working.direction + " " + this.working.fill + ";\n";

			if(this.working.has_3d){
				string = string + "\n\n    /* If you used any 3D transforms, include this */\n";
				string = string + "    perspective: " + this.working.perspective + ";\n";
				string = string + "    backface-visibility: " + (this.working.backface ? "visible" : "hidden") + ";\n";
			}

			string = string + "}";

			// Parent styles
			if(this.working.has_3d){
				string = string + "\n\n/* For 3D transformations, the target's *parent* element needs these properties: */\n";
				string = string + "#targetParentElement{\n";
				string = string + "    perspective: " + this.working.perspective + ";\n";
				string = string + "    perspective-origin: " + this.working.perspective_origin + ";\n";
				string = string + "}";
			}
			return string;
		},
	},

	watch: {
	},
	
	
	mounted() {
		// Get stored animations from store/localstorage
		if(this.$store.getters["User/apps"].animations.data["saved"]){
			this.stored_animations = this.$store.getters["User/apps"].animations.data["saved"];
		}
	},
	created() {
	},

	beforeDestroy(){
	},
	
	methods: {

		// Toggles sidebar with button id
		toggleSidebar: function(name){
			if(this.view_sidebar == name){
				this.view_sidebar = null;
			}else{
				this.view_sidebar = name;
			}
		},

		runAnimation: function(){
			if(!this.running){
				this.running = true;
				this.paused = false;
			}
			else if(this.running && this.paused){
				this.paused = false;
			}
			else if(this.running && !this.paused){
				this.paused = true;
			}
		},
		stopAnimation: function(){
			this.running = false; 
			this.paused = false;
		},
		// Resets to default
		resetDefault: function(){
			let _this = this;

			if(this.resetting_default){
				this.resetting_default = false;
				this.hello("Poof!", "fas fa-wand-magic-sparkles", "yellow");
				this.working = {
					background: "#FFFFFF",
					targetHTML: "<div id=\"target\">\n    <i class=\"fas fa-bullseye\">\n</div>",
					targetCSS: "#target{\n    display: block; \n    color: #0047DB; \n    font-size: 2em;\n}",
					time_unit: "s",
					// 3d
					has_3d: false,
					perspective: "500px",
					backface: true,
					perspective_origin: "center",
					// Timing
					duration: "5s",
					timing: "linear",
					custom_timing: "",
					delay: "0s",
					iterations: 1,
					loop: true,
					direction: "normal",
					fill: "none",
					// Steps
					steps: {
						0: {
							"values": {},
							"css": "",
						},
						100: {
							"values": {},
							"css": "",
						}
					},
				};
			}else{
				this.resetting_default = true;
				setTimeout(function(){
					_this.resetting_default = false;
				}, 5000);
			}
		},	

		addStep: function(newStepPos){
			if(!this.working.steps[newStepPos]){
				var newStepData = {
					"values": {},
					"css": "",
				};
				this.$set(this.working.steps, newStepPos, newStepData);
				this.adding_step = false;
				this.active_step = newStepPos;
			}else{
				this.adding_step = false;
				this.active_step = newStepPos;
			}
		},
		// Remove step at active_step, select previous
		deleteStep: function(){
			// Can't delete step at 0 or 100
			if(this.active_step == 0 || this.active_step == 100){
				this.hello("Can't delete that one", "far fa-hand", "yellow");
			}else{
				delete this.working.steps[this.active_step];
				this.active_step = 0;
			}
		},


		// Copy export code to clipboard
		copyExportToClipboard: function(element){
			var el = "cssCodeExport";
			if(element){
				el = element;
			}
			var range = document.createRange();
			range.selectNode(document.getElementById(el));
			window.getSelection().removeAllRanges(); // clear current selection
			window.getSelection().addRange(range); // to select text
			document.execCommand("copy");
			window.getSelection().removeAllRanges();// to deselect
			this.hello("Code Copied!", "fas fa-copy", "green");
		},

		// Save / Load
		// Save Animation to local storage
		saveAnimation: function(){
			var dataToSave = {
				name: this.name_to_save,
				saved: this.$date(),
				data:JSON.parse(JSON.stringify(this.working)),
			};

			this.hello(this.name_to_save + " Saved!", "fas fa-check-circle", "green");

			// Save as new
			if(this.editing_stored_key == null){
				this.stored_animations.push(dataToSave);
				this.editing_stored_key = this.stored_animations.length - 1;
			}else{ // Changes
				this.$set(this.stored_animations, this.editing_stored_key, dataToSave);
			}

			this.syncStoredAnimations();

		},
		// Load animation from storage
		loadAnimation: function(animation, key){
			this.working = JSON.parse(JSON.stringify(animation.data));
			this.name_to_save = JSON.parse(JSON.stringify(animation.name));
			this.hello(this.name_to_save + " loaded!", "fas fa-check-circle", "green");
			this.editing_stored_key = key;
		},
		// Load animation from storage
		deleteAnimation: function(key){
			this.stored_animations.splice(key, 1);
			this.syncStoredAnimations();
			if(key == this.editing_stored_key){
				this.editing_stored_key = null;
			}
			// Close modal
			this.confirm_delete_animation = null;
		},
		// Sync with local storage
		syncStoredAnimations: function(){
			this.$store.commit("User/SET_APP_DATA_FIELD", {app: "animations", key: "saved", value: JSON.parse(JSON.stringify(this.stored_animations)) });
			this.$store.dispatch("User/DEBOUNCE_SAVE_APP_DATA");
		},

		// Actions that need confirming
		handleConfirmModal: function(){
			var data = this.confirm_modal;
			if(data[0] == "animation"){
				this.deleteAnimation(data[1]);
			}
			this.confirm_delete_animation = null;
		},

		// Load demo animations
		loadDemo: function(name){
			var demo = "";
			if(name == "pulse"){
				demo = {"background":"#FFFFFF","targetHTML":"<div id=\"target\">\n    <i class=\"fas fa-bullseye\">\n</div>","targetCSS":"#target{\n    display: block; \n    color: #0047DB; \n    font-size: 2em;\n}","time_unit":"s","has_3d":false,"perspective":"500px","backface":true,"perspective_origin":"center","duration":"0.75","timing":"ease-in-out","custom_timing":"","delay":"0","iterations":1,"loop":true,"direction":"alternate","fill":"none","steps":{"0":{"values":{"scale":"1"},"css":""},"100":{"values":{"scale":"2"},"css":""}}};
			}else if(name == "bounce"){
				demo = {"background":"#FFFFFF","targetHTML":"<div id=\"target\">\n    <i class=\"fas fa-balloon\">\n</div>","targetCSS":"#target{\n    display: block; \n    color: #FF6168; \n    font-size: 2em;\n}","time_unit":"s","has_3d":false,"perspective":"500px","backface":true,"perspective_origin":"center","duration":"3","timing":"ease-in-out","custom_timing":"","delay":"0","iterations":1,"loop":true,"direction":"normal","fill":"none","steps":{"0":{"values":{"translate":"0,0"},"css":""},"25":{"values":{"translate":"0,-20px","rotate":"5deg","transform-origin":"center center"},"css":""},"50":{"values":{"translate":"0,-5px"},"css":""},"75":{"values":{"translate":"0,-15px","rotate":"-5deg"},"css":""},"100":{"values":{"translate":"0,0"},"css":""}}};
			}else if(name == "spooky"){
				demo = {"background":"#FFFFFF","targetHTML":"<div id=\"target\">\n    <i class=\"fas fa-ghost\">\n</div>","targetCSS":"#target{\n    display: block; \n    color: #FF6A3E; \n    font-size: 2em;\n}","time_unit":"s","has_3d":false,"perspective":"500px","backface":true,"perspective_origin":"center","duration":"6","timing":"ease-in-out","custom_timing":"","delay":"0","iterations":1,"loop":true,"direction":"normal","fill":"none","steps":{"0":{"values":{},"css":""},"2":{"values":{"skew":"-6deg, -6deg","rotate":"6deg"},"css":""},"28":{"values":{"translate":"50px, 0","skew":"-6deg, -6deg","rotate":"6deg"},"css":""},"29":{"values":{"rotate":"-6deg","skew":"6deg, 6deg","translate":"30px, 0"},"css":""},"70":{"values":{"translate":"-40px, 0","rotate":"-6deg","skew":"6deg, 6deg"},"css":""},"71":{"values":{"rotate":"6deg","skew":"-6deg, -6deg","translate":"-20px, 0"},"css":""},"96":{"values":{"skew":"-6deg, -6deg","rotate":"6deg","translate":"0,0"},"css":""},"100":{"values":{},"css":""}}};
			}else if(name == "spin"){
				demo = {"background":"#FFFFFF","targetHTML":"<div id=\"target\">\n    <i class=\"fas fa-cube\">\n</div>","targetCSS":"#target{\n    display: block; \n    color: #0047DB; \n    font-size: 2em;\n}","time_unit":"s","has_3d":true,"perspective":"500px","backface":true,"perspective_origin":"center","duration":"3","timing":"linear","custom_timing":"","delay":"0","iterations":1,"loop":true,"direction":"normal","fill":"none","steps":{"0":{"values":{"transform-origin":"center center","rotate3d":"1,1,1,0deg"},"css":""},"100":{"values":{"rotate3d":"1,1,1,360deg"},"css":""}}};
			}

			this.working = JSON.parse(JSON.stringify(demo));
		}


	}
};

</script>


<style lang="scss">

#animationsApp{
	display: flex;
	flex-direction: column;
}


#animationStage{
	flex-direction: column;
	flex-wrap: nowrap;

	#animationView{
		display: flex;
		flex-grow: 3;
		justify-content: center;
		flex-direction: column;
		justify-content: center;

		#targetWrapper{
			display: block;
			margin: 0 auto;
			color: var(--primary);
			font-size: 32px;
		}
	}
}

// Advanced code editor
#advancedEditor{
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding-top: 15px;
	padding-bottom: 15px;
	position: relative;

	.tag{
		position: absolute;
		top: 25px;
		right: 25px;
	}

	textarea{
		flex-grow: 3;
		padding-top: 40px;
	}
}

// Bottom bar
#animationBottom{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100px;
	background-color: var(--background);
	border-top: 1px solid var(--border);
	height: 164px;
	width: 100%;
	box-sizing: border-box;

	#timelineControls{
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px 10px 0 15px;

		h2{
			margin: 0 10px 0 0;
			padding: 0;
			display: flex;
			flex-direction: column;
			line-height: 1em;
			justify-content: center;
			font-size: 0.9em;
			font-family: var(--monospace);
			width: 50px;
		}

		button{
			@media (max-width: $screenSM) {
				padding-left: 8px;
				padding-right: 8px;
				font-size: 0.8em;
			}
		}
	}

	#timelineWrapper{
		width: 100%;
		position: relative;

		// Loop for 100 buttons - shown when adding new step
		#timelinePositions{
			display: flex;
			position: absolute;
			z-index: 101;
			width: 100%;
			width: calc(100% - 22px);
			margin: 0 11px 5px 11px;
			height: 80px;

			.pos{
				margin: 0;
				padding: 0;
				flex-grow: 3;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: relative;
				overflow: visible;
				margin-top: 1px;
				width: 8px;
				height: 80px;
				background-color: var(--green);
				opacity: 0;
				border-radius: calc(var(--borderRadius) / 3);
				transition: 0s;

				b{
					position: absolute;
					left: 50%;
					top: 50%;
					background-color: var(--green);
					margin-left: -11px;
					margin-top: -11px;
					width: 22px;
					height: 22px;
					border-radius: calc(var(--borderRadius) / 2);
					text-align: center;
					color: var(--background);
					font-size: 0.8em;
					line-height: 22px;
					font-weight: 700;
					z-index: 102;
					overflow: visible;
					pointer-events: none;
				}

				&:hover,
				&:focus{
					cursor: copy;
					opacity: 1;
				}
			}

		}


		// Ticks / Measurements
		#timelineTicks{
			margin: 0;
			box-sizing: border-box;
			max-width: 100%;
			margin: 0 15px 5px 15px;
			width: 100%;
			width: calc(100% - 30px);
			justify-content: space-between;
			display: flex;
			position: absolute;
			bottom:12px;
			pointer-events: none;
			z-index: 0;

			.tick{
				background-color: var(--borderFade);
				height: 10px;
				width: 2px;
				font-size: 0.6em;
				position: relative;
				b{
					position: absolute;
					width: 20px;
					text-align: center;
					left: 50%;
					bottom: -14px;
					margin-left: -10px;
					color: var(--textFade);
				}
				&:nth-child(odd){
					height: 20px;
				}
				&:nth-child(even){
					margin-top: 10px;
					b{
						display: none;
					}
				}
				&:nth-child(1),
				&:last-child{
					opacity: 0;
				}
			}
		}

		#timelineBody{
			display: block;
			border: 1px solid var(--border);
			background-color: var(--layer);
			height: 80px;
			border-radius: var(--borderRadius);
			margin: 0 15px 26px 15px;
			position: relative;

			// Scrubber
			#scrubber{
				width: 4px;
				height: 70px;
				background-color: var(--red);
				position: absolute;
				margin-top: 5px;
				top: 0;
				left: 0%;
				border-radius: var(--borderRadius);
				z-index: 100;
				margin-left: -2px;
			}

			.timeline-marker{
				width: 8px;
				height: 60px;
				background-color: var(--text);
				position: absolute;
				top: 10px;
				left: 10%;
				border-radius: calc(var(--borderRadius) / 3);
				z-index: 50;
				box-shadow: var(--shadow);
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				transition: var(--transition);
				padding: 0;
				margin: 0 0 0 -4px;
				font-family: var(--sans);

				b{
					background-color: var(--text);
					margin-left: -7px;
					width: 22px;
					height: 22px;
					border-radius: calc(var(--borderRadius) / 2);
					text-align: center;
					color: var(--background);
					font-size: 0.7em;
					line-height: 22px;
					font-weight: 700;
				}

				&.active{
					background-color: var(--primary);
					b{
						background-color: var(--primary);
					}
				}

				&:hover{
					height: 70px;
					top: 5px;
					cursor: pointer;
				}
			}
		}
	}
}

// Scrubber Animation
@keyframes scrubAnimation {
    0%{
		left: 0%;
    }
    100%{
		left: 100%;
    }
}

// Gap between property headers and inputs
.prop__gap{
	height: 15px;
	width: 100%;
}


// Demo Animations
#demoAnimations{
	display: flex;
	flex-wrap: wrap;
	gap: 14px 4%;

	.demo-preview{
		flex-grow: 3;
		background-color: var(--layer);
		height: 100px;
		width: 46%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10px;
		border: 1px solid var(--borderFade);
		border-radius: var(--borderRadius);
		text-align: center;
		margin: 0;
		padding: 0;

		.demo-stage{
			flex-grow: 3;
			display: flex;
			text-align: center;
			flex-direction: column;
			justify-content: center;
			font-size: 2.5em;
			width: 100%;

			i{
				animation-play-state: paused;
			}
		}
		label{
			text-align: center;
			width: 100%;
		}

		// Hover
		&:hover,
		&:focus{
			cursor: pointer;
			border-color: var(--border);

			.demo-stage i{
				animation-play-state: running;
			}
		}
	}
}
// Demo Animations
.demo-pulse{
	    animation: demoPulse 0.75s ease-in-out  0s infinite alternate none;
}
.demo-bounce{
    animation: demoBounce 3s ease-in-out  0s infinite normal none;
}
.demo-spooky{
    animation: demoGhost 6s ease-in-out  0s infinite normal none;
}
.demo-3d{
    animation: demo3d 3s linear  0s infinite normal none;
}

@keyframes demoPulse{
    0% {
        transform:  scale(0.75);
    }
    100% {
        transform:  scale(1.2);
    }
}
@keyframes demoBounce{
    0% {
        transform:  translate(0,5px);
    }
    25% {
        transform:  translate(0,-15px) rotate(5deg);
    }
    50% {
        transform:  translate(0,-0px);
    }
    75% {
        transform:  translate(0,-10px) rotate(-5deg);
    }
    100% {
        transform:  translate(0,5px);
    }
}
@keyframes demoGhost{
    0% {
    }
    2% {
        transform:  skew(-6deg, -6deg) rotate(6deg);
    }
    28% {
        transform:  translate(50px, 0) skew(-6deg, -6deg) rotate(6deg);
    }
    29% {
        transform:  rotate(-6deg) skew(6deg, 6deg) translate(30px, 0);
    }
    70% {
        transform:  translate(-40px, 0) rotate(-6deg) skew(6deg, 6deg);
    }
    71% {
        transform:  rotate(6deg) skew(-6deg, -6deg) translate(-20px, 0);
    }
    96% {
        transform:  skew(-6deg, -6deg) rotate(6deg) translate(0,0);
    }
    100% {
    }
}
@keyframes demo3d{
    0% {
        transform:  rotate3d(1,1,1,0deg);
    }
    100% {
        transform:  rotate3d(1,1,1,360deg);
    }
}




</style>
