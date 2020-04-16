// Meta Mixin
// _________________________
//
// 	updateMeta(title, description): Updates page meta and browser tab.
// 			title: Browser/Tab title.
// 			description: Page description, which isn't really used.
// 

export default {
	methods: {
		/////////////////
		//    Meta    //
		///////////////

		// Update browser title (and description)
		// On page load
		updateMeta: function(title, description){
			document.title = title;
			document.querySelector('meta[name="description"]').setAttribute("content", description);
		}
	}
};
