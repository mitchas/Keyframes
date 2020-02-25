// Soft keyboard mixin
export default {
	data() {
		return {
			windowHeightOnLoad: window.innerHeight,
		};
	},
	watch: {
		// Watch window height to determine if soft keyboard is visible
		windowHeight(newHeight, originalHeight) {
			console.log("it changed to " + newHeight + " from " + originalHeight);
		}
	},
	mounted() {

		// Check if device is mobile
		// Check orientation. Mobile devices have it defined, while desktops don't **USUALLY
		if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1) {
			// Is _likely_ a mobile device
			// Start height watcher
			this.$nextTick(() => {
				window.addEventListener('resize', this.watchSoftKeyboard);
			})
		}
		
	},
	beforeDestroy() { 
		// Remove resize listetner
		window.removeEventListener('resize', this.watchSoftKeyboard); 
	},
	methods: {
		// Watch height for mobile keyboard.
		// If height is 20% shorter than original height, keyboard is visible
		watchSoftKeyboard: function() {

			// Variable to track if keyboard is currently available
			// Use this and only commit to store if greater than 20%
			var softKeyboardOn = this.$store.getters.softKeyboard;

			var newHeight = window.innerHeight;
			var originalHeight = this.windowHeightOnLoad;

			var changePercent = parseInt(100 - ((newHeight / originalHeight) * 100));

			if(changePercent > 20 && !softKeyboardOn){
				softKeyboardOn = true;
				// Only commit to store if change occurs
				this.$store.commit('softKeyboard', true);
			}else if(softKeyboardOn && changePercent < 20){
				softKeyboardOn = false;
				// Only commit to store if change occurs
				this.$store.commit('softKeyboard', false);
			}else{
				softKeyboardOn = false;
			}
		},
	}
};
