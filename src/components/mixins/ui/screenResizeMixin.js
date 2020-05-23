// Screen Resize Mixin
// _________________________
//
// 	mounted():
// 			- if it's a touch device, it adds an event listener to watch for screen resizing. 
// 			- Calls watchResize() on resize.
// 
// 	watchResize(): 
// 			- Then checks height change for mobile devices
// 				- Calculates the percentage change in height using the original size and the end size,
// 				- if the difference is greater than 20%, it's likely because an on screen keyboard is showing
// 				- Commits to the store softKeyboard true/false
// 
// 	beforeDestroy()
// 			- removes event listener on screen size and scroll
//

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
		if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
			//this is a touch device, watch for resize
			window.addEventListener('resize', this.watchResize);	
			this.watchResize();	
		}

	},
	beforeDestroy() { 
		// Remove resize listener
		window.removeEventListener('resize', this.watchResize); 
	},
	methods: {
		// Watch screen for resize.
		// If height is 20% shorter than original height, keyboard is visible
		watchResize: function() {
			var _this = this;

			// Clear timeout so it only runs after 300ms delay
			clearTimeout(this.resizeTimer);

			// Timer to prevent many firings
			this.resizeTimer = setTimeout(function() {

				// Get props
				var deviceProps = _this.$store.getters.device;
				
				// Variable to watch if keyboard is currently visible
				var softKeyboardOn = deviceProps.softKeyboardVisible;
				// Get screen dimensions
				var newScreenWidth = window.innerWidth;
				var newScreenHeight = window.innerHeight;
				var originalHeight = _this.windowHeightOnLoad;

				// Calculate percentage changed
				var changePercent = parseInt(100 - ((newScreenHeight / originalHeight) * 100));

				// If percent greater than 20, and keyboard isn't currently open
				if(changePercent > 20 && !softKeyboardOn){
					// Only update if change occurs
					softKeyboardOn = true;
					deviceProps.softKeyboardVisible = true;

				}else if(softKeyboardOn && changePercent < 20){
					// If keyboard is open, hide it
					softKeyboardOn = false;
					deviceProps.softKeyboardVisible = false;
				}

				// Commit current props back to store
				_this.$store.commit('device', deviceProps);
						
			}, 300);

		},

	}
};
