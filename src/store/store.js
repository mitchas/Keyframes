// 
// Store
// 		Store and get values across components 
// 
// 		Definitions:
//			-scrollLock
// 				true/false to lock scrolling with CSS (use with full width/height elements so you can't scroll behind them)
//			-device
// 				object - device properties
//			-userPreferences
// 				object - user's saved preferences from localstorage
//			-global
// 				object - shortcuts for things to use throughout the project - easy to access and change
// 

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	// Defs:
	// userPreferences: settings visitors can toggle.
	state: {
		// Get package version from package.json
		packageVersion: process.env.PACKAGE_VERSION || '0',
		// Lock scrolling - for modals, etc to prevent behind scroll
		scrollLock: false,
		// UI
		// If screen size is mobile - watched by resize
		// isMac = navigator.appVersion.includes('Macintosh')
		device: {
			hasTouch: false,
			isMac: navigator.appVersion.includes('Macintosh'),
			softKeyboardVisible: false,
			standalone: false,
			orientationSensor: false,
		},
		// UserPreferences
		// Update 3 places in App.vue
		// at var defaultPrefs
		userPreferences: {
			confirmLeave: true,
			darkMode: false,
			animations: true,
			tooltips: true,
			startPage: '/',
			installed: false,
			version: "0", // Doesnt matter if not accurate - just a placeholder
			viewed: {
				animateIntro: false,
			},
		},
		// Global Variables
		// used anywhere. Easy to change
		global: {
			tooltipIcon: "far fa-feather",
			showHelp: false,
		}
	},
	mutations: {
		scrollLock(state, scrollLock) {
			state.scrollLock = scrollLock
		},
		device(state, device) {
			state.device = device
		},
		userPreferences(state, userPreferences) {
			state.userPreferences = userPreferences
		},
		global(state, global) {
			state.userPreferences = global
		},
	},
	getters: {
		scrollLock: state => state.scrollLock,
		device: state => state.device,
		userPreferences: state => state.userPreferences,
		global: state => state.global,
		appVersion: state => state.packageVersion,
	}
})