// Navigate Mixin
export default {
	methods: {
		///////////////////////
		//    Navigation    //
		/////////////////////

		// Function to navigate with -> navigate("/route")
		// This lets you use custom elements that are accessible/focusable, rather than router-link
		// then use @click to navigate()
		navigate: function(route) {

			if(route == this.$route.path){
				return;
			}else{
				this.$router.push(route);
				document.documentElement.scrollTop = 0;
			}
		}
	}
};
