// Router
// _________________________
//
//	Defines available routes and views
//
//
//		- Routes
// 			main pages _____________________________________ 
//					/																			- Home page
// 			apps _____________________________________ 
//					/animate/																	- Create CSS keyframe animations
//					/shadows/																	- Generate CSS shadows
//			errors _____________________________________ 
//					/404/
// 

// Imports
import Vue from 'vue';
import Router from 'vue-router';
// Basic pages
import Home from './views/Home.vue';
// Apps
import Animate from './views/apps/Animate.vue';
import Shadows from './views/apps/Shadows.vue';
// Everything else
import Error404 from './views/other/error404.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		///////////
		// Home //
		/////////
		{
			path: '/',
			name: 'home',
			component: Home,
		},

		///////////
		// Apps //
		/////////
		// Animate
		{
			path: '/animate/',
			name: 'Animate',
			component: Animate
		},
		// Shadows
		{
			path: '/shadows/',
			name: 'Shadows',
			component: Shadows
		},
		//////////////////////
		// Everything Else //
		////////////////////
		// 404
		{
			path: '/404',
			name: 'error404',
			component: Error404
		},
		// If no match, redirect to 404
		{
			path: '*',
			redirect: '/404'
		}
	]
});


export default router;
