<!--
// 
// Changelog.vue
// _________________________
//
//	Changelog & Updates
//
// -->

<template>
	<div class="page text-page no-scrollbars">
		<div class="text-page-content">

			<Callout
				icon="fal fa-rocket-launch"
				class="mbottom-sm mtop-sm"
				color="invert"
				size="giant">
				<h4 class="mbottom-xs">Version 2.0</h4>
				<p class="padding-none">
					This is the first time Keyframes has been updated since 2018. I rewrote everything. It's a lot faster, has a bunch of new features and tools, and is a lot easier for me to make changes and add features to than the old site. But some things are different, and there may be some bugs. So if you want to use the old version, it's <a href="https://mitchs.co/keyframes1">here now</a>.
				</p>
			</Callout>


			<h1 class="mtop-lg">Changelog</h1>
			
			<!-- Changelog Legend -->
			<div id="changelogLegend">
				<!-- New Feature -->
				<div class="legend-item">
					<i class="fas fa-sparkles cat-new"></i>
					<span>New Feature</span>
				</div>
				<!-- Change -->
				<div class="legend-item">
					<i class="fas fa-sync-alt cat-upgrade"></i>
					<span>Upgrade</span>
				</div>
				<!-- Bug Fix -->
				<div class="legend-item">
					<i class="fas fa-virus-slash cat-bug"></i>
					<span>Bug Fix</span>
				</div>
			</div>

			<!-- Actual Chngelog -->
			<div id="changelog">

				<!-- Version 2.0 -->
				<div class="changelog-title">
					<div class="cl-version">
						<b>Version 2.0</b>
						<span>(May 17, 2020)</span>
					</div>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sparkles cat-new"></i>
					<span>Completely rewritten on Vue</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sparkles cat-new"></i>
					<span>It actually works on phones and tablets now</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sync-alt cat-upgrade"></i>
					<span>Animation creator can now be paused mid-animation</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sync-alt cat-upgrade"></i>
					<span>Animation configurations can be saved in local storage to access later</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sync-alt cat-upgrade"></i>
					<span>Added direction and fill mode to animation creator</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sparkles cat-new"></i>
					<span>Added a CSS Box Shadow generator</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sparkles cat-new"></i>
					<span>Settings - dark mode, animations, start page -  with prefs saved in local storage</span>
				</div>


				<!-- Gap between v1 and v2 -->
				<div id="changelogGap">
					<i class="fal fa-clock"></i>
					<span>~ 2 years prior</span>
				</div>
				<!-- Version 1.0 -->
				<div class="changelog-title">
					<div class="cl-version">
						<b>Version 1.0</b>
						<span>(May 22, 2018)</span>
					</div>
					<p class="small">
						Version 1 was a pretty crappy attempt I put together really fast with only jQuery since I didn't plan on anyone using it except me. It worked, but the code was messy and hard to maintain or change, so I re-did it all for v2. There's no changelog between v1 and v2 because I got busy and never made any fixes or improvements on version 1. Whoops.
					</p>
					<p class="small">
						You can find version 1 and the extension on <a href="https://github.com/mitchas/keyframes.app" target="_blank">GitHub here</a>.
					</p>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sparkles cat-new"></i>
					<span>Version 1 Chrome extension</span>
				</div>
				<div class="changelog-change">
					<i class="fas fa-sparkles cat-new"></i>
					<span>Version 1 web app built with Jquery</span>
				</div>
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
	name: "home",

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
		this.updateMeta("Changelog | Keyframes.app", "Do cool stuff with CSS.")
	},

	computed: {
	},
	
	methods: {
		
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	#changelogLegend{
		display: flex;
		width: 100%;
		margin: 20px 0;

		@media (max-width: @screenSM) {
			flex-direction: column;
			margin: 20px 0 0 0;
		}

		.legend-item{
			margin-right: 25px;

			@media (max-width: @screenSM) {
				margin: 0 0 12px 0;
			}

			span,i{
				vertical-align: middle;
			}
			span{
				font-size: 16px;
				padding-left: 8px;
				font-weight: 700;
				letter-spacing: -0.2px;
			}
		}
	}


	// Changelog
	#changelog{
		box-sizing: border-box;
		padding: 0 0 100px 0;
		margin: 0 0 35px 0;

		@media (max-width: @screenMD) {
			padding: 0 0 0px 0;
		}
	
		.changelog-title{
			padding: 55px 0 25px 0;

			.cl-version{
				font-size: 22px;
				
				b{
					font-weight: 700;
					margin-right: 15px;
				}
				span{
					font-weight: 400;
				}
			}

			// Explanation paragraph if necessary
			p{
				margin: 15px 0 0 0;
				padding: 0;
				line-height: 17px;
			}
		}

		// Changelog item
		.changelog-change{
			display: flex;
			padding: 5px 0;
			span{
				font-size: 16px;
				font-weight: 500;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
			jus	tify-content: center;
			}
		}


		// Changelog gap between v1 and v2
		#changelogGap{
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 44px 0;
			margin-top: 44px;
			color: var(--text);
			opacity: 0.2;
			i{
				margin: 0 auto;
				font-size: 72px;
				text-align: center;
			}
			span{
				font-size: 18px;
				font-weight: 600;
				font-style: italic;
				text-align: center;
				margin: 15px 0 0 0;
			}
		}
	}

	// Category icons
	.cat-new,
	.cat-upgrade,
	.cat-bug{
		font-size: 18px;
		text-align: center;
		box-sizing: border-box;
		padding: 5px 0 0 0;
		height: 30px;
		min-height: 30px;
		max-height: 30px;
		border-radius: var(--borderRadius);
		width: 30px;
		min-width: 30px;
		max-width: 30px;
	}
	.cat-new{
		background-color: var(--green);
		color: var(--black);
	}
	.cat-upgrade{
		color: var(--white);
		background-color: var(--blue);
	}
	.cat-bug{
		color: var(--white);
		background-color: var(--orange);
	}

</style>