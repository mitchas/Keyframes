<!--
// 
// Home.vue
// _________________________
//
//	Home page view
//
// -->

<template>
	<div class="page">

		<Callout
			icon="far fa-shapes"
			class="mbottom-sm"
			color="purple"
			size="fit">
			<span>Hey, glad you still use this site :). I'm updating it for the first time in 2 years. I'm rebuilding it on Vue, and will be adding more tools besides animations. Extension update will come in a little bit. If you want the old version, <a href="https://keyframes.app/old/">click here</a>.</span>
			<small>Also, I'll make a proper home page. For now, just enjoy the bare minimum...</small>
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

		<button class="button mright-sm" @click="tab('https://chrome.google.com/webstore/detail/dalaiblmpeklkjnpeocmaojcfldmbfck')">
			<i class="fab fa-chrome"></i>
			<span>Download Chrome Extension</span>
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