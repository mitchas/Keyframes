
<script>


export default {
	name: "v-style",
	render: function (createElement) {
		return createElement('style', this.$slots.default)
	}
};
</script>
