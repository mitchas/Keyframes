<template>
	<nav id="sidebar" aria-label="Navigation Menu">

		<!-- Main Link Portion -->
		<transition name="modal">
			<div id="sidebarBody" class="visible-mobile" v-if="(isMobile && showMobileNav) || (!isMobile)">
				<span @click="closeMobileNav()">
					<!-- Home -->
					<button class="icon-link" @click="navigate('/')" aria-label="Home" v-bind:class="{'is-active': $route.path == '/'}">
						<i class="far fa-home"></i>
						<span>Home</span>
					</button>
					<!-- Privacy Policy -->
					<button class="icon-link" @click="navigate('/animate')" aria-label="Animate" v-bind:class="{'is-active': $route.path == '/animate'}">
						<i class="far fa-video"></i>
						<span>Animate</span>
					</button>
					<!-- Terms of Service -->
					<button class="icon-link" @click="navigate('/terms')"  aria-label="Terms of Service" v-bind:class="{'is-active': $route.path == '/terms'}">
						<i class="far fa-file-alt"></i>
						<span>Terms</span>
					</button>
				</span>

			</div> <!-- End Nav Links -->
		</transition>

		<!-- Mobile only menu toggle button -->
		<!-- Floats bottom right -->
		<button id="mobileNav" @click="openMobileNav()" v-bind:class="{ 'open': showMobileNav, 'hide-keyboard': $store.getters.softKeyboard }" aria-label="Show Mobile Menu" v-bind:aria-hidden="!showMobileNav">
			<i v-bind:class="{ 'fas fa-bars': !showMobileNav, 'far fa-times': showMobileNav }"></i>
		</button>

		<!-- Lightbox when mobile menu is visible -->
		<transition name="lightbox">
			<div class="lightbox" v-if="showMobileNav" v-on:click="closeMobileNav()"></div>
		</transition>

	</nav>
</template>

<script>
import navigateMixin from "@/components/mixins/navigateMixin.js";
import softKeyboardMixin from "@/components/mixins/ui/softKeyboardMixin.js";
import scrollLockMixin from "@/components/mixins/ui/scrollLockMixin.js";


export default {
	name: "Sidebar",
	mixins: [
		navigateMixin,
		softKeyboardMixin,
		scrollLockMixin,
	],
	data() {
		return {
			showMobileNav: false,
			// Default to true - fades in sidebar on desktop, 
			// hides on mobile before load
			isMobile: true
		};
	},
	mounted() {
		// Watch for mobile to show/hide sidebar
		// On MD screens less than 768px wide
		if(window.innerWidth < 768){
			this.isMobile = true;
		}else{
			this.isMobile = false;
		}
		// On resize, check size again
		window.onresize = () => {
			if(window.innerWidth < 768){
				this.isMobile = true;
			}else{
				this.isMobile = false;
			}
		}
	},
	methods: {
		openMobileNav: function(){
			this.showMobileNav = true;
			this.scrollLock(true)
		},
		closeMobileNav: function(){
			this.scrollLock(false)
			this.showMobileNav = false;
		}
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	nav#sidebar{
		display: block;
		height: auto;
		overflow: visible;
		z-index: 40;
		width: 200px;
		min-width: 200px;
		max-width: 200px;
		box-sizing: border-box;
		padding: 0 0 0 20px;
		// margin-left: -200px;

		@media (max-width: @screenMD) {
			padding: 0;
			width: 0px;
			min-width: 0px;
			max-width: none;
			// Increase z-index to be over top bar on mobile
			z-index: 60;
		}

		// Main content of sidebar
		#sidebarBody{
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			position: sticky;
			// 92 offset to account for top bar and padding
			top: 92px;

			// Large mobile - float bottom right
			@media (max-width: @screenMD) {
				background-color: var(--backgroundLayer);
				position: fixed;
				bottom: 100px;
				right: 25px;
				top: unset;
				width: 240px;
				padding: 15px 14px;
				border-radius: var(--borderRadius);
				box-shadow: var(--shadow);
				z-index: 600;
			}

			// Small mobile - Full width
			@media (max-width: @screenSM) {
				bottom: 0px;
				right: 0px;
				width: 100%;
				box-sizing: border-box;
				padding: 30px 35px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
				border-top-left-radius: var(--borderRadiusLarge);
				border-top-right-radius: var(--borderRadiusLarge);
				box-shadow:
					0 0px 3.6px -21px rgba(0, 0, 0, 0.028),
					0 0px 9px -21px rgba(0, 0, 0, 0.04),
					0 0px 18.4px -21px rgba(0, 0, 0, 0.05),
					0 0px 38px -21px rgba(0, 0, 0, 0.062),
					0 0px 104px -21px rgba(0, 0, 0, 0.09);
				transform-origin: center bottom;
			}
			// XS - less side padding
			@media (max-width: @screenXS) {
				padding: 20px 28px;
			}

			// Link elements
			a,
			.icon-link{
				margin: 0 0 0 0;
				display: flex;
				height: 40px;
				text-decoration: none;
				border: 2px solid transparent;
				box-sizing: border-box;
				border-radius: var(--borderRadius);
				padding: 0 0 0 10px;
				width: 100%;

				// Large mobile, mostly similar
				@media (max-width: @screenMD) {
					border: none;
					margin: 0;
					height: 44px;
					padding: 0;
				}
				// Full mobile, no borders, larger text
				@media (max-width: @screenSM) {
					border: none;
					height: 48px;
					margin: 0;

					// Add right chevron to menu
					&:after{
						content: '\f054';
						font-family: var(--fontAwesome);
						height: 100%;
						flex-grow: 3;
						padding-right: 10px;
						text-align: right;
						box-sizing: border-box;
						padding-top: 4px;
						color: var(--textLighter);
						font-size: 18px;
						font-weight: 600;
						display: flex;
						opacity: 1;
						justify-content: center;
						flex-direction: column;
						transition: var(--transition);
					}
				}
				

				*{
					transition: var(--transition);
				}

				i,
				span{
					display: flex;
					flex-direction: column;
					color: var(--textLighter);
					justify-content: center;
					height: 100%;
					opacity: 1;
				}

				i{
					font-size: 18px;
					width: 34px;
					margin-right: 8px;
					text-align: center;
					position: relative;

					// Half mobile
					@media (max-width: @screenMD) {
						font-size: 24px;
						margin-right: 22px;
						&.fa-planet-moon{
							top: -1px;
						}
					}
					// Full mobile
					@media (max-width: @screenSM) {
						font-size: 28px;
						margin-right: 16px;
						&.fa-planet-moon{
							top: -1px;
						}
					}
				}

				span{
					font-size: 16px;
					box-sizing: border-box;
					letter-spacing: 0.85px;
					font-weight: 700;

					// Large mobile, tweak icon
					@media (max-width: @screenMD) {
						font-weight: 500;
						font-size: 18px;
					}

					// Full mobile
					@media (max-width: @screenSM) {
						font-size: 20px;
						padding-top: 3px;
					}
				}

				// Hover State
				&:hover{
					*{
						transition: var(--transition);
					}
					&:after,span,i{
						opacity: 1;
						color: var(--text);
					}
					span{
						text-decoration: underline;
					}
				}

				// Active Link
				&.is-active{
					border: 1px solid var(--border);

					// Large mobile, no border
					@media (max-width: @screenMD) {
						border: none;
					}

					// Chevron right on mobile
					&:after,
					span,
					i{
						color: var(--text);
						opacity: 1;
					}

					&:hover span{
						text-decoration: none;
					}
				}

				// Active click down
				&:active{
					@media (max-width: @screenSM) {
						// Chevron right
						&:after{
							opacity: 0.5;
							transition: var(--transition);
						}
						i, span{
							opacity: 0.5;
						}
					}
				}
			}
		} // End Sidebar Body


		// Mobile nav button
		// Only shows at @screenSM
		#mobileNav{
			position: fixed;
			bottom: 18px;
			right: 18px;
			width: 54px;
			height: 54px;
			border-radius: 50%;
			z-index: 110;;
			background-color: var(--floatingButtonBackground);
			color: var(--floatingButtonIcon);
			font-size: 22px;
			box-sizing: border-box;
			box-shadow: var(--shadow);
			transition: var(--transition);

			&.hide-keyboard{
				bottom: -55px;
				transition: 0.15s ease;
			}

			// Hide mobile button over @screenMD
			@media (min-width: @screenMD) {
				display: none;
			}

			// Small mobile - Hides behind menu
			@media (max-width: @screenSM) {
				z-index: 50;
				
				&.open{
					bottom: -55px;
					transition: all 0.35s ease;
					i{
						opacity: 0;
					}
				}
			}

			// Active/pressed state
			&:focus,
			&:active{
				background-color: var(--primary);
				transform: scale(1.075);
				transition: var(--transition);
			}
		} // End mobile menu button


	} // End Sidebar
	

</style>