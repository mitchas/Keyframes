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

		<br/><br/><br/><br/>
		<h1 class="mbottom-md">Buttons!</h1>
		<button class="button green mbottom-xs mright-xs">
			<i class="far fa-browser"></i>
			<span>Green</span>
		</button>
		<button class="button red mbottom-xs mright-xs">
			<i class="far fa-browser"></i>
			<span>Red</span>
		</button>
		<button class="button blue mbottom-xs mright-xs">
			<i class="far fa-browser"></i>
			<span>Blue</span>
		</button>
		<button class="button yellow mbottom-xs mright-xs">
			<i class="far fa-browser"></i>
			<span>Yellow</span>
		</button>
		<button class="button purple mbottom-xs mright-xs">
			<i class="far fa-browser"></i>
			<span>Purple</span>
		</button>
		<button class="button grey mbottom-xs mright-xs">
			<i class="far fa-browser"></i>
			<span>Grey</span>
		</button>

		<p>
			<!-- <a href="https://hotdi.sh" target="_blank">
				<img src="@/assets/branding/hotdish.png" @click="tab('https://hotdi.sh')" title="Hotdish Logo" v-bind:class="{'invert': $store.getters.userPreferences.darkMode}"/>
			</a> -->
		</p>

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