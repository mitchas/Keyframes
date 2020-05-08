<!--
// 
// Home.vue
// _________________________
//
//	Home page view
//
// -->

<template>
	<div class="page text-page">

		<Callout
			icon="far fa-shapes"
			class="mbottom-sm"
			color="blue"
			size="fit">
			<span>Hello! I'm updating it for the first time in 2 years. It's rebuilt with Vue, has a few new features, and I will be adding more tools besides animations. Extension update will come in a little bit. There may be some bugs, so if you want the old version, <a href="https://mitchs.co/keyframes1/">click here</a>.</span>
		</Callout>


		<h1>
			An insanely simple way to create CSS animations
		</h1>

		<p>
			Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.
		</p>

		<p>
			And it gives you the CSS when you're done.
		</p>

		<p>
			<small>Better home page coming soon</small>
		</p>

		<button class="button mright-sm" @click="tab('https://chrome.google.com/webstore/detail/dalaiblmpeklkjnpeocmaojcfldmbfck')">
			<i class="fab fa-chrome"></i>
			<span>Download (old) Chrome Extension</span>
		</button>
		<button class="button green" @click="navigate('/animate/')">
			<i class="far fa-browser"></i>
			<span>Use Web App</span>
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