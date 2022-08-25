<!--
//! App.vue
//		Main app component, present on all views
// -->

<template>

	<!-- Set classes for different preferences -->
	<div id="app" :class="{
		'no-animations': !$store.getters['User/preferences'].animations, 
		'no-outlines': !$store.getters['User/preferences'].outlines,
		'softkeyboard-visible': $store.getters['Device/softKeyboardVisible']
		}">


		<div :class="'theme-' + $store.getters['Hold/pageTheme']" id="mainScrollView">
		
			<!-- Loaders -->
			<transition-group name="load">
				<!-- Data loading -->
				<div id="dataLoading" key="1" v-if="$store.getters['Hold/isLoading'] == 'data'"><div id="loaderElement"></div></div>
			</transition-group>

			<!-- Nav Bar -->
			<NavBar></NavBar>

			<!-- All page content contained within main -->
			<main id="content">
				<transition name="page" mode="out-in">
						<router-view />
				</transition>
			</main>


			<!-- Toast Component -->
			<Toast ref="toastComponent"></Toast>

			<!-- Alert Component -->
			<Alert ref="alertComponent"></Alert>

			<!-- Confirm Leave Component -->
			<ConfirmLeave ref="confirmLeaveComponent"></ConfirmLeave>

			<!-- Lock scrolling on HTML if scrollLock is true -->
			<v-style v-if="$store.getters['Hold/scrollLock']">
				html{
					overflow: hidden;
				}
			</v-style>

			<!-- Toggle-able preferences that change HTML -->
			<!-- Rounded borders -->
			<v-style v-if="$store.getters['User/preferences'].round_borders">
				:root {
					--borderRadius: 8px;
				}
			</v-style>
			<v-style v-else>
				:root {
					--borderRadius: 1px;
				}
			</v-style>
			<!-- Fonts -->
			<v-style v-if="$store.getters['User/preferences'].font == 'serif'">
				:root {--primaryFont: var(--serif);}
			</v-style>
			<v-style v-else-if="$store.getters['User/preferences'].font == 'mono'">
				:root {--primaryFont: var(--monospace);}
			</v-style>
			<v-style v-else>
				:root {--primaryFont: var(--sans);}
			</v-style>
			


		</div>


	</div>
</template>


<script>
// Components
import NavBar from "@/components/ui/Single/NavBar";
import Alert from "@/components/ui/Common/Alert";
import Toast from "@/components/ui/Common/Toast";
import ConfirmLeave from "@/components/ui/Modals/ConfirmLeave";
// Mixins
import screenResizeMixin from "@/components/mixins/screenResizeMixin.js";
import shortcut, { CTRL } from "@/components/mixins/keyboard.js";

export default {
	name: "app",
	mixins: [
		screenResizeMixin,

		// Toggle Dark Mode witth 
		shortcut("d", CTRL, function(event) {
			event.preventDefault();
			this.$store.dispatch("User/TOGGLE_PREFERENCE", "dark_mode");
		}),
	],
	components: {
		Alert,
		Toast,
		NavBar,
		ConfirmLeave,
	},
	data() {
		return {
		};
	},
	created: function () {
		_paq.push(["disableCookies"]);
		_paq.push(["setCustomUrl", "/" ]);
		_paq.push(["setDocumentTitle", "Home"]);
		_paq.push(["trackPageView"]);
	},
	computed: {
	},
	watch: {
		// Send track on each route change
		$route (to, from){
			// Log tracking only if different route
			if(from.path != to.path){
				_paq.push(["setCustomUrl", to.path ]);
				_paq.push(["setDocumentTitle", to.name]);
				_paq.push(["trackPageView"]);
			}
		}
	},
	mounted() {
		let _this = this;

		this.$store.commit("Hold/SCROLL_LOCK", false);

		// Get geolocation if already allowed
		setTimeout(function(){
			if(_this.$store.getters["Device/permissions"].geolocation == "granted"){
				_this.getGeolocation(true);
			}
		}, 2000);

	},
	beforeDestroy() { 
	},
	methods: {

	}
};
</script>

<style lang="scss">


	// Data Loader
	#dataLoading{
		display: block;
		position: fixed;
		top: 0;
		left: -5vw;
		width: 110vw;
		height: 6px;
		z-index: 1000;

		@media (max-width: $screenSM) {
			height: 4px;
		}

		#loaderElement{
			display: block;
			position: absolute;
			left: 0;
			height: 100%;
			width: 0px;
			background-color: var(--primary);
			margin: 0 auto;
			animation: dataLoading 1.8s ease-in-out 0s infinite normal;
		}
	}
	@keyframes dataLoading {
		0.0%{ width: 0px; left: 0%;}
		40%{ width: 60vw;}
		60%{ width: 40vw;}
		100%{ width: 0px; left: 100%;}
	}
	


	// Outermost wrapper
	// UI Toggle Controls
	#app {
		// Toggleable UI preferences
		&.no-animations{
			*{
				transition-duration: 0s !important;
				animation-duration: 0s !important;
			}
		}
		&.no-outlines{
			input,button,textarea,a,select,.focusable{
				outline: none;
				&:focus{
					outline: none !important;
				}
				&:active{
					outline: none;
				}
			}
		}
	}


	//  Main App Content
	main#content{
		overflow-x: hidden;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 60px;
	}


</style>
