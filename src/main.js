//! Main
//
//*	Sets up vue app
//		- Sets up app, imports, filters,
//		- Waits for firebase to return user or not before page load
// 

// Imports
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "@/store/store";

// Import Plugins
import Vue2TouchEvents from "vue2-touch-events";


// Custom Plugins
import plugins from "@/components/plugins/plugins.js";
import "@/components/plugins/Dayjs";
import logging from "@/components/plugins/logging.js";

// Set configs
Vue.config.productionTip = false;

// Use
Vue.use(logging);
Vue.use(plugins);
Vue.use(Vue2TouchEvents);

// Main styles
import "./styles/main.scss";



// App
let app = "";


// Conditional Style component
Vue.component("v-style", {
	render: function (createElement) {
		return createElement("style", this.$slots.default);
	}
});


// Wait for firebase to determine if user is logged in before creating app

// Create vue app - call after processing user
var createApp = function(){
	if (!app) {
		app = new Vue({
			router,
			store,
			data: {
			},
			render: h => h(App)
		}).$mount("#app");

	}
};

// Anonymous - no user auth
store.dispatch("User/INITIAL_LOAD", false).then(function() {			
	// Set user auth, page ready to load
	store.commit("User/FINISH_INITIAL_LOAD", false);
	// Success
	createApp();
});


// Get device details, save in store for later
// Touch Screen
if(("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
	store.commit("Device/HAS_TOUCH", true);
}
// PWA / Standalone app display
if (window.matchMedia("(display-mode: standalone)").matches) {
	store.commit("Device/SET_PWA", true);
}

// Check device permission status
store.dispatch("Device/CHECK_PERMISSIONS", true);

