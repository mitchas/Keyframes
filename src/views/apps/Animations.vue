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