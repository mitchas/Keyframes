<!-- 
// AboutModal.vue
// _________________________
// 
// 	Shows modal containing about info
//		- Version
//		- Code info
//		- Donate?
//		- view on GitHub
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
			v-bind:show="showAbout"
			title="About"
			color="grey"
			confirmText="Dismiss"
			confirmIcon="fas fa-times"
			@confirmed="$emit('aboutModalClosed');"
			@dismissed="$emit('aboutModalClosed');">


			<!-- General Preferences -->
			<div class="settings-group">
				<div class="badge">v1.0</div>
				<p>This is version 1</p>

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
		'showAbout'
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
					icon: 'fal fa-home',
					label: 'Home'
				},{
					path: '/animate/',
					icon: 'fal fa-video',
					label: 'Animate'
				},{
					path: '/shadows/',
					icon: 'fal fa-eclipse',
					label: 'Shadows'
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
		color: var(--text);
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





</style>