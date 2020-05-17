// 
// Plugins
// Global methods to use in any mixin or component
// _________________________
//
// 	navigate(route): pushes route to update vue router
// 			only fires if route is different than current route
// 
// 	tab(url): opens url in new tab
// 
// 	copyToClipboard(name, value): Copies value to clipboard, shows toast confirmation
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

		console.log("Installing Vue Plugins")

		/////////////////////
		//    Navigate    //
		///////////////////
		// Function to navigate with -> navigate("/route")
		// This lets you use custom elements that are accessible/focusable, rather than router-link
		// then use @click to navigate()
		Vue.prototype.navigate = function(route) {
			if(route == this.$route.path){
				return;
			}else{
				this.$router.push(route);
				document.documentElement.scrollTop = 0;
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
			this.alert(name + " Copied to clipboard!", "far fa-copy");
		}

		////////////////////////
		//// Toast & Alert ////
		//////////////////////
		Vue.prototype.toast = function(title, body, color, icon) {
			this.$root.$children[0].$refs.toastComponent.showToast(title, body, color, icon);
		}
		Vue.prototype.alert = function(message, icon) {
			this.$root.$children[0].$refs.alertComponent.showAlert(message, icon);
		}
	}
 }