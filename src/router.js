// 
// Router
// _________________________
//
//	Defines available routes and views
//
//		Routes
// 			#BASIC 
//					/									- Home page
//					/2/									- Also Home page, but with v2 announcement & PH message
//					/about/								- Basic about page text only
//					/changelog/							- Changelog
// 			TESTING
//					/commands/							- Test and see different UI elements and functions - not linked to anywhere
// 			#APPS 
//					/animate/							- Create CSS keyframe animations
//					/shadows/							- Generate CSS shadows
//					/colors/							- HEX/RGB converter and color palettes
//					/characters/						- Search and copy character codes
//			#ERRORS  
//					/404/
//
//		Meta options	
//			help: if true, the help nav button will be shown on that route.
// 

// Imports
import Vue from 'vue';
import Router from 'vue-router';
// Basic pages
import Home from './views/Home.vue';
// Apps
import Animate from './views/apps/Animate.vue';
import Shadows from './views/apps/Shadows.vue';
import Colors from './views/apps/Colors.vue';
import CharacterCodes from './views/apps/CharacterCodes.vue';

// Everything else
import Error404 from './views/other/error404.vue';
import Changelog from './views/other/Changelog.vue';
import Commands from './views/other/Commands.vue';
import About from './views/other/About.vue';

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
			name: 'Home',
			component: Home,
		},
		{
			path: '/v2/',
			name: 'PromoHome',
			component: Home,
		},
		////////////
		// About //
		//////////
		{
			path: '/about/',
			name: 'About',
			component: About,
		},
		////////////////
		// Changelog //
		//////////////
		{
			path: '/changelog/',
			name: 'Changelog',
			component: Changelog,
		},
		///////////////
		// Commands //
		/////////////
		{
			path: '/commands/',
			name: 'Commands',
			component: Commands,
		},

		///////////
		// Apps //
		/////////
		// Animate
		{
			path: '/animate/',
			name: 'Animate',
			component: Animate,
			meta: {
				help: true,
			}
		},
		// Shadows
		{
			path: '/shadows/',
			name: 'Shadows',
			component: Shadows
		},
		// Colors
		{
			path: '/colors/',
			name: 'Colors',
			component: Colors
		},
		// Character Codes
		{
			path: '/characters/',
			name: 'CharacterCodes',
			component: CharacterCodes
		},
		//////////////////////
		// Everything Else //
		////////////////////
		// 404
		{
			path: '/404',
			name: 'Error404',
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
