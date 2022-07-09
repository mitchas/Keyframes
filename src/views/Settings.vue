<!--
	App Settings & Preferences
-->

<template>
	<div class="padded">

		<!-- User App Preferences -->
		<h3 class="mtop-lg">Preferences</h3>


		<!-- Theme Switcher component -->
		<ThemeEditor v-if="themeModal" v-on:closeEditor="themeModal = false"></ThemeEditor>


		<div class="card-grid mtop-md">

			<!-- Change Theme -->
			<div class="card">
				<label class="card-main">
					<i class="card-icon fas fa-palette"></i>
					<b>Visual Theme</b>
					<!-- Button -->
					<div class="card-input">
						<button class="button small" @click="themeModal = true">
							<span>Edit</span>
							<i class="fas fa-droplet"></i>
						</button>
					</div>
				</label>
				<div class="card-body">
					<p>
						Adjust the color theme and other visual preferences.
					</p>
				</div>
			</div>

			<!-- Loop toggle preferences -->
			<div class="card" v-for="(pref, key) in preferences" :key="key" :class="{'inactive': pref.disabled}">
				<label class="card-main">
					<i :class="'card-icon ' + pref.icon"></i>
					<b>{{pref.title}}</b>
					<div class="card-input">
						<input type="checkbox" class="toggle on-off" :checked="userPreferences[key]" @input="updatePreference(key)" :disabled="pref.disabled"/>
					</div>
				</label>
				<div class="card-body">
					<p>
						{{pref.description}}
					</p>
				</div>
			</div>

		</div>


		<!-- Your apps -->
		<h3 class="mtop-xl">Apps</h3>
		<p>
			You can turn off any apps you don't use so they don't show in the app list.
			<br/>
			The <i class="fas fa-circle-star text-blue"></i> default app is what loads first when you first open Keyframes.app.
		</p>

		<div class="card-grid mtop-md" v-if="sortedApps">

			<div class="card" v-for="(app, key) in sortedApps" :key="key" :class="{'inactive': appData[app.id] && appData[app.id].enabled == false}">
				<label class="card-main" v-if="sortedApps[key]">
					<i :class="'card-icon ' +app.icon"></i>
					<b>{{app.title}}</b>
					<div class="card-input" v-if="!sortedApps[key].persistent">
						<input type="checkbox" class="toggle on-off" :checked="appData[app.id] && appData[app.id].enabled" @input="toggleApp(app.id)" />
					</div>
				</label>
				<!-- Toggle Body -->
				<div class="card-body">
					<p>
						{{app.description}}
					</p>
				</div>
				<!-- Footer controls -->
				<div class="card-footer">
					<div class="card-tags">
						<span :class="'tag ' + app.category">{{app.category}}</span>
						<!-- <span :class="'tag grey' + apps[key].color">Household</span> -->
					</div>
					<div class="card-actions" v-if="!app.persistent">
						<!-- Default -->
						<button class="card-action-button" :class="{'active': userPreferences.start == sortedApps[key].path}" @click="setDefaultApp(app.path)" :disabled="appData[app.id] && appData[app.id].enabled == false">
							<i class="fas fa-circle-star"></i>
						</button>
						<!-- Clear Data -->
						<button class="card-action-button" @click="eraseAppData(key)" :disabled="appData[app.id] && appData[app.id].enabled == false">
							<i class="fas fa-eraser"></i>
						</button>
					</div>
				</div>

			</div>

		</div>

		<!-- Confirm delete app data Modal -->
		<Modal size=""
			color="red"
			:show="showAppDataModal"
			title="Delete app Data"
			confirmIcon="fas fa-eraser"
			confirmText="Clear Data"
			dismissText="No, Cancel"
			@confirmed="showAppDataModal = false; confirmDeleteAppData(); "
			@dismissed="showAppDataModal = false;">

			<p class="no-padding" v-if="deletingAppData != null">
				Are you sure you want to clear your data for and completely reset the <b>{{sortedApps[deletingAppData].title}}</b> app?
			</p>
			<p class="small mtop-sm no-padding text-fade">
				This can <b>not</b> be undone.
			</p>

		</Modal>



		<!-- Your Data -->
		<h3 class="mtop-xl">Your Data</h3>
		<p>
			{{appName}} does not store any of your data.
			<br/>
			Everything you enter on this site is <b>only</b> stored in <b>your computer's</b> local storage.
		</p>
		<p class="small mbottom-md">
			This means your data will <b>not</b> sync between devices, and if you clear your browser data, you will lose your {{appName}} data. 
			Download and backup your data file regularly if you're worried. We may add accounts and syncing later.
		</p>

		<!-- Data Controls -->
		<button class="button grey mright-xs mbottom-xs" @click="exportModal = true">
			<i class="fas fa-laptop-arrow-down"></i>
			<span>View Data</span>
		</button>
		<!-- Import Data -->
		<button class="button grey mright-xs mbottom-xs" @click="importModal = true;">
			<i class="fas fa-file-import"></i>
			<span>Import Data</span>
		</button>
		<!-- Clear Data -->
		<button class="button red mbottom-xs" @click="hardResetModal = true">
			<i class="fas fa-radiation"></i>
			<span>Clear All Data</span>
		</button>

		<!-- Privacy Subheader -->
		<h3 class="mtop-lg">Privacy</h3>
		<p>
		</p>
		<p class="small mbottom-md">
			<b>TL;DR:</b>
			This app is as private as it gets. We don't save <b>any</b> of your data anywhere. It's all on your computer. There are no ads, third-party libraries, or cookies.
			<br/>
			It does have Analytics, but it's self-hosted and only tracks which pages or apps are viewed and how many times.
		</p>

		<!-- Privacy Policy -->
		<router-link to="/privacy" class="button grey mright-xs mbottom-xs">
			<i class="fas fa-blinds"></i>
			<span>Privacy Policy</span>
		</router-link>
		<!-- Terms of Service -->
		<router-link to="/terms" class="button grey mbottom-xs">
			<i class="fas fa-file-check"></i>
			<span>Terms of Service</span>
		</router-link>


		<!-- Development -->
		<h3 class="mtop-xl">Development</h3>
		<p class="mbottom-md">
			View the changelog for the latest updates & changes. 
			<br/>
			The design page is for previewing UI elements.
		</p>

		<!-- Changelog -->
		<router-link to="/changelog" class="button grey mright-xs mbottom-xs">
			<i class="fas fa-list"></i>
			<span>Changelog</span>
		</router-link>
		<!-- Design -->
		<router-link to="/design" class="button grey mbottom-xs">
			<i class="fas fa-browser"></i>
			<span>Design</span>
		</router-link>

		<!-- Other apps -->
		<h3 class="mtop-xl">But wait, there's more</h3>
		<p>
			Different tools, just as private & easy to use. 
		</p>

		<div class="project-display mtop-md">

			<!-- Keyframes -->
			<a href="https://tidy.camp" target="_blank" class="project">
				<div><img src="@/assets/projects/tidycamp.png"/></div>
				<div class="project-info">
					<h4>Tidy.Camp</h4>
					<p class="small">
						Dead simple visual tools to for web designers & developers. Easily create @keyframe animations, color palettes, box shadows, and more.
					</p>
				</div>
			</a>

			<!-- Ceev -->
			<a href="https://ceev.io" target="_blank" class="project">
				<div><img src="@/assets/projects/ceev.png"/></div>
				<div class="project-info">
					<h4>Ceev.io</h4>
					<p class="small">
						An incredibly easy way to create and design a resume in minutes, for free. Export as a PDF, or save it to edit later.
					</p>
				</div>
			</a>

		</div>

		<div class="max-width mtop-xl">
			<h3>Hey!</h3>
			<p>These apps are free - but if you find them useful and want to help keep them running, <a href="https://www.buymeacoffee.com/mitchs" target="_blank">Buy me a Coffee</a>, or <a href="https://account.venmo.com/u/mitchas" target="_blank">Venmo</a>, <a href="https://cash.app/$Mitchs" target="_blank">CashApp</a>, or <a href="https://www.paypal.com/paypalme/mitchsamuels" target="_blank">PayPal</a>.</p>
		</div>

		<!-- Export Data Modal -->
		<Modal size=""
			color="blue"
			:show="exportModal"
			title="Manage Your Data"
			confirmIcon="fas fa-cloud-arrow-down"
			confirmText="Download"
			dismissText="Done"
			:reverseButtons="true"
			@confirmed="exportData"
			@dismissed="exportModal = false">

			<p class="no-padding">
				Here's what all of your data looks like:
			</p>

			<div id="localStorageOutput">
				<textarea class="mtop-sm" id="localStorageTextarea" :value="getAllLocalStorage().length ? getAllLocalStorage() : 'Nothing here'" readonly></textarea>
			</div>

		</Modal>

		<!-- Import Data Modal -->
		<Modal size=""
			:show="importModal"
			color="invert"
			title="Import Data"
			icon="fas fa-file-import"
			confirmText="Done"
			confirmIcon="fas fa-times"
			@confirmed="importModal = false"
			@dismissed="importModal = false">

			<p class="no-padding">
				If you have a <b>{{appName}}</b> backup <b><code>.json</code></b> file, you can upload it here to import and merge it into your existing data.
			</p>

			<!-- Upload File Button -->
			<label class="button mtop-xs green max-width-fit" :class="{'disabled': $store.getters['Hold/isLoading']}">
				<i class="fas fa-file-code"></i>
				<span>Choose File</span>
				<input type="file" name="importFille" accept=".json" @input="importData" hidden/>
			</label>


		</Modal>

		<!-- Hard Reset Modal -->
		<Modal size=""
			:show="hardResetModal"
			title="Erase Everything"
			icon="fas fa-triangle-exclamation"
			color="red"
			dismissText="Cancel"
			confirmText="Delete Everything"
			confirmIcon="fas fa-radiation"
			:disableConfirm="hardResetConfirmation.toLowerCase() != 'delete'"
			@confirmed="resetLocalStorage"
			@dismissed="hardResetModal = false">

			<p class="no-padding">
				This will clear your local storage for {{appName}} and reset all of your data and settings.
				<b>This can not be undone</b>
			</p>

			<!-- Confirm text -->
			<div class="max-width-tiny margin-auto center ptop-md">
				<label>Type "delete" to confirm:</label>
				<input class="center" v-model="hardResetConfirmation" type="text" placeholder="delete"/>
			</div>


		</Modal>


		<!-- Spacer -->
		<div class="mbottom-xl"></div>


	</div>
</template>

<script>
// Components
// import Callout from "@/components/ui/Common/Callout";
import Modal from "@/components/ui/Modals/Modal";
import ThemeEditor from "@/components/ui/Single/ThemeEditor";

import _orderBy from "lodash/orderBy";

export default {
	name: "settings",

	components: {
		// Callout,
		Modal,
		ThemeEditor,
	},

	mixins: [
	],

	data() {
		return {
			appName: process.env.VUE_APP_COMPANY_NAME,

			themeModal: false,

			showAppDataModal: false,
			deletingAppData: null,
			
			exportModal: false,
			importModal: false,
			hardResetModal: false,
			hardResetConfirmation: "",

			// Available apps from site store
			apps: this.$store.getters["Site/apps"],

			// Available preferences
			preferences: {
				"dark_mode": {
					title: "Dark Mode",
					icon: "fas fa-moon-stars",
					description: "Turn off the lights. Dark background with darker colors.",
				},
				"animations": {
					title: "Motion",
					icon: "fas fa-clapperboard",
					description: "Enable or disable motion and animations used throughout the app.",
				},
				"outlines": {
					title: "Outlines",
					icon: "fas fa-border-bottom-right",
					description: "Dashed accessibility outline that appears when you click buttons or forms.",
				},
				"app_launcher": {
					title: "App Launcher",
					icon: "fas fa-grid",
					description: "Use the logo in the top left to toggle the app launcher instead of home page.",
				},
				"confirm_action": {
					title: "Confirm Actions",
					icon: "fas fa-check-double",
					description: "Confirmation window before you do certain things - deleting, leaving pages, etc.",
				},
				"tooltips": {
					title: "Tooltips",
					icon: "fas fa-feather",
					description: "Enable or disable help tooltips throughout the app.",
				},
				"notifications": {
					title: "Notifications",
					icon: "fas fa-bell-on",
					description: "Check back in a bit. Notifications aren't quite ready yet.",
					// description: "Grant permissions to send push notifications on this device.",
					disabled: true,
				},
			}
		};
	},

	computed: {

		sortedApps() {
			return _orderBy(this.apps, "category");
		},
		userPreferences: {
			get() {
				return this.$store.getters["User/preferences"];
			},
		},
		appData: {
			get() {
				return this.$store.getters["User/apps"];
			},
		},
		
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

		getAllLocalStorage: function() {
			return JSON.stringify(localStorage);
		},


		// Updates preference in store
		updatePreference: function(key){
			this.$store.dispatch("User/TOGGLE_PREFERENCE", key);
		},

		// Enable or disable app 
		toggleApp: function(key){
			this.$store.dispatch("User/TOGGLE_APP", key);

			// Disable favorite if user disables app and it's set
			if(this.apps[key].path == this.userPreferences.start){
				this.setDefaultApp(null);
			}
		},

		// Sets default app based on key
		setDefaultApp: function(key){
			this.$store.dispatch("User/UPDATE_PREFERENCE", {key: "start", value: key});
		},
		// Erases app data after confirmation
		eraseAppData: function(key){
			this.deletingAppData = key;
			this.showAppDataModal = true;
		},
		confirmDeleteAppData: function(){
			var appID = this.sortedApps[this.deletingAppData].id;
			var appTitle = this.sortedApps[this.deletingAppData].title;
			this.$store.dispatch("User/CLEAR_APP_DATA", appID);
			this.hello(appTitle + " Data Cleared!", "fas fa-check");
			this.deletingAppData = null;
		},


		// Data Management
		// Export output TextArea to Json File download
		exportData: function(){
			let _this = this;
			this.$store.dispatch("Hold/LOADING", "data");

			var destroyClickedElement = function(event) {
				// remove the link from the DOM
				document.body.removeChild(event.target);
			};

			// Take Textarea output and write to file.
            var textToWrite = JSON.stringify(localStorage);
            var textFileAsBlob = new Blob([textToWrite], { type: "text/json" });
            var fileNameToSaveAs = this.lettersAndNumbers(this.appName) + "_backup_" + this.$date().format("MMMDDYYtHHmm") + ".json";
            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download";
            window.URL = window.URL || window.webkitURL;
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);

			setTimeout(() => {
            	downloadLink.click();
				_this.hello("Downloaded", "fas fa-smile", "green");
				_this.$store.dispatch("Hold/STOP_LOAD");
      		}, 500);

		},
		// Import Data
		importData: function(output){
			this.$store.dispatch("Hold/LOADING", "data");
			// output.target.files[0];
			var reader = new FileReader();
			reader.onload = this.processImport;
			reader.readAsText(output.target.files[0]);
		},
		processImport: function(event){
			let _this = this;

			var data = JSON.parse(event.target.result);

			var preferencesMerged = false;
			var appDataMerged = false;

			// Validate and save into store
			if(data["preferences"]){
				this.$store.commit("User/SET_PREFERENCES", data["preferences"]);
				preferencesMerged = true;
			}
			if(data["appData"]){
				this.$store.commit("User/SET_APP_DATA", data["appData"]);
				appDataMerged = true;
			}

			if(!preferencesMerged && !appDataMerged){
				var mergeInfo = "No Data Merged";
			}else{
				var mergeInfo = "Merged ";
			}
			if(preferencesMerged){
				mergeInfo = mergeInfo + "Preferences ";
				if(appDataMerged){ mergeInfo = mergeInfo + "& "; }
			}
			if(appDataMerged){
				mergeInfo = mergeInfo + "App Data";
			}

			setTimeout(() => {
				_this.hello(mergeInfo, "fas fa-check");
				_this.$store.dispatch("Hold/STOP_LOAD");
				_this.importModal = false;
      		}, 500);
		},

		// Reset Local Storage, refresh page
		resetLocalStorage: function(){
			// Clear local storage
			localStorage.clear();
			// Toast
			this.toast("Local Storage Cleared", "Your data & preferences have been cleared from your browser's local storage.", "", "fas fa-trash-alt");
			this.hardResetModal = false;
			this.hardResetConfirmation = "";
		},



	}
};

</script>


<style lang="scss">




// Data Management
#localStorageOutput{
	position: relative;
}
#localStorageTextarea{
	font-family: var(--monospace);
	font-size: 12px;
	line-height: 14px;
}
#localStorageTextareaButtons{
	position: absolute;
	bottom: 8px;
	right: 8px;
}



</style>