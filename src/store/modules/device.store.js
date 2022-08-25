//! Device Store
// Holds device settings and info

import debounce from "lodash/debounce";

const state = {
	hasTouch: false,
	isMac: navigator.appVersion.includes("Macintosh"),
	is_pwa: false,
	// mobile - less than 768px
	smallScreen: false,
	// True when soft keyboard visible on mobile
	softKeyboard: false,
	// Permissions statuses
	permissions: {
		geolocation: null,
	},

	// Development Mode
	hostName: window.location.hostname,
};


const getters = {
	hasTouch( state ) {
		return state.hasTouch;
	},
	isMac( state ) {
		return state.isMac;
	},
	isPwa( state ) {
		return state.is_pwa;
	},
	hasSmallScreen( state ) {
		return state.smallScreen;
	},
	softKeyboardVisible( state ) {
		return state.softKeyboard;
	},
	// Permissions
	permissions( state ) {
		return state.permissions;
	},
	geolocationPermissions( state ) {
		return state.permissions.geolocation;
	},
	// Hostname
	getHostName( state ) {
		return state.hostName;
	},
};


const mutations = {
    HAS_TOUCH(state, val) {
		state.hasTouch = val;
	},
    SET_PWA(state, val) {
		state.is_pwa = val;
	},
    SET_SMALL_SCREEN(state, val) {
		state.smallScreen = val;
	},
    SET_SOFT_KEYBOARD(state, val) {
		state.softKeyboard = val;
	},
	// Permissions
    SET_GEOLOCATION_PERMISSIONS(state, val) {
		state.permissions.geolocation = val;
	},
};


const actions = {
	
	// Set screen size
	// Debounce with 500ms delay to prevent a billion toggles
	SCREEN_SIZE_CHANGE: debounce(({ commit }, value) => {
		commit("SET_SMALL_SCREEN", value);
	}, 500),

	// Set keyboard visibility
	// Debounce with 500ms delay to prevent a billion toggles
	SOFT_KEYBOARD_CHANGE: debounce(({ commit }, value) => {
		commit("SET_SOFT_KEYBOARD", value);
	}, 500),

	// Permissions
	// Check for geolocation permissions
	CHECK_PERMISSIONS({ commit, dispatch }, value) {
		// navigator.permissions.query({ name: "geolocation" }).then(function(permissionStatus) { 
		// 	commit("SET_GEOLOCATION_PERMISSIONS", permissionStatus.state);
		// });
	},
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};