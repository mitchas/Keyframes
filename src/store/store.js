//! Store
// Store and get values across components 
// Main store file imports others from ./modules

import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

// Store Modules
import Device from "./modules/device.store";
import Hold from "./modules/hold.store";
import Site from "./modules/site.store";
import User from "./modules/user.store";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Device,
		Hold,
		Site,
		User,
	},
	strict: debug,
	plugins: debug? [ createLogger() ] : [],
});


