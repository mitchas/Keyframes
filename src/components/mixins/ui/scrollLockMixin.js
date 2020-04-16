// Scroll Lock Mixin
// _________________________
//
// 	scrollLock(): Adds css class .scroll-lock to body html tag to prevent any scrolling
// 
// 			call when full-screen (100% view width and height) fixed element is on screen - like a modal

export default {
	methods: {
		scrollLock: function(state) {

			////////////////////////
			//    Scroll Lock    //
			//////////////////////

			// If state is true, lock scroll
			if(state){
				// Add class to lock scrolling
				document.getElementsByTagName("body")[0].classList.add("scroll-lock");
			}else{
				// Disable scroll lock
				document.getElementsByTagName("body")[0].classList.remove("scroll-lock");
			}

		},
		  
		  
	}
};
