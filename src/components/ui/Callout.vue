<!-- 
// Callout Component
// _________________________
// 
// 	More visible text callout with icon on left,
// 		Accepts props:  
// 			- size: small (default/empty), big, narrow
// 			- color: primary (default/empty), red, green, yellow
// 			- icon: font awesome icon string
// 
-->
<template>
	<div class="callout" v-bind:class="size + ' ' + color">
		<i class="callout-icon" v-bind:class="icon"></i>
		<div class="callout-body">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Callout",
	mixins: [
	],
	components: {
	},
	props: [
		'size',
		'color',
		'icon',
	],
	data() {
		return {
		};
	},
	created() {

	},
	mounted(){
	},
	methods: {
	}	
}	

</script>

<style lang="less">
	@import '~@/styles/variables.less';

	.callout{
		display: flex;
		width: 100%;
		max-width: var(--maxWidth);
		box-sizing: border-box;
		padding: 0 15px 0 60px;
		border-radius: var(--borderRadiusSmall);
		position: relative;
		background-color: var(--primaryLight);
		box-shadow: var(--shadowLight);

		// Icon
		.callout-icon{
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 60px;
			text-align: center;
			box-sizing: border-box;
			font-size: 26px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: var(--primary);
			text-shadow: 0px 0px 18px var(--primaryFade);
		}

		// Text
		.callout-body{
			font-size: 14.5px;
			line-height: 20px;
			font-weight: 400;
			letter-spacing: 0.25px;
			font-family: var(--systemFont);
			color: var(--text);
			padding: 15px 0 15px 0;

			@media (max-width: @screenSM) {
				line-height: 16px;
				font-size: 12px;
				padding: 12px 0 12px 0;
			}	


			b{
				font-weight: 600;
			}

			small{
				display: block;
				font-size: 12.5px;
				padding-top: 6px;
				opacity: 0.75;
			}

			// Optional text or items that can be hidden on mobile to shorten length
			.optional{
				@media (max-width: @screenSM) {
					display: none;
				}	
			}
		}

		// Link
		a{
			color: var(--links);
			&:hover{
				color: var(--linksHover);
			}
		}


		// Colors
		&.red{
			background-color: var(--redLight);
			.callout-icon{
				text-shadow: 0px 0px 18px var(--redFade);
				color: var(--red);
			}
			a{
				color: var(--red);
			}
			a:hover{
				color: var(--redHover);
			}
		}
		// Colors
		&.purple{
			background-color: var(--purpleLight);
			.callout-icon{
				text-shadow: 0px 0px 18px var(--purpleFade);
				color: var(--purple);
			}
			a{
				color: var(--purple);
			}
			a:hover{
				color: var(--purple);
			}
		}
		// Green
		&.green{
			background-color: var(--greenLight);
			.callout-icon{
				text-shadow: 0px 0px 18px var(--greenFade);
				color: var(--green);
			}
			a{
				color: var(--links);
			}
			a:hover{
				color: var(--linksHover);
			}
		}
		// Yellow
		&.yellow{
			background-color: var(--yellowLight);
			.callout-icon{
				text-shadow: 0px 0px 18px var(--yellowFade);
				color: var(--yellowHover);
			}
			a{
				color: var(--links);
			}
			a:hover{
				color: var(--linksHover);
			}
		}

		// Sizing
		// Narrow means max width
		&.narrow{
			max-width: 460px;
		}
		// Fit content
		&.fit{
			width: fit-content;
			max-width: 100%;
		}
		// Big means long text, so it increases space around icon
		&.big{
			max-width: var(--maxWidthLarge);
			padding-left: 60px;
			.callout-icon{
				width: 60px;
				font-size: 28px;
			}
		}
		// Giant means giant icon and bigger text
		&.giant{
			max-width: 400px;
			padding: 20px 15px 20px 100px;
			.callout-icon{
				font-size: 42px;
				width: 100px;
			}
			.callout-body{
				font-size: 18px;
				font-weight: 600;
			}
		}
		// tiny means lil smaller icon and smaller text
		&.tiny{
			padding: 0 15px 0 60px;
			.callout-icon{
				font-size: 22px;
			}
			.callout-body{
				font-size: 13px;
				line-height: 16px;
				letter-spacing: 0px;
			}
		}
		
	}

</style>