<!--
	Home Page
-->

<template>
	<div>


		<div class="max-width-large margin-auto padded mtop-md">
			
			<!-- Old Local Storage Callout -->
			<Callout icon="far fa-exclamation-triangle" size="small" color="red" v-if="hasOldLocalStorage" class="margin-auto mtop-md">
				<p class="pbottom-md"><b>Hey there!</b> It looks like you have some data saved in your local storage from the old version of Keyframes.</p>
				<div class="mtop-xs"></div>
				<p class="small">You can still access your old animations and palettes, you just need to transfer the data to v1.keyframes.app.</p>
				<div class="flex gap">
					<button class="button small inline-block fit mtop-sm red" @click="oldLocalStorageModal = true">
						<i class="fas fa-database"></i>
						<span>Transfer your old Data</span>
					</button>
					<button class="button small inline-block fit mtop-sm red invert" @click="clearOldStorage()">
						<i class="fas fa-trash"></i>
						<span>Clear It</span>
					</button>
				</div>
			</Callout>

			<!-- Hero -->
			<div id="homeHero">
				<h1 class="mtop-lg mbottom-xs">more tools for devs</h1>
				<p class="big">
					Browser-based, mobile-friendly, actually private tools that make CSS a little less bad.
				</p>
			</div>

		</div>

		<!-- Carousel -->
		<div id="homeCarousel">
			<div id="homeCarouselWrap">
				<!-- Item Loop -->
				<div class="carousel-item" v-for="(item, key) in carousel" :key="key" @click="navigate('/' + key)">
					<h4 :class="key">
						<i :class="item.icon"></i>
						<span>{{item.title}}</span>
					</h4>
					<p>{{item.body}}</p>
				</div>
				<!-- Item Loop -->
				<div class="carousel-item" v-for="(item, key1) in carousel" :key="key1" @click="navigate('/' + key1)">
					<h4 :class="key1">
						<i :class="item.icon"></i>
						<span>{{item.title}}</span>
					</h4>
					<p>{{item.body}}</p>
				</div>
				<!-- Item Loop -->
				<button class="carousel-item" v-for="(item, key2) in carousel" :key="key2" @click="navigate('/' + key2)">
					<h4 :class="key2">
						<i :class="item.icon"></i>
						<span>{{item.title}}</span>
					</h4>
					<p>{{item.body}}</p>
				</button>
			</div>
		</div>


		<div class="max-width-large margin-auto padded">

			<div id="subHero">
				<h2 class="center">so it's another toolbox app?</h2>
				<p class="center big margin-auto">Yeah, but I made the tools the way I wanted.</p>
				<p class="small center margin-auto no-padding text-light">Combining features from all my favorites, and removing all the junk.</p>
			</div>

			<!-- Spacer -->
			<div class="mtop-lg"></div>

			<!-- Feature List -->
			<ul id="featureList">

				<li>
					<i class="fas fa-computer-classic"></i>
					<b>Local</b>
					<p>This runs off local storage. Everything you do stays right on your computer.</p>
				</li>
				<li>
					<i class="fas fa-user-secret"></i>
					<b>Private</b>
					<p>No third-party tracking, cookies, ad networks, or other plugins.</p>
				</li>
				<li>
					<i class="fas fa-mobile"></i>
					<b>Mobile</b>
					<p>Actually usable on mobile devices, probably.</p>
				</li>
				<li>
					<i class="fas fa-handshake-simple-slash"></i>
					<b>Anti-Social</b>
					<p><span>No accounts, and no social features, and no <i class="far fa-sparkles"></i>engaging content<i class="far fa-sparkles"></i>.</span></p>
				</li>
				<li>
					<i class="fas fa-spray-can"></i>
					<b>Customizable</b>
					<p>Choose exactly how the app looks & behaves.</p>
				</li>
				<li>
					<i class="fas fa-badge-dollar"></i>
					<b>Free</b>
					<p>I mainly made this to use myself, but I like sharing.</p>
				</li>
				<li>
					<i class="fas fa-code"></i>
					<b>Open Source</b>
					<p><span>Want to create your own app? The source code is on <a href="https://github.com/mitchas/keyframes" target="_blank">GitHub</a>.</span></p>
				</li>

			</ul>


			<h3 class="center mtop-xl ptop-md">everything else you should know</h3>
			<p class="center margin-auto">In Q&A format.</p>


			<h5 class="mtop-md">How does this handle my data?</h5>
			<p class="small">
				Keyframes.app runs off your device's local storage - meaning everything you do here is only stored on your device.
				<ul>
					<li>Your data is only on the device you're using</li>
					<li>Nobody can see your data unless they have your device</li>
					<li>If you use keyframes.app on another device, your data will not be there</li>
					<li>You can delete your data any time on the settings page or by clearing your browser cache/storage.</li>
				</ul>

				This site does use very basic analytics tracking - just things like page views and general location using self-hosted analytics. No third-party services or APIs are used on this site.
			</p>

			<h5 class="mtop-md">Can I backup or move my data to another device?</h5>
			<p class="small">
				Yes! But it's not automatic. On the <router-link to="/settings">Settings Page</router-link> you can view and download your data and preferences - then simply transfer it to the device you want and upload it.
				<br/><br/>
				In the future there <b><em>may</em></b> be ways to automatically backup/sync your data using other services like Google Drive, iCloud, or others.
			</p>

			<h5 class="mtop-md">Have feedback or suggestions?</h5>
			<p class="small">
				Send me an email at <a href="mailto:hello@hotdi.sh" target="_blank" class="ul">hello@hotdi.sh</a>, or bug me on Twitter <a href="https://twitter.com/sleumasm" target="_blank" class="ul">@sleumasm</a>.
				<br/>
				<small>Or simply create an issue on the <a href="https://github.com/mitchas/keyframes" target="_blank" class="ul">GitHub Repo</a> if you know what those words mean.</small>
			</p>

			<h3 class="mtop-xl center margin-auto">hey!</h3>
			<p class="margin-auto small">These apps are free - but if you find them useful and want to motivate me to keep them updated and add more features,  <a href="https://www.buymeacoffee.com/mitchs" target="_blank" class="ul">Buy me a Coffee</a>, or send a tip on <a href="https://account.venmo.com/u/mitchas" target="_blank" class="ul">Venmo</a>, <a href="https://cash.app/$Mitchs" target="_blank" class="ul">CashApp</a>, or <a href="https://www.paypal.com/paypalme/mitchsamuels" target="_blank" class="ul">PayPal</a>. You can also <router-link to="/sponsor">Sponsor Keyframes</router-link> if you have a business or product to promote.</p>
		</div>







		<p class="mtop-xl ptop-xl pleft-md small bold text-light">good luck</p>




		<!-- Spacer -->
		<div class="mtop-xl"></div>


		<!-- Export old local storage modal -->
		<Modal size=""
			color="blue"
			:show="oldLocalStorageModal"
			title="Transfer your saved data"
			icon="fas fa-database"
			confirmIcon="fas fa-arrow-up-right-from-square"
			confirmText="Copy & Go to V1"
			dismissText="Close"
			@confirmed="oldLocalStorageModal = false; oldLocalStorageTransfer()"
			@dismissed="oldLocalStorageModal = false">

			<p class="no-padding">
				To access your saved animations and palettes from v1, you will need to transfer your data to its new home subdomain at v1.keyframes.app. 
				<br/>
				<br/>
				Copy the text from the textbox below, then click the button to go to v1.keyframes.app/import and paste it there.
			</p>
			<textarea class="code mtop-sm" id="oldLocalStorageInput" :value="JSON.stringify(oldLocalStorage)" readonly></textarea>
		</Modal>


	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Common/Callout";
import _orderBy from "lodash/orderBy";
import Modal from "@/components/ui/Modals/Modal";


export default {
	name: "home",

	components: {
		Callout,
		Modal,
	},

	mixins: [
	],

	data() {
		return {
			apps: this.$store.getters["Site/apps"],

			hasOldLocalStorage: false,
			oldLocalStorage: null,
			oldLocalStorageModal: false,

			carousel: {
				changelog: {
					title: "+More",
					body: "Additional features, tools, and bug fixes released somewhat regularly.",
					icon: "fas fa-sparkles",
				},
				characters: {
					title: "Characters",
					body: "Search special characters to find and copy the HTML and CSS codes.",
					icon: "fas fa-tilde",
				},
				animate: {
					title: "Animations",
					body: "Create CSS @keyframe animations with a visual timeline similar to video editors.",
					icon: "fas fa-clapperboard",
				},
				colors: {
					title: "Colors",
					body: "Conversions, palettes, gradients, contrast ratios, colorblindness, & many ways to export.",
					icon: "fas fa-palette",
				},
				shadows: {
					title: "Shadows",
					body: "Create single or multi-layer box shadows just by moving some sliders.",
					icon: "fas fa-eclipse",
				},
				settings: {
					title: "Settings",
					body: "Customize keyframes with themes, data management, and other preferences.",
					icon: "fas fa-gear",
				},
				
				
			},
		};
	},

	watch: {
		
	},

	computed: {

		// test: {
		// 	get() {
		// 		return this.$store.getters["User/preferences"];
		// 	},
		// },
		sortedApps() {
			return _orderBy(this.apps, "category");
		},
		userPreferences: {
			get() {
				return this.$store.getters["User/preferences"];
			},
		},
		appData: {
			get() {
				return this.$store.getters["User/apps"];
			},
		},
		
	},
	
	mounted() {

		// Export local storage
		var oldLS = {};
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if(key.startsWith("animation_") || key.startsWith("palette_")){
				oldLS[key] = localStorage.getItem(key);
				this.hasOldLocalStorage = true;
			}
			console.log(`${key}: ${localStorage.getItem(key)}`);
			this.oldLocalStorage = oldLS;
		}


	},
	created: function () {
	},

	beforeDestroy(){
	},
	
	methods: {

		// Copy old local storage to clipboard, then open import page in new tab
		oldLocalStorageTransfer: function(){
			let _this = this;
			var el = "oldLocalStorageInput";
			var range = document.createRange();
			range.selectNode(document.getElementById(el));
			window.getSelection().removeAllRanges(); // clear current selection
			window.getSelection().addRange(range); // to select text
			document.execCommand("copy");
			window.getSelection().removeAllRanges();// to deselect
			this.hello("Data Copied - Hold On...", "fas fa-copy", "green");

			setTimeout(function(){
				_this.tab("https://v1.keyframes.app/import");
			}, 1000);
		},
		clearOldStorage: function(){
			localStorage.clear();
			// Toast
			this.toast("Local Storage Cleared", "Your data & preferences have been cleared from your browser's local storage.", "", "fas fa-trash-alt");
			this.hasOldLocalStorage = false;
			this.oldLocalStorage = null;
		}


	}
};

</script>


<style lang="scss">

#homeHero{
	text-align: center;
	margin: 105px 0;
	@media (max-width: $screenSM) {
		margin: 35px 0;
	}

	h1{
		@media (max-width: $screenSM) {
			font-size: 3.5em;
			line-height: 0.95em;
		}
	}
	p{
		max-width: unset;
		width: 100%;
		@media (max-width: $screenSM) {
			font-size: 1em;
		}
	}

}

// Secondary Hero
#subHero{

	@media (max-width: $screenSM) {
		h2{
			font-size: 3em;
			line-height: 1em;
		}
		p{
			font-size: 1em;
			&.small{
				font-size: 0.88em;
			}
		}
	}

}


#homeCarousel{
	width: 100%;
	overflow: visible;
	margin: 85px 0;
	position: relative;
	height: 150px;
	width: 100vw;

	#homeCarouselWrap{
		width: fit-content;
		display: flex;
		gap: 60px;
		position: absolute;
		right: 0;
    	animation: carouselAnimation 150s linear 0s infinite normal none;

		@media (max-width: $screenSM) {
			gap: 15px;
		}

		.carousel-item{
			display: flex;
			height: fit-content;
			gap: 15px;
			flex-grow: 3;

			@media (max-width: $screenSM) {
				flex-wrap: wrap;
			}

			h4{
				margin: 0;
				padding: 0;
				display: flex;

				&.animate i{color: var(--primary);}
				&.colors i{color: var(--red);}
				&.more i{color: var(--yellow);}
				&.characters i{color: var(--purple);}
				&.settings i{color: var(--green);}
				&.shadows i{color: var(--textFade);}

				i{
					font-size: 1.25em;
					width: 100%;
					// text-align: center;
					margin-top: -3px;
					margin-right: 5px;
				}
			}

			p{
				min-width: 200px;
				margin: 0;
				padding: 0;
				text-align: left;
				@media (max-width: $screenSM) {
					padding-left: 34px;
				}
			}


			// Hover item
			&:hover,
			&:focus{
				cursor: pointer;

				span{
					text-decoration: underline;
				}
			}
		}
	}
}
@keyframes carouselAnimation{
    0% {
		transform: translateX(0);
    }
    100% {
		transform: translateX(100%);
		transform: translateX(calc(100% - 100vw));
    }
}


#featureList{
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: fit-content;
	margin: 0 auto;

	li{
		width: 100%;
		display: flex;
		gap: 20px;
		margin: 10px 0;

		@media (max-width: $screenSM) {
			flex-wrap: wrap;
			padding: 0 15px;
			gap: 0;
			box-sizing: border-box;
		}

		.fas,b,p{
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.fas{
			font-size: 1.5em;
			width: 30px;
			text-align: center;
		}
		b{
			font-weight: 600;
			font-size: 1em;
			@media (max-width: $screenSM) {
				padding-left: 10px;
			}
		}
		p{
			margin: 0;
			padding: 0;
			font-size: 0.9em;
			@media (max-width: $screenSM) {
				padding: 5px 0 20px 42px;
			}
		}
	}
}

</style>