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
		// UserPreferences
		// Update 3 places in App.vue
		// at var defaultPrefs
		userPreferences: {
			darkMode: false,
			animations: true,
			startPage: '/'
		}
	},
	mutations: {
		scrollLock(state, scrollLock) {
			state.scrollLock = scrollLock
		},
		softKeyboard(state, softKeyboard) {
			state.softKeyboard = softKeyboard
		},
		userPreferences(state, userPreferences) {
			state.userPreferences = userPreferences
		},
	},
	getters: {
		scrollLock: state => state.scrollLock,
		softKeyboard: state => state.softKeyboard,
		userPreferences: state => state.userPreferences,
	}
})