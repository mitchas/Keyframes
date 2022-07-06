// 
// registers /public/service-worker.js if production
//
// 		Reloads if new content found.
// 

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
	navigator.serviceWorker.getRegistrations().then( function(registrations) { for(let registration of registrations) { registration.unregister(); } }); 

  	// register(`${process.env.BASE_URL}service-worker.js`, {
    // 	ready () {
    //   		console.log("Site is ready");
    // 	},
    // 	cached () {
    //   		console.log("Content has been cached for offline use.");
    // 	},
    // 	updatefound () {
    // 	  	console.log("New content is downloading.");
    // 	},
    // 	updated () {
    //   		console.log("New content is available; Refresh...");
    //   		setTimeout(() => {
    //    	 		window.location.reload(true);
    //   		}, 1000);
    // 	},
    // 	offline () {
    //   		console.log("No internet connection found. App is running in offline mode.");
    // 	},
    // 	error (error) {
    //   		console.error("Error during service worker registration:", error);
    // 	},
  	// });
}else{

	// Never cache - and delete old caches in non-prod
	// navigator.serviceWorker.getRegistrations().then(
// activate
	// 	function(registrations) {

	// 		for(let registration of registrations) {  
	// 			registration.unregister();
	// 		}

	// 	}
	// );
}