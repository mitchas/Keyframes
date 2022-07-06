// ! Router
//	Defines available routes and views
//
// * Route Meta
// 		- title - Page title set on route change
// 		- routeRequiresUser - user must be signed in to view
// 		- routeBlocksUser - user must be signed out to view
// 		- routeRequiresAdmin - different admin level numbers block different pages
// 			for example, to view the admin page, a user's admin level must be 1 or greater
//


// Imports
import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import { routes } from "./routes.js";



Vue.use(Router);


const router = new Router({
	mode: "history",
	linkExactActiveClass: "is-active",
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior(to, from, savedPostition) {
		if (to.hash) {
			return {
			  selector: to.hash,
			//   behavior: 'smooth',
			};
		}else{
			return { x: 0, y: 0, };
		}
	},
	routes
});



  router.afterEach((to, from) => {
	//   Scroll Up
	document.getElementById("mainScrollView").scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
  });

router.beforeEach((to, from, next) => {

	// Signed in (or not) user
	// Meta definitions to check
	// const routeRequiresUser = to.matched.some(record => record.meta.routeRequiresUser);
	// Path
	const toPath = to.path;
	const fromPath = from.path;

	next();


	// Stop loading
	store.dispatch("Hold/STOP_LOAD");

});


export default router;
