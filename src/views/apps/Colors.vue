<!--
// 
// Colors.vue
// _________________________
//
//	Pick colors, convert rgb/hex, etc
//
//	- setPalette(hexString)
// 		takes value as hexString ie ('ff0000,f0ff00,aa0f11') and loads them as a palette. Used for loading local storage or url params
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
//	- deleteColor(index)
//  	deletes color at index - cannot delete all colors, one must remain
//	- addColor()
//		dds new color to palette - defaults to black
//	- loadSavedPalettes()
//		Gets palettes from local storage - gets on every tab click so it's up to date
//	- savePalette()
//		saves palette to local storage
//	- deletePalette()
//		deletes palette from local storage
//	- loadPalette(name)
//		loads palette from local storage based on name, calls setPalette()
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
					<button class="button small action-btn" @click="controlTab('save')" v-bind:class="{'red': controlToggles.save, 'invert': !controlToggles.save}">
						<i v-bind:class="{'fas fa-save': !controlToggles.save, 'fas fa-times-circle': controlToggles.save}"></i>
						<span>Save/Load</span>
					</button>
					<button class="button small action-btn" @click="controlTab('options')" v-bind:class="{'red': controlToggles.options, 'transparent': !controlToggles.options}">
						<i v-bind:class="{'fas fa-edit': !controlToggles.options, 'fas fa-times-circle': controlToggles.options}"></i>
						<span>Options</span>
					</button>

					<!--/////////////////////////////
						Dropdown Content
					/////////////////////////////-->
					<!-- Save/Load -->
					<transition name="fromtop">
						<div class="option-dropdown-content" v-if="controlToggles.save">
							<!-- Save current animation -->
							<div class="field">
								<label for="newPaletteSaveName">
									<small class="block">Save your color palette to come back to later.</small>
								</label>
								<!-- animation name -->
								<input id="newPaletteSaveName" aria-label="Save as Name" type="text" v-model="paletteToSaveName" maxlength="12" placeholder="MyPalette"/>
								<button aria-label="Save Palette" class="button blue mtop-xs" @click="savePalette()">
									<i class="far fa-save"></i>
									<span>Save</span>
								</button>
								<transition name="basic">
									<div class="badge red mleft-xs" v-if="savedPalettes.includes('palette_' + paletteToSaveName)">
										<i class="far fa-code-branch"></i>
										<span>Overwriting {{paletteToSaveName}}</span>
									</div>
								</transition>
							</div>
							<!-- Saved animations -->
							<div class="field mtop-sm">
								<label>
									Load a Saved Palette
									<small v-if="!savedPalettes.length" class="block ptop-xs">You don't have any palettes saved yet</small>
								</label>
								<div class="saved-list">
									<div class="saved-item" v-for="(name, index) in savedPalettes" :key="index">
										<i class="far fa-times" @click.self.prevent="deletePalette(name)"></i>
										<span @click="loadPalette(name)">{{name.substr(8)}}</span>
									</div>
								</div>
							</div>
						</div>
					</transition>
					<!-- Options -->
					<transition name="fromtop">
						<div class="option-dropdown-content" v-if="controlToggles.options">
							<div class="field">
								<label for="stageBackground">
									<small class="block">Change the background behind the color stage to see what it looks like layered with opacity.</small>
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
							<input type="number" v-model="palette[selectedPalette].r" min="0" max="255" @input="rgbaChange()"/>
						</label>
						<input type="range" id="rgbaRed" v-model="palette[selectedPalette].r" min="0" max="255" step="1"  @input="rgbaChange()"/>
					</div>
					<!-- Green -->
					<div class="field">
						<label for="rgbaGreen" class="slider-label-value">
							<span>Green</span>
							<input type="number" v-model="palette[selectedPalette].g" min="0" max="255" @input="rgbaChange()"/>
						</label>
						<input type="range" id="rgbaGreen" v-model="palette[selectedPalette].g" min="0" max="255" step="1" @input="rgbaChange()"/>
					</div>
					<!-- Blue -->
					<div class="field">
						<label for="rgbaBlue" class="slider-label-value">
							<span>Blue</span>
							<input type="number" v-model="palette[selectedPalette].b" min="0" max="255" @input="rgbaChange()"/>
						</label>
						<input type="range" id="rgbaBlue" v-model="palette[selectedPalette].b" min="0" max="255" step="1" @input="rgbaChange()"/>
					</div>
					<!-- Opacity -->
					<div class="field">
						<label for="rgbaOpacity" class="slider-label-value">
							<span>Opacity</span>
							<input type="number" v-model="palette[selectedPalette].a" min="0" max="255" @input="rgbaChange()"/>
						</label>
						<input type="range" id="rgbaOpacity" v-model="palette[selectedPalette].a" min="0" max="1" step="0.01" @input="rgbaChange()"/>
					</div>

				</div>
				

			</div>
			
		</div> <!-- End page left -->



		<!--//////////////////////
			//////////////////////
			Right side - value editor
			//////////////////////
			//////////////////////-->
		<div class="app-page-split-right mobile-small">
			<!-- Fields -->
			<div class="app-fields mobile-noscroll">

				<h4 class="mbottom-sm" id="colorPaletteHeader">
					<span>Palette</span>
					<i class="far fa-swatchbook mleft-xs"></i>
				</h4>

				<!-- Color palette -->
				<div id="colorPalette">
					<!-- Saved color loop -->
					<transition-group name="basic" class="color-wrapper">
						<div class="color" v-for="(color, index) in palette" :key="index" @click="selectedPalette = index" :class="{'removing' : color.name == 'delete', 'active': selectedPalette == index}"
							:style="'background: ' + color.hex + '; color: ' + invertTextColor(palette[index].hex) + ';'">
							<div class="color-codes">
								<!-- Color name -->
								<div class="name">{{color.name}}</div>
								<!-- Hex code -->
								<span class="color-value" @click="selectedPalette == index && copyToClipboard(color.hex, color.hex)">
									{{color.hex}}<i class="far fa-copy"></i>
								</span>
								<!-- Rgba value -->
								<span class="color-value" @click="selectedPalette == index && copyToClipboard(color.rgba, 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')')">
									rgb({{color.r}}, {{color.g}}, {{color.b}})<i class="far fa-copy"></i>
								</span>
							</div>
							<!-- Delete -->
							<div class="color-actions">
								<button class="color-delete" aria-label="Delete color from palette" @click.stop="deleteColor(index)">
									<i class="fas fa-times"></i>
								</button>
							</div>
						</div>
						<!-- Add color tile - only shows on mobile -->
						<div class="color add-color" @click="addColor()" key="0123123">
							<i class="fal fa-plus"></i>
							<span class="add-color-text">Add Color</span>
						</div>
						<!-- Spacer-only on moible -->
						<div class="color color-spacer"  key="012373">
						</div>

					</transition-group>
				</div>

				<!-- Add color -->
				<button class="button invert mbottom-md" @click="addColor()" id="addColorButton">
					<i class="far fa-plus-circle"></i>
					<span>Add Color</span>
				</button>
				

			</div>
		</div>



		<!-- Append color styles to preview on page -->
		<v-style>
			#colorEditorStage{
				background: {{palette[selectedPalette].rgba}};
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
			// Save & Load
			savedPalettes: [],
			paletteToSaveName: "",
			hexStringTimer: null,
			hexString: "",
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
				customTargetCSS: "#targetElement{\n    display:block;\n    height: 140px;\n    width: 200px;\n    background-color: #ffffff;\n    border:var(--borderWidth) solid #f2f5f9;\n    color: #16023C;\n    border-radius: 3px;\n    margin: 0 auto;\n    font-size: 62px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n}",
			},
			// Which controls are visible
			controlToggles: {
				options: false,
				save: false,
			}
		};
	},

	mounted() {
		this.updateMeta("Colors | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")
	
		// Get parms
		if(this.$route.query.c){
			this.hexString = this.$route.query.c;
			this.setPalette();
		}
	},

	computed: {
	},

	watch: {
		
	},
	
	methods: {
		/////////////////////////////
		// Set palette from load  //
		///////////////////////////
		setPalette: function(hexString){
			var hexs = this.hexString.split(",");

			// Set up array to hold palette
			var paletteArray = [];

			// For each hex in string
			hexs.forEach(function(hex) {
				
				// Get formats
				var rgbArray = convert.hex.rgb(hex);
				var rgbaString = "rgba(" + rgbArray[0] + ", " + rgbArray[1] + ", " + rgbArray[2] + ", 1)";
				var name = convert.hex.keyword(hex);

				var color = {
					name: name,
					hex: "#" + hex,
					rgba: rgbaString,
					r: rgbArray[0],
					g: rgbArray[1],
					b: rgbArray[2],
					a: 1,
				}

				// Push to palette array
				paletteArray.push(color);

			});

			// Set palette
			this.palette = paletteArray;
		},

		//////////////////////////
		// Switch Control Tab  //
		////////////////////////
		controlTab: function(tab){
			if(tab == 'options' && !this.controlToggles.options){
				this.controlToggles.options = true;
				this.controlToggles.save = false;
			}else if(tab == 'save' && !this.controlToggles.save){
				// Load palettes from local storage on click
				this.loadSavedPalettes();
				this.controlToggles.save = true;
				this.controlToggles.options = false;
			}else{
				this.controlToggles.options = false;
				this.controlToggles.save = false;
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

			// get new hex string
			this.makeHexString();
		},
		// hex change, calculate rgb values
		hexChange: function(){
			var hex = this.palette[this.selectedPalette].hex;
			if(hex[0] == "#"){
				hex = hex.substring(1);
			}else{
				// Add hex to prop
				this.palette[this.selectedPalette].hex = "#" + this.palette[this.selectedPalette].hex
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

			// get new hex string
			this.makeHexString();
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

				// get new hex string
				this.makeHexString();

			}else{
				// this.toast("Bad Color Format", "Please enter your color in either rgb() or #HEX format.", "red", "far fa-tint");
			}
		},
		// Hex String
		// Used for url params, and saving
		makeHexString: function(){

			var _this = this;

			// Clear timeout so it only runs after 500ms delay
			clearTimeout(_this.hexStringTimer);

			// Timer to prevent many firings
			_this.hexStringTimer = setTimeout(function() {

				var string = '';

				// Create comma seperated string of hex numbers
				// used to save palette to local storage
				// also set as URL params to share
				_this.palette.forEach(function(color) {
					string = string + color.hex.substring(1) + ","
				});

				// Set global var
				_this.hexString = string.substring(0, string.length - 1);

				// Set route query
				_this.$router.replace({query: {..._this.$route.query, c: _this.hexString}})

			}, 500);
			

		},

		/////////////////////////
		//  Palette Controls  //
		///////////////////////
		// Delete Palette color
		deleteColor: function(index){
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
				this.toast("Hey don't do that.", "You can't delete every color. You have to have at lest one.", "red", "far fa-tint");
			}

			// Make new hex string
			this.makeHexString();
		},
		// Add new color to palette
		// Takes current color, adjusts hue a little bit
		addColor: function(){
			this.palette.push({
				name: "Dodgerblue",
				hex: "#0868FE",
				rgba: "rgba(8,104,254, 1)",
				r: 8,
				g: 104,
				b: 254,
				a: 1,
			})

			// Set as selected
			this.selectedPalette = this.palette.length - 1;
		},


		////////////////////
		//  Save & Load  //
		//////////////////
		// Save
		loadSavedPalettes: function(){
			// Get all saved palettes
			// Loop through all local storage, save sttorage names of palettes
			// Palettes begin with "palette_"
			var values = [];
			var keys = Object.keys(localStorage);
			var i = keys.length;
			while( i-- ){
				if(keys[i].startsWith("palette_")){
					values.push(keys[i]);
				}
			}
			this.savedPalettes = values;
		},
		// Save
		savePalette: function(){
			var newPalette = {
				date: new Date(),
				hexString: this.hexString
			}
			var stringified = JSON.stringify(newPalette)
			localStorage.setItem('palette_' + this.paletteToSaveName.replace(/\s/g, ''), stringified);

			this.toast("Palette Saved", "Your palette has been saved to your browser's local storage.", "", "fas fa-swatchbook");
			// Hide tab
			this.controlToggles.save = false;
		},
		// Delete
		deletePalette: function(name){
			localStorage.removeItem(name);
			this.toast("Palette Deleted", "Your palette has been deleted.", "", "fas fa-trash");
			// Hide tab
			this.controlToggles.save = false;
		},
		// Load
		loadPalette: function(name){
			var saved = localStorage.getItem(name);
			var parsed = JSON.parse(saved)
			this.hexString = parsed.hexString;

			this.setPalette();
			// Hide tab
			this.controlToggles.save = false;

			// Set saved name as save input field name
			this.paletteToSaveName = name.substr(8);
			// Generate new hex string
			this.makeHexString();
		},
		
		
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	// Hide top options bar - not yet needed for colors page
	#colorOptionsBar{
		border-bottom: var(--borderWidth) solid var(--border);
		background-color: var(--background);
	}

	// Main color picker stage
	#colorEditorStage{
		background-color: var(--blue);
		border-radius: var(--borderRadius);
		margin: 10px 10px 20px 10px;
		transition: 0s;
		overflow: auto;
		
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
					border-radius: var(--borderRadius);
				}
				input{
					background-color: var(--layer);
					border-top-left-radius: 0;
					border: var(--borderWidth) solid var(--border);
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

		@media (max-width: @screenMD) {
			overflow: hidden;
			flex-grow: 3;

			.color-wrapper{
				display: flex;
				height: 100%;
				overflow-y: auto;
				box-sizing: border-box;
				padding: 5px 0 0 0;
			}
		}

		.color{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: auto;
			border-radius: var(--borderRadius);
			border: var(--borderWidth) solid var(--border);
			margin: 0 0 15px 0;
			box-sizing: border-box;
			letter-spacing: 0.4px;
			font-weight: 600;
			color: var(--white);
			transition: var(--transitionFast);

			// Fixed width on mobile because it scrolls horizontally
			@media (max-width: @screenMD) {
				width: 200px;
				max-height: 100%;
				height: 100%;
				min-width: 200px;
				margin: 0 10px 0 0;
				transform: scale(0.85);

				&:first-child{
					margin-left: 20px;
				}
			}

			// Add color
			&.add-color{
				background: transparent;
				color: var(--text);
				flex-direction: column;
				justify-content: center;
				display: none;
				color: var(--textLight);
				transition: var(--transitionFast);
				box-sizing: border-box;
				padding: 8px 0;

				@media (max-width: @screenMD) {
					min-height: 100%;
					display: flex;
					flex-grow: 3;
				}

				i.fa-plus,
				.add-color-text{
					text-align: center;
				}

				i.fa-plus{
					font-size: 36px;
					margin: 0 0 5px 0;
					transition: var(--transitionFast);
				}

				&:hover{
					color: var(--text);
					transition: var(--transitionFast);

					i.fa-plus{
						margin: 0 0 10px 0;
						transition: var(--transitionFast);
					}
				}
			}

			// Color Spacer
			&.color-spacer{
				max-width: 20px !important;
				overflow: hidden;
				min-width: 20px !important;
				opacity: 0;
				display: none;
				
				@media (max-width: @screenMD) {
					display: block;
				}
			}


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
				padding: 10px 0 10px 10px;

				.name{
					text-transform: capitalize;
					flex-grow: 3;
					font-size: 18px;
					font-weight: 700;
					display: block;
					margin-bottom: 12px;

					// Shrink mobile
					@media (max-width: @screenSM) {
						font-size: 15px;
					}
				}
				.color-value{
					display: block;
					margin-top: 5px;
					font-size: 15px;
					transition: 0.08s;
					// opacity: 0;
					font-weight: 600;

					// Shrink mobile
					@media (max-width: @screenMD) {
						font-size: 14px;
					}

					i{
						padding-left: 5px;
						opacity: 0;
					}

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
				transition: 0.08s;
				// mix-blend-mode: difference;
				.color-delete{
					font-size: 20px;
					border-radius: 50%;
					height: 30px;
					width: 30px;
					box-sizing: border-box;
					color: inherit;
					opacity: 1;
					transition: 0.08s;
					transform: scale(1);
					opacity: 0.75;

					// Shrink mobile
					@media (max-width: @screenMD) {
						width: 24px;
						height: 24px;
						font-size: 18px;
					}

					&:hover{
						cursor: pointer;
						transition: 0.08s;
						transform: scale(1.2);
						opacity: 1;
					}
				}
			}

			// Hover color
			&:hover{
				transition: 0.08s;
				cursor: pointer;
				// width: calc(~'100% + 30px');
				
				.color-actions{
					opacity: 1;
					transition: 0.08s;
				}
				.color-value{
					transition: 0.08s;
				}
				.name{
					text-decoration: underline;
				}
			}

			// Active is larger,
			// has padding on bottom codes
			&.active{
				transition: var(--transitionFast);
				height: 140px;

				// Change active for mobile
				@media (max-width: @screenMD) {
					transform: scale(1);
				}

				.color-codes{

					.name{
						opacity: 1;
					}
					.color-value{
						i{
							opacity: 1;
						}
					}
				}

			}
		}
	}


	// Add color button
	#addColorButton{
		// Hide on mobile because tile is used instead
		@media (max-width: @screenMD) {
			display: none;
		}
	}
	// Adjust header on mobile
	#colorPaletteHeader{
		// Add padding on left because it was removed for hor scroll
		@media (max-width: @screenMD) {
			padding-left: 20px;
			margin: 0 0 8px 0;
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