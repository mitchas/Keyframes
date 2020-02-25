// Scroll Lock mixin
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
