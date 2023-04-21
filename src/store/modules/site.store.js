//! Site Store

const state = {

	// Project info
	data: {

		// Active apps
		apps: {
			animations: {
				id: "animations",
				title: "Animations",
				headline: "CSS @keyframe creator",
				description: "Create CSS @keyframe animations with a video-editor like timeline",
				path: "/animate",
				icon: "fas fa-clapperboard",
				color: "red",
				category: "CSS",
			},
			shadows: {
				id: "shadows",
				title: "Shadows",
				headline: "CSS Box Shadows",
				description: "Easily design simple or complex CSS box-shadows.",
				path: "/shadows",
				icon: "fas fa-sun",
				color: "sky",
				category: "CSS",
			},
			colors: {
				id: "colors",
				title: "Colors",
				headline: "Simple color palettes",
				description: "A color palette or conversion tool for RGBA and HEX.",
				path: "/colors",
				icon: "fas fa-palette",
				color: "purple",
				category: "Design",
			},
			characters: {
				id: "characters",
				title: "Characters",
				headline: "Special character search",
				description: "Search special characters and find their CSS or HTML values.",
				path: "/characters",
				icon: "fas fa-font",
				color: "orange",
				category: "Development",
			},
			settings: {
				id: "settings",
				title: "Settings",
				headline: "Adjust your preferences",
				description: "Adjust how Keyframes.app looks, behaves, and manages your data.",
				path: "/settings",
				icon: "fas fa-gear",
				class: "settings",
				color: "blue",
				persistent: true,
				category: "system",
			},
		}
	},

};

const getters = {
	apps(state){
		return state.data.apps;
	}
};


const mutations = {
};


const actions = {
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};