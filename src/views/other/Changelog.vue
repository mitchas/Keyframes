<!--
// 
// Changelog.vue
// _________________________
//
//	Changelog & Updates
//
// -->

<template>
	<div class="page text-page no-scrollbars">

		<Callout
			icon="far fa-shapes"
			class="mbottom-sm"
			color="green"
			size="fit">
			<span>
				This is the changelog.
			</span>
		</Callout>


	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Callout";
// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "home",

	components: {
		Callout
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
		};
	},

	mounted() {
		this.updateMeta("Changelog | Keyframes.app", "Do cool stuff with CSS.")
	},

	computed: {
	},
	
	methods: {
		
	}
};

</script>


<style lang="less">

	// @import '~@/styles/variables.less';

</style>