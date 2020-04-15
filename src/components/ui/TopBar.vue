<template>
	<span>
		<div id="topBar">
			<!-- Left side of nav - logo and app switcher butttotn -->
			<div id="topBarLeft" @mouseleave="showAppSwitcher = false">
				<div id="branding">
					<div id="logo">
						<img src="@/assets/branding/logo-light.png" @click="navigate('/')" title="Keyframes Logo" v-if="!$store.getters.userPreferences.darkMode"/>
						<img src="@/assets/branding/logo-dark.png" @click="navigate('/')" title="Keyframes Logo" v-if="$store.getters.userPreferences.darkMode"/>
					</div>
				</div>
			</div>

			<!--  
				Settings Nav
				Settings Nav Floated right
				Settings Nav
			-->
			<nav id="topBarRight" aria-label="Settings Menu" @mouseleave="closeDropdowns()">
				<!-- App Switcher -->
				<div class="nav-dropdown" @click="toggleDropdown('apps')">
					<button class="hover-label" aria-label="Show all apps">
						<span>Tools</span>
						<i v-bind:class="{'far fa-shapes': !showAppSwitcher, 'far fa-chevron-circle-up': showAppSwitcher}"></i>
					</button>

					<!-- Popup on click -->
					<transition name="fromtop">
						<div class="settings-nav-popover" v-if="showAppSwitcher">
							<!-- Animations -->
							<button class="popover-link" @click="navigate('/animate')">
								<span>CSS Animations</span>
								<i class="far fa-camera-movie"></i>
							</button>
							<!-- More coming soon -->
							<button class="popover-link soon">
								<span>More coming soon</span>
								<i class="far fa-ellipsis-h"></i>
							</button>
						</div>
					</transition>
				</div>

				<!-- Settings dropdown -->
				<div class="nav-dropdown" @click="toggleDropdown('settings')">
					<!-- Hover label to show dropdown -->
					<button class="hover-label" aria-label="Show Setings">
						<span>Settings</span>
						<i v-bind:class="{'far fa-chevron-circle-down': !showSettingsPopover, 'far fa-chevron-circle-up': showSettingsPopover}"></i>
					</button>

					<!-- Popup on click -->
					<transition name="fromtop">
						<div class="settings-nav-popover" v-if="showSettingsPopover">
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
					</transition>
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

		// Left side of top bar
		#topBarLeft{
			display: flex;

			// Logo
			#branding{
				display: flex;
				flex-direction: column;
				justify-content: center;
				box-sizing: border-box;
				padding-bottom: 3px;

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

		
	}


	// Settings Nav
	// Settings Nav
	// Settings Nav
	// Contained inside top nav- wanted styling seperatet
	nav#topBarRight{
		display: flex;
		box-sizing: border-box;
		height: 100%;
	}


	// Nav dropdowns to use on the top bar
	.nav-dropdown{
		position: relative;
		padding: 8px 0;
		box-sizing: border-box;
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
			margin-left: 15px;
			font-weight: 600;
			height: 100%;
			letter-spacing: 0.3px;
			font-size: 15px;
			font-family: var(--systemFont);
			letter-spacing: 0.3px;

			// Add spacing on first element (either i or span)
			*:first-child{
				margin-right: 10px;
			}

			i{
				transition: var(--transition);
				transform: scale(1.25) translateY(1px);

				// Decrease margin on mobile
				@media (max-width: @screenMD) {
					margin-left: 8px;
				}
			}
		}

		// Hover dropdown
		&:hover{
			cursor: pointer;
		}


		// Popup on hover
		.settings-nav-popover{
			display: block;
			width: 200px;
			position: absolute;
			top: 56px;
			transition: 0.1s ease;
			right: 0;
			max-height: 220px;
			overflow: hidden;
			background-color: var(--altBackground);
			box-shadow: var(--shadowDark);
			box-sizing: border-box;
			border-radius: var(--borderRadiusSmall);
			padding: 10px;
			overflow: 0;
			// Increase size on mobile
			@media (max-width: @screenMD) {
				width: 220px;
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
				padding: 0 6px;
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
					letter-spacing: 0.25px;
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

				// Coming soon
				&.soon{
					span{
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
	
</style>