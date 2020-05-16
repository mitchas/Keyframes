<!--
// 
// Colors.vue
// _________________________
//
//	Pick colors, convert rgb/hex, etc
//
//	- rgbaChange()
// 		Whenever a value for r,g,b, or a is changed, change the other formats
//	- hexChange()
// 		change to hex input, update rgba values
//	- rgbaTextChange()
// 		Change to rgba input, update sliders and hex
//	- invertTextColor(color)
// 		returns color value for css - either black or white based on color passed
// 			How it works:
// 				converts passed (color) to hsl, gets the l value (brightness), and if it's > 50%, it's dark text, < is light
// 
// -->

<template>
	<div class="app-page-split">

		<!--/////////////////////////////
			Left side of page - top bar, main view
		/////////////////////////////-->
		<div class="app-page-split-left">


			<!--/////////////////////////////
				Top bar - dropdown buttons - options, output
			/////////////////////////////-->
			<div class="app-page-split-left-top" id="colorOptionsBar">

				<div class="option-dropdown">
					<button class="button small" @click="controlTab('options')" v-bind:class="{'red': controlToggles.options, 'black': !controlToggles.options}">
						<i v-bind:class="{'fas fa-edit': !controlToggles.options, 'fas fa-times-circle': controlToggles.options}"></i>
						<span>Options</span>
					</button>

					<!--/////////////////////////////
						Dropdown Content
					/////////////////////////////-->
					<!-- Options -->
					<transition name="fromtop">
						<div class="option-dropdown-content" v-if="controlToggles.options">
							<div class="field">
								<label for="stageBackground">
									<small class="block">Change the background behind the color stage to see what it looks like layered.</small>
								</label>
								<input type="text" id="stageBackground" v-model="options.stageBackground" placeholder="Orange"/>
							</div>
						</div>
					</transition>

				</div>
			</div> <!-- End page split left top -->


			<!--/////////////////////////////
				Stage
			/////////////////////////////-->
			<div class="app-stage" id="colorEditorStage">

				<div id="colorEditor" class="invert-text">

					<div class="field-row">
						<!-- HEX -->
						<div class="field" id="hexField">
							<label for="horOffset">
								<span>HEX</span>
							</label>
							<input type="text" v-model="palette[selectedPalette].hex" @input="hexChange()"/>
						</div>

						<!-- RGBA -->
						<div class="field" id="rgbaField">
							<label for="horOffset">
								<span>RGBA</span>
							</label>
							<input type="text" v-model="palette[selectedPalette].rgba" @input="rgbaTextChange()"/>
						</div>
					</div>
					
					<!-- Red -->
					<div class="field">
						<label for="rgbaRed" class="slider-label-value">
							<span>Red</span>
							<input type="number" v-model="palette[selectedPalette].r" min="0" max="255"/>
						</label>
						<input type="range" class="color-range" id="rgbaRed" v-model="palette[selectedPalette].r" min="0" max="255" step="1"  @input="rgbaChange()"/>
					</div>
					<!-- Green -->
					<div class="field">
						<label for="rgbaGreen" class="slider-label-value">
							<span>Green</span>
							<input type="number" v-model="palette[selectedPalette].g" min="0" max="255"/>
						</label>
						<input type="range" class="color-range" id="rgbaGreen" v-model="palette[selectedPalette].g" min="0" max="255" step="1" @input="rgbaChange()"/>
					</div>
					<!-- Blue -->
					<div class="field">
						<label for="rgbaBlue" class="slider-label-value">
							<span>Blue</span>
							<input type="number" v-model="palette[selectedPalette].b" min="0" max="255"/>
						</label>
						<input type="range" class="color-range" id="rgbaBlue" v-model="palette[selectedPalette].b" min="0" max="255" step="1" @input="rgbaChange()"/>
					</div>
					<!-- Opacity -->
					<div class="field">
						<label for="rgbaOpacity" class="slider-label-value">
							<span>Opcity</span>
							<input type="number" v-model="palette[selectedPalette].a" min="0" max="255"/>
						</label>
						<input type="range" class="color-range" id="rgbaOpacity" v-model="palette[selectedPalette].a" min="0" max="1" step="0.01" @input="rgbaChange()"/>
					</div>

				</div>
				

			</div>
			
		</div> <!-- End page left -->



		<!--//////////////////////
			//////////////////////
			Right side - value editor
			//////////////////////
			//////////////////////-->
		<div class="app-page-split-right">
			<!-- Fields -->
			<div class="app-fields">

				<h4 class="mbottom-sm">
					<span>Palette</span>
					<i class="far fa-swatchbook mleft-xs"></i>
				</h4>

				<!-- Color palette -->
				<div id="colorPalette">
					<!-- Saved color loop -->
					<transition-group name="basic">
						<div class="color" v-for="(color, index) in palette" :key="index" @click="selectedPalette = index" :class="{'removing' : color.name == 'delete'}"
							:style="'background-color: ' + color.hex + ';'">
							<div class="color-codes invert-text">
								<!-- Color name -->
								<div class="name">{{color.name}}</div>
								<!-- Hex code -->
								<span class="color-value" @click="copyToClipboard('The HEX code', color.hex)">
									{{color.hex}}
								</span>
								<!-- Rgba value -->
								<span class="color-value" @click="copyToClipboard('The rgba value', 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')')">
									rgb({{color.r}}, {{color.g}}, {{color.b}})
								</span>
							</div>
							<!-- Delete -->
							<!-- <div class="color-actions"> -->
							<div class="color-actions invert-text">
								<button class="color-delete" aria-label="Delete color from palette" @click.stop="deletePalette(index)">
									<i class="fas fa-times"></i>
								</button>
							</div>
						</div>
					</transition-group>
				</div>

				<!-- Add color -->
				<button class="button invert mbottom-md" @click="addColor()">
					<i class="far fa-plus-circle"></i>
					<span>Add Color</span>
				</button>
				

			</div>
		</div>



		<!-- Append color styles to preview on page -->
		<v-style>
			#colorEditorStage{
				background: rgba({{palette[selectedPalette].r}}, {{palette[selectedPalette].g}}, {{palette[selectedPalette].b}}, {{palette[selectedPalette].a}});
			}
			.app-page-split-left{
				background: {{options.stageBackground ? options.stageBackground : 'var(--layer)'}};
			}

			.invert-text label *, .invert-text span, .invert-text label, .invert-text div, .invert-text a, .invert-text i{
				color: {{invertTextColor(palette[selectedPalette].hex)}};
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
			selectedPalette: 0,
			// Palette
			palette: [
				{
					name: "Turquoise",
					hex: "#4AF9D6",
					rgba: "rgba(74, 249, 214, 1)",
					r: 74,
					g: 249,
					b: 214,
					a: 1,
				},
			],
			// App options
			options: {
				stageBackground: "",
				customTarget: "<div id='targetElement' class='shadow-target'><i class='fal fa-hands-wash'></i></div>",
				customTargetCSS: "#targetElement{\n    display:block;\n    height: 140px;\n    width: 200px;\n    background-color: #ffffff;\n    border:1px solid #f2f5f9;\n    color: #16023C;\n    border-radius: 4px;\n    margin: 0 auto;\n    font-size: 62px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n}",
			},
			// Which controls are visible
			controlToggles: {
				options: false,
				output: false,
			}
		};
	},

	mounted() {
		this.updateMeta("Colors | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")
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
		/////////////////////
		// Color Changes  //
		////////////////////
		// Any r g b or a value change, calculate full rgba() and hex
		rgbaChange: function(){
			var red = parseInt(this.palette[this.selectedPalette].r);
			var green = parseInt(this.palette[this.selectedPalette].g);
			var blue = parseInt(this.palette[this.selectedPalette].b);
			var opacity = parseFloat(this.palette[this.selectedPalette].a);

			this.palette[this.selectedPalette].rgba = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
			this.palette[this.selectedPalette].hex = "#" + convert.rgb.hex(red, green, blue);
			this.palette[this.selectedPalette].name = convert.hex.keyword(this.palette[this.selectedPalette].hex);
		},
		// hex change, calculate rgb values
		hexChange: function(){
			var hex = this.palette[this.selectedPalette].hex;
			if(hex[0] == "#"){
				hex = hex.substring(1);
			}

			// get rgb numbers
			var rgbArray = convert.hex.rgb(hex);

			// Set rgb values
			this.palette[this.selectedPalette].rgba = "rgba(" + rgbArray[0] + ", " + rgbArray[1] + ", " + rgbArray[2] + ", 1)";
			this.palette[this.selectedPalette].r = rgbArray[0];
			this.palette[this.selectedPalette].g = rgbArray[1];
			this.palette[this.selectedPalette].b = rgbArray[2];
			// this.rgbaOpacity = 1;

			this.palette[this.selectedPalette].name = convert.hex.keyword(hex);

		},
		// hex change, calculate rgb values
		rgbaTextChange: function(){

			// Get numbers from string
			var rgbArray = this.palette[this.selectedPalette].rgba.replace(/[^\d,.]/g, '').split(',')
			// If there are at least 3 numbers, good enough format
			if(rgbArray[2]){
				this.palette[this.selectedPalette].r = rgbArray[0];
				this.palette[this.selectedPalette].g = rgbArray[1];
				this.palette[this.selectedPalette].b = rgbArray[2];

				// If opacity exists, add it, otherwise default to 1
				if(rgbArray[3]){
					this.palette[this.selectedPalette].a = rgbArray[3]
				}else{
					this.palette[this.selectedPalette].a = 1;
				}

				// Convert and set hex
				this.palette[this.selectedPalette].hex = convert.rgb.hex(rgbArray)
				this.palette[this.selectedPalette].name = convert.hex.keyword(this.palette[this.selectedPalette].hex);

			}else{
				// this.toast("Bad Color Format", "Please enter your color in either rgb() or #HEX format.", "red", "far fa-tint");
			}
		},

		/////////////////////
		//  Invert Text   //
		////////////////////
		// Decides contrast color (for text) based on hex color input.
		// Taken from https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
		invertTextColor: function(color){
			var hexcolor = color.replace("#", "");
			var r = parseInt(hexcolor.substr(0,2),16);
			var g = parseInt(hexcolor.substr(2,2),16);
			var b = parseInt(hexcolor.substr(4,2),16);
			var yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? 'black' : 'white';
		},

		/////////////////////////
		//  Palette Controls  //
		///////////////////////
		// Delete Palette color
		deletePalette: function(index){
			let _this = this;


			// Select previous color on palette
			if(index > 1){
				this.selectedPalette = this.selectedPalette - 1;
			}else{
				this.selectedPalette = 0;
			}

			// If there is more than one color left, they can delete it, else error
			if(this.palette.length > 1){
				this.palette[index].name = 'delete';

				// Actually delete after 300ms delay
				setTimeout(function(){
					_this.palette.splice(index, 1);
				}, 300)
			}else{
				this.toast("Ope.", "Your palette has to have at least one color...", "red", "far fa-tint");
			}
		},
		// Add new color to palette
		// Takes current color, adjusts hue a little bit
		addColor: function(){
			this.palette.push({
				name: "black",
				hex: "#000000",
				rgba: "rgba(0, 0, 0, 1)",
				r: 0,
				g: 0,
				b: 0,
				a: 1,
			})

			// Set as selected
			this.selectedPalette = this.palette.length - 1;
		},
		
		
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	// Hide top options bar - not yet needed for colors page
	#colorOptionsBar{
		border-bottom: 1px solid var(--border);
		background-color: var(--background);
	}

	// Main color picker stage
	#colorEditorStage{
		background-color: var(--blue);
		border-radius: 3px;
		margin: 10px 10px 20px 10px;
		
		@media (max-width: @screenLG) {
			margin: 10px;
		}

		// Color editor body - hex and rgb, r,g,b sliders, opacity slider
		#colorEditor{
			display: block;
			margin: 0 auto;
			width: 90%;
			max-width: 350px;

			.field{
				margin: 0 0 16px 0;
				label span{
					// background-color: var(--border);
					width: fit-content;
					font-size: 16px;
					font-weight: 700;
				}
				label input{
					border-radius: 3px;
				}
				input{
					background-color: var(--layer);
					border-top-left-radius: 0;
					border: 1px solid var(--border);
					color: var(--text);
				}
			}

			// Set widths for hex and rgba fields
			#hexField{
				width: 36%;
				max-width: 36%;
				min-width: 36%;
			}
			#rgbaField{
				width: 60%;
				max-width: 60%;
				min-width: 60%;
			}

			
		}
	}



	// Sidebar color palette list
	#colorPalette{

		.color{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100px;
			border-radius: 3px;
			border: 1px solid var(--border);
			margin: 0 0 15px 0;
			box-sizing: border-box;
			letter-spacing: 0.4px;
			font-weight: 600;
			color: var(--white);
			transform: scale(1);


			// Animation to remove
			&.removing{
				animation: remove-color 0.3s ease  0s 1  normal  forwards;
			}


			.color-codes{
				display: flex;
				flex-direction: column;	
				justify-content: space-between;
				height: 100%;
				box-sizing: border-box;
				padding: 10px;

				.name{
					text-transform: capitalize;
					flex-grow: 3;
					font-size: 17px;
					font-weight: 700;
					display: block;
				}
				.color-value{
					font-family: var(--mono);
					display: block;
					margin-top: 5px;
					font-size: 15px;
					transition: var(--transition);
					opacity: 0;

					// Hover - click to copy
					&:hover{
						opacity: 1;
						text-decoration: underline;
					}
				}

			}

			// Color actions
			.color-actions{
				opacity: 0;
				transition: var(--transition);
				// mix-blend-mode: difference;
				.color-delete{
					font-size: 20px;
					border-radius: 50%;
					height: 30px;
					width: 30px;
					box-sizing: border-box;
					color: inherit;
					opacity: 1;
					transition: var(--transition);
					transform: scale(1);
					opacity: 0.75;

					&:hover{
						cursor: pointer;
						transition: var(--transition);
						transform: scale(1.2);
						opacity: 1;
					}
				}
			}

			// Hover color
			&:hover{
				transition: var(--transition);
				cursor: pointer;
				transform: scale(1.025);
				// width: calc(~'100% + 30px');
				
				.color-actions{
					opacity: 1;
					transition: var(--transition);
				}
				.color-value{
					opacity: 0.75;
					transition: var(--transition);
				}
				.name{
					text-decoration: underline;
				}
			}
		}
	}



	// Amimation to remove colors from palette
	@keyframes remove-color {
		0% {
			transform: translateX(0);
		}
		99% {
			height: 100px;
		}
		100% {
			transform: translateX(120%);
			height: 0px;
			margin: 0;
			border: none;
		}
	}




</style>