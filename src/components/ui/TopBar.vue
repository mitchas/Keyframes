<!-- 
// 	Top Navigation bar
// 	_________________________
// 
// 	 Bar at top of screen with logo and account/settings dropdown, and app switcher
// 		Visible on all screen sizes
// 			 
// 			Functions
// 				toggleDropdown(name)
// 					Toggles navigation dropdown by (name)
// 				closeDropdowns()
// 					Hides all dropdowns
// 				openHelp()
// 					Button only shows based on route meta - when clicked, opens modal and tracks click
// 				darkModeShortcut()
// 					Button only shows based on route meta - when clicked, opens modal and tracks click
// 				share()
// 					Button only shows in standalone mode - shares current url using native share menu - fallback copy to clipboard
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


				<!-- Help - only shows on pages with help modal -->
				<div class="settings-nav" v-if="$route.meta.help">
					<div class="nav-dropdown" @click="openHelp()">
						<button class="hover-label">
							<span>Help</span>
							<!-- Chevron down -->
							<i class="far fa-book-spells"></i>
						</button>
					</div>
				</div>

				<!-- App Switcher -->
				<div class="settings-nav">
					<div class="nav-dropdown" @click="toggleDropdown('apps')">
						<!-- Hover label to show dropdown -->
						<button class="hover-label">
							<span>Apps</span>
							<!-- Chevron down -->
							<i v-bind:class="{'far fa-shapes': !showAppSwitcher, 'far fa-times-circle': showAppSwitcher}"></i>
						</button>
						<!-- Popup on hover/focus -->
						<transition name="slide">
							<div class="nav-popover" v-if="showAppSwitcher">
								<!-- CSS Animations -->
								<button class="popover-link" @click="navigate('/animate/')">
									<span>Animations</span>
									<i class="fas fa-stream"></i>
								</button>
								<!-- Colors -->
								<button class="popover-link" @click="navigate('/colors/')">
									<span>Colors</span>
									<i class="fas fa-tint"></i>
								</button>
								<!-- CSS Shadows -->
								<button class="popover-link" @click="navigate('/shadows/')">
									<span>Shadows</span>
									<i class="fas fa-eclipse"></i>
								</button>
								<!-- Charcter codes -->
								<button class="popover-link" @click="navigate('/characters/')">
									<span>Character Codes</span>
									<i class="fas fa-tilde"></i>
								</button>
							</div>
						</transition>
					</div>
				</div>

				<!-- Settings -->
				<div class="settings-nav">
					<div class="nav-dropdown" @click="toggleDropdown('settings')">
						<!-- Hover label to show dropdown -->
						<button class="hover-label">
							<span>More</span>
							<!-- Chevron down -->
							<i v-bind:class="{'far fa-toggle-off': !showSettingsPopover, 'far fa-toggle-on': showSettingsPopover}"></i>
						</button>
						<!-- Popup on hover/focus -->
						<transition name="slide">
							<div class="nav-popover" v-if="showSettingsPopover">
								<!-- Toggle dark mode -->
								<label for="topBarDarkModeToggle" class="popover-link" tabindex="1">
									<span v-if="!$store.getters.userPreferences.darkMode">Dark Mode</span>
									<span v-else>Light Mode</span>
									<i v-bind:class="{ 'fas fa-lightbulb-slash': !$store.getters.userPreferences.darkMode, 'fas fa-lightbulb-on': $store.getters.userPreferences.darkMode }"></i>
								</label>
								<input type="checkbox" id="topBarDarkModeToggle" v-model="$store.getters.userPreferences.darkMode" @change="toggleDarkMode()" hidden/>
								<!-- Keyboard Shortcuts -->
								<button class="popover-link" @click="showShortcutsModal = true">
									<span>Shortcuts</span>
									<i class="fas fa-keyboard"></i>
								</button>
								<!-- Settings -->
								<button class="popover-link" @click="showSettingsModal = true">
									<span>Preferences</span>
									<i class="fas fa-toggle-on"></i>
								</button>

								<!-- Share -->
								<hr v-if="$store.getters.device.standalone" />
								<button class="popover-link" @click="share('Check this out!')" v-if="$store.getters.device.standalone">
									<span>Share</span>
									<i class="far fa-share-alt"></i>
								</button>

								<hr/>

								<!-- About -->
								<button class="popover-link" @click="showAboutModal = true">
									<span>About</span>
									<i class="fas fa-ghost"></i>
								</button>
							</div>
						</transition>
					</div>
				</div>


			</nav>

		</div>

		<!-- Settings modal -->
		<SettingsModal :showSettings="showSettingsModal" v-on:settingsModalClosed="showSettingsModal = false"></SettingsModal>
		<!-- About modal -->
		<AboutModal :showAbout="showAboutModal" v-on:aboutModalClosed="showAboutModal = false"></AboutModal>
		<!-- Shortcuts modal -->
		<ShortcutsModal :showShortcuts="showShortcutsModal" v-on:shortcutsModalClosed="showShortcutsModal = false"></ShortcutsModal>
	</span>
</template>

<script>
import SettingsModal from "@/components/SettingsModal";
import AboutModal from "@/components/AboutModal";
import ShortcutsModal from "@/components/ShortcutsModal";
import preferencesMixin from "@/components/mixins/preferencesMixin.js";
// Keyboard shortcuts
import shortcut, { PRIMARY } from "@/components/mixins/keyboardShortcutsMixin.js";


export default {
	name: "TopBar",
	mixins: [
		preferencesMixin,
		// Toggle dark mode with cmd + d
		shortcut('d', PRIMARY, function(event) {
			// Prevent default
			event.preventDefault();
			// Toggle theme
			// this.darkModeShortcut()

			if(this.$store.getters.userPreferences.darkMode){
				this.toggleDarkMode(false);
				this.$store.getters.userPreferences.darkMode = false;
			}else{
				this.toggleDarkMode(true);
				this.$store.getters.userPreferences.darkMode = true;
			}


		}),
	],
	components: {
		AboutModal,
		SettingsModal,
		ShortcutsModal,
	},
	data() {
		return {
			showSettingsPopover: false,
			showSettingsModal: false,
			showAboutModal: false,
			showShortcutsModal: false,
			showAppSwitcher: false,
		};
	},
	mounted() {
	},
	methods: {
		
		//////////////////
		//  Dropdowns  //
		////////////////
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
		},
		// Close all navs
		closeDropdowns: function(){
			this.showSettingsPopover = false; 
			this.showAppSwitcher = false
		},
		//////////////////
		//  Open Help  //
		////////////////
		// Toogle help modal - button only shows if available per page
		openHelp: function(){
			// Toggle it
			this.$store.getters.global.showHelp = true; 
			// Track it
			_paq.push(['trackEvent', 'Action', 'View', 'Help - ' + this.$route.name]);	
		},


		// Shortcut for dark mode
		share: function(){
			var text = "Check this out: ";

			if (navigator.share) {
				navigator.share({
					title: document.title,
					text: text,
					url: location.href,
				})
				  .then(() => console.log('Successful share'))
				  .catch((error) => console.log('Error sharing', error));
			}else{
				this.copyToClipboard("This page's URL", document.href)
			}
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
		padding: 0 15px 0 15px;
		box-sizing: border-box;
		height: 64px;
		position: sticky;
		top: 0px;
		backdrop-filter: blur(3px);
		background: var(--layer);
		border-bottom: var(--borderWidth) solid var(--border);
		z-index: 60;
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
					height: 34px;
					width: auto;
					@media (max-width: @screenMD) {
						display: block;
					}
					@media (max-width: @screenSM) {
						height: 30px;
						padding-bottom: 2px;
					}

					// Invert for dark mode
					&.invert{
						filter: invert(100%) brightness(150%);
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

			.nav-dropdown{
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
					justify-content: flex-end;
					user-select: none;
					margin-left: 12px;

					// label and icon
					span,i{
						display: inline-flex;
						flex-direction: column;
						justify-content: center;
					}
					// Label text - 
					span{
						font-size: 15px;
						font-weight: 700;
						letter-spacing: 0.3px;

						// Move down a tiny bit on mobile
						@media (max-width: @screenMD) {
							padding-top: 1px;
						}
					}
					// Caret down arrow
					i{
						margin-left: 6px;
						font-size: 22px;
						padding-bottom: 0px;
						transition: var(--transition);
						width: 18px;
						position: relative;
						top: 1px;

						// Move on mobile
						@media (max-width: @screenMD) {
							font-size: 22px;
							top: 0;
							margin-left: 5px;
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
				.nav-popover{
					display: block;
					width: 200px;
					max-width: 200px;
					position: absolute;
					top: 54px;
					right: 0;
					border-radius: var(--borderRadius);
					background-color: var(--popup);
					padding: 8px 10px 10px 10px;
					box-shadow: var(--shadow);
					border: var(--borderWidth) solid var(--border);


					@media (max-width: @screenMD) {
						width: 220px;
						top: 53px;
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
					@media (max-width: @screenSM) {
						width: 210px;
						padding: 8px 6px;
					}


					// Change spacing on default hr
					hr{
						margin: 2px 0 2px 0;
						border-color: #686E7E;
						opacity: 0.75;
					}

					// Links
					.popover-link{
						display: flex;
						justify-content: space-between;
						color: var(--white);
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