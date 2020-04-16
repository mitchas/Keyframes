<!-- 
// SettingsModal.vue
// _________________________
// 
// 	Shows modal containing settings
//		- Dark mode toggle
//		- UI Animations toggle
//		- Start page selector
//		- Local Storage information
//
//	- Props:
//		- graphic - curve
//
//	- Functions:
//		- clearLocalStorage()
//			- Clears all local storage for this site 
//		- getAllLocalStorage()
//			- Called on mount, gets all localstorage content 
// 
-->

<template>
	<div>

		<Modal
			v-bind:show="showSettings"
			title="Settings"
			confirmText="Close Settings"
			confirmIcon="fas fa-times"
			@confirmed="$emit('settingsModalClosed');"
			@dismissed="$emit('settingsModalClosed');">


			<!-- General Preferences -->
			<div class="settings-group">

				<!-- Dark Mode -->
				<div class="setting-toggle">
					<div class="setting-toggle-input">
						<input id="darkmodeToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()"/>
					</div>
					<label class="setting-label-large" for="darkmodeToggle">
						Dark Mode
					</label>
				</div>

				<!-- UI Animations -->
				<div class="setting-toggle">
					<div class="setting-toggle-input">
						<input id="animationToggle" type="checkbox" class="toggle" v-model="$store.getters.userPreferences.animations" @change="toggleAnimations()"/>
					</div>
					<label class="setting-label-large" for="animationToggle">
						UI Animations
						<small>You can turn off the UI animations like the ones that transition between pages.</small>
					</label>
				</div>

				<!-- Start Page Selector -->
				<label class="setting-label-large mtop-xs">
					Start Page {{test}}
					<small>Select the page you'd like to load first when you visit keyframes.app.</small>
				</label>
				<div class="custom-picker no-scrollbars mtop-xs mbottom-sm">
					<label class="option" v-for="option in startPages" :key="option.label" :for="'cat_' + option.label" v-bind:class="{'active': $store.getters.userPreferences.startPage == option.path}">
						<i :class="[option.icon]"></i>
						<span>{{option.label}}</span>
						<input type="radio" :id="'cat_' + option.label" v-model="$store.getters.userPreferences.startPage" v-bind:value="option.path" v-bind:aria-label="option.label + ' Page'" hidden/>
					</label>
				</div>


				<!-- Clear local storage -->
				<div class="basic-field" id="clearLocalStorage">
					<div class="field-body">
						<button class="button red small" type="button" aria-label="Clear Local Storage" @click="clearLocalStorage()">
							<span>Clear Local Storage</span>
							<i class="far fa-trash-alt"></i>
						</button>
						<!-- Local storage help toggle -->
						<button id="localStorageHelpButton" @click="showLocalStorageHelp = !showLocalStorageHelp">
							<span v-if="!showLocalStorageHelp">What's this?</span>
							<span v-else>Hide</span>
							<i v-bind:class="{'far fa-chevron-down': !showLocalStorageHelp, 'far fa-chevron-up': showLocalStorageHelp}"></i>
						</button>
					</div>
				</div>

				<!-- Paragraph explaining local storage -->
				<transition name="basic">
					<div id="localStorageHelp" v-if="showLocalStorageHelp">
						Instead of accounts, this site uses your browser's local storage to remember your preferences and data. Here's what that means:
						<ul>
							<li>Local Storage is basically a file in your browser that this website can use to temporarily save things.</li>
							<li>Because it's saved <b>only</b> in the browser, if you visit this site on another device or browser, you won't have your preferences or data.</li>
							<li>Anyone who visits this site on this device/browser will have access to the data, but...</li>
							<li>We don't save anything private or personal in there. It's mainly for settings you toggle (like remembering if you prefer dark or light mode).</li>
						</ul>
						If you'd like to clear the local storage and reset this site to the default settings, click the button above.
						<br/>
						<b>Your local storage currently looks like this:</b>
						<!-- Code block to show existing local storage -->
						<div class="local-storage-code-display" v-if="localStorageString">
							<code>
								<!-- If empty -->
								<span v-if="localStorageString == '[]'">
									[Your Local Storage is empty]
								</span>
								<span v-else>
									{{localStorageString}}
								</span>
							</code>
						</div>
						
					</div>
				</transition>

			</div>

		</Modal>

	</div>
</template>

<script>
// Components
import Modal from "@/components/ui/Modal.vue";
// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";

export default {
	name: "SettinigsModal",
	mixins: [
		metaMixin,
		preferencesMixin,
		scrollLockMixin,
	],
	components: {
		Modal,
	},
	props: [
		'showSettings'
	],
	data() {
		return {
			// Toggle help
			showLocalStorageHelp: false,
			// Variable to hold entire *string* of local storage for displaying to user
			localStorageString: null,
			// Define potential start pages users can choose
			test: null,
			startPages: [
				{
					path: '/',
					icon: 'far fa-home',
					label: 'Home'
				},{
					path: '/animate',
					icon: 'far fa-video',
					label: 'Animate'
				}
			]
		};
	},
	mounted() {
		// Show modal, lock scroll
		this.getAllLocalStorage();
	},
	methods: {
	
		// Delete all items from local storage
		clearLocalStorage: function(){
			let _this = this;

			// Clear local storage
			localStorage.clear();

			// Toast
			_this.toast("Local Storage Cleared", "Your data & preferences have been cleared from your browser's local storage.", "", "far fa-trash-alt");

			// Close modal - this shows user an action,
			// Also forcing them to open settings again shows accurate localstorage string
			_this.closeSettings();
		},
		// This function returns all local storage data available
		getAllLocalStorage: function(){

			var values = [];
			var keys = Object.keys(localStorage);
			console.log(keys);
			var i = keys.length;

			while( i-- ){
				var item = {}
				item[keys[i]] = localStorage.getItem(keys[i])

				values.push(item);
			}

			this.localStorageString = JSON.stringify(values).split('\\').join('');
		}
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	// Spacing for Individual groups of settings
	.settings-group{
		margin: 0 auto 0 auto;
		padding-bottom: 0;
	}
	
	// Horizontal row layout for toggles
	.setting-toggle{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 10px 0;
		width: 100%;
		position: relative;

		.setting-toggle-input{
			display: block;
			padding-right: 15px;
		}		
	}

	// Large setting label with small text below
	// Used for toggles on settings
	.setting-label-large{
		font-weight: 500;
		font-size: 14px;
		letter-spacing: 0.3px;
		display: block;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 16px;
		letter-spacing: 0.4px;
		font-weight: 600;

		small{
			font-size: 12px;
			font-weight: 400;
			line-height: 16px;
			padding-top: 2px;
			font-family: var(--systemFont);
		}
	}

	

	// Field to clear local storage, everything inside
	#clearLocalStorage{
		margin-top: 10px;

		// Center content inside
		.field-body{
			text-align: left;
		}

		// More info button
		#localStorageHelpButton{
			display: inline-block;
			width: fit-content;
			color: var(--text);
			font-size: 13px;
			font-weight: 500;
			padding: 10px 0 10px 0;
			margin-left: 15px;

			i{
				margin-left: 5px;
			}
		}
	}

	// Local storage help
	#localStorageHelp{
		background-color: var(--background);
		box-sizing: border-box;
		padding: 10px;
		border-radius: var(--borderRadiusSmall);
		border: 1px solid var(--border);
		margin: 10px 0 0 0;

		font-size: 12px;
		letter-spacing: 0.5px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0.2px;
		font-family: var(--systemFont);

		b{
			font-weight: bold;
		}

		// List of info
		ul{
			margin: 10px 0;
		}
	}

	// Code display to show all local storage data
	.local-storage-code-display{
		box-sizing: border-box;
		padding: 0 15px 15px 15px;
		// background-color: var(--grey);
		// border-radius: var(--borderRadiusSmall);
		margin: 0 auto;
		max-height: 300px;
		overflow: auto;

		code{
			font-family: var(--mono);
			display: block;
			white-space: normal;
			box-sizing: border-box;
			padding: 5px 0;
			font-size: 12px;
			line-height: 14px;
			word-break:break-all;
			white-space: pre-wrap;
		}
	}

	// Option select
	// Basically just styled radios/checkboxes
	.options-display{
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 10px 0 0 0;

		.option{
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 15px 15px 0;
			width: 76px;
			height: 50px;
			border-radius: var(--borderRadiusSmall);
			border: 1px solid var(--border);
			text-align: center;
			color: var(--borderHover);
			transition: var(--transitionFast);

			// Icon
			i{
				font-size: 17px;
				padding-bottom: 6px;
				padding-top: 2px;
				font-weight: 500;
			}
			// Label
			span{
				font-size: 14px;
				font-weight: 600;
				letter-spacing: 0.4px;
			}

			// Hover state
			&:hover{
				cursor: pointer;
				border-color: var(--text);
				transition: var(--transitionFast);
				color: var(--text);
			}
		}

		// If checked 
		input:checked + label{
			border-color: var(--primaryHover);
			background-color: var(--primary);

			span,i{
				color: var(--white);
			}

			&:hover{
				border-color: var(--primaryHover);
				color: var(--primary);
				transition: var(--transitionFast);
			}
		}
	}



</style>