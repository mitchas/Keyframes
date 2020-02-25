import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// Apps/Pages
import Animate from './views/Animate.vue';
// Etc
import Error404 from './views/other/error404.vue';

// Docs
import TermsOfService from './views/other/docs/TermsOfService.vue';
import PrivacyPolicy from './views/other/docs/PrivacyPolicy.vue';

import { store } from '@/store/store'

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	base: process.env.VUE_APP_BASE_PATH,
	// Return to top after route change
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
		},

		//////////////////////////////
		// Apps / Pages
		//////////////////////////////
		{
			path: '/animate',
			name: 'Animate',
			component: Animate
		},
		//////////////////////////////
		// Help & Docs
		//////////////////////////////
		// TOS
		{
			path: '/terms',
			name: 'TermsOfService',
			component: TermsOfService
		},
		// Privacy Policy
		{
			path: '/privacy',
			name: 'PrivacyPolicy',
			component: PrivacyPolicy
		},

		// 404
		// 404
		// 404
		{
			path: '/404',
			name: 'error404',
			component: Error404
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});


export default router;
