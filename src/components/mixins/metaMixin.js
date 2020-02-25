// Meta Mixin

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
