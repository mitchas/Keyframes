<!--
	Colors App
-->

<template>
	<div class="fixed-page" id="colorApp">


		<!-- Secondary nav / Toolbar -->
		<nav class="secondary-nav">

			<!-- Add color -->
			<button @click="addColor()">
				<i class="fas fa-plus-circle"></i><span class="hint">Add Color</span>
			</button>
			<label>{{currentPalette.length}} color{{currentPalette.length > 1 ? 's' : ''}}</label>

			<!-- Gap -->
			<div class="spacer"></div>

			<!-- Loop for other secondary buttons -->
			<button v-for="(button, key) in secondary_nav" :key="key" @click="toggleSidebar(button.id)" 
				:class="{'notification-dot': (button.id == 'colorblind' && colorblind != 'none') || (button.id == 'contrast' && contrast_enabled)}">
				<i :class="view_sidebar == button.id ? 'fas fa-times' : button.icon"></i>
				<span class="hint left">{{button.title}}</span>
			</button>
		</nav>

		
		<!-- Main stage area -->
		<div :class="'stage colorblind_' + colorblind">

			<!-- Color Grid -->
			<div id="colorGrid" :style="'background-color: ' + colorPrefs.stageBackground" :class="{'checkered': colorPrefs.enableCheckers, 'padded': colorPrefs.enableOpacity || colorPrefs.colorGap, 'gap': colorPrefs.colorGap}" :data-count="currentPalette.length">

				<!-- Loop for Current Palette -->
				<div class="color_block" v-for="(color, key) in currentPalette" :key="key" :style="colorStyleProperties(key)">

					<div class="color_block_info">
						<!-- Name -->
						<input class="color_name_input hide-print" v-if="colorPrefs.customNames" type="text" v-model="color.name" placeholder="Name" @change="color.name = color.name.replace(/ /g, '')" />
						<h6 class="print-only" v-if="colorPrefs.customNames">{{color.name}}</h6>
						<!-- HEX -->
						<button class="hex_code" @click="copyToClipboard(RGBToHex(color.r, color.g, color.b, color.a).toUpperCase())">
							{{RGBToHex(color.r, color.g, color.b, color.a)}}
						</button>
						<!-- RGB -->
						<button class="format_code" 
							@click="
							colorPrefs.enableOpacity && copyToClipboard('rgba' + '(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (color.a / 255).toFixed(2) + ')');
							!colorPrefs.enableOpacity && copyToClipboard('rgb' + '(' + color.r + ', ' + color.g + ', ' + color.b + ')');
							">
							rgb{{colorPrefs.enableOpacity ? 'a' : ''}}({{color.r}}, {{color.g}}, {{color.b}}<span v-if="colorPrefs.enableOpacity">, {{(color.a / 255).toFixed(2)}}</span>)
						</button>
					</div>


					<!-- Color Control Buttons -->
					<div class="color_block_controls">
						<button @click="color.adjust = !color.adjust"><i class="fas fa-sliders-simple" title="Adjust RGB"></i></button>
						<!-- <button><i class="fas fa-lamp"></i></button> -->
						<button><i class="fas fa-shutters" @click="color.shades = !color.shades" title="Color Shades"></i></button>
						<button @click="$store.getters['User/preferences'].confirm_action ? confirm_modal = [ 'color', key ] : removeColor(key)" title="Delete Color"><i class="fas fa-trash-alt"></i></button>
						<!-- <button @click="$store.getters['User/preferences'].confirm_action ? deleting_color = key : removeColor(key)" title="Delete Color"><i class="fas fa-trash-alt"></i></button> -->
					</div>

					<!-- Color Editor - Sliders -->
					<transition name="basic">
						<div id="color_block_sliders" v-if="color.adjust">
							<!-- Loop through slider definitions -->
							<div class="cbs_row" v-for="(option, key) in slider_definitions" :key="key">
								<input type="range" :id="'slider'+option.id" min="0" max="255" v-model="color[option.id]"/>
								<!-- class="option.sliderClass -->
								<label :for="'slider'+option.id" class="vertical">{{option.label}}</label>
								<input type="number" v-model="color[option.id]" min="0" max="255"/>
							</div>
							<!-- Opacity Slider -->
							<div class="cbs_row" v-if="colorPrefs.enableOpacity">
								<input type="range" class="opacityx" id="colorOpacityInput" min="0" max="255" step="1"  v-model="color.a"/>
								<label for="colorOpacityInput" class="vertical">Opacity</label>
								<input type="number" id="colorOpacityInput" :value="(color.a / 255).toFixed(2)" @change="event => color.a = (parseFloat(event.target.value) * 255)" min="0" max="1"/>
								<!-- <input type="number" id="colorOpacityInput" v-model="color.a" min="0" max="255"/> -->
							</div>
							<!-- Edit hex value input -->
							<div class="cbs_row">
								<input class="color_transparent_input" type="text" placeholder="HEX Value" :value="RGBToHex(color.r, color.g, color.b, color.a).toUpperCase()" @change="updateRGBValue($event, key)"/>
							</div>
						</div>
					</transition>

					<!-- Shades - floats on top -->
					<div class="color_block_shades" v-if="color.shades" @click="color.shades = false">
						<button class="shade" v-for="i in 13" :key="i" :style="'background-color: rgb(' + (i * color.r / 6.5) + ', ' + (i *color.g / 6.5) + ', ' + (i *color.b / 6.5) + ');'" @click="color.r = parseInt(i * color.r / 6.5) ; color.g = parseInt(i *color.g / 6.5); color.b = parseInt(i *color.b / 6.5);">
							<i class="fas fa-circle" v-if="i == 7"></i>
						</button>
					</div>

					<!-- Contrast Text & Info -->
					<div class="color_block_contrast" v-if="contrast_enabled" :class="{'lage-aa': contrastRatio(color)}">
						<label class="ratio"><b>{{contrastRatio(color)}}</b>:1</label>
						<div class="large-text">{{contrast_demo_text ? contrast_demo_text : "Large Text"}}</div>
						<div class="tags">
							<span class="wcag-tag mright-xxs" :class="{'green': contrastRatio(color) >= 3.0}">AA</span>
							<span class="wcag-tag" :class="{'green': contrastRatio(color) >= 4.5}">AAA</span>
						</div>
						<p>{{contrast_demo_text ? contrast_demo_text : "Normal Text"}}</p>
						<div class="tags">
							<span class="wcag-tag mright-xxs " :class="{'green': contrastRatio(color) >= 4.5}">AA</span>
							<span class="wcag-tag" :class="{'green': contrastRatio(color) >= 7.0}">AAA</span>
						</div>
					</div>

					
				</div> <!-- End Color Block-->
			</div><!-- End ColorGrid -->


			<!-- Sidebar -->
			<div class="stage-sidebar" :class="{'expanded': view_sidebar != null}">

				<transition-group name="basic">


					<!-- Adjustments -->
					<!-- <div class="stage-sidebar-content" v-if="view_sidebar == 'adjust'" :key="0">
						<h3>Adjust (Preview)</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm padded">

						</div>
					</div> -->


					<!-- Color Blind -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'colorblind'" :key="0">
						<h3>Color Blindness</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm padded">
							<p class="small">
								Simulate color blindness with the options below. These filters are approximate.
							</p>

							<div class="flex mtop-xs" v-for="(type, key) in colorblind_types" :key="key">
								<input type="radio" class="radio mright-xs" :id="'colorblind_' + key" v-model="colorblind" :value="type.class"/>
								<label class="vertical text-small" :for="'colorblind_' + key">
									{{type.name}}
									<small>{{type.description}}</small>
								</label>
							</div>

						</div>
					</div>


					<!-- Contrast -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'contrast'" :key="3">
						<h3>Contrast</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm padded">
							<div class="flex mtop-sm margin-auto between">
								<label class="vertical" for="contrastTog">View Contrast</label>
								<input type="checkbox" id="contrastTog" class="toggle yes-no" v-model="contrast_enabled"/>
							</div>
							<transition name="basic">
								<div v-if="contrast_enabled">
									<!-- Contrast colors -->
									<label class="mtop-md">{{contrast_reverse ? "Text" : "Background"}} Color (R, G, B)</label>
									<div class="flex gap small-number mtop-xxs">
										<input type="number" min="0" max="255" class="small" v-model="contrast_color_r" placeholder="255"/>
										<input type="number" min="0" max="255" class="small" v-model="contrast_color_g" placeholder="255"/>
										<input type="number" min="0" max="255" class="small" v-model="contrast_color_b" placeholder="255"/>
									</div>
									<!-- Demo Contrast Text -->
									<label class="mtop-sm">Demo Text</label>
									<input type="text" class="mtop-xxs" v-model="contrast_demo_text" placeholder=""/>
									<!-- Reverse Colors -->
									<div class="flex mtop-md margin-auto between">
										<label class="vertical" for="contrastRev">Reverse Colors</label>
										<input type="checkbox" id="contrastRev" class="toggle " v-model="contrast_reverse"/>
									</div>
								</div>
							</transition>

							<!-- Information -->
							<h5 class="mtop-lg">How does this work?</h5>
							<p class="small">
								This tool is based off Web Content Accessibility Guidelines, or WCAG, which are guidelines for making websites accessible.
							</p>
							<div class="wcag-tag green mtop-xs">AA</div>
							<p class="small">
								<b>AA (Minimum Contrast)</b> requires a contrast ratio of at least 4.5:1 for normal text (14pt / 18.5px), and 3:1 for large (18pt / 24px) or bold text.
							</p>
							<div class="wcag-tag green mtop-xs">AAA</div>
							<p class="small mbottom-md">
								<b>AAA (Enhanced Contrast)</b> requires a contrast ratio of at least 7:1 for normal text (14pt / 18.5px), and 4.5:1 for large (18pt / 24px) or bold text.
							</p>

						</div>
					</div>


					<!-- Export -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'export'" :key="3">
						<h3>Export</h3>
						<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm">
							<!-- Loop export_options to create grid of buttons -->
							<div class="button-grid padded">
								<button class="button large-icon grey" v-for="(option, key) in export_options" :key="key" @click="exportWith(key)">
									<i :class="option.icon"></i>
									<span>{{option.type}}</span>
								</button>
							</div>
							<!-- Printing tip -->
							<div class="padded mtop-md">
								<Callout icon="far fa-info-circle" size="small" color="blue">
									<p class="small tight">
										When printing, make sure "Background Graphics" are enabled.
										<small class="ptop-xxs block">You can also print to PDF.</small>
									</p>
								</Callout>
							</div>
						</div>
					</div>


					<!-- Save / Load -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'save'" :key="4">
						<h3>Save</h3>
						<!-- Save Form -->
						<form @submit.prevent="savePalette" class="padded mbottom-md mtop-sm">
							<div class="button-input small">
								<input type="text" id="saveNameIn" placeholder="Name" v-model="nameToSave"/>
								<button class="button" :disabled="!nameToSave.length" :class="{'green' : editing_stored_key != null}">
									<i class="fas fa-floppy-disk"></i>
									<span>{{editing_stored_key != null ? "Save Changes" : "Save New"}}</span>
								</button>
							</div>
							<!-- Save as new -->
							<button type="button" v-if="editing_stored_key != null" @click="editing_stored_key = null" class="text-smaller align-center ptop-xxs text-primary">Or save as new Palette.</button>
						</form>
						<!-- Load existing -->
						<h3>Load</h3>
						<!-- <span class="text-smaller">{{storedPalettes}}</span> -->
						<!-- Scrollable saved list -->
						<transition name="basicup">
							<div class="stage-sidebar-content-scroll pbottom-lg ptop-sm" v-if="!$store.getters['Hold/isLoading']">
								<!-- Stored palettes from local storage, loop to create display -->
								<transition-group name="list">
									<div v-for="(palette, key) in storedPalettes" class="palette-view mbottom-sm padded" :key="key">
										<!-- Preview -->
										<div class="palette-preview hoverable" @click="loadPalette(palette, key)">
											<div class="palette-preview-color" v-for="(color, key2) in palette.colors" :key="key2" :style="'background-color: ' + RGBToHex(color.r, color.g, color.b, color.a)"></div>
										</div>
										<!-- Palette Info & Controls -->
										<div class="pv_bar">
											<button class="pv__i" @click="loadPalette(palette, key)">
												<b>{{palette.name}}</b>
												{{$date(palette.saved).format("MMMM D YYYY - h:MMa")}}
											</button>
											<!-- Controls -->
											<button class="pv__a red" title="Delete Palette" @click="$store.getters['User/preferences'].confirm_action ? confirm_modal = [ 'palette', key ] : deletePalette(key)"><i class="fas fa-trash-alt"></i></button>
										</div>
									</div>
								</transition-group>

								<!-- No stored palettes -->
								<div class="padded mtop-sm" v-if="storedPalettes && !Object.keys(storedPalettes).length">
									<Callout icon="far fa-empty-set" size="small" color="red">
										<p class="small">You haven't saved anything yet.</p>
									</Callout>
								</div>	

							</div>
						</transition>

					</div>


					<!-- Settings -->
					<div class="stage-sidebar-content" v-if="view_sidebar == 'settings'" :key="2">
						<h3>Palette Settings</h3>
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
								<!-- Enable Opacity -->
								<div class="flex mtop-md between">
									<label class="vertical" for="enableColorOp">Enable Opacity</label>
									<input type="checkbox" id="enableColorOp" class="toggle yes-no" v-model="colorPrefs.enableOpacity"/>
								</div>
								<!-- Page background options -->
								<label for="bgcolIn" class="mtop-sm">Page Background Color</label>
								<input type="text" id="bgcolIn" class="mtop-xxs" v-model="colorPrefs.stageBackground" placeholder="#FFFFFF"/>
								<div class="flex mtop-sm between">
									<label class="vertical" for="enableCheckers">Checkered Background</label>
									<input type="checkbox" id="enableCheckers" class="toggle on-off" v-model="colorPrefs.enableCheckers"/>
								</div>
								<!-- Color Names -->
								<div class="flex mtop-md between">
									<label class="vertical" for="enableColorNames">Name Colors</label>
									<input type="checkbox" id="enableColorNames" class="toggle yes-no" v-model="colorPrefs.customNames"/>
								</div>
								<!-- Separate colors -->
								<div class="flex mtop-md between">
									<label class="vertical" for="colorGapTog">Gap Between Colors</label>
									<input type="checkbox" id="colorGapTog" class="toggle yes-no" v-model="colorPrefs.colorGap"/>
								</div>
								<!-- Reset Palette -->
								<button class="button mtop-lg mbottom-lg margin-auto block" @click="clearPalette()" :class="{'red' : resetting_palette, 'grey': !resetting_palette}">
									<i :class="{'far fa-exclamation-circle' : resetting_palette, 'far fa-eraser' : !resetting_palette}"></i>
									<span>{{resetting_palette ? "Again to Confirm" : "Reset Palette"}}</span>
								</button>
							</div>

						</div>
					</div>
				</transition-group>


			</div>

		</div>


		<!-- Modals -->
		<!-- Confirm delete things -->
		<Confirm v-if="confirm_modal && confirm_modal[0]" title="Are you sure?" icon="fas fa-exclamation-circle" color="red" 
			:confirmText="'Delete ' + (confirm_modal[0] == 'color' ? 'Color': 'Palette')" 
			confirmIcon="fas fa-trash-alt" cancelText="No, Cancel" 
			v-on:confirmFalse="confirm_modal = null" v-on:confirmTrue="handleConfirmModal()">
			<p class="no-padding" v-if="confirm_modal[0] == 'color'">
				You are about to delete a color. <small class="block">This can <b>not</b> be undone.</small>
			</p>
			<p class="no-padding" v-else-if="confirm_modal[0] == 'palette'">
				You are about to delete your palette <b>{{confirm_modal[1]}}</b>. <small class="block ptop-xs">This can <b>not</b> be undone.</small>
			</p>
			<p v-else>Something went wrong. I can't tell what you're trying to do. <small class="block">You're not ever supposed to see this.</small></p>
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
import Callout from "@/components/ui/Common/Callout";
import Confirm from "@/components/ui/Modals/Confirm";
import Modal from "@/components/ui/Modals/Modal";
import debounce from "lodash/debounce";


export default {
	name: "Colors",

	components: {
		Callout,
		Confirm,
		Modal,
	},

	mixins: [
	],

	data() {

		return {
			// App Settings
			colorPrefs: {
				enableOpacity: false,
				enableCheckers: false,
				stageBackground: "#FFFFFF",
				customNames: false,
				colorGap: false,
			},

			// Current Palette
			currentPalette: [
				{
					r: 0,
					g: 70,
					b: 220,
					a: 255,
					adjust: true,
					shades: false,
					name: "Color-1",
				},
			],

			// Saved Palettes
			storedPalettes: [],
			editing_stored_key: null,

			// App Functions
			view_sidebar: null,
			active_color_format: "RGB/A",
			confirm_modal: null, // [tpe, key]
			// Saving
			nameToSave: "",
			// Exporting
			export_modal: false,
			exporting_as: "CSS",
			// Deleting
			deleting_color: null,
			deleting_palette: null,
			resetting_palette: false,
			// Colorblind
			colorblind: "none",
			// Contrast
			contrast_enabled: false,
			contrast_demo_text: "",
			contrast_color_r: 255,
			contrast_color_g: 255,
			contrast_color_b: 255,
			contrast_reverse: false,
			re_enable_opacity: false,


			// App Definitions / Loops
			secondary_nav: [
				// {title: "Adjust / View", id: "adjust",  icon: "fas fa-dial"},
				{title: "Color Blindness", id: "colorblind",  icon: "fas fa-glasses"},
				{title: "Contrast", id: "contrast",  icon: "fas fa-circle-half-stroke"},
				{title: "Export", id: "export",  icon: "fas fa-share-nodes"},
				{title: "Save / Load", id: "save",  icon: "fas fa-floppy-disk"},
				{title: "Settings", id: "settings",  icon: "fas fa-bars"},
			],
			slider_definitions: [
				{label: "Red", id: "r", sliderClass: "red"},
				{label: "Green", id: "g", sliderClass: "green"},
				{label: "Blue", id: "b", sliderClass: "blue"},
			],
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

			
		};
	},

	computed: {
		// storedPalettes_sort() {
			// return this.storedPalettes.slice().sort((a, b) => new Date(b.saved)- new Date(a.saved));
		// },
	},


	watch: {
		// When current palette changes, update URL
		currentPalette: {
			handler: function(value) {
				this.debounceURLParams();
			},
			deep: true,
		},
	},
	
	mounted() {
		// Load Params if they exist
		if(this.$route.params.urlColors){
			this.loadURLColors();
		}
		// Get stored palettes from store/localstorage
		if(this.$store.getters["User/apps"].colors.data["palettes"]){
			this.storedPalettes = this.$store.getters["User/apps"].colors.data["palettes"];	
		}
	},
	created: function () {
	},

	beforeDestroy(){
	},
	
	methods: {
		
		// Debounce so URL Params are only updated ever second, max
		debounceURLParams: debounce(function(){
			this.updateURLParams();
		}, 1000),
		updateURLParams: function(){
			let _this = this;
			var urlParams = "";
			Object.keys(_this.currentPalette).forEach(function(key){
				var loopParams = _this.currentPalette[key].name + "=" + _this.currentPalette[key].r + "," + _this.currentPalette[key].g + "," + _this.currentPalette[key].b + "," + _this.currentPalette[key].a;
				if(key == 0){
					urlParams =  loopParams;
				}else{
					urlParams = urlParams + "&" + loopParams;
				}
			});
			if(this.currentPalette.length){
				this.$router.replace({ name: "colors", params: {urlColors: urlParams} }).catch(()=>{});
			}
		},
		// Load Colors from URL into app
		loadURLColors: function(){
			let _this = this;
			var splitColors = this.$route.params.urlColors.split("&");

			var loadedPalette = [];
			splitColors.forEach(function(color) {
				var colorSplit = color.split("=");
				var rgbSplit = colorSplit[1].split(",");

				// If any colors are opaque, enable opacity
				if(rgbSplit[3] && rgbSplit[3] < 255){
					_this.colorPrefs.enableOpacity = true;
				}

				var singleColor = {
					name: colorSplit[0],
					r: rgbSplit[0],
					g: rgbSplit[1],
					b: rgbSplit[2],
					a: rgbSplit[3] || 255,
					adjust: false,
					shades: false,
				};

				loadedPalette.push(singleColor);
			});

			// Set current palette from load
			this.currentPalette = loadedPalette;

		},


		// Make sidebar visible
		toggleSidebar: function(name){
			// // Disable opacity when contrast viewed
			if(name == "contrast" && this.colorPrefs.enableOpacity){
				this.hello("Disabling Opacity...", "fas fa-wand-magic-sparkles", "yellow");
				this.colorPrefs.enableOpacity = false;
				this.re_enable_opacity = true;
			}else if(this.re_enable_opacity){
				this.hello("Opacity is back...", "fas fa-eyes", "yellow");
				this.colorPrefs.enableOpacity = true;
				this.re_enable_opacity = false;
			}

			// Clear if same one clicked
			if(this.view_sidebar == name){
				this.view_sidebar = null;
			}else{
				// Else set as name
				this.view_sidebar = name;
			}
		},

		// Actiona that need confirming
		handleConfirmModal: function(){
			var data = this.confirm_modal;
			if(data[0] == "color"){
				this.removeColor(data[1]);
			}else if(data[0] == "palette"){
				this.deletePalette(data[1]);
			}
			this.confirm_modal = null;
		},

		// Add new (random) color to palette
		addColor: function(){
			var newColor = {
				r: Math.floor(Math.random() * 255),
				g: Math.floor(Math.random() * 255),
				b: Math.floor(Math.random() * 255),
				a: 255,
				adjust: false,
				shades: false,
				name: "Color-" + (this.currentPalette.length + 1),
			};
			this.currentPalette.push(newColor);
		},

		// Remove color from current palette
		removeColor: function(index){
			this.currentPalette.splice(index, 1);
		},

		// Reset Palette
		clearPalette: function(){
			let _this = this;

			if(this.resetting_palette){
				this.currentPalette = [{
					r: 0,
					g: 71,
					b: 219,
					a: 255,
					adjust: false,
					name: "Color-1",
				}];
				this.resetting_palette = false;
				this.hello("Poof!", "fas fa-wand-magic-sparkles", "yellow");
			}else{
				this.resetting_palette = true;
				setTimeout(function(){
					_this.resetting_palette = false;
				}, 5000);
			}
		},	

		// Save Palette
		savePalette: function(){
			// let _this = this;
			// this.$store.dispatch("Hold/LOADING", "data");
			var dataToSave = {
				name: this.nameToSave,
				colors:JSON.parse(JSON.stringify(this.currentPalette)),
				// colors: {...this.currentPalette},
				saved: new Date(),
				colors:JSON.parse(JSON.stringify(this.currentPalette)),
				preferences: JSON.parse(JSON.stringify(this.colorPrefs)),
			};

			this.hello(this.nameToSave + " Saved!", "fas fa-check-circle", "green");

			// Save as new
			if(this.editing_stored_key == null){
				this.storedPalettes.push(dataToSave);
				console.log("SAVING");
				console.log(this.storedPalettes);
				console.log(this.storedPalettes.length);
				this.editing_stored_key = this.storedPalettes.length - 1;
			}else{ // Changes
				this.$set(this.storedPalettes, this.editing_stored_key, dataToSave);
			}

			this.syncStoredPalettes();
		},

		// Load Palette
		loadPalette: function(palette, key){
			console.log("RECEIVED KEY");
			console.log(key);
			this.currentPalette = JSON.parse(JSON.stringify(palette.colors));
			this.colorPrefs = JSON.parse(JSON.stringify(palette.preferences));
			this.nameToSave = JSON.parse(JSON.stringify(palette.name));
			this.hello(this.nameToSave + " loaded!", "fas fa-check-circle", "green");
			this.editing_stored_key = key;
		},

		// Delete Palette
		deletePalette: function(key){
			this.storedPalettes.splice(key, 1);
			// delete this.storedPalettes[key];
			this.syncStoredPalettes();
		},

		// Sync stored palettes with store / local storage
		syncStoredPalettes: function(){
			this.$store.commit("User/SET_APP_DATA_FIELD", {app: "colors", key: "palettes", value: JSON.parse(JSON.stringify(this.storedPalettes)) });
			this.$store.dispatch("User/DEBOUNCE_SAVE_APP_DATA");
		},

		// Export functions
		exportWith: function(key){
			if(key == "Link"){
				this.share("Link", window.location.href)
				// this.copyToClipboard(window.location.href);
				this.hello("Link copied to Clipboard!", "far fa-copy", "green");
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
			return (yiq >= 128) ? "black" : "white";
		},
		colorStyleProperties: function(key){
			var props = {};
			var color = this.currentPalette[key];
			// Viewing Contrast
			if(this.contrast_enabled){
				if(this.contrast_reverse){
					var props = {
						color: "rgb(" + this.contrast_color_r + "," + this.contrast_color_g + "," + this.contrast_color_b + ")",
						backgroundColor: "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (color.a/255) + ")",
					};
				}else{
					var props = {
						color: "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (color.a/255) + ")",
						backgroundColor: "rgb(" + this.contrast_color_r + "," + this.contrast_color_g + "," + this.contrast_color_b + ")",
					};
				}

			}else{
				// Color background, Automatic black/white text fron getTextColor()
				var props = {
					color: this.getTextColor(color.r, color.g, color.b),
					backgroundColor: "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (color.a/255) + ")",
					// backgroundColor: this.RGBToHex(color.r, color.g, color.b, color.a),
				};
			};
			// Add border if color Gap enabled
			// if(this.colorPrefs.colorGap){
			// 	props["border"] = "4px solid "+ this.colorPrefs.stageBackground;
			// }
			return props;
		},

		// Updates RGB value when user enters their own HEX
		updateRGBValue: function(event, key){
			let _this = this;
			this.HexToRGB(event.target.value).then(function(rgb) {			
				_this.currentPalette[key].r = rgb[0];
				_this.currentPalette[key].g = rgb[1];
				_this.currentPalette[key].b = rgb[2];
				if(rgb[3]){
					_this.currentPalette[key].a = rgb[3];
				}else{
					_this.currentPalette[key].a = 255;
				}
			}).catch(function(error) {
				_this.hello("Invalid HEX. Try again.", "fas fa-frown", "red");
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
				if(hash != false){string = "#";}
				var string = (string + r + g + b + a).toUpperCase();
				return string;
			}else{
				var string = "";
				if(hash != false){string = "#";}
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
					// a = +(a / 255).toFixed(2);
					var final = [+r, +g, +b, +a];
					resolve(final);
				}else{
					reject();
				}
			});
		},

		// Luminance
		luminance: function(r, g, b){
			var a = [r, g, b].map(function (v) {
				v /= 255;
				return v <= 0.03928
					? v / 12.92
					: Math.pow( (v + 0.055) / 1.055, 2.4 );
			});
			return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
		},
		// Calculate Contrast Ratio
		contrastRatio: function(color){
			var color1Lum = this.luminance(color["r"], color["g"], color["b"]);
			var color2Lum = this.luminance(this.contrast_color_r, this.contrast_color_g, this.contrast_color_b);
			var ratio = (color2Lum + 0.05) / (color1Lum + 0.05);
			return ratio.toFixed(2);
		},




	}
};

</script>


<style lang="scss">

#colorApp{
	display: flex;
	flex-direction: column;
	max-height: 100vh;	
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
	&.gap{
		gap: 15px;
		.color_block{
			border-radius: var(--borderRadius);
			overflow: hidden;
		}
	}
	&.padded{
		padding: 12px;
	}

	.color_block{
		flex-grow: 3;
		background-color: var(--red);
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		page-break-inside: avoid;
		position: relative;

		@media (min-width: $screenSM) {
			min-height: 300px;
		}

		.color_block_info{
			box-sizing: border-box;
			color: inherit;
			box-sizing: border-box;
			padding-top: 40px;

			// Color Name
			h6{
				font-size: 0.75em;
				font-weight: 500;
				color: inherit;
				margin: 0;
				padding :10px 0 0 20px;
			}
			.color_name_input{
				font-size: 0.8em;
				border: none;
				padding: 8px 12px;
				margin: 0 8px 0 8px;
				color: inherit;
				background-color: transparent;
				width: auto;
				height: auto;
			}

			.format_code,
			.hex_code{
				display: block;
				font-weight: 600;
				letter-spacing: 0.05em;
				font-size: 1em;
				margin: 0;
				padding: 6px 18px;
				border-top-right-radius: var(--borderRadius);
				border-bottom-right-radius: var(--borderRadius);
				color: inherit;
				text-align: left;
				font-family: inherit;

				&:hover{
					background-color: rgba(0,0,0,0.1);
				}
			}
			.hex_code{
				text-transform: uppercase;
				font-size: 1.65em;
				font-weight: 700;
			}
		}

		// Control buttons for colors
		.color_block_controls{
			display: flex;
			color: inherit;
			opacity: 0;
			padding-left: 10px;
			position: absolute;
			top: 8px;
			left: 0px;

			@media (max-width: $screenSM) {
				opacity: 0.8;
			}
			@media print{
				display: none;
			}

			button{
				font-size: 1em;
				color: inherit;
				border-radius: var(--borderRadius);
				height: 32px;
				width: 32px;
				text-align: center;
				border: 1px solid transparent;
				padding: 0;


				&:hover{
					background-color: rgba(0,0,0,0.1);
					font-size: 1.1em;
				}
			}
		}

		// Edit / Slider area
		#color_block_sliders{
			margin: 20px 20px 0 20px;

			@media print{
				display: none;
			}

			.cbs_row{
				display: flex;
				// flex-wrap: wrap;
				justify-content: space-between;
				max-width: 240px;

				label{
					color: inherit;
					font-size: 0.7em;
					height: 20px;
					width: 80px;
					padding: 0 0 0 8px;
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
					width: 50px;
					overflow: visible;
					text-align: right;
					position: relative;
					left: 0;
					font-size: 0.8em;
					background-color: transparent;
					padding: 0 5px 0 5px;
					&::-webkit-outer-spin-button,
					&::-webkit-inner-spin-button {
						-webkit-appearance: none;
						margin: 0;
					}

				}
				// Range adjustments
				input[type=range]{
					flex-grow: 3;
					width: 100%;
					margin-top: 4px;
				}
				// Edit HEX Input
				.color_transparent_input{
					background-color: transparent;
					border: none;
					max-width: 100%;
					text-align: left;
					color: inherit;
					font-size: 0.9em;
					padding: 7px 15px;
					height: auto;
					background-color: rgba(255,255,255,0.1);
				} 

			}
			
		}

		// Shades
		.color_block_shades{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 100;
			display: flex;
			flex-direction: column;

			.shade{
				display: block;
				width: 100%;
				flex-grow: 3;
				color: inherit;
				font-weight: 600;
				font-size: 0.8em;

				&:hover{
					padding-top: 18px;
					padding-bottom: 18px;
				}
			}
		}

		//  Contrast Area
		.color_block_contrast{
			box-sizing: border-box;
			padding: 20px;
			color: inherit;

			.ratio{
				color: inherit;
				font-size: 1.75em;
				margin-bottom: 15px;

				b{
					font-size: 2.5rem;
					font-weight: 800;
				}
			}
			
			.tags{
				margin-top: 4px;
				margin-bottom: 10px;
			}
			.large-text{
				font-size: 18pt;
				padding-bottom: 2px;
			}
			p{
				font-size: 14pt;
				line-height: 1.325em;
				color: inherit;
				padding: 0;
			}
			
		}

		// Luminance
		.color_block_luminance{
			background-color: red;
		}
		

		&:hover,
		&:focus-within{
			.color_block_controls{
				opacity: 0.8;
			}
		}
	}
	
}

// Special wcag tags
.wcag-tag{
	opacity: 0.85;
	background-color: #fbd2d0;
	color: #5f0d07;
	border-radius: calc(var(--borderRadius) / 2);
	box-sizing: border-box;
	padding: 3px 4px;
	display: inline-block;
	font-size: 0.65rem;
	font-weight: 700;
	border: 2px solid #5f0d07;

	&:after{content: " Fail";}

	&.green{
		border-color: #0d5f07;
		background-color: #c6ffc3;
		color: #0d5f07;
		&:after{content: " Pass";}
	}
}


// List of palettes from local storage
.palette-view{
	.pv_bar{
		width: 100%;
		background-color: var(--grey);
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		padding:  0 7px 0 10px;
		border-bottom-left-radius: var(--borderRadius);
		border-bottom-right-radius: var(--borderRadius);
	
		.pv__i{
			flex-grow: 3;
			font-size: 0.65em;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: left;
			padding: 5px 0;

			b{
				font-size: 0.95rem;
				font-weight: 500;
				padding-bottom: 2px;
			}
		}
		// Palette view Actions
		.pv__a{
			font-size: 0.9em;
			padding: 6px;
			margin: 6px 0;
			border-radius: var(--borderRadius);
			opacity: 0;
			@media (max-width: $screenSM) {opacity: 1;}

			&:hover{
				overflow: 1;
				cursor: pointer;
				background-color: rgba(0,0,0,0.05);

				&.red{color: var(--red);}
			}
		}

		// Show action buttons on hover
		&:hover{
			.pv__a{
				opacity: 1;
			}
		}


	}
}
// Preview for palettes
.palette-preview{
	display: flex;
	border-radius: var(--borderRadius);

	&.hoverable:hover{
		cursor :pointer;
	}

	.palette-preview-color{
		display: block;
		height: 42px;
		flex-grow: 3;

		&:first-child{
			border-top-left-radius: var(--borderRadius);
			// border-bottom-left-radius: var(--borderRadius);
		}
		&:last-child{
			border-top-right-radius: var(--borderRadius);
			// border-bottom-right-radius: var(--borderRadius);
		}
	}
}



</style>