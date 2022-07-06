<!--
	Colors App
-->

<template>
	<div class="fixed-page" id="colorApp">

		<nav class="secondary-nav">

			<!-- Add color -->
			<button @click="addColor()">
				<i class="fas fa-plus-circle"></i>
				<span class="hint">Add Color</span>
			</button>
			<label>{{currentPalette.length}} color{{currentPalette.length > 1 ? 's' : ''}}</label>

			<div class="spacer"></div>
			<button>
				<i class="fas fa-sliders-simple"></i>
				<span class="hint left">Adjust All</span>
			</button>
			<button>
				<i class="fas fa-glasses"></i>
				<span class="hint left">Color Blindness</span>
			</button>
			<button>
				<i class="fas fa-circle-half-stroke"></i>
				<span class="hint left">Contrast</span>
			</button>
			<hr/>
			<button @click="toggleSidebar('export')">
				<i :class="viewSidebar == 'export' ? 'fas fa-times' : 'fas fa-share-nodes'"></i>
				<span class="hint left">Export</span>
			</button>
			<button @click="toggleSidebar('save')">
				<i :class="viewSidebar == 'save' ? 'fas fa-times' : 'fas fa-floppy-disk'"></i>
				<span class="hint left">Save / Load</span>
			</button>
			<button @click="toggleSidebar('more')">
				<i :class="viewSidebar == 'more' ? 'fas fa-times' : 'fas fa-bars'"></i>
				<span class="hint left">More</span>
			</button>
		</nav>

		<div class="stage">

			<!-- Color Grid -->
			<div id="colorGrid"  :style="'background-color: ' + colorPrefs.stageBackground">

				<div v-for="(color, key) in currentPalette" :key="key" class="color_block"
					:style="'background-color: ' + RGBToHex(color.r, color.g, color.b, color.a) + ';  color: ' + getTextColor(color.r, color.g, color.b)">

					<div class="color_block_info">

						<!-- <button class="hex_code" @click="copyToClipboard('#' + color.hex, '#' + color.hex)">#{{color.hex}}</button> -->
						<button class="hex_code" @click="copyToClipboard(RGBToHex(color.r, color.g, color.b, color.a).toUpperCase())">
							{{RGBToHex(color.r, color.g, color.b, color.a)}}
						</button>
						
						<button class="format_code" 
							@click="
							colorPrefs.enableOpacity && copyToClipboard('rgba' + '(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (color.a / 255).toFixed(2) + ')');
							!colorPrefs.enableOpacity && copyToClipboard('rgb' + '(' + color.r + ', ' + color.g + ', ' + color.b + ')');
							">
							rgb{{colorPrefs.enableOpacity ? 'a' : ''}}({{color.r}}, {{color.g}}, {{color.b}}<span v-if="colorPrefs.enableOpacity">, {{(color.a / 255).toFixed(2)}}</span>)
						</button>

						<div class="color_block_controls">
							<button @click="color.adjust = !color.adjust"><i class="fas fa-sliders-simple"></i></button>
							<button><i class="fas fa-lightbulb"></i></button>
							<button @click="removeColor(key)"><i class="fas fa-trash-alt"></i></button>
						</div>

						<transition name="basic">
							<div class="color_block_sliders" v-if="color.adjust">
								<div class="cbs_row">
									<label for="colorRedInput" class="vertical">Red</label>
									<input type="range" class="red" id="colorRedInput" min="0" max="255" v-model="color.r"/>
									<input type="number" id="colorRedInput" v-model="color.r" min="0" max="255"/>
								</div>
								<div class="cbs_row">
									<label for="colorGreenInput" class="vertical">Green</label>
									<input type="range" class="green" id="colorGreenInput" min="0" max="255" v-model="color.g"/>
									<input type="number" id="colorGreenInput"  v-model="color.g" min="0" max="255"/>
								</div>
								<div class="cbs_row">
									<label for="colorBlueInput" class="vertical">Blue</label>
									<input type="range" class="blue" id="colorBlueInput" min="0" max="255"  v-model="color.b"/>
									<input type="number" id="colorBlueInput" v-model="color.b" min="0" max="255"/>
								</div>
								<div class="cbs_row" v-if="colorPrefs.enableOpacity">
									<label for="colorOpacityInput" class="vertical">Opacity</label>
									<input type="range" id="colorOpacityInput" min="0" max="255" step="1"  v-model="color.a"/>
									<input type="number" id="colorOpacityInput" v-model="color.a" min="0" max="255"/>
								</div>
							</div>
						</transition>

					</div>


				</div>
			</div>

			<!-- Sidebar -->
			<div class="stage-sidebar" :class="{'expanded': viewSidebar != null}">

				<transition-group name="basic">
					<!-- Export -->
					<div class="stage-sidebar-content" v-if="viewSidebar == 'export'" :key="0">
						<h3>Export</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm">

						</div>
					</div>
					
					<!-- Save / Load -->
					<div class="stage-sidebar-content" v-if="viewSidebar == 'save'" :key="1">
						<h3>Save</h3>

						<!-- Save Form -->
						<form @submit.prevent="savePalette" class="padded mbottom-md mtop-md">
							<div class="button-input">
								<input type="text" placeholder="My Favorite Colors" v-model="nameToSave"/>
								<button class="button" :disabled="!nameToSave.length">
									<i class="fas fa-floppy-disk"></i>
									<span>Save</span>
								</button>
							</div>
						</form>
							
							
						<h3>Load</h3>
						<!-- Scrollable saved list -->
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm">

							<button v-for="(palette, key) in storedPalettes" class="load-palette-button mbottom-md padded" :key="key" @click="loadPalette(palette)">
								<b>
									{{key}}
									<small>{{$date(palette.saved).format("MMMM D YYYY")}}</small>
								</b>
								<div class="palette-preview">
									<div class="palette-preview-color" v-for="(color, key2) in palette.colors" :key="key2" :style="'background-color: ' + RGBToHex(color.r, color.g, color.b, color.a)"></div>
								</div>
							</button>
							
							<div class="padded mtop-sm" v-if="!Object.keys(storedPalettes).length">
								<Callout
									icon="far fa-empty-set"
									size="small"
									color="red">
									You haven't saved any palettes yet.
								</Callout>
							</div>



						</div>

					</div>

					<!-- More -->
					<div class="stage-sidebar-content" v-if="viewSidebar == 'more'" :key="2">
						<h3>More</h3>
						<div class="stage-sidebar-content-scroll">

							<div class="padded mtop-md">
								<!-- Color Format -->
								<label>Color Format</label>
								<div class="aselect mtop-xxs">
									<select v-model="activeColorFormat">
										<option v-for="format in colorFormats" :value="format" :key="format">{{format}}</option>
									</select>
								</div>

								<div class="flex mtop-md flex-between">
									<label class="vertical" for="enableColorOp">Enable Opacity</label>
									<input type="checkbox" id="enableColorOp" class="toggle yes-no" v-model="colorPrefs.enableOpacity"/>
								</div>

								<transition name="basic">
									<div class="mtop-md" v-if="colorPrefs.enableOpacity">
										<label>Stage Background Color</label>
										<input type="text" class="mtop-xxs" v-model="colorPrefs.stageBackground" :disabled="!colorPrefs.enableOpacity" placeholder="#FFFFFF"/>
									</div>
								</transition>


							</div>



						</div>
					</div>
				</transition-group>


			</div>

		</div>

	</div>
</template>

<script>
// Components
import Selections from "@/components/ui/Forms/Selections";
import Callout from "@/components/ui/Common/Callout";


export default {
	name: "Colors",

	components: {
		Selections,
		Callout,
	},

	mixins: [
	],

	data() {
		return {
			// App Functions
			viewSidebar: null,
			activeColorFormat: "RGB/A",
			colorFormats: [
				"RGB/A",
				"HSB",
				"HSL",
				"CMYK"
			],

			// Settings
			colorPrefs: {
				enableOpacity: false,
				stageBackground: "",
			},

			// Saving
			nameToSave: "",

			// Current Palette
			currentPalette: [
				{
					r: 255,
					g: 0,
					b: 0,
					a: 255,
					adjust: false,
				},
			],

			// Saved Palettes
			storedPalettes: {},

			
		};
	},

	watch: {
		
	},
	
	mounted() {
	},
	created: function () {
	},

	beforeDestroy(){
	},
	
	methods: {

		toggleSidebar: function(name){
			if(this.viewSidebar == name){
				this.viewSidebar = null;
			}else{
				this.viewSidebar = name;
			}
		},

		addColor: function(){
			var newColor = {
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
				a: 255,
				adjust: false,
			}
			this.currentPalette.push(newColor)
		},

		removeColor: function(index){
			this.currentPalette.splice(index, 1);
		},

		// Save Palette
		savePalette: function(){
			var toSave = {
				name: this.nameToSave,
				colors: JSON.parse(JSON.stringify(this.currentPalette)),
				saved: new Date()
			}
			this.$set(this.storedPalettes, this.nameToSave, toSave);
			this.hello(this.nameToSave + " Saved!", "fas fa-check-circle", "green");
		},

		// Load Palette
		loadPalette: function(palette){
			this.currentPalette = palette.colors;
			this.nameToSave = palette.name;
			this.hello(this.nameToSave + " loaded!", "fas fa-check-circle", "green");
		},


		// Gets correct text color based on value passed
		getTextColor: function(r, g, b){
			var r = parseInt(r,16);
			var g = parseInt(g,16);
			var b = parseInt(b,16);
			var yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? 'black' : 'white';
		},

		// Color Conversion Functions
		// Takes r/g/b value and returns hex - ie 255 -> FF
		numberHex: function(val){
			val = parseInt(val).toString(16);
			if (val.length == 1)
				val = "0" + val;
			return val;
		},
		// RGBtoHex
		RGBToHex: function(r,g,b,a) {
			r = parseInt(r).toString(16);
			g = parseInt(g).toString(16);
			b = parseInt(b).toString(16);
			a = parseInt(a).toString(16);

			if (r.length == 1)
				r = "0" + r;
			if (g.length == 1)
				g = "0" + g;
			if (b.length == 1)
				b = "0" + b;
			if (a.length == 1)
				a = "0" + a;

			if(this.colorPrefs.enableOpacity){
				return "#" + r + g + b + a;
			}else{
				return "#" + r + g + b;
			}
		},
		// Hex(a) to rgb(a)
		HexToRGB: function(h){
			let r = 0, g = 0, b = 0, a = 1;

			// No opacity
			if (h.length == 6) {
				r = "0x" + h[0] + h[1];
				g = "0x" + h[2] + h[3];
				b = "0x" + h[4] + h[5];
				return "rgb(" + +r + "," + +g + "," + +b + ")";
			}
			// With opacity
			else if (h.length == 8) {
				r = "0x" + h[0] + h[1];
				g = "0x" + h[2] + h[3];
				b = "0x" + h[4] + h[5];
				a = "0x" + h[6] + h[7];
				a = +(a / 255).toFixed(2);
				return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
			}

		},



	}
};

</script>


<style lang="scss">

#colorApp{
	display: flex;
	flex-direction: column;
}

.stage{
	display: flex;
	flex-grow: 3;
	overflow: hidden;

	#colorGrid{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		overflow: auto;

		.color_block{
			flex-grow: 3;
			background-color: var(--red);
			min-width: 300px;
			flex-basis: 33%;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.color_block_info{
				text-align: center;
				color: inherit;

				.format_code,
				.hex_code{
					display: block;
					font-weight: 600;
					margin: 0;
					padding: 8px 12px;
					border-radius: var(--borderRadius);
					text-align: center;
					margin: 8px auto;
					color: inherit;

					&:hover{
						background-color: rgba(0,0,0,0.1);
					}
				}
				.hex_code{
					text-transform: uppercase;
					font-size: 2em;
					font-weight: 900;
				}
			}

			.color_block_controls{
				display: flex;
				justify-content: center;
				margin-top: 15px;
				opacity: 0;
				color: inherit;

				@media (max-width: $screenSM) {
					opacity: 1;
				}

				button{
					font-size: 1em;
					color: inherit;
				}
			}

			.color_block_sliders{
				margin: 30px auto 0 auto;

				.cbs_row{
					display: flex;
					// flex-wrap: wrap;
					width: 100%;
					justify-content: space-between;
					max-width: 280px;
					margin: 0 auto 0 auto;

					label{
						color: inherit;
						font-size: 0.65em;
						height: 20px;
						width: 80px;
						padding: 0 5px 0 0;
						box-sizing: border-box;
						margin: 0;
						text-align: right;
					}
					input[type=number]{
						-moz-appearance: textfield;
						width: fit-content;
						color: inherit;
						border: none;
						height: 20px;
						width: 80px;
						text-align: left;
						position: relative;
						left: 0;
						font-size: 0.8em;
						background-color: transparent;
						padding: 0 0 0 5px;
						&::-webkit-outer-spin-button,
						&::-webkit-inner-spin-button {
							-webkit-appearance: none;
							margin: 0;
						}

					}

					input[type=range]{
						flex-grow: 3;
						width: 100%;
						margin-top: 4px;
					}

				}
			}

			&:hover,
			&:focus-within{
				.color_block_controls{
					opacity: 1;
				}
			}
		}
	}

	.stage-sidebar{
		width: 0;
		height: 100%;
		transition: var(--transition);
		background-color: var(--layer);
		border-left: 1px solid var(--border);
		box-shadow: var(--shadow);
		@media (max-width: $screenSM) {
			position: fixed;
			right: 0;
		}

		&.expanded{
			transition: var(--transition);
			width: 33%;
			max-width: 400px;

			@media (max-width: $screenSM) {
				width: 80vw;
				max-width: 400px;
			}
		}


		// Content
		.stage-sidebar-content{
			display: flex;
			box-sizing: border-box;
			overflow: hidden;
			flex-direction: column;
			height: 100%;

			h3{
				width: 100%;
				text-align: center;
				font-size: 0.9em;
				line-height: 0.9em;
				margin: 0;
				font-weight: 600;
				padding: 16px 0;
				border-bottom: 1px solid var(--borderFade);
				background-color: var(--background);
				border-top: 1px solid var(--borderFade);

				&:first-child{
					border-top: none;
				}
			}

			.stage-sidebar-content-scroll{
				flex-grow: 3;
				overflow: auto;
				box-sizing: border-box;
			}
			.padded{
				padding: 0 15px;
			}

		}
	}

	
}


.load-palette-button{
	display: block;
	width: 100%;
	text-align: left;
	padding: 0;
	margin: 18px 0 0 0;

	b{
		font-size: 0.9em;
		display: block;
		padding-bottom: 5px;
		font-weight: 600;
		width: 100%;
		display: flex;
		justify-content: space-between;

		small{
			color: var(--textFade);
			font-weight: 500;
			white-space: pre;
		}
	}

	&:hover{
		b{
			text-decoration: underline;
		}
	}
}
.palette-preview{
	display: flex;
	border-radius: var(--borderRadius);

	.palette-preview-color{
		display: block;
		height: 42px;
		flex-grow: 3;

		&:first-child{
			border-top-left-radius: var(--borderRadius);
			border-bottom-left-radius: var(--borderRadius);
		}
		&:last-child{
			border-top-right-radius: var(--borderRadius);
			border-bottom-right-radius: var(--borderRadius);
		}
	}
}


</style>