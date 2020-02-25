<template>
	<div id="animateApp">

		<!-- HeaderBar -->
		<div id="animateTop">
			<!-- left siide, export, settings, etc. -->
			<div class="left">
				<button aria-label="Save Step" class="ui-button" @click="saveStep(5)">
					<i class="far fa-save"></i>
					<span>Save Step</span>
				</button>
				<button aria-label="Save Step" class="ui-button" @click="saveStep(6)">
					<i class="far fa-save"></i>
					<span>Save Step</span>
				</button>
				<button aria-label="Adjust Stage" class="ui-button">
					<i class="far fa-adjust"></i>
					<span>Adjust Stage</span>
				</button>
				<button aria-label="Show Output CSS" class="ui-button">
					<i class="far fa-file-code"></i>
					<span>Show Output CSS</span>
				</button>
			</div>
			<!-- right side - info, tips, etc. -->
			<div class="right">
				<div class="keyframe-data">
					Properties at 0%
				</div>
			</div>
		</div>
		
		<!-- Main stage with animated element -->
		<div id="animateMain">
			<div id="animateStage" v-bind:class="{'tabs-hidden': cssTab == 0}">
				<span id="targetElement" v-bind:style="targetCSS">Hello</span>
				<!-- <span id="targetElement" :style="fullCSS"></span> -->
			</div>
			<!-- Element property editor -->
			<div id="elementProperties">
				
				<div class="side-tab-display">
					<div class="side-tabs">
						<button class="tab" @click="cssTab = 1" v-bind:class="{'active':cssTab==1}">
							<i class="far fa-external-link-alt"></i>
						</button>
						<button class="tab" @click="cssTab = 2" v-bind:class="{'active':cssTab==2}">
							<i class="far fa-pencil-paintbrush"></i>
						</button>
						<button class="tab" @click="cssTab = 3" v-bind:class="{'active':cssTab==4}">
							<i class="far fa-expand-arrows"></i>
						</button>
						<button class="tab" @click="cssTab = 4" v-bind:class="{'active':cssTab==5}">
							<i class="far fa-border-style"></i>
						</button>
					</div>
					<!-- ////////////
						Transform 
					/////////////// -->
					<form class="tab-content" v-bind:class="{'visible': cssTab == 1}" @keyup="updateTransform">
						<!-- Close tab -->
						<button class="close-tab" @click="cssTab = 0">
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
								<input type="text" placeholder="180deg" v-model.trim="transform.rotate">
							</div>
						</div>
						<!-- Scale -->
						<div class="field-set">
							<label>Scale</label>
							<div class="input-wrapper">
								<input type="text" placeholder="1.5" v-model="transform.scale">
							</div>
						</div>
						<!-- TranslateX -->
						<div class="field-set">
							<label>TranslateX</label>
							<div class="input-wrapper">
								<input type="text" placeholder="100px" v-model.trim="transform.translateX">
							</div>
						</div>
						<!-- TranslateY -->
						<div class="field-set">
							<label>TranslateY</label>
							<div class="input-wrapper">
								<input type="text" placeholder="-20%" v-model.trim="transform.translateY">
							</div>
						</div>
						<!-- SkewX -->
						<div class="field-set">
							<label>SkewX</label>
							<div class="input-wrapper">
								<input type="text" placeholder="15deg" v-model.trim="transform.skewX">
							</div>
						</div>
						<!-- SkewY -->
						<div class="field-set">
							<label>SkewY</label>
							<div class="input-wrapper">
								<input type="text" placeholder="-45deg" v-model.trim="transform.skewY">
							</div>
						</div>
						<!-- Transform Origin -->
						<div class="field-set">
							<label>Transform Origin</label>
							<div class="input-wrapper">
								<input type="text" placeholder="50% 50%" v-model="transform.transformOrigin">
							</div>
						</div>
					</form>
					<!-- ////////////
						Colors & Fonts 
					/////////////// -->
					<div class="tab-content" v-bind:class="{'visible': cssTab == 2}">
						<!-- Close tab -->
						<button class="close-tab" @click="cssTab = 0">
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
								<input type="text" placeholder="red" v-model.trim="targetCSS.background">
							</div>
						</div>
						<!-- Opacity -->
						<div class="field-set">
							<label>Opacity</label>
							<div class="input-wrapper">
								<input type="text" placeholder="0.5" v-model.trim="targetCSS.opacity">
							</div>
						</div>
						<!-- Color (Text) -->
						<div class="field-set">
							<label>Color (Text)</label>
							<div class="input-wrapper">
								<input type="text" placeholder="#0000FF" v-model.trim="targetCSS.color">
							</div>
						</div>
						<!-- FontSize -->
						<div class="field-set">
							<label>Font Size</label>
							<div class="input-wrapper">
								<input type="text" placeholder="14px" v-model.trim="targetCSS.fontSize">
							</div>
						</div>
					</div>
					<!-- ////////////
						Sizing and Spacing 
					/////////////// -->
					<div class="tab-content" v-bind:class="{'visible': cssTab == 3}">
						<!-- Close tab -->
						<button class="close-tab" @click="cssTab = 0">
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
								<input type="text" placeholder="100px" v-model.trim="targetCSS.width">
							</div>
						</div>
						<!-- Max Width -->
						<div class="field-set">
							<label>Max-Width</label>
							<div class="input-wrapper">
								<input type="text" placeholder="50px" v-model.trim="targetCSS.maxWidth">
							</div>
						</div>
						<!-- Min Width -->
						<div class="field-set">
							<label>Min-Width</label>
							<div class="input-wrapper">
								<input type="text" placeholder="22%" v-model.trim="targetCSS.minWidth">
							</div>
						</div>
						<!-- Height -->
						<div class="field-set">
							<label>Height</label>
							<div class="input-wrapper">
								<input type="text" placeholder="100px" v-model.trim="targetCSS.height">
							</div>
						</div>
						<!-- Max Height -->
						<div class="field-set">
							<label>Max-Height</label>
							<div class="input-wrapper">
								<input type="text" placeholder="50px" v-model.trim="targetCSS.maxHeight">
							</div>
						</div>
						<!-- Min Height -->
						<div class="field-set">
							<label>Min-Height</label>
							<div class="input-wrapper">
								<input type="text" placeholder="22%" v-model.trim="targetCSS.minHeight">
							</div>
						</div>
					</div>
					<div class="tab-content" v-bind:class="{'visible': cssTab == 4}">
						Content4
					</div>
				</div>
			</div>
		</div>
		
		<!-- Footer -->
		<div id="animateFooter">

			<!-- Controls -->
			<div id="animationControls">
				<!-- Left side, play, animation duration, etc -->
				<div class="left">
					<button class="ui-button">
						<i class="fas fa-play"></i>
						<span>Play Animation</span>
					</button>
					<div class="animation-prop">
						<label>Animation Duration</label>
						<input type="text" class="small" placeholder="3s"/>
					</div>
					<div class="animation-prop">
						<label>Iterations</label>
						<input type="text" placeholder="infinite"/>
					</div>
					<div class="animation-prop">
						<label>Delay</label>
						<input type="text" class="small" placeholder="0s"/>
					</div>
					<div class="animation-prop">
						<label>Timing</label>
						<input type="text" placeholder="linear"/>
					</div>
				</div>

				<!-- Right side, settings, export -->
				<div class="right">

				</div>

			</div>

			<!-- Timeline -->
			<div id="animateTimeline">
			</div>
		</div>

		<!-- Output CSS -->
		<div id="outputCSS">

			<pre>{{steps}}</pre>
			<!-- Start -->
			<code>
				<pre class="block">#targetElement{</pre>
			</code>
			<!-- Transform -->
			<code v-if="transform.rotate || transform.scale || transform.translateX || transform.translateY || transform.skewX || transform.skewY">
				<pre>    transform:</pre>
				<pre v-if="transform.rotate">        rotate({{transform.rotate}})</pre>
				<pre v-if="transform.scale">        scale({{transform.scale}})</pre>
				<pre v-if="transform.translateX">        translateX({{transform.translateX}})</pre>
				<pre v-if="transform.translateY">        translateY({{transform.translateY}})</pre>
				<pre v-if="transform.skewX">        skewX({{transform.skewX}})</pre>
				<pre v-if="transform.skewY">       skewY({{transform.skewY}})</pre>
				<pre>;</pre>
			</code>
			<code v-if="transform.transformOrigin">
				<pre>transform-origin: {{transform.transformOrigin}};</pre>
			</code>
			<!-- Colors, fonts -->
			<code>
				<pre v-if="targetCSS.background">    background: {{targetCSS.background}};</pre>
				<pre v-if="targetCSS.opacity">    opacity: {{targetCSS.opacity}};</pre>
				<pre v-if="targetCSS.color">    color: {{targetCSS.color}};</pre>
				<pre v-if="targetCSS.fontSize">    font-size: {{targetCSS.fontSize}};</pre>
				<pre v-if="targetCSS.width">    width: {{targetCSS.width}};</pre>
				<pre v-if="targetCSS.minWidth">    min-width: {{targetCSS.minWidth}};</pre>
				<pre v-if="targetCSS.maxWidth">    max-width: {{targetCSS.maxWidth}};</pre>
				<pre v-if="targetCSS.height">    height: {{targetCSS.height}};</pre>
				<pre v-if="targetCSS.minHeight">    min-height: {{targetCSS.minHeight}};</pre>
				<pre v-if="targetCSS.maxHeight">    max-height: {{targetCSS.maxHeight}};</pre>
			</code>
			<!-- End -->
			<code>
				<pre class="block">}</pre>
			</code>
		</div>


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
			cssTab: 1,

			// Properties
			// Transform
			transform:{
				rotate: null,
				scale: null,
				translateX: null,
				translateY: null,
				skewX: null,
				skewY: null,
				transformOrigin: null
			},
			// Full CSS string applied to element
			targetCSS: {
				transform: "",
				transformOrigin: "",
				// Individual strings
				background: "",
				opacity: "",
				color: "",
				fontSize: "",
				width: "",
				minWidth: "",
				maxWidth: "",
				height: "",
				minHeight: "",
				maxHeight: "",
			},
			// Animation steps,
			// Holds all css at each step
			steps: {}
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

		// Update Transform: css
		updateTransform: function(){
			var transformString = "";
			var transform = this.transform;
			// If any transform value exists
			if(transform.rotate || transform.scale || transform.translateX || transform.translateY || transform.skewX || transform.skewY){
				// transformString = "transform:"

				// Add CSS for each transform with value
				for (let key in transform) {
					// If transform origin
					if(key == "transformOrigin"){
						this.targetCSS.transformOrigin = transform[key];
					}else if(transform[key]){
						// Else all other vals
						transformString = transformString + " " + key + "(" + transform[key] + ")"
					}
				}
			}
			// Save to main string
			this.targetCSS.transform = transformString;
		},

		// Save current step
		saveStep: function(position){
			console.log("SAVING STEPS")
			// this.steps[position] = this.targetCSS;
		}

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

			// Left side - export, adjustments, etc
			.left{
				display: flex;

				
			}
			// Right side - info, tips, etc
			.right{
				.keyframe-data{
					text-align: right;
					font-size: 16px;
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
							left: -50px;
							width: 50px;
							height: 50px;
							font-size: 28px;
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

				.left{
					display: flex;
					flex-wrap: wrap;

					button{
						margin: 10px 20px 0 0;
					}

					// Animation props
					.animation-prop{
						display: flex;
						margin: 10px 15px 0 0;

						label{
							display: flex;
							flex-direction: column;
							justify-content: center;
							font-weight: 600;
							box-sizing: border-box;
							max-width: 75px;
							padding: 2px 5px 0 0;
							color: var(--text);
						}

						input{
							border-radius: 3px;
							padding: 0 5px;
							height: 34px;
							max-width: 80px;
							min-width: 80px;
							font-size: 13px;
							font-weight: 700;

							// Smaller inputs
							&.small{
								max-width: 40px;
								min-width: 40px;
							}
						}
					}
				}
				.right{

				}
			}


			// Timeline
			#animateTimeline{
				height: 140px;
				background-color: var(--backgroundLayer);
				border-radius: var(--borderRadiusSmall);
				box-sizing: border-box;
				padding: 15px;
				border: 1px solid var(--border);
				margin: 15px 0 0 0;
			}
		}
	}




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


	// CSS Output
	#outputCSS{
		position: fixed;
		width: 300px;
		height: auto;
		min-height: 15px;
		box-sizing: border-box;
		padding: 15px;
		background-color: red;
		margin-top: 50px;
	}


	// UI button
	// Used throughout animate page
	.ui-button{
		display: flex;
		margin-right: 25px;
		background-color: transparent;
		border-radius: var(--borderRadiusSmall);
		box-sizing: border-box;
		padding: 0 10px;
		border: 1px solid var(--border);
		transition: var(--transition);

		span,i{
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			height: 30px;
			color: var(--textLight);
			transition: var(--transition);
		}

		span{
			font-size: 12px;
			font-weight: 600;
		}

		i{
			font-size: 18px;
			margin-right: 6px;
		}

		&:hover{
			transition: var(--transition);
			border-color: var(--borderHover);
			background-color: var(--backgroundLayer);

			span,i{
				transition: var(--transition);
				color: var(--text);
			}
		}
	}

</style>