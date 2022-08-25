<!--
	Home Page
-->

<template>
	<div>


		<div class="max-width-large margin-auto padded mtop-md">

			<Callout icon="far fa-exclamation-triangle" size="small" color="red" v-if="hasOldLocalStorage">
				<p class="pbottom-md">Hey there! It looks like you have some data saved in your local storage from the old version of Keyframes.</p>
				<div class="mtop-xs"></div>
				<p class="small tight">You can still access your old animations and palettes, you just need to transfer the data to v1.keyframes.app.</p>
				<button class="button small inline-block fit mtop-sm red" @click="oldLocalStorageModal = true">
					<i class="fas fa-database"></i>
					<span>Transfer your old Data</span>
				</button>
			</Callout>


			<h1 class="mtop-xl mbottom-md">Practical tools for designers & developers</h1>

			<p class="big">
				Simple and private mini-apps to help with animations, designs, CSS properties, layouts, and more.
			</p>

			<p>
				Here are a few things you should know:
			</p>
			<p>
				<ul>
					<li><b>It's private.</b> Any data you enter on keyframes.app never leaves your device. Instead, we use your device's own storage - keeping everything private.</li>
					<li class="ptop-sm"><b>It's free.</b> Plus no ad networks, no cookies, no accounts, minimal tracking, and no <br/><em><i class="fas fa-sparkles"></i> engaging content <i class="fas fa-sparkles"></i></em></li>
					<li class="ptop-sm"><b>It's customizable.</b> Hide apps you don't use, choose your own colors, fonts, and other preferences.</li>
					<li class="ptop-sm"><b>It's open source.</b> Want to create your own app? The source code is on <a href="https://github.com/mitchas/tidycamp" target="_blank">GitHub</a></li>
				</ul>
			</p>


			<h2 class="mtop-xl mbottom-lg center">Apps</h2>
		</div>

		<!-- Horizontal app scroll -->
		<div class="card-grid center mtop-md no-scrollbars padded" v-if="sortedApps">

			<router-link class="card" v-for="(app, key) in sortedApps" :key="key" :class="{'inactive': appData[app.id] && appData[app.id].enabled == false}" :to="app.path">
				<div class="card-main" v-if="sortedApps[key]">
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



		<!-- Q & A -->
		<div class="max-width margin-auto mtop-xl padded">
			<h2 class="center">Q & A</h2>
			<p class="center">Have more questions about what this is and how it works? We've got answers!</p>

			<h4 class="mtop-lg">How does this handle my data?</h4>
			<p>
				Keyframes.app runs off your device's own "local storage" - meaning everything you do here is only stored on your device. What does that mean for you?
				<ul>
					<li>Your data is only on the device you're using</li>
					<li>Nobody can see your data unless they have your device</li>
					<li>If you use keyframes.app on another device, your data will not be there</li>
					<li>You can delete your data any time through the app or by clearing your browser cache/storage.</li>
				</ul>

				<small class="mtop-sm block">This site does use very basic analytics tracking - just things like page views and general location using self-hosted analytics. No third-party services or APIs are used on this site.</small>
			</p>

			<h4 class="mtop-lg">Can I backup or move my data to another device?</h4>
			<p>
				Yes! But it's not automatic. On the <router-link to="/settings">Settings Page</router-link> you can view and download your data and preferences - then simply transfer it to the device you want and upload it.
				<br/><br/>
				In the future there <b><i>may</i></b> be ways to automatically backup/sync your data using other services like Google Drive, iCloud, or others.
			</p>

			<h4 class="mtop-lg">Who are you?</h4>
			<p>
				My name is Mitch - I make neat websites & apps without all the clutter and tracking you find everywhere else. See what else I'm up to at <a href="https://hotdi.sh/?ref=camp">Hotdi.sh</a>.
			</p>

			<h4 class="mtop-lg">What's the point of this?</h4>
			<p>
				I hate downloading apps that have a single purpose, and most websites that would work as an alternative are so filled with ads they're almost unusable. So I decided to make my own collection of very simple mini-apps I use frequently.
			</p>

			<h4 class="mtop-lg">Have feedback or suggestions?</h4>
			<p>
				Send me an email at <a href="mailto:hello@hotdi.sh" target="_blank" class="ul">hello@hotdi.sh</a>, or bug me on Twitter <a href="https://twitter.com/sleumasm" target="_blank" class="ul">@sleumasm</a>.
				<br/>
				<small>Or simply create an issue on the <a href="https://github.com/mitchas/tidycamp" target="_blank" class="ul">GitHub Repo</a> if you know what those words mean.</small>
			</p>

		</div>


		<div class="max-width margin-auto mtop-xl padded">
			<h4>Hey!</h4>
			<p>These apps are free - but if you find them useful and want to motivate me to keep them updated and add more features,  <a href="https://www.buymeacoffee.com/mitchs" target="_blank" class="ul">Buy me a Coffee</a>, or send a tip on <a href="https://account.venmo.com/u/mitchas" target="_blank" class="ul">Venmo</a>, <a href="https://cash.app/$Mitchs" target="_blank" class="ul">CashApp</a>, or <a href="https://www.paypal.com/paypalme/mitchsamuels" target="_blank" class="ul">PayPal</a>.</p>
		</div>







		<h6 class="mtop-xl ptop-xl pleft-md">Happy Camping</h6>




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
				_this.tab('https://v1.keyframes.app/import')
			}, 1000);
		}


	}
};

</script>


<style lang="scss">

#homeLogo{
	margin: 0 auto;

	img{
		height: 70px;
		width: auto;
		display: block;
		margin: 85px 0 0 0;

		@media (max-width: $screenSM) {
			height: 80px;
			margin: 45px auto 0 auto;
		}
	}
	h1{
		display: block;
		@media (max-width: $screenSM) {
			text-align: center;
			width: 100%;
			font-weight: 800;
		}
	}
}

</style>