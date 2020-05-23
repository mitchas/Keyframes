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
				<!-- Alert Component -->
				<Alert ref="alertComponent"></Alert>
				<!-- Alert Component -->
				<ConfirmLeave ref="confirmLeaveComponent"></ConfirmLeave>

			</div>
		</transition>
	</div>
</template>

<script>
// Components
import Alert from "@/components/ui/Alert";
import Toast from "@/components/ui/Toast";
import ConfirmLeave from "@/components/ui/ConfirmLeave";
import TopBar from "@/components/ui/TopBar";
// Mixins
import preferencesMixin from "@/components/mixins/preferencesMixin.js";



export default {
	name: "app",
	mixins: [
		preferencesMixin,
	],
	components: {
		Alert,
		Toast,
		ConfirmLeave,
		TopBar,
	},
	data() {
		return {
			scrollLockPos: 0,
			pageMounted: false,
		};
	},
	created: function () {
		// Send initial track
		_paq.push(['setCustomUrl', "/" ]);
		_paq.push(['setDocumentTitle', "Home"]);
		_paq.push(['trackPageView']);
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

		// Send track on each route change
		$route (to, from){
			// Log tracking only if different route
			if(from.path != to.path){
				_paq.push(['setCustomUrl', to.path ]);
				_paq.push(['setDocumentTitle', to.name]);
				_paq.push(['trackPageView']);
			}
		}

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
		max-height: 100%;

		.app-wrapper{
			width: 100%;
			margin: 0 auto;
			min-height: 100%;
			display: block;
			overflow: hidden;

			//////////////////////////////
			//    Main Content         //
			////////////////////////////
			main#content{
				box-sizing: border-box;
				padding-right: 0;
				z-index: 60;
				display: flex;
				min-height: calc(~'100% - 54px');
				height: 100%;
				height: calc(~'100% - 54px');


				// Main body content
				// Main body content
				// Main body content
				.body-content{
					box-sizing: border-box;
					padding: 0 0;
					flex-grow: 3;
					// to account for header
					overflow-x: hidden;
				}
			}


		}

	}



	

</style>
