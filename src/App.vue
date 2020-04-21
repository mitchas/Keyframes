<!--
// 
// App.vue
// _________________________
//
//	Main app component, present on all views
//
//		- Structure
//			- Topbar
//			- Body
//			- Toast
// 
//		- Functions
//			relayToast()
//				Shows toast with message, called from global plugin method
// 
// 		- Styles
// 			- #app
// 			- main#content
// 
// -->

<template>
	<!-- <div id="app"> -->
	<div id="app">
		<transition name="load">

			<div class="app-wrapper" v-if="pageMounted">

				<!-- Top bar component -->
				<!-- Logo, account dropdown, etc -->
				<TopBar></TopBar>

				<!-- All page contetnt contained within main -->
				<main id="content">
				
					<!-- Center/Main Content -->
					<div class="body-content">
						<!-- page transition defined in base.less -->
						<transition name="page" mode="out-in">
							<router-view/>
						</transition>
					</div>
				</main>

				<!-- Toast Component -->
				<Toast ref="toastComponent"></Toast>

			</div>
		</transition>
	</div>
</template>

<script>
// Components
import Toast from "@/components/ui/Toast";
import TopBar from "@/components/ui/TopBar";
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";



export default {
	name: "app",
	mixins: [
		preferencesMixin,
	],
	components: {
		Toast,
		TopBar,
	},
	data() {
		return {
			scrollLockPos: 0,
			pageMounted: false,
		};
	},
	created: function () {
	},
	computed: {
		// Computed prefs to watch
		prefs () {
			return this.$store.getters.userPreferences
		}
  	},
	watch: {
		// Watch prefs, save to localstorage
		prefs: {
			handler() {
				localStorage.setItem('user_preferences', JSON.stringify(this.$store.getters.userPreferences));
			},
			deep: true,
		},
	},
	mounted() {
		this.pageMounted = true;

		// Get and set prefs from local storage
		this.getPrefs();
	},
	beforeDestroy() { 
	},
	methods: {

	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	#app {
		display: flex;
		width: 100%;
		margin: 0;
		min-height: 100%;
		box-sizing: border-box;
		min-height: 100%;

		.app-wrapper{
			width: 100%;
			margin: 0 auto;
			min-height: 100%;
			display: block;
			max-height: calc(~'100vh - 70px');

			//////////////////////////////
			//    Main Content         //
			////////////////////////////
			main#content{
				box-sizing: border-box;
				padding-right: 0;
				z-index: 60;
				display: flex;
				min-height: calc(~'100% - 70px');
				height: 100%;


				// Main body content
				// Main body content
				// Main body content
				.body-content{
					box-sizing: border-box;
					padding: 0 15px;
					flex-grow: 3;
					min-height: 90vh;
					// to account for header
					min-height: calc(~'100% - 100px');
					overflow-x: hidden;

					@media (min-width: @screenMD) {
						padding-right: 25px;
						padding-left: 25px;
					}
				}
			}


		}

	}



	

</style>
