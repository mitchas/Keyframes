<!--
//  404 page
// _________________________
//
//  Super simple 404 page with link home
// 
-->

<template>
	<div class="page">
		<div class="text-page-content">

			<div class="not-found">
				<!-- Animated Ghost -->
				<div class="ghost-animation">
					<i class="fas fa-ghost"></i>
				</div>
				<!-- Error text -->
				<div class="error-text">
					It's a ghost town here.
					<small><b>Error 404</b> that page isn't here</small>
				</div>
				<!-- Action -->
				<div class="error-nav">
					<button class="button" aria-label="Go Home" @click="navigate('/')">
						<i class="far fa-home"></i>
						<span>Try the Home Page</span>
					</button>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	// Mixins
	import metaMixin from "@/components/mixins/metaMixin.js";

	export default {
		name: 'error404',
		mixins: [
			metaMixin,
		],
		components: {
		},
		created: function () {
			this.updateMeta("404 | Together.mn", "We couldn't find that page")
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	.not-found{

		// Remove padding for sidebar
		@media (max-width: @screenMD) {
			left: 0px;
		}

		.ghost-animation{
			display: block;
			width: 100%;
			max-width: 300px;
			position: relative;
			text-align: center;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 45px 0;

			i{
				margin: 0 auto;
				color: var(--text);
				font-size: 105px;
				margin: 0 auto;
				animation: error-ghost 2s ease-in-out 0s infinite alternate none;
			}
		}

		// Actual text for error
		.error-text{
			font-size: 22px;
			font-weight: 540;
			line-height: 28px;
			display: block;
			max-width: 360px;
			margin: 0 auto;
			text-align: center;

			small{
				font-size: 14px;
				display: block;
				font-style: italic;
				font-weight: 500;
				margin-top: 8px;
			}
		}

		// Buttons to link elsewhere
		.error-nav{
			padding: 15px 0 35px 0;
			text-align: center;

			button{
				margin: 15px 0 0 0;
			}
		}
	}

	@keyframes error-ghost {
		0.0%{
			transform: translate(0, 0);
		}
		50.0%{
			transform: translate(0px, -15px);
		}
		99.8%{
			transform: translate(0, 0);
		}
	}

</style>
