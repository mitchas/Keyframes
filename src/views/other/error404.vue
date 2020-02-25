<template>
	<div id="notFound" class="page">
		<!-- Surprised face -->
		<i class="far fa-surprise large-icon"></i>
		<!-- Large 404 ttext -->
		<div class="large-404">
			404
		</div>
		<!-- Error textt -->
		<div class="error-text">
			Whoops, it looks like that page doesn't exist.
		</div>
		<div class="error-nav">
			<button class="button blue" aria-label="Go Home" @click="navigate('/')">
				Try the home page
				<i class="far fa-home"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import navigateMixin from "@/components/mixins/navigateMixin.js";

	export default {
		name: 'error404',
		mixins: [
			navigateMixin,
		],
		components: {
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	#notFound{
		color: var(--text);

		.large-icon{
			font-size: 120px;
			margin-bottom: 55px;
			// Center on mobile
			@media (max-width: @screenMD) {
				margin: 35px auto;
				text-align: center;
				width: 100%;
			}
		}

		.large-404{
			font-size: 110px;
			font-weight: 900;
			position: relative;
			z-index: 35;
			line-height: 60px;
			letter-spacing: 2px;
			display: block;
			width: fit-content;

			@media (max-width: @screenMD) {
				margin: 0 auto;
				padding: 35px 0;
			}
		}

		// Actual text for error
		.error-text{
			font-size: 26px;
			font-weight: 500;
			line-height: 32px;
			padding: 45px 0 20px 0;
			display: block;
			max-width: 450px;

			// Center, full width on mobile
			@media (max-width: @screenMD) {
				max-width: none;
				text-align: center;
				width: 100%;
			}
		}

		// Buttons to link elsewhere
		.error-nav{
			padding: 15px 0 35px 0;

			// Center, full width on mobile
			@media (max-width: @screenMD) {
				max-width: none;
				text-align: center;
				width: 100%;
			}
		}
	}
</style>
