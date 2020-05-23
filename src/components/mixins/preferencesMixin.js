// Preferences mixin
// Methods for managing user preferences
// _________________________
// 
// 	toggleDarkMode(mode): sets browser theme
// 			mode true/false can be passed, but is optional. Default is toggle
// 			If user is signed in, it'll call savePreferences() to save their change to firebase
// 
// 	toggleAnimations(mode): toggles UI animations
// 			If user is signed in, it'll call savePreferences() to save their change to firebase
// 
// 	getPrefs(): Gets preferences from local storage
// 
// 	savePrefs(): Saves preferences to local storage
// 			saves current preferences object to firebase if user is signed in, otherwise nothing
// 

export default {
	methods: {
		/////////////////////////////
		//    Dark Mode Toggle    //
		///////////////////////////
		toggleDarkMode: function(mode){

			// If true/false argument passed
			if(mode != null){
				// If true, turn on
				if(mode){
					document.documentElement.setAttribute('data-theme', 'dark');
				}else{
					document.documentElement.setAttribute('data-theme', 'light');
				}

			}else{
				// Else simply toggle it
				if(this.$store.getters.userPreferences.darkMode){
					document.documentElement.setAttribute('data-theme', 'dark');
				}else{
					document.documentElement.setAttribute('data-theme', 'light');
				}
			}
		},
		////////////////////////
		// Toggle animations //
		//////////////////////
		toggleAnimations: function(mode){

			// If true/false argument passed
			if(mode != null){
				// If true, turn on
				if(mode){
					document.getElementsByTagName("body")[0].classList.remove("no-animations");
				}else{
					document.getElementsByTagName("body")[0].classList.add("no-animations");
				}

			}else{
				// Else simply toggle it
				if(this.$store.getters.userPreferences.animations){
					// Turn animations back on
					document.getElementsByTagName("body")[0].classList.remove("no-animations");
				}else{
					// Turn animations off with no-animations class on body
					document.getElementsByTagName("body")[0].classList.add("no-animations");
				}
			}
			
			
		},

		//////////////////////
		// Get Preferences //
		////////////////////
		// Get preferences from local storage if they exist
		getPrefs: function(){
			let _this = this;

			// Get prefs from local storage
			if (localStorage.getItem('user_preferences')){
				_this.$store.commit('userPreferences', JSON.parse(localStorage.getItem('user_preferences')));
			}else{

				// No dark mode saved, check device settings
				var currentPrefs = _this.$store.getters.userPreferences;
				// If dark system settings
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					_this.toggleDarkMode(true);
					currentPrefs["darkMode"] = true;
					_this.$store.commit('userPreferences', currentPrefs);
				}else{
					// Else set to false, which makes default theme light
					_this.toggleDarkMode(false);
					currentPrefs["darkMode"] = false;
					_this.$store.commit('userPreferences', currentPrefs);
				}
			}

			// Make changes based on gotten prefs
			_this.setPrefs();

			// Save visit to local storage - use count for prompt for donation? Maybe?
			var totalVisits = _this.$store.getters.userPreferences.totalVisits;
			if(totalVisits){
				totalVisits = parseInt(totalVisits) + 1;

				// Do something if visits equals X
				if(totalVisits == 15){
					_paq.push(['trackEvent', 'Action', 'Returns', "15"]);	
				}else if(totalVisits == 25){
					_paq.push(['trackEvent', 'Action', 'Returns', "25"]);	
				}else if(totalVisits == 50){
					_paq.push(['trackEvent', 'Action', 'Returns', "50"]);	
				}else if(totalVisits == 100){
					_paq.push(['trackEvent', 'Action', 'Returns', "100"]);	
				}
			}else{
				// Else this is their first visit
				totalVisits = 1;
			}
			
			// Save to localstorage
			_this.$store.getters.userPreferences.totalVisits = totalVisits;

		},
		//////////////////////
		// Set Preferences //
		////////////////////
		// Call this function to set preferences on UI based on value
		setPrefs: function(){
			// Start Page
			// Only load if user visits home
			// That way if they purposefully visit another URL directly, it won't switch it.
			if(this.$route.path == "/"){
				// Only reroute if it's NOT to '/' since it's already there.
				if(this.$store.getters.userPreferences.startPage && this.$store.getters.userPreferences.startPage != '/'){
					this.$router.push(this.$store.getters.userPreferences.startPage);
					document.documentElement.scrollTop = 0;
				}
			}

			// Save device info
			var deviceProps = this.$store.getters.device;
			// We know it's touch because this function ran
			if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
				deviceProps.hasTouch = true;
			}
			// If running in standalone PWA mode
			if (window.matchMedia('(display-mode: standalone)').matches) {
				deviceProps.standalone = true;

				// If 'installed' is not already true in prefs, 
				// user is opening for first time after install - track it, then update pref so it doesn't track again
				if(!this.$store.getters.userPreferences.installed){
					_paq.push(['trackEvent', 'Action', 'Install', "PWA"]);
					this.$store.getters.userPreferences.installed = true;
				}
				
			}

			// Save back to store
			this.$store.commit('device', deviceProps);
			

			// Dark mode
			if(this.$store.getters.userPreferences.darkMode){
				document.documentElement.setAttribute('data-theme', 'dark');
			}else{ // Else set light
				document.documentElement.setAttribute('data-theme', 'light');
			}
	
			// Animations
			if(this.$store.getters.userPreferences.animations != null && !this.$store.getters.userPreferences.animations){
				document.getElementsByTagName("body")[0].classList.add("no-animations");
			}else{
				document.getElementsByTagName("body")[0].classList.remove("no-animations");
			}
	
			// Set defaults
			if(this.$store.getters.userPreferences.tooltips == null){
				this.$store.getters.userPreferences.tooltips = true;
			}
			if(this.$store.getters.userPreferences.confirmLeave == null){
				this.$store.getters.userPreferences.confirmLeave = true;
			}
			if(!this.$store.getters.userPreferences.viewed){
				this.$store.getters.userPreferences.viewed = {};
			}
			if(!this.$store.getters.userPreferences.installed){
				this.$store.getters.userPreferences.installed = false;
			}
		},

	}
};
