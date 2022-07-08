<!-- 
Top nav bar - fixed
-->

<template>
	<div>
		<nav id="nav">

			<div id="branding">

				<button @click="!$store.getters['User/app_launcher'] ? navigate('/') : toggleAppLauncher()" tabindex="0">
					<img src="@/assets/branding/logo-light.png" title="Logo" alt="Logo" v-if="!$store.getters['User/darkMode']"/>
					<img src="@/assets/branding/logo-dark.png"  title="Logo" alt="Logo" v-else />
				</button>

			</div>


			<div id="appList" class="no-scrollbars" @click="appLauncherVisible = false">

			
				<!-- Links - loop -->
				<router-link v-for="(app, key) in appLinks" :key="key" :class="{'active': $route.path.startsWith(app.path), 'hidden': !appData[key].enabled}" :to="app.path">
					<i :class="app.icon"></i>
					<b>{{app.title}}</b>
				</router-link>
				<!-- Blank/Gap -->
				<a>&nbsp;</a>

			</div>
		</nav>



		<!-- App Launcher -->
		<transition name="lightbox">
			<div class="lightbox" v-if="appLauncherVisible" @click="appLauncherVisible = false"></div>
		</transition>

		<transition name="lightbox">
			<div id="launcher" v-if="appLauncherVisible" @click="appLauncherVisible = false">
				<div class="card-grid mtop-md no-scrollbars padded" v-if="appLinks">

					<router-link class="card" v-for="(app, key) in appLinks" :key="key" :class="{'active': $route.path == app.path, 'hidden': !appData[key].enabled}" :to="app.path">
						<div class="card-main" v-if="appLinks[key]">
							<i :class="'card-icon ' + app.icon"></i>
							<b class="ul">{{app.title}}</b>
						</div>
						<!-- Card Body -->
						<div class="card-body">
							<p>{{app.description}}</p>
						</div>
						<!-- Footer controls -->
						<div class="card-footer">
							<div class="card-tags">
								<span :class="'tag ' + app.category">{{app.category}}</span>
							</div>
						</div>
					</router-link>

				</div>
			</div>
		</transition>



		<!-- Command Launcher Lightbox -->
		<!-- <Launcher :show="appLauncherVisible" @closed="appLauncherVisible = false"></Launcher> -->


		

	</div>
</template>

<script>

import shortcut from "@/components/mixins/keyboard.js";
// import Launcher from "@/components/ui/Single/Launcher";


// Components
export default {
	name: "TopBar",
	components: {
		// Launcher,
	},
	mixins: [
		// Dismiss modals with escape
		shortcut('escape', function() {
			this.appLauncherVisible = false;
		}),
	],
	data() {
		return {
			appLauncherVisible: false,
		};
	},
	computed: {
		appLinks(){
			return this.$store.getters["Site/apps"];
		},
		appData(){
			return this.$store.getters["User/apps"]
		},
  	},
	watch:{
	},
	methods: {

		toggleAppLauncher: function(){
			this.appLauncherVisible = !this.appLauncherVisible;
		}

	}
};
</script>

<style lang="scss">

	
	// Top nav bar
	// Has logo and hover menu for account/dark mode
	#nav{
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		position: fixed;
		top: 0px;
		z-index: 12;
		transition: all 0.2s ease;
		width: 100%;
		height: var(--topBarHeight);
		background-color: var(--layer);
		border-bottom: 1px solid var(--border);
		// box-shadow: var(--shadow);

		#branding{
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 0 0 15px;

			button{
				margin: 0;
				padding: 0;
				&:active{
					transform: scale(0.9);
				}
			}

			img{
				height: 36px;
				width: auto;
				@media (max-width: $screenSM) {
					height: 28px;
				}
			}
		}

		#appList{
			width: 100%;
			display: flex;
			gap: 8px;
			box-sizing: border-box;
			padding-left: 25px;
			overflow-x: auto;

			@media (max-width: $screenSM) {
				gap: 3px;
			}

			a{
				display: flex;
				font-size: 0.85rem;
				font-weight: 500;
				gap: 12px;
				padding: 10px 20px;
				margin: 8px 0;
				white-space: pre;
				position: relative;
				border-radius: calc(var(--borderRadius) * 1.35);
				color: var(--text);

				@media (max-width: $screenSM) {
					font-size: 0.8rem;
					gap: 8px;
					padding: 8px 12px;
					margin: 8px 0;
				}

				&:hover{
					background-color: var(--background);
				}

				&.active{
					color: var(--primary);
					background-color: var(--primary);
					color: var(--white);

					&:hover{
						background-color: var(--primary);
					}
				}
				i,b{
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
				i{
					font-size: 1.4rem;
					text-decoration: none !important;
					@media (max-width: $screenSM) {
						font-size: 1.2rem;
					}
				}

				&:last-child{
					padding-right: 55px;
				}
			}

			// Expanded App Launcher
			&.card-grid{
				z-index: 250;
				height: fit-content;
			}

		}

	}


	#launcher{
		z-index: 250;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		max-height: 100vh;
		overflow-x: auto;
		box-sizing: border-box;
		padding: 50px 0 150px 0;
	}

</style>