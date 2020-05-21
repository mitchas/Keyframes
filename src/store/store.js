// 
// Store
// 		Store and get values across components 
// 
// 		Definitions:
//			-scrollLock
// 				true/false to lock scrolling with CSS (use with full width/height elements so you can't scroll behind them)
//			-softKeyboard
// 				true/false - whether the on screen keyboard is visible on mobile devices (See softKeyboardMixin)
//			-isMobile
// 				watched by screenResize mixin, set if screen is mobile or smaller
//			-userPreferences
// 				object - user's saved preferences from localstorage
// 

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	// Defs:
	// userPreferences: settings visitors can toggle.
	state: {
		scrollLock: false,
		// UI
		// If soft keyboard visible on mobile
		softKeyboard: false,
		// If screen size is mobile - watched by resize
		isMobile: false,
		// UserPreferences
		// Update 3 places in App.vue
		// at var defaultPrefs
		userPreferences: {
			confirmLeave: true,
			darkMode: false,
			animations: true,
			tooltips: true,
			startPage: '/',
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
		softKeyboard(state, softKeyboard) {
			state.softKeyboard = softKeyboard
		},
		isMobile(state, isMobile) {
			state.isMobile = isMobile
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
		softKeyboard: state => state.softKeyboard,
		isMobile: state => state.isMobile,
		userPreferences: state => state.userPreferences,
		global: state => state.global,
	}
})