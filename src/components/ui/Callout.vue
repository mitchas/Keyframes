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
		box-sizing: border-box;
		padding: 0 15px 0 60px;
		border-radius: var(--borderRadius);
		position: relative;
		background-color: var(--layer);
		border: var(--borderWidth) solid var(--border);

		// Icon
		.callout-icon{
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 60px;
			text-align: center;
			box-sizing: border-box;
			font-size: 30px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: var(--blue);
		}

		// Text
		.callout-body{
			font-size: 14px;
			line-height: 24px;
			font-weight: 500;
			letter-spacing: 0.55px;
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
		}


		// Colors
		&.red{
			.callout-icon, a{
				color: var(--red);
			}
		}
		&.orange{
			.callout-icon, a{
				color: var(--orange);
			}
		}
		// Green
		&.green{
			.callout-icon, a{
				color: var(--green);
			}
		}
		// invert
		&.invert{
			background-color: var(--text);
			color: var(--background);
			span,p,h1,h2,h3,h4,h5,h6,i{
				color: var(--background);
			}
			a{
				color: var(--links);
				text-decoration: underline;
				font-weight: 500;

				&:hover{
					color: var(--linksHover);
				}
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
			padding-left: 60px;
			.callout-icon{
				width: 60px;
				font-size: 28px;
			}
		}
		// Giant means giant icon and bigger text
		&.giant{
			padding: 10px 15px 10px 130px;
			border-radius: var(--borderRadius);
			.callout-icon{
				font-size: 50px;
				width: 130px;
			}
			.callout-body{
				font-size: 18px;
				font-weight: 500;
				line-height: 26px;
			}

			@media (max-width: @screenSM) {
				flex-wrap: wrap;
				padding: 15px;

				.callout-icon{
					width: 100%;
					position: relative;
					left: 0;
					top: 0;
					margin-bottom: 10px;
					text-align: left;
				}
				.callout-body{
					min-width: 100%;
					font-weight: 500;

					p{
						font-size: 12px;
						line-height: 20px;
						font-weight: 500;
					}
				}
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