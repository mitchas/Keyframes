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
			<button @click="updateURLParams()">
				<i class="fas fa-sliders-simple"></i>
				<span class="hint left">Adjust All</span>
			</button>
			<button @click="toggleSidebar('colorblind')" :class="{'notifiaction-dot': colorPrefs.colorblind != 'none'}">
				<i :class="view_sidebar == 'colorblind' ? 'fas fa-times' : 'fas fa-glasses'"></i>
				<span class="hint left">Color Blindness</span>
			</button>
			<button @click="toggleSidebar('contrast')">
				<i :class="view_sidebar == 'contrast' ? 'fas fa-times' : 'fas fa-circle-half-stroke'"></i>
				<span class="hint left">Contrast</span>
			</button>
			<hr/>
			<button @click="toggleSidebar('export')">
				<i :class="view_sidebar == 'export' ? 'fas fa-times' : 'fas fa-share-nodes'"></i>
				<span class="hint left">Export</span>
			</button>
			<button @click="toggleSidebar('save')">
				<i :class="view_sidebar == 'save' ? 'fas fa-times' : 'fas fa-floppy-disk'"></i>
				<span class="hint left">Save / Load</span>
			</button>
			<button @click="toggleSidebar('more')">
				<i :class="view_sidebar == 'more' ? 'fas fa-times' : 'fas fa-bars'"></i>
				<span class="hint left">More</span>
			</button>
		</nav>

		<div :class="'stage colorblind_' + colorPrefs.colorblind">

			<!-- Color Grid -->
			<div id="colorGrid"  :style="'background-color: ' + colorPrefs.stageBackground" :class="{'checkered': colorPrefs.enableCheckers, 'padded': colorPrefs.enableOpacity}">

				<div v-for="(color, key) in currentPalette" :key="key" class="color_block"
					:style="'background-color: ' + RGBToHex(color.r, color.g, color.b, color.a) + ';  color: ' + getTextColor(color.r, color.g, color.b)">

					<div class="color_block_info">
						<input class="color_transparent_input name hide-print" v-if="colorPrefs.customNames" type="text" v-model="color.name" placeholder="Name" />
						<h6 class="print-only">{{color.name}}</h6>

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
							<button><i class="fas fa-lamp"></i></button>
							<button @click="$store.getters['User/preferences'].confirm_action ? deleting_color = key : removeColor(key)"><i class="fas fa-trash-alt"></i></button>
						</div>

						<transition name="basic">
							<div class="color_block_edit" id="color_block_sliders" v-if="color.adjust">
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
									<input type="range" class="opacity" id="colorOpacityInput" min="0" max="255" step="1"  v-model="color.a"/>
									<input type="number" id="colorOpacityInput" v-model="color.a" min="0" max="255"/>
								</div>
								<!-- Edit hex value input -->
								<div class="cbs_row">
									<input class="color_transparent_input" type="text" placeholder="HEX Value" :value="RGBToHex(color.r, color.g, color.b, color.a).toUpperCase()" @change="updateRGBValue($event, key)"/>
								</div>
							</div>
						</transition>

					</div>


				</div>
			</div>

			<!-- Sidebar -->
			<div class="stage-sidebar" :class="{'expanded': view_sidebar != null}">

				<transition-group name="basic">
					<!-- Color Blind -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'colorblind'" :key="0">
						<h3>Color Blindness</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm padded">
							<p class="small">
								Simulate color blindness with the options below. These filters are approximate.
							</p>

							<div class="flex mtop-xs" v-for="(type, key) in colorblind_types" :key="key">
								<input type="radio" class="radio mright-xs" :id="'colorblind_' + key" v-model="colorPrefs.colorblind" :value="type.class"/>
								<label class="vertical text-small" :for="'colorblind_' + key">
									{{type.name}}
									<small>{{type.description}}</small>
								</label>
							</div>

						</div>
					</div>


					<!-- Export -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'contrast'" :key="3">
						<h3>Contrast</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm">
							{{currentPalette}}
						</div>
					</div>


					<!-- Export -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'export'" :key="3">
						<h3>Export</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm">

							<div class="button-grid padded">
								<button class="button large-icon grey" v-for="(option, key) in export_options" :key="key" @click="exportWith(key)">
									<i :class="option.icon"></i>
									<span>{{option.type}}</span>
								</button>
							</div>

						</div>
					</div>
					
					<!-- Save / Load -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'save'" :key="4">
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
									You haven't saved anything yet.
								</Callout>
							</div>

						</div>

					</div>

					<!-- More -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'more'" :key="2">
						<h3>More</h3>
						<div class="stage-sidebar-content-scroll">

							<div class="padded mtop-md">
								<!-- Color Format -->
								<label>Color Format</label>
								<div class="aselect mtop-xxs">
									<select v-model="active_color_format">
										<!-- <option v-for="format in color_formats" :value="format" :key="format">{{format}}</option> -->
										<option value="RGB/A">RGB/A</option>
										<option disabled>HSB - Coming Soon</option>
										<option disabled>HSL - Coming Soon</option>
										<option disabled>CMYK - Coming Soon</option>
									</select>
								</div>

								<div class="flex mtop-md between">
									<label class="vertical" for="enableColorOp">Enable Opacity</label>
									<input type="checkbox" id="enableColorOp" class="toggle yes-no" v-model="colorPrefs.enableOpacity"/>
								</div>

								<transition name="basic">
									<div class="mtop-sm" v-if="colorPrefs.enableOpacity">
										<label>Page Background Color</label>
										<input type="text" class="mtop-xxs" v-model="colorPrefs.stageBackground" :disabled="!colorPrefs.enableOpacity" placeholder="#FFFFFF"/>
										
										<div class="flex mtop-sm between">
											<label class="vertical" for="enableCheckers">Checkered Background</label>
											<input type="checkbox" id="enableCheckers" class="toggle on-off" v-model="colorPrefs.enableCheckers"/>
										</div>
									</div>

								</transition>

								<!-- Color Names -->
								<div class="flex mtop-md between">
									<label class="vertical" for="enableColorNames">Name Colors</label>
									<input type="checkbox" id="enableColorNames" class="toggle yes-no" v-model="colorPrefs.customNames"/>
								</div>


							</div>



						</div>
					</div>
				</transition-group>


			</div>

		</div>


		<!-- Modals -->
		<Confirm v-if="deleting_color != null" title="Are you sure?" icon="fas fa-exclamation-circle" color="red" confirmText="Remove Color" confirmIcon="fas fa-trash-alt" cancelText="No, Cancel" v-on:confirmFalse="deleting_color = null" v-on:confirmTrue="removeColor(deleting_color)">
			<i class="fas fa-droplet mtop-xs mbottom-sm block center" :style="'font-size: 3em; color: ' + RGBToHex(currentPalette[deleting_color].r, currentPalette[deleting_color].g, currentPalette[deleting_color].b, currentPalette[deleting_color].a)""></i>
		</Confirm>

		<!-- Code Export Modal -->
		<Modal size=""
			:overflow="true"
			:show="export_modal"
			:title="'Export as ' + exporting_as"
			:icon="export_options[exporting_as].icon"
			confirmText="Copy"
			dismissText="Close"
			color="green"
			confirmIcon="fas fa-copy"
			:reverseButtons="true"
			@confirmed="export_modal = null"
			@dismissed="export_modal = null">
			<!-- CSS, SCSS, LESS -->
			<pre class="code-box large" v-if="exporting_as != 'Code'">
				<div class="comment">{{export_options[exporting_as].commentStart}} HEX {{export_options[exporting_as].commentEnd || ""}}</div>
				<div v-for="(color, key) in currentPalette" :key="key">{{export_options[exporting_as].prefix}}{{colorPrefs.customNames && color.name ? color.name : 'Color-' + (key + 1)}}: {{RGBToHex(color.r, color.g, color.b, color.a)}};</div>
				<!-- RGB -->
				<div class="comment">{{export_options[exporting_as].commentStart}} RGB {{export_options[exporting_as].commentEnd || ""}}</div>
				<div v-for="(color, key) in currentPalette" :key="key">{{export_options[exporting_as].prefix}}{{colorPrefs.customNames && color.name ? color.name : 'Color-' + (key + 1)}}: rgb{{colorPrefs.enableOpacity ? 'a' : ''}}({{color.r}}, {{color.g}}, {{color.b}}{{colorPrefs.enableOpacity ? ', ' + (color.a / 255).toFixed(2) : ''}});</div>
			</pre>
			<!-- Code - CSV, XML, Etc. -->
			<pre class="code-box large" v-else>
				<div class="comment">{{export_options[exporting_as].commentStart}} HEX CSV {{export_options[exporting_as].commentEnd || ""}}</div>
				<div><span v-for="(color, key) in currentPalette" :key="key">{{key > 0 ? ', ' : ''}}{{RGBToHex(color.r, color.g, color.b, color.a)}}</span></div>
				<!-- Hex CSV without # -->
				<div class="comment">{{export_options[exporting_as].commentStart}} HEX CSV - Without # {{export_options[exporting_as].commentEnd || ""}}</div>
				<div><span v-for="(color, key) in currentPalette" :key="key">{{key > 0 ? ', ' : ''}}{{RGBToHex(color.r, color.g, color.b, color.a, false)}}</span></div>
				<!-- Array with # -->
				<div class="comment">{{export_options[exporting_as].commentStart}} Array {{export_options[exporting_as].commentEnd || ""}}</div>
				<div>[<span v-for="(color, key) in currentPalette" :key="key">{{key > 0 ? ', ' : ''}}"{{RGBToHex(color.r, color.g, color.b, color.a)}}"</span>]</div>
				<!-- Array without # -->
				<div class="comment">{{export_options[exporting_as].commentStart}} Array - Without # {{export_options[exporting_as].commentEnd || ""}}</div>
				<div>[<span v-for="(color, key) in currentPalette" :key="key">{{key > 0 ? ', ' : ''}}"{{RGBToHex(color.r, color.g, color.b, color.a, false)}}"</span>]</div>
				<!-- XML-->
				<div class="comment">{{export_options[exporting_as].commentStart}} XML {{export_options[exporting_as].commentEnd || ""}}</div>
				<div>&lt;palette&gt;</div>
				<div v-for="(color, key) in currentPalette" :key="key">&nbsp;&nbsp;&nbsp;&nbsp;&lt;color name="{{colorPrefs.customNames && color.name ? color.name : 'Color-' + (key + 1)}}" hex="{{RGBToHex(color.r, color.g, color.b, color.a, false)}}" r="{{color.r}}" g="{{color.g}}" b="{{color.b}}"{{colorPrefs.enableOpacity ? ' a="' + (color.a / 255).toFixed(2) + '"' : ''}} /&gt;</div>
				<div>&lt;/palette&gt;</div>
			</pre>
		</Modal>


	</div>
</template>

<script>
// Components
import Selections from "@/components/ui/Forms/Selections";
import Callout from "@/components/ui/Common/Callout";
import Confirm from "@/components/ui/Modals/Confirm";
import Modal from "@/components/ui/Modals/Modal";
import debounce from "lodash/debounce";


export default {
	name: "Colors",

	components: {
		Selections,
		Callout,
		Confirm,
		Modal,
	},

	mixins: [
	],

	data() {
		return {
			// App Functions
			view_sidebar: null,
			active_color_format: "RGB/A",
			color_formats: [
				"RGB/A",
				"HSB",
				"HSL",
				"CMYK"
			],
			colorblind_types: [
				{name: "None / Trichromat", class: "none", description: "Regular color vision."},
				{name: "Protanomaly", class: "protanomaly", description: "Low Red"},
				{name: "Protanopia", class: "protanopia", description: "No Red"},
				{name: "Deuteranomaly", class: "deuteranomaly", description: "Low Green"},
				{name: "Deuteranopia", class: "deuteranopia", description: "No Green"},
				{name: "Tritanomaly", class: "tritanomaly", description: "Low Blue"},
				{name: "Tritanopia", class: "tritanopia", description: "No Blue"},
				{name: "Achromatomaly", class: "achromatomaly", description: "Almost No Color"},
				{name: "Achromatopsia", class: "achromatopsia", description: "No Color"}
			],
			export_options: {
				"CSS": {type: "CSS", icon: "fab fa-css3-alt", prefix: "--", commentStart: "/*", commentEnd: "*/"},
				"SCSS" : {type: "SCSS", icon: "fab fa-sass", prefix: "$", commentStart: "//"},
				"LESS": {type: "LESS", icon: "fab fa-less", prefix: "@", commentStart: "//"},
				"Code": {type: "Code", icon: "fas fa-code", commentStart: "/*", commentEnd: "*/"},
				"Print": {type: "Print", icon: "fas fa-print"},
				"Link": {type: "Link", icon: "fas fa-link"},
			},
			export_modal: false,
			exporting_as: "CSS",

			deleting_color: null,

			// Settings
			colorPrefs: {
				enableOpacity: false,
				enableCheckers: false,
				stageBackground: "",
				customNames: true,
				colorblind: "none",
			},

			// Saving
			nameToSave: "",

			// Current Palette
			currentPalette: [
				{
					r: 0,
					g: 71,
					b: 219,
					a: 255,
					adjust: false,
					name: "Color-1",
				},
			],

			// Saved Palettes
			storedPalettes: {},

			
		};
	},

	watch: {
		currentPalette: {
			handler: function(value) {
				this.debounceURLParams();
			},
			deep: true,
		},
	},
	
	mounted() {
		if(this.$route.params.urlColors){
			// Load colors into stage
		}
	},
	created: function () {
	},

	beforeDestroy(){
	},
	
	methods: {
		
		debounceURLParams: debounce(function(){
			this.updateURLParams();
		}, 1000),

		updateURLParams: function(){
			let _this = this;
			var urlParams = "";
			Object.keys(_this.currentPalette).forEach(function(key){
				urlParams = urlParams + _this.currentPalette[key].r + "," + _this.currentPalette[key].g + "," + _this.currentPalette[key].b + "-"
			});
			// this.currentPalette[0].r
			this.$router.replace({ name: "colors", params: {urlColors: urlParams} })
		},


		// Make sidebar visible
		toggleSidebar: function(name){
			if(this.view_sidebar == name){
				this.view_sidebar = null;
			}else{
				this.view_sidebar = name;
			}
		},

		// Add new random color to palette
		addColor: function(){
			var newColor = {
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
				a: 255,
				adjust: false,
				name: "Color-" + (this.currentPalette.length + 1),
			}
			this.currentPalette.push(newColor)
		},

		// Remove color from current palette
		removeColor: function(index){
			this.currentPalette.splice(index, 1);
			this.deleting_color = null;
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

		exportWith: function(key){
			if(key == "Link"){
				this.hello("Link copied to Clipboard!", "far fa-copy", "green")
			}else if(key == "Print"){
				this.hello("Printing!", "far fa-print", "green");
				var printContent = document.querySelector("#colorGrid").outerHTML;
				document.querySelector("#printArea").innerHTML = printContent;
				window.print();
				document.querySelector("#printArea").innerHTML = "";

			}else{
				this.export_modal = true;
				this.exporting_as = key;
			}
		},

		// Gets correct text color based on value passed
		getTextColor: function(r, g, b){
			var r = parseInt(r,16);
			var g = parseInt(g,16);
			var b = parseInt(b,16);
			var yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? 'black' : 'white';
		},



		updateRGBValue: function(event, key){
			let _this = this;
			this.HexToRGB(event.target.value).then(function(rgb) {			
				_this.currentPalette[key].r = rgb[0];
				_this.currentPalette[key].g = rgb[1];
				_this.currentPalette[key].b = rgb[2];
			}).catch(function(error) {
				_this.hello("Invalid HEX. Try again.", "fas fa-frown", "red")
			});

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
		RGBToHex: function(r,g,b,a, hash) {
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

			if(r == "NaN" || g == "NaN" || b == "NaN" || a == "NaN"){
				return "invalid";
			}
			 if(this.colorPrefs.enableOpacity){
				var string = "";
				if(hash != false){string = "#"}
				var string = (string + r + g + b + a).toUpperCase();
				return string;
			}else{
				var string = "";
				if(hash != false){string = "#"}
				var string = (string + r + g + b).toUpperCase();
				return string;
			}
		},
		// Hex(a) to rgb(a)
		HexToRGB: function(h){
			return new Promise((resolve, reject) => {

				h = h.replace("#", "");
				let r = 0, g = 0, b = 0, a = 1;

				// No opacity
				if (h.length == 6) {
					r = "0x" + h[0] + h[1];
					g = "0x" + h[2] + h[3];
					b = "0x" + h[4] + h[5];
					var final = [+r, +g, +b];
					resolve(final);
				}
				// With opacity
				else if (h.length == 8) {
					r = "0x" + h[0] + h[1];
					g = "0x" + h[2] + h[3];
					b = "0x" + h[4] + h[5];
					a = "0x" + h[6] + h[7];
					a = +(a / 255).toFixed(2);
					var final = [+r, +g, +b, +a];
					resolve(final);
				}else{
					reject()
				}
			});


			

		},



	}
};

</script>


<style lang="scss">

#colorApp{
	display: flex;
	flex-direction: column;
	max-height: 100vh;

	.color_transparent_input{
		background-color: transparent;
		border: none;
		max-width: 174px;
		text-align: center;
		color: inherit;
		font-weight: bold;
		font-size: 1em;
		margin: 0 auto;
		padding: 5px 15px;
		height: auto;
		background-color: rgba(255,255,255,0.1);
		
		&.name{
			font-size: 0.8em;
			margin-bottom: 12px;
			font-weight: 500;
			letter-spacing: 0.1px;
			background-color: transparent;
		}
	} 

	
}

.stage{
	display: flex;
	flex-grow: 3;
	overflow: hidden;
	box-sizing: border-box;
	padding-top: calc(var(--topBarHeight) * 0.75);

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
			min-width: 320px;
			max-width: 500px;

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

// Color Grid / Display
#colorGrid{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	box-sizing: border-box;

	@media print{
		min-height: 100vh;
		height: fit-content;
		width: 100vw;
	}

	&.checkered{
		background-image:
			linear-gradient(45deg, #ccc 25%, transparent 25%), 
			linear-gradient(135deg, #ccc 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #ccc 75%),
			linear-gradient(135deg, transparent 75%, #ccc 75%);
		background-size:25px 25px; /* Must be a square */
		background-position:0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px; /* Must be half of one side of the square */
	}
	&.padded{
		padding: 12px;
	}

	.color_block{
		flex-grow: 3;
		background-color: var(--red);
		min-width: 300px;
		flex-basis: 33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		padding: 15px 15px 15px 15px;
		page-break-inside: avoid;

		.color_block_info{
			box-sizing: border-box;
			text-align: center;
			color: inherit;

			// Color Name
			h6{
				font-size: 0.75em;
				font-weight: 500;
				color: inherit;
			}

			.format_code,
			.hex_code{
				display: block;
				font-weight: 600;
				letter-spacing: 0.05em;
				font-size: 0.9em;
				margin: 0;
				padding: 6px 12px;
				border-radius: var(--borderRadius);
				text-align: center;
				margin: 0px auto 0 auto;
				color: inherit;

				&:hover{
					background-color: rgba(0,0,0,0.1);
				}
			}
			.hex_code{
				text-transform: uppercase;
				font-size: 1.8em;
				font-weight: 900;
			}
		}

		.color_block_controls{
			display: flex;
			justify-content: center;
			margin-top: 5px;
			color: inherit;
			opacity: 0;
			gap: 6px;

			@media (max-width: $screenSM) {
				opacity: 1;
			}
			@media print{
				display: none;
			}

			button{
				font-size: 1.2em;
				color: inherit;
				border-radius: var(--borderRadius);
				height: 40px;
				width: 40px;
				border: 1px solid transparent;

				&:hover{
					background-color: rgba(0,0,0,0.1);
					font-size: 1.3em;
				}
			}
		}

		.color_block_edit{
			@media print{
				display: none;
			}
		}
		#color_block_sliders{
			margin: 15px auto 0 auto;

			.cbs_row{
				display: flex;
				// flex-wrap: wrap;
				width: 100%;
				justify-content: space-between;
				max-width: 280px;
				margin: 0 auto 0 auto;

				

				label{
					color: inherit;
					font-size: 0.75em;
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