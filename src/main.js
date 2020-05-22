// main
// _________________________
//
//	Sets up vue app
//
//		- Sets up app, imports, filters,
// 
// 

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import './styles/base.less'

// Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import random from 'lodash/random'
import map from 'lodash/map'

// Touch Events
import Vue2TouchEvents from 'vue2-touch-events'

// Plugins
import plugins from "@/components/plugins.js";
Vue.use(plugins)


Vue.config.productionTip = false

// Moment
Vue.use(require('vue-moment'));
// Lodash
Vue.use(VueLodash, { name: 'animate' , lodash: { map, random } })
// Color Converter
window.convert = require('color-convert');
// Touch Events
Vue.use(Vue2TouchEvents)


let app = '';

import { store } from '@/store/store'

// Style component
Vue.component('v-style', {
	render: function (createElement) {
		return createElement('style', this.$slots.default)
	}
});
  

// Create vue app
if (!app) {
	app = new Vue({
		router,
		store,
		data: {
		},
		render: h => h(App)
	}).$mount('#app');
}


