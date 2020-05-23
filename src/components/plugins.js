// 
// Plugins
// Global methods to use in any mixin or component
// _________________________
//
// 	navigate(route): pushes route to update vue router
// 			only fires if route is different than current route
// 			Specific pages (tools) ask for confirmation before leaving
// 				unless users have it disabled in settings
// 
// 	tab(url): opens url in new tab
// 
// 	copyToClipboard(name, value): Copies value to clipboard, shows toast confirmation
// 	 
// 	share(shareText): share's current URL using native share function, otherwise just copies current url to clipboard
// 	
// 	invertText(hex): takes hex value and returns hex with proper contrast black or white
// 	
// 	hello(message, icon, color): Shows tiny yellow toast for a brief moment
// 			- optional colors: red, blue, green, invert
//  
// 	toast(): provides easy this.toast() call to use in any component.
//
//			- function calls showToast() in Toast Component within App.vue, which shows the toast.
//					 Basically just a shortcut for that
// 
// 			- format options: this.toast(title, body, color, icon)
// 				title: Text string for larger text at top
// 				body: Text string for longer toast description
// 				color: primary (default/blank), red, green, yellow
// 				icon: text string of font awesome classes
// 
// 				example: this.toast("Error!", "Something went wrong.", "red", "far fa-siren")
// 

export default {

	install(Vue, options){

		/////////////////////
		//    Navigate    //
		///////////////////
		// Function to navigate with -> navigate("/route")
		// This lets you use custom elements that are accessible/focusable, rather than router-link
		// then use @click to navigate()
		Vue.prototype.navigate = function(route) {
			// Confirm leave on these pages
			var confirmPages = ['/animate/', '/colors/', '/shadows'];

			if(route == this.$route.path){
				return;
			}else{

				if(confirmPages.includes(this.$route.path) && this.$store.getters.userPreferences.confirmLeave){
					// Show confirmation
					this.$root.$children[0].$refs.confirmLeaveComponent.confirmLeave(route);
				}else{
					// Else no confirmation needed
					this.$router.push(route);
					document.documentElement.scrollTop = 0;
				}
			}
		}

		//////////////////////////////
		//// Open url in new tab ////
		////////////////////////////
		Vue.prototype.tab = function(url) {
			window.open(url, '_blank');
		}

		/////////////////////////////////////////
		//// Copy value to device clipboard ////
		///////////////////////////////////////
		Vue.prototype.copyToClipboard = function(name, value) {
			// Create input element, append text, copy text, remove element
			var inp =document.createElement('textarea');
			document.body.appendChild(inp)
			inp.value = value;
			inp.select();
			document.execCommand('copy',false);
			inp.remove();
			// Toast
			// this.toast("Copied!", name + " has been copied to your clipboard. ", "", "far fa-copy");
			this.hello(name + " has been copied to your clipboard!", "far fa-copy");
		},

		////////////////////
		//// Share URL ////
		//////////////////
		Vue.prototype.share = function(shareText) {
			var text = shareText;

			if (navigator.share) {
				navigator.share({
					title: document.title,
					text: shareText,
					url: location.href,
				})
				  .then(() => console.log('Successful share'))
				  .catch((error) => console.log('Error sharing', error));
			}else{
				this.copyToClipboard("This page URL", document.href)
			}

		},

		/////////////////////
		//  Invert Text   //
		////////////////////
		// Decides contrast color (for text) based on hex color input.
		// Taken from https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
		Vue.prototype.invertTextColor = function(color) {
			var hexcolor = color.replace("#", "");
			var r = parseInt(hexcolor.substr(0,2),16);
			var g = parseInt(hexcolor.substr(2,2),16);
			var b = parseInt(hexcolor.substr(4,2),16);
			var yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? 'black' : 'white';
		},

		////////////////////////
		//// Toast & Alert ////
		//////////////////////
		Vue.prototype.toast = function(title, body, color, icon) {
			this.$root.$children[0].$refs.toastComponent.showToast(title, body, color, icon);
		}
		Vue.prototype.hello = function(message, icon, color) {
			this.$root.$children[0].$refs.alertComponent.showAlert(message, icon, color);
		}
	}
 }