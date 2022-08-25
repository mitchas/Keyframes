//! Hold Store
// Holds misc data for use throughout app

import { stateMerge } from "vue-object-merge";
import debounce from "lodash/debounce";
import router from "@/router";


const state = {
	// Data loaded. 0 = none,  1 = user, 2= user + profoile
	dataLoaded: 0,
	// Show loaders
	loading: false,
	// If true, confirm leave dialog appears before next navigate()
	confirmLeave: false,
	// If true, scrolling will lock (ie when modals are visible)
	scrollLock: false,
	// User device geolocation lat/lng
	geolocation: null,
};

const getters = {
	dataLoaded( state ) {
		return state.dataLoaded;
	},
	isLoading( state ) {
		return state.loading;
	},
	showConfirmLeave( state ) {
		return state.confirmLeave;
	},
	scrollLock( state ) {
		return state.scrollLock;
	},
	geolocation( state ) {
		return state.geolocation;
	},
};

const mutations = {
    DATA_LOADED(state, val) {
		state.dataLoaded++;
	},
    SET_LOADING(state, val) {
		state.loading = val;
	},
    SET_CONFIRM_LEAVE(state, val) {
		state.confirmLeave = val;
	},
    SCROLL_LOCK(state, val) {
		state.scrollLock = val;
	},
    UPDATE_GEOLOCATION(state, val) {
		state.geolocation = val;
	},
};


const actions = {
	
	// Loading
	LOADING({ commit, getters, dispatch }, value) {
		var type = "data";
		commit("SET_LOADING", type);

		// Auto timeout after 20s if it's not false
		setTimeout(function(){
			if(getters.isLoading != false){
				dispatch("STOP_LOAD");
			}
		}, 20000);
	},
	// Stop all loading indicators
	STOP_LOAD({ commit, getters, dispatch }) {
		if(getters.isLoading){
			commit("SET_LOADING", false);
		}
	},

	// Toggle leave confirmation
	CONFIRM_LEAVE({ commit }, value) {
		var x = true;
		if(!value){
			x = false;
		}
		commit("SET_CONFIRM_LEAVE", x);
	},

	
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};