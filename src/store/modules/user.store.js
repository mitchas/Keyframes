// User Store
// Holds user settings. 
// Also app data
// Synced with Local Storage

import Vue from "vue";

import { stateMerge } from "vue-object-merge";
import debounce from "lodash/debounce";
import { dispatch } from "rxjs/internal/observable/pairs";
import router from "../../router";

const state = {
	// Auth state - default null means not yet determined
	auth: null,
	
	// User Preferences
	preferences: {
		confirm_action: true,
		tooltips: true,
		animations: true,
		outlines: true,
		notifications: false,
		app_launcher: false,
		start: "/",
		theme: "default",
		dark_mode: false,
		round_borders: true,
		font: "sans",
	},

	// Individual app data and preferences
	apps: {
		animations: {
			enabled: true,
			data: {},
		},
		shadows: {
			enabled: true,
			data: {},
		},
		colors: {
			enabled: true,
			data: {},
		},
		characters: {
			enabled: true,
			data: {},
		},
		settings: {
			enabled: true,
			data: {},
		}
	},

};

const getters = {
	// Users uid if authenticated
	auth( state ) {
		return state.auth;
	},

	// User app data and individual prefs
	apps( state ) {
		return state.apps;
	},
		// Colors app data
		colorsData( state ) {
			return state.apps.colors.data["palettes"] || [];
		},

	// User app preferences
	preferences( state ) {
		return state.preferences;
	},

	// Shortcuts
	darkMode( state ) {
		return state.preferences.dark_mode;
	},
	app_launcher( state ) {
		return state.preferences.app_launcher;
	},
	theme( state ) {
		return state.preferences.theme;
	},


};


const mutations = {
    FINISH_INITIAL_LOAD(state, val) {
		state.auth = val;
	},
	
	SET_PREFERENCES(state, data) {
		stateMerge(state.preferences, data);
	},
	SET_SINGLE_PREFERENCE(state, data) {
		state.preferences[data.key] = data.value;
	},

	// App Data
	SET_APP_DATA(state, data) {
		stateMerge(state.apps, data);
	},
		SET_SINGLE_APP_DATA(state, data) {
			state.apps[data.key].data = data.value;
		},
		// Set single field within data. ie data["palettes"]
		SET_APP_DATA_FIELD(state, field) {
			state.apps[field.app].data[field.key] = field.value;
		},



	SET_TOGGLE_APP(state, data) {
		state.apps[data.key].enabled = data.value;
	},
	SET_CLEAR_APP_DATA(state, key) {
		state.apps[key].data = null;
	},

};





const actions = {

	// False means loaded with no user
	// Initial load, check user (if auth enabled), get local storage
	INITIAL_LOAD({ commit, getters, dispatch}, user) {
		return new Promise((resolve, reject) => {
			let _this = this;

			// Get local storage
			// Loop through all local storage, save sttorage names of animations
			// Animations begin with "animation_", Palettes are "palette_"
			var appData = null;
			var userPreferences = null;
			var keys = Object.keys(localStorage);
			var i = keys.length;
			while( i-- ){

				// Get App Data from Storage
				if(keys[i] == ("appData")){
					appData = localStorage.getItem(keys[i]);
					appData = JSON.parse(appData);
					commit("SET_APP_DATA", appData);
				}

				// Get Preferences
				if(keys[i] == ("preferences")){
					userPreferences = localStorage.getItem(keys[i]);
					userPreferences = JSON.parse(userPreferences);
					commit("SET_PREFERENCES", userPreferences);

					// Set theme based on prefs
					dispatch("CHANGE_THEME");
				}

			}

			// No prefs saved, determine dark mode based on device
			if(!userPreferences){
				if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
					commit("SET_SINGLE_PREFERENCE", {key: "dark_mode", value: true});
					dispatch("CHANGE_THEME");
				}else{
					commit("SET_SINGLE_PREFERENCE", {key: "dark_mode", value: false});
				}

			}

			// Navigate to default page
			setTimeout(function(){
				if(router.currentRoute.path == "/" && userPreferences && userPreferences.start){
					setTimeout(function(){
						router.push(userPreferences.start);
					}, 200);
				}
			}, 200);


			// Resolve
			resolve();
		});
	},


	// Save preferences into local storage
	SAVE_APP_DATA({ commit, getters }, key) {
		localStorage.setItem("appData", JSON.stringify(getters.apps));
	},
	// Debounce with 3s delay
	DEBOUNCE_SAVE_APP_DATA: debounce(({ dispatch }) => {
		dispatch("SAVE_APP_DATA");
	}, 1000),

	// Update all App Data
	UPDATE_APP_DATA({ commit, dispatch }, data) {
		commit("SET_SINGLE_APP_DATA", data);
		// Store changes
		dispatch("DEBOUNCE_SAVE_APP_DATA");
	},



	// Toggle App on/off
	TOGGLE_APP({ commit, getters, dispatch }, key) {
		var switchValue = !getters.apps[key].enabled;
		var data = {key: key, value: switchValue};
		commit("SET_TOGGLE_APP", data);

		// Store changes
		dispatch("DEBOUNCE_SAVE_APP_DATA");
	},

	// Clears data for one specific app
	CLEAR_APP_DATA({ commit, dispatch }, key) {
		commit("SET_CLEAR_APP_DATA", key);
		// Store changes
		dispatch("DEBOUNCE_SAVE_APP_DATA");
	},

	

	// Save preferences into local storage
	SAVE_PREFERENCES({ commit, getters }, key) {
		localStorage.setItem("preferences", JSON.stringify(getters.preferences));
	},
	// Debounce with 3s delay
	DEBOUNCE_SAVE_PREFERENCES: debounce(({ dispatch }) => {
		dispatch("SAVE_PREFERENCES");
	}, 3000),


	// Update Preference
	UPDATE_PREFERENCE({ commit, dispatch }, data) {
		commit("SET_SINGLE_PREFERENCE", data);

		// Store changes
		dispatch("DEBOUNCE_SAVE_PREFERENCES");
	},
	// Toggle (inverse) Preference
	TOGGLE_PREFERENCE({ commit, getters, dispatch }, key) {
		var switchValue = !getters.preferences[key];
		var data = {key: key, value: switchValue};
		commit("SET_SINGLE_PREFERENCE", data);

		// Store changes
		dispatch("DEBOUNCE_SAVE_PREFERENCES");

		// If changing dark mode, update theme
		if(key == "dark_mode"){
			dispatch("CHANGE_THEME");
		}
	},


	// Preferences
	CHANGE_THEME({ commit, getters, dispatch }, theme) {

		var darkModeOn = getters.darkMode;

		// If no theme provided, use theme from preferences
		if(!theme){
			var newTheme = getters.theme;
		}else{
			var newTheme = theme;
		}

		// Name to set on documentElement
		var setTheme = "light";
		// Special case for default theme - must be called "light/dark"
		if(newTheme == "default"){
			if(darkModeOn){
				setTheme = "dark";
			}
		}else{
			// Other named themes
			setTheme = newTheme;
			if(darkModeOn){
				setTheme = setTheme + "_dark";
			}
		}

		// Store change
		var data = {key: "theme", value: newTheme};
		commit("SET_SINGLE_PREFERENCE", data);

		// Change document theme
		document.documentElement.setAttribute("data-theme", setTheme);
		// document.querySelector("meta[name=\"theme-color\"]").setAttribute("content",  "#07070f");

		// Save changes
		dispatch("DEBOUNCE_SAVE_PREFERENCES");

	},

	
};


export default {
	namespaced: true,
    state,
    getters,
    actions,
    mutations
};