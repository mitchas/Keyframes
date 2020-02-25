import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import './styles/base.less'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));

let app = '';

import { store } from '@/store/store'


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
