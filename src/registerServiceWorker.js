// From https://medium.com/js-dojo/vuejs-pwa-cache-busting-8d09edd22a31

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  	register(`${process.env.BASE_URL}service-worker.js`, {
    	ready () {
      		console.log('Site is ready')
    	},
    	cached () {
      		console.log('Content has been cached for offline use.')
    	},
    	updatefound () {
    	  	console.log('New content is downloading.')
    	},
    	updated () {
      		console.log('New content is available; Refresh...')
      		setTimeout(() => {
       	 		window.location.reload(true)
      		}, 1000)
    	},
    	offline () {
      		console.log('No internet connection found. App is running in offline mode.')
    	},
    	error (error) {
      		console.error('Error during service worker registration:', error)
    	},
  	})
}