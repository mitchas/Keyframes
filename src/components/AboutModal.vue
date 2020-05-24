<!-- 
// AboutModal.vue
// _________________________
// 
// 	Shows modal containing about info
//		- Version
//		- Code info
//		- Donate?
//		- view on GitHub
//
-->


<template>
	<div>

		<Modal
			v-bind:show="showAbout"
			color="transparent"
			confirmText="View on GitHub"
			confirmIcon="fab fa-github"
			dismissText="Close"
			reverseFooter="true"
			@confirmed="tab('https://github.com/mitchas/Keyframes');"
			@dismissed="$emit('aboutModalClosed');">

			<!-- Modal Heder -->
			<template v-slot:header>
				<span>Keyframes.app</span>
				<img src="@/assets/branding/hotdish.png" @click="tab('https://hotdi.sh')" title="Hotdish Logo" v-bind:class="{'invert': $store.getters.userPreferences.darkMode}"/>
			</template>

			<!-- Body -->
			<template v-slot:body>

				<!-- Version Info -->
				<div id="aboutVersion">
					<div class="badge green">
						<i class="far fa-code-branch"></i>
						<span>v{{$store.getters.appVersion}}, May 22 2020</span>
					</div>
					<a @click="$emit('aboutModalClosed'); navigate('/changelog/')">View Changelog</a>
				</div>

				<!-- What -->
				<div class="about-section">
					<h3>What?</h3>
					<p class="small">Keyframes is a free bundle of tools to generate & live preview different CSS properties, plus some other web development tools. It's a side project I started to bring some CSS tools I use into one place, with features I wished other tools had.</p>
					<p class="small">You can find some other things I'm working on at <a href="https://hotdi.sh" target="_blank">Hotdi.sh</a>.</p>
				</div>


				<!-- Stack -->
				<div class="about-section">
					<h3>Stack.</h3>
					<!-- Framework -->
					<div class="stack-row">
						<label>Framework</label>
						<span><a href="https://vuejs.org" target="_blank">Vue.js</a></span>
					</div>
					<!-- Backend -->
					<div class="stack-row">
						<label>Backend</label>
						<span><b>None</b> - local storage only</span>
					</div>
					<!-- Hosting -->
					<div class="stack-row">
						<label>Hosting</label>
						<span><a href="https://vercel.com" target="_blank">Vercel</a></span>
					</div>
					<!-- Analytics -->
					<div class="stack-row">
						<label>Analytics</label>
						<span>Self-hosted <a href="https://matomo.org/" target="_blank">Matomo</a> with minimal tracking & no cookies <i class="far fa-cookie"></i></span>
					</div>
					<!-- Analytics -->
					<div class="stack-row">
						<label>Everything Else</label>
						<span>
							<a href="https://fontawesome.com/" target="_blank">Font Awesome Pro</a> for icons,
							<a href="https://www.npmjs.com/package/vue-moment" target="_blank">Vue/Moment</a> for date & time,
							<a href="https://www.npmjs.com/package/vue-lodash" target="_blank">Vue/Lodash</a> for data,
							<a href="https://www.npmjs.com/package/vue2-touch-events" target="_blank">Vue2-Touch-Events</a> for touch,
							and <a href="https://www.npmjs.com/package/color-convert" target="_blank">Color Convert</a> for color stuff.
						</span>
					</div>
				</div>

				<!-- Contribute -->
				<div class="about-section">
					<h3>Contribute.</h3>
					<p class="small">The entire project source is available on GitHub. Feel free to use it for whatever *personal* reasons you need, but please don't redistrubute or try to sell it.</p>
					<p class="small mtop-xs">If you have suggestions for tools you'd like to see added, or if you find any bugs, send me an email at <a href="mailto:hello@hotdi.sh" target="_blank">hello@hotdi.sh</a> or tell me on <i class="fab fa-twitter"></i> Twitter <a href="https://twitter.com/sleumasm" target="_blank">@sleumasm</a>.</p>
					<p class="small mtop-xs">Keyframes is free and doesn't have any ads, but if it has saved you time and you'd like to help out...</p>
					<button class="button yellow small mtop-xs mleft-sm mbottom-sm" @click="tab('https://buymeacoff.ee/mitchs')">
						<i class="far fa-coffee-togo"></i>
						<span>Buy me a Coffee</span>
					</button>
				</div>
			</template>

		</Modal>

	</div>
</template>

<script>
// Components
import Modal from "@/components/ui/Modal.vue";

export default {
	name: "AboutModal",
	mixins: [
	],
	components: {
		Modal,
	},
	props: [
		'showAbout'
	],
	data() {
		return {
		};
	},
	mounted() {
		// Track settings open
		_paq.push(['trackEvent', 'Action', 'View', 'About']);	
	},
	methods: {
	
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	// Version info and changelog link
	#aboutVersion{

		a{
			font-size: 12px;
			font-weight: 600;
			padding: 0 10px;
			color: var(--textLight);

			&:hover{
				cursor: pointer;
				color: var(--text);
			}
		}
	}


	// Tech Stack
	.about-section{
		padding: 20px 0 0 0;

		// Section heading
		h3{
			font-size: 20px;
			padding-bottom: 5px;
		}

		// Adjust paragraph padding
		p{
			padding: 0 0 0 20px;
			font-size: 13px !important;
			line-height: 17px !important;
		}

		// Links in about sections
		a{
			color: var(--text);
			&:after{
				content: '\f0c1';
				color: var(--blue);
				font-family: var(--fontAwesome);
				font-weight: 600;
				font-size: 12px;
				padding-left: 4px;
			}
		}

		.stack-row{
			box-sizing: border-box;
			padding: 2px 0 2px 20px;
			display: flex;
			justify-content: flex-end;

			label,a,span{
				font-size: 13px;
				line-height: 15px;
			}

			label{
				width: 135px;
				min-width: 135px;
				max-width: 135px;
				box-sizing: border-box;
				padding-right: 5px;

				// Shrink on mobile
				@media (max-width: @screenSM) {
					width: 90px;
					min-width: 90px;
					max-width: 90px;
				}
			}
			span{
				flex-grow: 3;

				b{
					font-weight: 600;
				}

				
			}
		}
	}

	// Footer adjustments
	#aboutModalFooter{
		padding-bottom: 10px;
	}

</style>