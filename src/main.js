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


Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VueLodash, { name: 'animate' , lodash: { map, random } })

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


