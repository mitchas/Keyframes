<!-- 
// 	Top Navigation bar
// 	_________________________
// 
// 	 Bar at top of screen with logo and account/settings dropdown, and app switcher
// 		Visible on all screen sizes
// 			70px height 
// 			Sticky, floating on top of most things (not modals)
// 
-->

<template>
	<span>
		<div id="topBar">
			<!-- Branding - Logo -->
			<div id="branding">
				<div id="logo">
					<img src="@/assets/branding/logo.png" @click="navigate('/')" title="Keyframes Logo" v-bind:class="{'invert': $store.getters.userPreferences.darkMode}"/>
				</div>
			</div>

			<!--  
				Settings Nav
				Settings Nav Floated right
				Settings Nav
			-->
			<nav id="settingsNav" aria-label="Settings Menu" @mouseleave="closeDropdowns()">


				<!-- App Switcher -->
				<div class="settings-nav">
					<div class="settings-nav-dropdown" @click="toggleDropdown('apps')">
						<!-- Hover label to show dropdown -->
						<button class="hover-label">
							<span>Apps</span>
							<!-- Chevron down -->
							<i v-bind:class="{'far fa-chevron-circle-down': !showAppSwitcher, 'far fa-chevron-circle-up': showAppSwitcher}"></i>
						</button>
						<!-- Popup on hover/focus -->
						<div class="settings-nav-popover" v-bind:class="{'visible': showAppSwitcher}">
							<!-- CSS Animations -->
							<button class="popover-link" @click="navigate('/animate/')">
								<span>CSS Animations</span>
								<i class="far fa-video"></i>
							</button>
							<!-- CSS Shadows -->
							<button class="popover-link" @click="navigate('/shadows/')">
								<span>Shadows</span>
								<i class="far fa-eclipse"></i>
							</button>
							<!-- More -->
							<button class="popover-link">
								<span>More coming soon</span>
								<i class="far fa-ellipsis-h"></i>
							</button>
						</div>
					</div>
				</div>

				<!-- Settings -->
				<div class="settings-nav">
					<div class="settings-nav-dropdown" @click="toggleDropdown('settings')">
						<!-- Hover label to show dropdown -->
						<button class="hover-label">
							<span>Settings</span>
							<!-- Chevron down -->
							<i v-bind:class="{'far fa-chevron-circle-down': !showSettingsPopover, 'far fa-chevron-circle-up': showSettingsPopover}"></i>
						</button>
						<!-- Popup on hover/focus -->
						<div class="settings-nav-popover" v-bind:class="{'visible': showSettingsPopover}">
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
		<SettingsModal :showSettings="showSettingsModal" v-on:settingsModalClosed="showSettingsModal = false"></SettingsModal>
	</span>
</template>

<script>
import SettingsModal from "@/components/SettingsModal";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";


export default {
	name: "TopBar",
	mixins: [
		preferencesMixin,
	],
	components: {
		SettingsModal
	},
	data() {
		return {
			showSettingsPopover: false,
			showSettingsModal: false,
			showAppSwitcher: false
		};
	},
	methods: {
		// Show settings modal
		showSettings: function(){
			this.showSettingsModal = true;
		},
		// Close all navs
		closeDropdowns: function(){
			this.showSettingsPopover = false; 
			this.showAppSwitcher = false
		},
		// Toggle a dropdown to show
		toggleDropdown: function(name){
			// Apps dropdown
			if(name == 'apps'){
				if(this.showAppSwitcher){
					this.showAppSwitcher = false;
				}else{
					this.closeDropdowns();

					this.showAppSwitcher = true;
				}
			}else if(name == 'settings'){
				// Settings dropdown
				if(this.showSettingsPopover){
					this.showSettingsPopover = false;
				}else{
					this.closeDropdowns();

					this.showSettingsPopover = true;
				}
			}
		}
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
		padding: 0 15px 0 15px;
		box-sizing: border-box;
		height: 64px;
		position: sticky;
		top: 0px;
		backdrop-filter: blur(3px);
		background: var(--background);
		z-index: 50;
		// backdrop-filter: blur(3.3px);
		// backdrop-filter:  grayscale(100%);

		// Adjust padding and height on smaller screens
		@media (min-width: @screenMD) {
			padding: 0 25px;
		}
		@media (max-width: @screenMD) {
			height: 60px;
		}
		@media (max-width: @screenSM) {
			height: 54px;
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
					height: 44px;
					width: auto;
					@media (max-width: @screenMD) {
						display: block;
						height: 38px;
					}
					@media (max-width: @screenSM) {
						height: 32px;
					}

					// Invert for dark mode
					&.invert{
						filter: invert(100%);
					}
				}

				&:hover{
					transition: var(--transition);
					cursor: pointer;
					transform: scale(0.975);
				}
			}
		}
	}


	// settings Nav
	// settings Nav
	// settings Nav
	// Contained inside top nav- wanted styling seperatet
	nav#settingsNav{
		display: flex;
		box-sizing: border-box;
		height: 100%;

		// Username with dropdown
		// For signed in users
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
					color: var(--dark);
					font-weight: 800;
					box-sizing: border-box;
					display: flex;
					justify-content: flex-end;
					user-select: none;
					margin-left: 8px;

					// Profile photo
					.hover-label-photo{
						display: block;
						height: 34px;
						width: 34px;
						border-radius: var(--borderRadius);
						margin-left: 10px;
						background-size: cover;
						position: relative;
						top: -2px;

						// Adjust padding on larger screens
						@media (min-width: @screenMD) {
						}
					}
					// label and icon
					span,i{
						display: inline-flex;
						flex-direction: column;
						justify-content: center;
					}
					// Label text - either username or "Hey There!"
					span{
						letter-spacing: 0.3px;
						font-size: 16px;
						font-weight: 700;
						letter-spacing: 0.3px;
						@media (max-width: @screenSM) {
							font-size: 14.5px;
						}
					}
					// Caret down arrow
					i{
						margin-left: 6px;
						font-size: 20px;
						font-weight: 500;
						padding-bottom: 0px;
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
					width: 220px;
					position: absolute;
					top: 54px;
					transition: 0.1s ease;
					right: 0;
					max-height: 0;
					overflow: hidden;
					box-sizing: border-box;
					border-radius: var(--borderRadiusSmall);
					padding: 0px 10px;
					overflow: 0;
					border: 0px solid transparent;
					background-color: var(--background);

					@media (max-width: @screenMD) {
						width: 220px;
					}
					@media (max-width: @screenSM) {
						width: 210px;
						padding: 0 6px;
					}

					// Visible Class
					&.visible{
						max-height: 220px;
						transition: 0.15s ease;
						padding: 8px 10px 10px 10px;
						overflow: 1;
						box-shadow: var(--shadow);
						border: 1px solid var(--dark);
					}

					// Change spacing on default hr
					hr{
						margin: 5px 0;
						border-color: var(--dark);
					}

					// Links
					.popover-link{
						display: flex;
						justify-content: space-between;
						color: var(--dark);
						height: 40px;
						width: 100%;
						padding: 0 10px;
						box-sizing: border-box;
						user-select: none;

						// Increase size on mobile
						@media (max-width: @screenMD) {
							padding: 0 2px;
						}

						span, i{
							display: flex;
							flex-direction: column;
							justify-content: center;
							height: 40px;
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
								padding-left: 6px;
							}
							@media (max-width: @screenSM) {
								font-size: 13px;
								padding-left: 6px;
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
								padding-right: 6px;
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
								transition: var(--transitionFast);
							}
						}

						// Style variations
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