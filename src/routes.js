// routes.js
// Defined routes for Vue router to use
let AppName = process.env.VUE_APP_COMPANY_NAME;


export const routes = [
	// * Default Page
	{
		path: "/",
		name: "home",
		component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
		meta: {
			title: AppName + " — Home",
		}
	},
	// * Settings Page
	{
		path: "/settings",
		name: "settings",
		component: () => import(/* webpackChunkName: "settings" */ "./views/Settings.vue"),
		meta: {
			title: AppName + " — Settings",
		}
	},
	// Apps
		// Animate
		{
			path: "/animate",
			name: "animations",
			component: () => import(/* webpackChunkName: "animations" */ "./views/apps/Animations.vue"),
			meta: {
				title: "Animations — " + AppName,
			}
		},
		// Colors
		{
			path: "/colors/:urlColors?",
			name: "colors",
			component: () => import(/* webpackChunkName: "colors" */ "./views/apps/Colors.vue"),
			meta: {
				title: "Colors — " + AppName,
			}
		},
		{
			path: "/colors2/",
			name: "colors",
			component: () => import(/* webpackChunkName: "colors" */ "./views/apps/OGColors.vue"),
			meta: {
				title: "Colors — " + AppName,
			}
		},
		// Characters
		{
			path: "/characters",
			name: "characters",
			component: () => import(/* webpackChunkName: "colors" */ "./views/apps/Characters.vue"),
			meta: {
				title: "Colors — " + AppName,
			}
		},
	// 
	// ! Static Docs / Technical
	//
	// 
	//* Sponsor
	{
		path: "/sponsor",
		name: "sponsor",
		component: () => import(/* webpackChunkName: "sponsor" */ "./views/other/docs/Sponsor.vue"),
		meta: {
			title: "Sponsor — " + AppName,
		}
	},
	//* Changelog
	{
		path: "/changelog",
		name: "changelog",
		component: () => import(/* webpackChunkName: "changelog" */ "./views/other/docs/Changelog.vue"),
		meta: {
			title: "Changelog — " + AppName,
		}
	},
	//* TOS
	{
		path: "/terms",
		name: "terms-of-service",
		component: () => import(/* webpackChunkName: "terms-of-service" */ "./views/other/docs/TermsOfService.vue"),
		meta: {
			title: "Terms of Service — " + AppName,
		}
	},
	//* Privacy Policy
	{
		path: "/privacy",
		name: "privacy-policy",
		component: () => import(/* webpackChunkName: "privacy-policy" */ "./views/other/docs/PrivacyPolicy.vue"),
		meta: {
			title: "Privacy Policy — " + AppName,
		}
	},
	//* Design
	// Example page for seeing UI Elements
	{
		path: "/design",
		name: "design",
		component: () => import(/* webpackChunkName: "design" */ "./views/other/docs/design/Design.vue"),
		meta: {
			title: "Design — " + AppName,
		}
	},
	// 
	// ! Other Pages
	// 
	// * 404 Page
	{
		path: "/404/",
		name: "error-404",
		component: () => import(/* webpackChunkName: "error-404" */ "./views/other/error.vue"),
		meta: {
			title: "404 - Page not Found — " + AppName,
		}
	},
	// 
	// ! Redirect to 404 if route does not exist
	{
		path: "*",
		redirect: "/404/"
	}
];