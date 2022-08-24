<!--
	Shadows App
-->

<template>
	<div class="fixed-page" id="shadowsApp">

		<!-- Secondary nav / Toolbar -->
		<nav class="secondary-nav">

			<label>Shadows</label>

			<!-- Gap -->
			<div class="spacer"></div>

			<!-- Loop for other secondary buttons -->
			<button v-for="(button, key) in secondary_nav" :key="key" @click="toggleSidebar(button.id)" 
				:class="{'notification-dot': (button.id == 'settings' && tilt_mode)}">
				<i :class="view_sidebar == button.id ? 'fas fa-times' : button.icon"></i>
				<span class="hint left">{{button.title}}</span>
			</button>
		</nav>



		<div class="app-layout stack">

			<div class="app-stage" :style="'background: ' + working.background + ' !important;'">
				<div id="shadowStage" v-html="working.targetHTML"></div>
			</div>
			<!-- Target CSS -->
			<v-style>{{working.targetCSS}}</v-style>
			<!-- Shadow CSS -->
			<v-style>
				#target{
					box-shadow: {{generateShadow}};
				}
			</v-style>


			<!-- Sidebar -->
			<div class="app-sidebar stack" :class="{'expanded': view_sidebar != null}">

				<transition-group name="basic">

					<!-- Layers -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'layers'" key="layers">
						<div class="app-sidebar-content-scroll">
							<h3>Shadow Layers</h3>

							<!-- Layer count buttons -->
							<div id="shadowLayers">
								<button v-for="(shadow, key) in working.shadow" @click="active_layer = key" :key="key" :class="{'active' : active_layer == key}">
									{{key + 1}}
								</button>
								<button @click="addLayer()" id="newLayerButton">
									<i class="fas fa-plus"></i>
								</button>
							</div>


							<div class="padded">
								<h4 class="mtop-sm">Adjust Layer {{active_layer + 1}}</h4>

								<!-- X Position -->
								<div class="flex mtop-sm">
									<label for="shadowX" class="vertical text-small pright-xxs w100">Horizontal</label>
									<input type="range" id="shadowX" min="-200" max="200" v-model="working.shadow[active_layer].x"/>
									<div class="vertical"><input type="number" class="small no-controls fit mleft-xs" v-model="working.shadow[active_layer].x" max="1000" min="-1000"/></div>
								</div>
								<!-- Y Position -->
								<div class="flex mtop-xs">
									<label for="shadowY" class="vertical text-small pright-xxs w100">Vertical</label>
									<input type="range" id="shadowY" min="-200" max="200" v-model="working.shadow[active_layer].y"/>
									<div class="vertical"><input type="number" class="small no-controls fit mleft-xs" v-model="working.shadow[active_layer].y" max="1000" min="-1000"/></div>
								</div>
								<!-- Blur -->
								<div class="flex mtop-xs">
									<label for="shadowBlr" class="vertical text-small pright-xxs w100">Blur</label>
									<input type="range" id="shadowBlr" min="0" max="200" v-model="working.shadow[active_layer].blur"/>
									<div class="vertical"><input type="number" class="small no-controls fit mleft-xs" v-model="working.shadow[active_layer].blur" max="1000" min="0"/></div>
								</div>
								<!-- Spread -->
								<div class="flex mtop-xs">
									<label for="shadowSpr" class="vertical text-small pright-xxs w100">Spread</label>
									<input type="range" id="shadowSpr" min="-200" max="200" v-model="working.shadow[active_layer].spread"/>
									<div class="vertical"><input type="number" class="small no-controls fit mleft-xs" v-model="working.shadow[active_layer].spread" max="1000" min="-1000"/></div>
								</div>

								<!-- Color -->
								<div class="mtop-md">
									<div class="input-group max-width-small mtop-sm">
										<label for="shadowCol" class="input-group-label">Color:</label>
										<input id="shadowCol" type="text" placeholder="#1F1F1F" v-model="working.shadow[active_layer].hex" @change="shadowColorInput($event.target.value)"/>
										<input type="color" @change="shadowColorPicker($event.target.value)" v-model="working.shadow[active_layer].hex"/>
									</div>
								</div>
								<small class="align-right block text-small text-light">RGB/A or Hex values accepted</small>
								<!-- Color Opacity -->
								<div class="flex mtop-xs">
									<label for="shadowOpac" class="vertical text-small pright-xxs w100">Opacity</label>
									<input type="range" id="shadowOpac" min="0" max="1" step="0.01" v-model="working.shadow[active_layer].opacity"/>
									<div class="vertical"><input type="number" class="small no-controls fit mleft-xs" v-model="working.shadow[active_layer].opacity" max="1" min="0" step="0.01"/></div>
								</div>


								<div class="flex end">
									<button class="button small mtop-md red block" @click="deleteLayer()" v-if="working.shadow.length > 1">
										<i class="fas fa-trash-alt"></i>
										<span>Delete Layer {{active_layer + 1}}</span>
									</button>
								</div>

								<div class="mtop-md"></div>
								<h4>CSS Output</h4>
								<textarea :value="'box-shadow: ' + generateShadow" class="text-small code mtop-sm" id="shadowCSS"></textarea>
								<button class="button small mtop-xs mbottom-lg" @click="copyExportToClipboard('shadowCSS')">
									<i class="fas fa-copy"></i>
									<span>Copy</span>
								</button>


							</div>
							
							
						</div>



					</div>

					<!-- Target Element -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'target'" key="target">
						<h3>Target Element</h3>

						<div class="app-sidebar-content-scroll padded">
							<!-- Page BG Color -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="bgcolIn">Background</span>
								<input type="text" id="bgcolIn" v-model="working.background" placeholder="#FFFFFF"/>
							</div>
							<p class="small mtop-sm">
								You can change the HTML and CSS for the shadow target element, just make sure the element(s) you want the shadow to apply to use the <code>#target</code> ID. 
							</p>
							<!-- Target HTML -->
							<label class="mtop-sm">Target Element HTML</label>
							<textarea v-model="working.targetHTML" class="text-small code mtop-xxs pre"></textarea>
							<!-- Target CSS -->
							<label class="mtop-md">Target Element CSS</label>
							<textarea v-model="working.targetCSS" class="text-small code mtop-xxs tall mbottom-xl pre"></textarea>
						</div>
					</div>

					
					<!-- Save -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'save'" key="save">
						<h3>Save</h3>

						<!-- Save Form -->
						<form @submit.prevent="saveShadow" class="padded mbottom-md mtop-sm">
							<div class="button-input small">
								<input type="text" id="saveNameIn" placeholder="Name" v-model="name_to_save"/>
								<button class="button" :disabled="!name_to_save.length" :class="{'green' : editing_stored_key != null}">
									<i class="fas fa-floppy-disk"></i>
									<span>{{editing_stored_key != null ? "Save Changes" : "Save New"}}</span>
								</button>
							</div>
							<!-- Save as new -->
							<button type="button" v-if="editing_stored_key != null" @click="editing_stored_key = null" class="text-smaller align-center ptop-xxs text-primary">Or save as new Shadow.</button>
						</form>

						<!-- Load existing -->
						<h3>Saved Shadows</h3>
						<!-- Scrollable saved list -->
						<transition name="basicup">
							<div class="app-sidebar-content-scroll pbottom-lg ptop-sm" v-if="!$store.getters['Hold/isLoading']">
								<!-- Stored shadows from local storage, loop to create display -->
								<transition-group name="list">
									<div v-for="(shadow, key) in stored_shadows" class="saved-list mbottom-xs padded" :key="key" :class="{'active' : editing_stored_key == key}">
										<!-- Shadow Info & Controls -->
										<div class="sl__bar">
											<button class="sl__i" @click="loadShadow(shadow, key)">
												<b>{{shadow.name}}</b>
												{{$date(shadow.saved).format("MMMM D YYYY - h:mma")}}
											</button>
											<!-- Controls -->
											<button class="sl__a red" title="Delete Shadow" @click="$store.getters['User/preferences'].confirm_action ? confirm_delete_shadow = key : deleteShadow(key)"><i class="fas fa-trash-alt"></i></button>
										</div>
									</div>
								</transition-group>

								<!-- No stored shadows -->
								<div class="padded mtop-xs" v-if="stored_shadows && !Object.keys(stored_shadows).length">
									<Callout icon="far fa-empty-set" size="small" color="red">
										<p class="small">You haven't saved anything yet.</p>
									</Callout>
								</div>	

							</div>
						</transition>

					</div>

					<!-- More -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'settings'" key="more">
						<h3>Shadow Settings</h3>
						<div class="padded">
							<!-- Units -->
							<div class="input-group max-width-small mtop-sm">
								<span class="input-group-label small" for="shUnits">Units</span>
								<div class="aselect">
									<select v-model="working.units" id="shUnits">
										<!-- <option v-for="format in color_formats" :value="format" :key="format">{{format}}</option> -->
										<option value="px">Pixels - px</option>
										<option value="em">em</option>
										<option value="rem">rem</option>
									</select>
								</div>
							</div>
						</div>

						<div class="padded mtop-sm" v-if="$store.getters['Device/hasTouch']">
							<div class="flex mtop-xxs between">
								<label class="vertical" for="tiltTog">Tilt Mode</label>
								<input type="checkbox" id="tiltTog" class="toggle on-off" v-model="tilt_mode" @change="toggleTilt()"/>
							</div>
							<p class="small">
								Tilt mode isn't really practical, but it's fun. It uses your device's orientation sensors to control the shadow position.
							</p>
						</div>

						<!-- Gap -->
						<div class="mtop-md"></div>

						<h4>Danger</h4>
						<!-- Reset Shadow -->
						<button class="button mtop-sm mbottom-lg margin-auto block" @click="resetDefault()" :class="{'red' : resetting_default, 'grey': !resetting_default}">
							<i :class="{'far fa-exclamation-circle' : resetting_default, 'far fa-eraser' : !resetting_default}"></i>
							<span>{{resetting_default ? "Again to Confirm" : "Reset Shadow"}}</span>
						</button>
					</div>
				</transition-group>


			</div>

		</div>


		<!-- Modals -->
		<!-- Confirm delete things -->
		<Confirm v-if="confirm_delete_shadow != null" title="Are you sure?" icon="fas fa-exclamation-circle" color="red" confirmText="Delete Shadow"  confirmIcon="fas fa-trash-alt" cancelText="No, Cancel" v-on:confirmFalse="confirm_delete_shadow = null" v-on:confirmTrue="deleteShadow(confirm_delete_shadow);">
			<p class="no-padding">
				You are about to delete your saved shadow <b>{{stored_shadows[confirm_delete_shadow].name}}</b>. <small class="block">This can <b>not</b> be undone.</small>
			</p>
		</Confirm>

		
	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Common/Callout";
import Confirm from "@/components/ui/Modals/Confirm";


export default {
	name: "Shadows",

	components: {
		Callout,
		Confirm,
	},

	mixins: [
	],

	data() {
		return {
			active_layer: 0,
			working: {
				units: "px",
				background: "#FFFFFF",
				targetHTML: "<div class=\"s-card\" id=\"target\">\n    <i class=\"fas fa-hand-wave\">\n</div>",
				targetCSS: ".s-card{\n    display: block; \n    box-sizing: border-box; \n    padding: 50px 100px; \n    border-radius: 5px; \n    background: #FFFFFF;\n    border: 1px solid rgba(24, 48, 98, 0.1);\n    font-size:52px;\n    color: #00131C; \n}",
				shadow: [
					{
						x: 0,
						y: 15,
						blur: 25,
						spread: -4,
						hex: "#F1F1F1",
						r: 150,
						g: 150,
						b: 150,
						opacity: "0.24",
					}
				]
			},
			view_sidebar: "layers",
			resetting_default: false,

			// Tilt
			tilt_mode: false,

			// Saving
			name_to_save: "",
			editing_stored_key: null,
			confirm_delete_shadow: null, // key of shadow
			// Stored
			stored_shadows: [],

			secondary_nav: [
				// {title: "Adjust / View", id: "adjust",  icon: "fas fa-dial"},
				{title: "Shadow Layers", id: "layers",  icon: "fas fa-layer-group"},
				{title: "Target Element", id: "target",  icon: "fas fa-bullseye"},
				{title: "Save / Load", id: "save",  icon: "fas fa-floppy-disk"},
				{title: "Settings", id: "settings",  icon: "fas fa-bars"},
			],

		};
	},

	computed: {
		generateShadow(){
			var string = "";
			var shadow = this.working.shadow;

			for (let layer of shadow) {
				string = string + layer.x + this.working.units + " " +  layer.y + this.working.units + " " +  layer.blur + this.working.units + " " +  layer.spread + this.working.units + " rgba(" +  layer.r + ", " + layer.g + ", " + layer.b + ", " + layer.opacity + "), ";
			}
			string = string.slice(0, -2);
			return string;
		},
	},

	watch: {
		
	},
	
	mounted() {
		// Get stored shadows from store/localstorage
		if(this.$store.getters["User/apps"].shadows.data["saved"]){
			this.stored_shadows = this.$store.getters["User/apps"].shadows.data["saved"];
		}
	},
	created: function () {
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

		// Add new layer to shadow
		addLayer: function(){
			this.working.shadow.push({
				x: this.working.shadow[this.active_layer].x,
				y: this.working.shadow[this.active_layer].y,
				blur: this.working.shadow[this.active_layer].blur,
				spread: this.working.shadow[this.active_layer].spread,
				r: this.working.shadow[this.active_layer].r,
				g: this.working.shadow[this.active_layer].g,
				b: this.working.shadow[this.active_layer].b,
				opacity: this.working.shadow[this.active_layer].opacity,
				hex: this.working.shadow[this.active_layer].hex,
			})
			this.active_layer = this.working.shadow.length - 1;
		},

		// Delete active layer, switch to previous
		deleteLayer: function(){
			this.working.shadow.splice(this.active_layer, 1);
			this.active_layer = this.active_layer - 1;
			if(this.active_layer < 0){this.active_layer = 0}
		},


		// Resets to default
		resetDefault: function(){
			let _this = this;

			if(this.resetting_default){
				this.resetting_default = false;
				this.working = {
					units: "px",
					background: "#FFFFFF",
					targetHTML: "<div class=\"s-card\" id=\"target\">\n    <i class=\"fas fa-hand-wave\">\n</div>",
					targetCSS: ".s-card{\n    display: block; \n    box-sizing: border-box; \n    padding: 50px 100px; \n    border-radius: 5px; \n    background: #FFFFFF;\n    border: 1px solid rgba(24, 48, 98, 0.1);\n    font-size:52px;\n    color: #00131C; \n}",
					shadow: [
						{
							x: 0,
							y: 15,
							blur: 25,
							spread: -4,
							hex: "#F1F1F1",
							r: 150,
							g: 150,
							b: 150,
							opacity: "0.24",
						}
					]
				}
				this.hello("Poof!", "fas fa-wand-magic-sparkles", "yellow");
			}else{
				this.resetting_default = true;
				setTimeout(function(){
					_this.resetting_default = false;
				}, 5000);
			}
		},	

		// Save shadow to local storage
		saveShadow: function(){
			var dataToSave = {
				name: this.name_to_save,
				saved: this.$date(),
				data:JSON.parse(JSON.stringify(this.working)),
			};

			this.hello(this.name_to_save + " Saved!", "fas fa-check-circle", "green");

			// Save as new
			if(this.editing_stored_key == null){
				this.stored_shadows.push(dataToSave);
				this.editing_stored_key = this.stored_shadows.length - 1;
			}else{ // Changes
				this.$set(this.stored_shadows, this.editing_stored_key, dataToSave);
			}

			this.syncStoredShadows();

		},
		// Load shadow from storage
		loadShadow: function(shadow, key){
			this.working = JSON.parse(JSON.stringify(shadow.data));
			this.name_to_save = JSON.parse(JSON.stringify(shadow.name));
			this.hello(this.name_to_save + " loaded!", "fas fa-check-circle", "green");
			this.editing_stored_key = key;
		},
		// Load shadow from storage
		deleteShadow: function(key){
			this.stored_shadows.splice(key, 1);
			this.syncStoredShadows();
			if(key == this.editing_stored_key){
				this.editing_stored_key = null;
			}
			// Close modal
			this.confirm_delete_shadow = null;
		},
		// Sync with local storage
		syncStoredShadows: function(){
			this.$store.commit("User/SET_APP_DATA_FIELD", {app: "shadows", key: "saved", value: JSON.parse(JSON.stringify(this.stored_shadows)) });
			this.$store.dispatch("User/DEBOUNCE_SAVE_APP_DATA");
		},

		// Actions that need confirming
		handleConfirmModal: function(){
			var data = this.confirm_modal;
			if(data[0] == "shadow"){
				this.deleteShadow(data[1]);
			}
			this.confirm_delete_shadow = null;
		},

		// Check if color text input is valid
		shadowColorInput: function(a){

			if(a.includes("#") || a.length == 3 || a.length == 6 || a.length == 8) {
				var color = a.replace("#", "").toLowerCase();
				// Convert to RGB, set as value
				this.shadowColorPicker(color);
			} else {
				// RGB
				var rgb = a.replace(/[^0-9.,]/g, "").split(",");
				if(rgb.length < 3){
					this.hello("Invalid color. Try again.", "fas fa-frown", "red");
				}
				// Valid rgb
				else{
					this.working.shadow[this.active_layer].r = rgb[0];
					this.working.shadow[this.active_layer].g = rgb[1];
					this.working.shadow[this.active_layer].b = rgb[2];

					// Set opacity if exists
					if(rgb[3] && parseFloat(rgb[3]) < 1){
						this.working.shadow[this.active_layer].opacity = rgb[3];
					}

					// Convert back to hex for color picker
					var xr = parseInt(rgb[0]).toString(16);
					var xg = parseInt(rgb[1]).toString(16);
					var xb = parseInt(rgb[2]).toString(16);
					if (xr.length == 1)
						xr = "0" + xr;
					if (xg.length == 1)
						xg = "0" + xg;
					if (xb.length == 1)
						xb = "0" + xb;
					this.working.shadow[this.active_layer].hex =   "#" + xr + xg + xb;
				}

			}
		},
		shadowColorPicker: function(color){
			let _this = this;

			this.HexToRGB(color).then(function(rgb) {			
				_this.working.shadow[_this.active_layer].r = rgb[0];
				_this.working.shadow[_this.active_layer].g = rgb[1];
				_this.working.shadow[_this.active_layer].b = rgb[2];

			}).catch(function(error) {
				console.log(error)
				_this.hello("Invalid HEX. Try again.", "fas fa-frown", "red");
			});
		},

		// Convert Hex to RGB
		HexToRGB: function(h){
			return new Promise((resolve, reject) => {
				h = h.replace("#", "");
				let r = 0, g = 0, b = 0, a = 1;
				// 3 letter hex
				if (h.length == 3 ) {
					r = "0x" + h[0];
					g = "0x" + h[1] ;
					b = "0x" + h[2];
					var final = [+r, +g, +b];
					resolve(final);
				}
				// No opacity
				if (h.length == 6 ) {
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


		// Toggle Tilt Mode
		toggleTilt: function(){
			let _this = this;
			// Get sensor type if its available
			var sensor = "";
			var addListener = function(sensor){
				_this.tilt_mode = true;
				window.addEventListener(sensor, _this.tiltShadow)
			}
			
			// If it's already running, stop it
			if(!_this.tilt_mode){
				window.removeEventListener("deviceorientation", _this.tiltShadow); 
				window.removeEventListener("MozOrientation", _this.tiltShadow); 
				_this.tilt_mode = false;
			}
			// Else start it
			else{
				// iOS requires permission request before
				if (typeof DeviceOrientationEvent.requestPermission === 'function') {
					DeviceOrientationEvent.requestPermission()
					.then(permissionState => {
						if (permissionState === 'granted') {
							addListener("deviceorientation");
							_this.hello("Tilt your device to adjust the shadow.", "far fa-sync-alt")
						}else{
							_this.hello("Device orientation permission denied.", "far fa-times-circle", "red")
						}
					})
					.catch(console.error);
				}
				// No permission needed for other OSes, just check for type
				else if (window.DeviceOrientationEvent){
					// Webkit
					addListener("deviceorientation");
					_this.hello("Tilt your device to adjust the shadow.", "far fa-sync-alt")
				}else if (window.MozOrientation){
					// Firefox
					addListener("MozOrientation");
					_this.hello("Tilt your device to adjust the shadow.", "far fa-sync-alt")
				}else{
					// Error 
					_this.hello("We can't access your device's sensors right now.", "far fa-exclamation-triangle", "red")
				}
			}
		},
		// Tilt controls
		tiltShadow:function(event){
			let _this = this;

			// x/hor y/vert
			var h, v;
			// Check for value
			// Webkit
			if(event.beta || event.gamma){
				v = Math.round(event.beta) * 2;
				h = Math.round(event.gamma) * 2;
			}else if(event.y || event.x){
				// Firefox uses orientation instead of event
				v = Math.round(orientation.y) * 2;
				h = Math.round(orientation.x) * 2;
			}
			// Make adjustments for orientation
			var deg = 0;
			// Device orientation
			if(window.orientation){
				deg = window.orientation;
			}
			var hOffset, vOffset;
			// Regular format is (h, v)
			// 90deg is -v,h
			if(deg == 90){
				hOffset = v;
				vOffset = -h;
			}else if(deg == 180){
				// 180deg is -h,-v
				hOffset = -h;
				vOffset = -v;
			}else if(deg == -90){
				// -90 is -v,-h
				hOffset = -v;
				vOffset = h;
			}else{
				// Regular orientation
				hOffset = h;
				vOffset = v;
			}
			// Set to shadow
			// Vertical offset has -30 because of how people naturally hold their devices.
			// _this.working.shadow[_this.active_layer].x = (-vOffset) + 70;
			// _this.working.shadow[_this.active_layer].y = -hOffset;
			_this.$set(_this.working.shadow[_this.active_layer], "y", (-vOffset) + 120);
			_this.$set(_this.working.shadow[_this.active_layer], "x", -hOffset);

		},


	}
};

</script>


<style lang="scss">

#shadowsApp{
	display: flex;
	flex-direction: column;
}

#shadowStage{
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: fit-content;
	margin: 0 auto;
}

#shadowLayers{
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	box-sizing: border-box;
	padding: 15px;

	button{
		box-sizing: border-box;
		text-align: center;
		width: 36px;
		height: 36px;
		font-weight: 500;
		border-radius: calc(var(--borderRadius) / 2);
		background-color: var(--background);
		border: 1px solid var(--border);
		color: var(--text);
		padding: 0;

		&.active{
			background-color: var(--primary);
			color: var(--primaryText)
		}

		&:hover:not(.active){
			background-color: var(--accent);
			text-decoration: underline;
		}

	}
}

</style>