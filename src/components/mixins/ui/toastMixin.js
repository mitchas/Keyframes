// Toast mixin
export default {
	methods: {
		toast: function(title, body, color, icon) {
			this.$root.$children[0].relayToast(title, body, color, icon);
		}
	}
};
