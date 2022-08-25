//! Screen Resize Mixin
//
// 	mounted(): Checks window for orientation property  to determine if it's a mobile device.
// 					orientation is *usually* undefined on desktop, so if it's defined, it's mobile
// 			- if it's a mobile device, it adds an event listener to watch for screen resizing. 
// 			- Calls watchSoftKeyboard() on resize.
// 
// 	watchResize(): 
// 			This function has two parts
// 
// 			- First, checks width on resize to see if it's mobile (less than 768px)
// 
// 			- Then checks height change for mobile devices
// 				- Calculates the percentage change in height using the original size and the end size,
// 				- if the difference is greater than 20%, it's likely because an on screen keyboard is showing
// 				- Commits to the store softKeyboard true/false
// 
// 	beforeDestroy()
// 			- removes event listener on screen size and scroll
//

/** 
 * @group Mixins
 * Watches for screen resize and updates store. Also calculates change to determine if mobile keyboard is visible.
 */

export default {
	data() {
		return {
			windowHeightOnLoad: window.innerHeight,
			windowWidthOnLoad: window.innerHeight,
			resizeTimer: null,
		};
	},
	watch: {
	},
	mounted() {
		window.addEventListener("resize", this.watchResize);	
		this.watchResize();	
	},
	beforeDestroy() { 
		// Remove resize listener
		window.removeEventListener("resize", this.watchResize); 
	},
	methods: {
		
		/**
		* @vuese
		* Watch screen for resize - If height is 20% shorter than original height, keyboard is visible
		* @arg The string to check
		*/
		watchResize: function() {
			var _this = this;

			// Clear timeout so it only runs after 300ms delay
			clearTimeout(this.resizeTimer);

			// Timer to prevent many firings
			this.resizeTimer = setTimeout(function() {
				
				var newScreenWidth = window.innerWidth;

				// Check mobile (768px or narrower)
				if(newScreenWidth <= 768){
					// Is mobile 
					_this.$store.dispatch("Device/SCREEN_SIZE_CHANGE", true);

					// Now check if keyboard is visible
					let softKeyboardOn = _this.$store.getters["Device/softKeyboardVisible"];

					var newScreenHeight = window.innerHeight;
					var originalHeight = _this.windowHeightOnLoad;
					// Calculate percentage changed
					var changePercent = parseInt(100 - ((newScreenHeight / originalHeight) * 100));
					// If percent greater than 20, and keyboard isn't currently open
					if(changePercent > 20 && !softKeyboardOn){
						softKeyboardOn = true;
						// Only commit to store if change occurs
						_this.$store.dispatch("Device/SOFT_KEYBOARD_CHANGE", true);
					}else if(softKeyboardOn && changePercent < 20){
						// If keyboard is open, hide it
						softKeyboardOn = false;
						_this.$store.dispatch("Device/SOFT_KEYBOARD_CHANGE", false);
					}
				}else{
					_this.$store.dispatch("Device/SOFT_KEYBOARD_CHANGE", false);
					_this.$store.dispatch("Device/SCREEN_SIZE_CHANGE", false);
				}

						
			}, 50);

		},

	}
};
