<!--
// 
// Shadows.vue
// _________________________
//
//	Generate CSS shadows
//
//	- calculateShadow()
// 		Takes values and calculates layers for shadows
//		Only runs if layers is more than 1.
//	- rgbNumberFormat(input)
// 		Pass it a number, it will return 0 if less than 0, or 255 if more
// 			Just a quick fix for people who format badly.
//	- copyShadowOutput()
// 		Copies generated shadow CSS to clipboard
// 
// -->

<template>
	<div class="page-split">
		<!-- Stage that contains target -->
		<div class="page-split-left">
			<div class="page-split-left-top">
				<!-- Options -->
				<div class="option-dropdown">
					<button class="button small grey mright-sm" @click="controlTab('options')">
						<i class="far" v-bind:class="{'fa-toggle-on': !controlToggles.options, 'fa-chevron-circle-up': controlToggles.options}"></i>
						<span>Options</span>
					</button>

					<!-- Dropdown content -->
					<div class="option-dropdown-content" v-if="controlToggles.options">
						<div class="field horizontal">
							<label for="stageBackground">Background</label>
							<div class="input-wrapper">
								<input type="text" id="stageBackground" v-model="options.stageBackground" placeholder="#FFFFFF"/>
							</div>
						</div>
						<!-- Target Element -->
						<div class="field mtop-sm">
							<label for="customTarget">
								Target Element
								<small class="block">Your element must have the id targetElement</small>
							</label>
							<div class="input-wrapper">
								<textarea class="code" id="customTarget" v-model="options.customTarget"></textarea>
							</div>
						</div>
						<!-- Target CSS -->
						<div class="field mtop-sm">
							<label for="customTargetCSS">
								Custom CSS
							</label>
							<div class="input-wrapper">
								<textarea class="code" id="customTargetCSS" v-model="options.customTargetCSS"></textarea>
							</div>
						</div>

					</div>
				</div>

			</div>
			<div class="app-stage" v-html="options.customTarget">
			</div>
			
		</div>
		<!-- Right side - output and adjustments -->
		<div class="page-split-right">
			<!-- Fields -->
			<div class="app-fields">

				<h3 class="mbottom-sm">Box Shadow</h3>

				<!-- Horizontal Offset -->
				<div class="field">
					<label for="horOffset" class="slider-label-value">
						<span>Horizontal Offset</span>
						<input type="number" v-model="options.horizontal_offset" min="-200" max="200"/>
						<!-- <b>{{options.horizontal_offset}}px</b>	 -->
					</label>
					<div class="input-wrapper">
						<input type="range" id="horOffset" v-model="options.horizontal_offset" min="-200" max="200"/>
					</div>
				</div>

				<!-- Vertical Offset -->
				<div class="field mtop-sm">
					<label for="vertOffset" class="slider-label-value">
						<span>Vertical Offset</span>
						<input type="number" v-model="options.vertical_offset" min="-200" max="200"/>
					</label>
					<div class="input-wrapper">
						<input type="range" id="vertOffset" v-model="options.vertical_offset" min="-200" max="200"/>
					</div>
				</div>

				<!-- Blur -->
				<div class="field mtop-sm">
					<label for="shadowBlur" class="slider-label-value">
						<span>Blur</span>
						<input type="number" v-model="options.blur" min="0" max="100"/>
					</label>
					<div class="input-wrapper">
						<input type="range" id="shadowBlur" v-model="options.blur" min="0" max="100"/>
					</div>
				</div>

				<!-- Spread -->
				<div class="field mtop-sm">
					<label for="shadowSpread" class="slider-label-value">
						<span>Spread</span>
						<input type="number" v-model="options.spread" min="-200" max="200"/>
					</label>
					<div class="input-wrapper">
						<input type="range" id="shadowSpread" v-model="options.spread" min="-200" max="200"/>
					</div>
				</div>

				<!-- Color -->
				<div class="field mtop-sm">
					<label for="shadowSpread">
						Shadow Color
					</label>
					<div class="input-wrapper mtop-xs">
						<input type="text" id="shadowColor" v-model="options.color" @change="calculateShadow('color')"/>
					</div>
				</div>

				<!-- Transparency -->
				<div class="field mtop-sm mbottom-sm">
					<label for="shadowTransparency" class="slider-label-value">
						<span>Color Opacity</span>
						<input type="number" v-model="options.opacity" min="0" max="1"/>
					</label>
					<div class="input-wrapper">
						<input type="range" id="shadowTransparency" v-model="options.opacity" min="0" max="1" step="0.01" @input="calculateShadow('color')"/>
					</div>
				</div>

				<!-- Output -->
				<div class="field mtop-sm mbottom-sm">
					<label for="shadowTransparency" class="slider-label-value">
						<span>Output</span>
						<button class="button small green" @click="copyShadowOutput()">
							<i class="far fa-copy"></i>
							<span>Copy</span>
						</button>
					</label>
					<div class="input-wrapper">
						<code>
							box-shadow: {{options.horizontal_offset}}px {{options.vertical_offset}}px {{options.blur}}px {{options.spread}}px {{options.color}};
						</code>
					</div>
				</div>

				<!-- Layers -->
				<!-- <div class="field mtop-sm">
					<label for="shadowLayers" class="slider-label-value">
						Layers
						<b>{{options.layers}}</b>	
					</label>
					<div class="input-wrapper">
						<input type="range" id="shadowLayers" v-model="options.layers" min="1" max="10"/>
					</div>
				</div> -->

			</div>
		</div>

		<!-- Append styles to page - options, shadow output, etc -->
		<v-style>
			{{options.customTargetCSS}}
			.app-stage{
				background: {{options.stageBackground}};
			}
			#targetElement{
				box-shadow: {{options.horizontal_offset}}px {{options.vertical_offset}}px {{options.blur}}px {{options.spread}}px {{options.color}};
			}
		</v-style>


	</div>
</template>

<script>
// @ is an alias to /src
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "shadowApp",

	components: {
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
			options: {
				horizontal_offset: 0,
				vertical_offset: 6,
				blur: 35,
				spread: -10,
				color: "rgb(30,30,90,0.22)",
				opacity: 0.22,
				layers: 1,
				stageBackground: "rgb(235, 244, 250)",
				customTarget: "<div id='targetElement' class='shadow-target'></div>",
				customTargetCSS: "#targetElement{\n    display:block;\n    height: 180px;\n    width: 240px;\n    background-color: white;\n    border-radius: 20px;\n    margin: 0 auto;\n}",
			},
			// Which controls are visible
			controlToggles: {
				options: false,
				output: false,
			}
		};
	},

	mounted() {
		this.updateMeta("Shadows | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")
		// console.log(convert.hex.rgb('DEADBF'))
	},

	computed: {
	},

	watch: {
		
	},
	
	methods: {
		//////////////////////////
		// Switch Control Tab  //
		////////////////////////
		controlTab: function(tab){
			if(tab == 'options' && !this.controlToggles.options){
				this.controlToggles.options = true;
				this.controlToggles.output = false;
			}else if(tab == 'output' && !this.controlToggles.output){
				this.controlToggles.output = true;
				this.controlToggles.options = false;
			}else{
				this.controlToggles.options = false;
				this.controlToggles.output = false;
			}
		},
		
		/////////////////////////
		// Calculates Shadow  //
		///////////////////////
		// Runs shadow calculation - needed for multiple layers
		calculateShadow: function(type){

			var color = this.options.color;


			// Color only needs to update when color or opacity changes
			if(type == 'color'){

				var formattedColor = "";
				var rgbArray = []
				
				// Convert hex to rgb
				if(color.startsWith("#")){
					rgbArray = convert.hex.rgb(color.substring(1,7));
					this.options.opacity = 1;
				// Get numbers from RGB format
				}else{
					var numbers = color.replace(/[^\d,]/g, '').split(',')
					// If there are at least 3 numbers, good enough format
					if(numbers[2]){
						rgbArray = numbers;
					}else{
						this.toast("Bad Color", "Please enter your color in either rgb() or #HEX format.", "red", "far fa-tint");
					}
				}

				// Now actually format the string
				formattedColor = "rgba("
					+ this.rgbNumberFormat(rgbArray[0]) + ", "
					+ this.rgbNumberFormat(rgbArray[1]) + ", "
					+ this.rgbNumberFormat(rgbArray[2]) + ", "
					+ this.options.opacity + ")";

				// Set to options
				this.options.color_format = formattedColor;
				this.options.color = formattedColor;

				// Update color input
			}

			// Calculate rest

			

		},

		/////////////////////////
		// RGB Number Format  //
		///////////////////////
		// RGB Fix - returns 255 if more, or 0 if less
		rgbNumberFormat: function(input){
			var number = parseInt(input)
			if(number > 255){
				return 255;
			}else if(number < 0){
				return 0;
			}else{
				return number;
			}
		},

		/////////////////////////
		// Copy Shadow Output  //
		///////////////////////
		// copies CSS output to clipboard
		copyShadowOutput: function(){
			var output = "box-shadow: ";
			output = output + 	this.options.horizontal_offset + "px " +
								this.options.vertical_offset + "px " +
								this.options.blur + "px " +
								this.options.spread + "px " +
								this.options.color + ";";
			
			this.copyToClipboard("Your Shadow's CSS", output);
		},
		
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	.page-split{
		display: flex;
		height: 100%;
		box-sizing: border-box;
		padding: 0 0 15px 0;

		// Left side - controls, stage below
		.page-split-left{
			flex-grow: 3;
			display: flex;
			flex-direction: column;
			margin-right: 25px;

			// Top of left side - controls, save, etc
			.page-split-left-top{
				display: flex;
				padding: 0 0 15px 0;
				height: 24px;
				max-height: 24px;

				button{
					width: fit-content;
				}

				// Option button that displays dropdown content
				.option-dropdown{
					position: relative;
					height: fit-content;
					overflow: visible;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.option-dropdown-content{
						position: absolute;
						margin: 7px 0 0 0;
						top: 100%;
						background-color: var(--primary);
						max-width: 500px;
						min-width: 400px;
						width: 100%;
						border: 1px solid var(--border);
						box-shadow: var(--shadow);
						border-radius: var(--borderRadiusSmall);
						box-sizing: border-box;
						padding: 15px;

						label, h1, h2, h3, h4, h5, h6, p{
							color: var(--white);
						}
					}
				}
			}

			// Stage
			.app-stage{
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex-grow: 3;
				box-sizing: border-box;
				padding: 0 0 25px 0;
				border-radius: var(--borderRadius);

				#targetElement{
				}
			}
		}

		// Right side
		.page-split-right{
			width: 400px;
			height: 100%;
			max-height: 100%;
			overflow: auto;

			// Sidebar content/app form/fields - primary background
			.app-fields{
				display: block;
				background-color: var(--primary);
				color: var(--white);
				box-sizing: border-box;
				padding: 15px;
				border-radius: var(--borderRadius);
				border: 1px solid var(--border);
				box-shadow: var(--shadow);
				height: 100%;
				overflow: auto;

				.field{
					label{
						color: var(--white);
					}

					code{
						font-family: var(--mono);
						font-size: 16px;
						padding: 0;
						box-sizing: border-box;
						display: block;
						padding: 12px;
						border-radius: var(--borderRadiusSmall);
						margin: 4px 0 0 0;
						line-height: 20px;
						background-color: var(--black);
					}
				}
			}
			
		}
	}

	// Specific element styling
	#customTarget{
		height: 50px;
		max-height: 50px;
		min-height: 50px;
	}
	#customTargetCSS{
		height: 150px;
		max-height: 150px;
		min-height: 150px;
	}

</style>