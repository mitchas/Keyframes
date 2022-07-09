<!--
	Tasks Page
-->

<template>
	<div class="padded">


		<div class="max-width margin-auto">

			<div id="homeLogo">
				<img src="@/assets/branding/logo-light.png" title="Logo" alt="Logo" v-if="!$store.getters['User/darkMode']"/>
				<img src="@/assets/branding/logo-dark.png"  title="Logo" alt="Logo" v-else />
			</div>

			<h2 class="ptop-sm">Tasks.</h2>

			<button class="button" @click="testVib()">
			SHARE TEXT</button>
			<button class="button" @click="testVib2()">
			SHARE URL</button>


		</div>


	</div>
</template>

<script>
// Components


export default {
	name: "animations",

	components: {
	},

	mixins: [
	],

	data() {
		return {

		};
	},

	watch: {
		
	},
	
	mounted() {
		
	},
	created: function () {
	},

	beforeDestroy(){
	},
	
	methods: {

		testVib: function(){
				navigator.share({
					text: "TEST SHARE TEXT",
				})
		},
		testVib2: function(){
				navigator.share({
					url: "https://google.com",
				})
		},


	}
};

</script>


<style lang="scss">

#homeLogo{
	margin: 25px auto;

	img{
		height: 55px;
		width: auto;
		display: block;
	}
}

</style>