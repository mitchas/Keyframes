// App Base 
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

					<!-- Sidebar Component -->
					<Sidebar></Sidebar>
				
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
import Sidebar from "@/components/ui/Sidebar";
// Mixins
import navigateMixin from "@/components/mixins/navigateMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";



export default {
	name: "app",
	mixins: [
		navigateMixin,
		preferencesMixin,
	],
	components: {
		Toast,
		TopBar,
		Sidebar
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

		//////////////////
		//    Toast    //
		////////////////
		// This forwards the toast content to the component, which displays it
		relayToast: function(title, body, color, icon) {
			this.$refs.toastComponent.showToast(title, body, color, icon);
		},

	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	#app {
		display: block;
		width: 100%;
		margin: 0;
		min-height: 100%;
		box-sizing: border-box;
		min-height: 100%;
		position: relative;
		height: 100%;

		.app-wrapper{
			width: 100%;
			margin: 0 auto;
			min-height: 100%;
			display: block;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			max-height: 100%;
			height: 100%;
			overflow: hidden;
		}

	}


	//////////////////////////////
	//    Main Content         //
	////////////////////////////
	main#content{
		box-sizing: border-box;
		padding-right: 0;
		z-index: 60;
		display: flex;
		flex-grow: 3;
		max-height: calc(~'100% - 70px');


		// Main body content
		// Main body content
		// Main body content
		.body-content{
			box-sizing: border-box;
			padding: 0;
			flex-grow: 3;
			// to account for header
			

			@media (min-width: @screenMD) {
				padding-left: 50px;
				padding-right: 35px;
			}
			@media (min-width: @screenLG) {
				padding-left: 60px;
			}
			@media (min-width: @screenXL) {
				padding-left: 70px;
			}
		}
	}


</style>
