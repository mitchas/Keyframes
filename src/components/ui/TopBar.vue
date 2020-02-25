<template>
	<span>
		<div id="topBar">
			<!-- Branding - Logo -->
			<div id="branding">
				<div id="logo">
					<img src="@/assets/branding/logo-light.png" @click="navigate('/')" title="ABCDEFG Logo" v-if="!$store.getters.userPreferences.darkMode"/>
					<img src="@/assets/branding/logo-dark.png" @click="navigate('/')" title="ABCDEFG Logo" v-if="$store.getters.userPreferences.darkMode"/>
				</div>
			</div>

			<!--  
				Settings Nav
				Settings Nav Floated right
				Settings Nav
			-->
			<nav id="settingsNav" aria-label="Settings Menu">

				<div class="settings-nav">
					<div class="settings-nav-dropdown" @click="showSettingsPopover = !showSettingsPopover" @mouseleave="showSettingsPopover = false">
						<!-- Hover label to show dropdown -->
						<div class="hover-label">
							<!-- Uncomment row below and add label if desired -->
							<!-- <span></span> -->
							<!-- Chevron down -->
							<i v-bind:class="{'far fa-chevron-circle-down': !showSettingsPopover, 'far fa-chevron-circle-up': showSettingsPopover}"></i>
						</div>
						<!-- Popup on hover/focus -->
						<div class="settings-nav-popover" v-bind:class="{'visible': showSettingsPopover}">
							<!-- Sign In -->
							<!-- Toggle dark mode -->
							<label for="topBarDarkModeToggle" class="popover-link" tabindex="1">
								<span v-if="!$store.getters.userPreferences.darkMode">Dark Mode</span>
								<span v-else>Light Mode</span>
								<i v-bind:class="{ 'far fa-lightbulb-slash': !$store.getters.userPreferences.darkMode, 'far fa-lightbulb-on': $store.getters.userPreferences.darkMode }"></i>
							</label>
							<input type="checkbox" id="topBarDarkModeToggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()" hidden/>
							<!-- Settings -->
							<button class="popover-link" @click="showSettings()">
								<span>Settings</span>
								<i class="far fa-cog"></i>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>

		<!-- Settings modal -->
		<SettingsModal v-if="showSettingsModal" v-on:settingsModalClosed="showSettingsModal = false"></SettingsModal>
	</span>
</template>

<script>
import SettingsModal from "@/components/SettingsModal";
import navigateMixin from "@/components/mixins/navigateMixin.js";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";


export default {
	name: "Sidebar",
	mixins: [
		navigateMixin,
		preferencesMixin,
	],
	components: {
		SettingsModal
	},
	data() {
		return {
			showSettingsPopover: false,
			showSettingsModal: false
		};
	},
	methods: {
		// Show settings modal
		showSettings: function(){
			this.showSettingsModal = true;
		},
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	// Top nav bar
	// Has logo and hover menu for account/dark mode
	#topBar{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;
		height: 70px;
		position: sticky;
		top: 0px;
		background: var(--navBackground);
		z-index: 70;

		&:after{
			content: ' ';
			width: 0px;
			height: 0px;
			position: absolute;
			opacity: 0;
			transition: all 0s ease 0.22s, opacity 0.22s ease;
		}


		// Adjust padding on larger screens
		@media (min-width: @screenMD) {
			padding: 0 35px;
		}

		// Logo
		#branding{
			display: flex;
			flex-direction: column;
			justify-content: center;

			#logo{
				transform: scale(1.0);
				transition: var(--transition);

				img{
					height: 38px;
					width: auto;
				}

				&:hover{
					transition: var(--transition);
					cursor: pointer;
					transform: scale(0.975);
				}
			}
		}
	}


	// Settings Nav
	// Settings Nav
	// Settings Nav
	// Contained inside top nav- wanted styling seperatet
	nav#settingsNav{
		display: flex;
		box-sizing: border-box;
		height: 100%;
		
		// Nav droptown, top right
		.settings-nav{
			display: flex;
			flex-direction: column;
			justify-content: center;

			.settings-nav-dropdown{
				position: relative;
				padding: 8px 0;
				z-index: 100;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;

				// Username and chevron down
				.hover-label{
					color: var(--text);
					font-weight: 800;
					box-sizing: border-box;
					display: flex;
					min-width: 160px;
					justify-content: flex-end;

					span,i{
						display: inline-flex;
						flex-direction: column;
						justify-content: center;
					}
					span{
						letter-spacing: 0.3px;
						font-size: 16px;
						font-weight: 800;
						letter-spacing: 0.3px;
					}
					i{
						margin-left: 10px;
						font-size: 22px;
						font-weight: 500;
						padding-bottom: 2px;
						transition: var(--transition);

						// Decrease margin on mobile
						@media (max-width: @screenMD) {
							margin-left: 8px;
						}
					}
				}

				// Hover dropdown
				&:hover{
					cursor: pointer;

					.hover-label{
						span{
							text-decoration: underline;
						}
					}
				}


				// Popup on hover
				.settings-nav-popover{
					display: block;
					width: 200px;
					position: absolute;
					top: 56px;
					transition: 0.1s ease;
					right: 0;
					max-height: 0;
					overflow: hidden;
					background-color: var(--backgroundLayer);
					box-shadow: var(--shadow);
					box-sizing: border-box;
					border-radius: var(--borderRadiusSmall);
					padding: 0 10px;
					overflow: 0;
					border: 1px solid var(--background);
					// Increase size on mobile
					@media (max-width: @screenMD) {
						width: 220px;
					}

					// Visible Class
					&.visible{
						max-height: 220px;
						transition: 0.15s ease;
						padding: 10px;
						border: 1px solid var(--border);
						overflow: 1;
					}

					// Change spacing on default hr
					hr{
						border-color: var(--borderFade);
						margin: 4px 0 3px 0;
					}

					// Links
					.popover-link{
						display: flex;
						justify-content: space-between;
						color: var(--text);
						height: 40px;
						width: 100%;
						padding: 0 10px;
						box-sizing: border-box;

						// Increase size on mobile
						@media (max-width: @screenMD) {
							height: 44px;
							padding: 0 2px;
						}

						span, i{
							display: flex;
							flex-direction: column;
							justify-content: center;
							height: 40px;

							@media (max-width: @screenMD) {
								height: 44px;
							}
						}
						span{
							font-weight: 700;
							box-sizing: border-box;
							transition: var(--transitionFast);
							padding-left: 0;
							font-size: 14px;
							letter-spacing: 0.5px;

							// Increase size on mobile
							@media (max-width: @screenMD) {
								font-size: 15px;
								padding-left: 10px;
							}
						}
						i{
							font-size: 18px;
							width: 30px;
							text-align: center;

							&.fa-user-cog,
							&.fa-sign-out-alt,
							&.fa-user-plus{
								position: relative;
								left: 4px;
							}

							// Increase size on mobile
							@media (max-width: @screenMD) {
								font-size: 22px;
								padding-right: 10px;
							}
						}

						&:hover,
						&:focus{
							text-decoration: none;
							cursor: pointer;
							span{
								text-decoration: underline;
							}
						}
						&:active{
							span{
								text-decoration: underline;
								padding-left: 6px;
								transition: var(--transitionFast);
							}
						}

						// Style variations
						// Red for signout
						&.red{
							span, i{
								color: var(--red);
							}
						}
					}
				}

			}
		}
	}
	
</style>