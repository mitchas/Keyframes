<!--
// 
// About.vue
// _________________________
//
//	Simple text page with a description and background
//		Static page. Not much to it.
//
// -->

<template>
	<div class="page no-scrollbars">
		<div class="text-page-content">

			<div id="aboutText">
				<h1 class="mtop-lg">About Keyframes</h1>

				<p>
					I had a folder on my bookmarks bar with a bunch of tools I use almost daily. I wasn't quite happy with them though. Some had huge annoying ads, some just didn't work quite right, and some looked like they hadn't been updated since 2004. I wanted to create a single place where all the smaller web-based development tools I use most could live. So that's what Keyframes is.
				</p>
				<p>
					Keyframes gives you a simple UI to adjust and create CSS properties - and see the results & get the output CSS instantly. It's a lot easier than editing more complex CSS - like @Keyframe animations or multi-layered box shadows - in your code editor, where you have to switch back and forth between your browser to see every little change you make.
				</p>
				<p>
					You kind of have to be familiar with CSS to get any use from this site - especially the animations page, it can be kind of tricky if you don't know what you're doing. Be sure to follow whatever instructions or tutorials I have - and look at examples. I'll have more tutorials up soon.
				</p>
				<p>
					This is just a side project for me. There are no fees, no ads, and minimal tracking - I only count page views, no user-by-user tracking or cookies. It's also extremely mobile-friendly. Install it as a PWA on your phone or tablet to access easily while you're working on your computer. Finally, it's not finished - I have much more planned, and would be more than happy to hear any suggestions for tools you would find handy: <a href="mailto:hello@hotdi.sh" target="_blank">hello@hotdi.sh</a> or <a href="https://twitter.com/@sleumasm" target="_blank"><i class="fab fa-twitter"></i> @sleumasm</a>
				</p>


				<h1 class="mtop-lg">Background</h1>

				<p>
					Two years ago, in May 2018, I had the idea and made <a href="https://mitchs.co/keyframes1" target="_blank">Keyframes version 1</a>. It took about a week. It worked, but the code was messy - thrown together with jQuery and didn't work at all on mobile. After I put it up, I didn't touch the code again. 
				</p>
				<p>
					Fast forward two years. I still really like the idea, and knew it could be improved. I also have a bunch of free time. So I decided to rewrite the entire thing from scratch. I used it as an excuse to teach myself some things I didn't already know - frameworks or tools I hadn't used in any other projects.
				</p>
				<p>
					Now we're here. I built in on Vue, deployed it on <a href="https://vercel.com" target="_blank">Vercel</a>, and have the source up on <a href="https://github.com/mitchas" target="_blank">GitHub</a> for anyone. 
				</p>
				<p class="small mtop-sm">
					Here's a list of some of the less obvious features in no particular order.
					<ul>
						<li>Keyboard Shortcuts</li>
						<li>Dark Mode/Light Mode toggle - set at first based on your device settings.</li>
						<li>Detects an on-screen keyboard and hides certain UI elements to make room.</li>
						<li>Use your device's orientation sensors to adjust shadows.</li>
						<li>Install Keyframes as a PWA if your browser supports it - hit the menu -> Add to Homescreen.</li>
						<li>PWA feature: Works offline, checks for update each launch, and notifies you of changes.</li>
						<li>PWA feature: Native sharing through installed apps.</li>
						<li>Disable UI animations (other than the necessary ones) if you don't like motion.</li>
						<li>Chose which page/app you would like to see by default when you visit keyframes.app.</li>
						<li>Fully responsive - works on everything from phones to desktops.</li>
						<li>Swipe and touch gestures supported on mobile.</li>
						<li>Lock scrolling and blur content behind modals.</li>
						<li>Toast notifications and smaller alerts.</li>
						<li>Tooltips to help with properties and formatting - can also be disabled in the settings.</li>
						<li>See what is saved to your local storage, and delete it if desired.</li>
						<li>Click to copy to clipboard.</li>
					</ul>
				</p>

				<p class="mtop-sm">Thanks for reading. Hope you enjoy using it!</p>
				<p>- Mitch</p>
				<p class="mbottom-lg link-row">
					<a href="https://twitter.com/sleumasm" target="_blank">Twitter</a>
					<a href="https://www.linkedin.com/in/mitchas/" target="_blank">LinkedIn</a>
					<a href="https://github.com/mitchas" target="_blank">GitHub</a>
					<a href="https://instagram.com/mitchsamuels" target="_blank">Instagram</a>
				</p>

			</div>


		</div>
	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Callout";
// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "Chngelog",

	components: {
		Callout
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
		};
	},

	mounted() {
		this.updateMeta("About | Keyframes.app", "Do cool stuff with CSS.")
	},

	computed: {
	},
	
	methods: {
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	#aboutText{
		max-width: 600px;
		margin: 0 auto;
	}

	.link-row{
		a{
			display: inline-block;
			margin-right: 15px;
		}
	}

</style>