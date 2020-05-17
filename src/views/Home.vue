<!--
// 
// Home.vue
// _________________________
//
//	Home page view
//
// -->

<template>
	<div class="page text-page no-scrollbars">

		<Callout
			icon="far fa-shapes"
			class="mbottom-sm"
			color="blue"
			size="fit">
			<span>Hello! After two years I decided to rewrite Keyframes to fix some bugs, make it faster, and add tools other than animations. Read more about the changes <a @click="navigate('/changelog')">here</a>. If you want to continue to use the old version, <a href="https://mitchs.co/keyframes1/">you can find it here</a>.</span>
		</Callout>


		<h1>Keyframes is a simple CSS toolbox.</h1>
		<h3 class="mtop-xs">(a better home page is coming soon)</h3>


		<p>
			I'm in the process of re-writing Keyframes, and I'm waiting to finish the home page until the tools are done. But feel free to click around and use the tools.
		</p>


		<button class="button mright-sm" @click="navigate('/animate/')">
			<i class="far fa-stream"></i>
			<span>Animation Creator</span>
		</button>

		<button class="button mright-sm blue" @click="navigate('/colors/')">
			<i class="far fa-tint"></i>
			<span>Color Palettes</span>
		</button>

		<button class="button mright-sm yellow" @click="navigate('/shadows/')">
			<i class="far fa-eclipse"></i>
			<span>Box Shadow Generator</span>
		</button>


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
		this.updateMeta("Keyframes.app", "Do cool stuff with CSS.")
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