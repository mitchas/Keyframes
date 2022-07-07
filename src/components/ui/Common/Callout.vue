<!-- 
Callout Component
Example:
<Callout icon="fas fa-ban" size="giant" color="red"> <slot> </Callout>
-->

<template>
	<div class="callout" v-bind:class="size + ' ' + color">
		<i class="callout-icon" :class="icon"></i>
		<i class="callout-icon spacer" :class="icon" aria-hidden="true"></i>
		<div class="callout-body">
			<!-- Callout body content -->
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
	props: {
		// Predefined callout size classes
		size: {
			// `'small'`, `'big'`, `'giant'`, `'fit'`
			type: String,
			required: false,
   			default: "",
		},
		// Color variable for callout
		color: {
			type: String,
			required: false,
   			default: "primary",
		},
		// Font awesome icon class for left icon
		icon: {
			type: String,
			required: false,
   			default: null,
		},
	},
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
};	

</script>

<style lang="scss">
	

	.callout{
		display: flex;
		width: 100%;
		max-width: var(--maxWidth);
		box-sizing: border-box;
		padding: 5px 5px 5px 5px;
		border-radius: var(--borderRadius);
		position: relative;
		background-color: var(--background);
		border: 1px solid var(--blue);
		color: var(--blue);

		// Icon
		.callout-icon{
			height: 100%;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			box-sizing: border-box;
			font-size: 2rem;
			color: var(--blue);
			padding: 8px 14px;
			position: absolute;
			top: 0;
			left: 0;
			margin-left: 5px;

			&.spacer{
				position: relative;
				visibility: hidden;
			}
		}

		// Text
		.callout-body{
			flex-grow: 3;
			padding: 15px 15px 15px 0;
			display: flex;
			flex-direction: column;
			font-size: 1rem;
			font-weight: 500;
			justify-content: center;

			p{
				color: inherit;
				margin: 0;
				padding: 0;
			}
		}


		// Colors
		&.red{
			color: var(--red);
			border-color: var(--red);
			.callout-icon{
				color: var(--red);
			}
			a{
				color: var(--redText);
				&:hover{
					color: var(--redText);
				}
			}
		}
		// Orange
		&.orange{
			border-color: var(--orange);
			color: var(--orange);
			.callout-icon{
				color: var(--orange);
			}
			a{
				color: var(--orangeText);
				&:hover{
					color: var(--orangeText);
				}
			}
		}
		// Purple
		&.purple{
			border-color: var(--purple);
			color: var(--purple);
			.callout-icon{
				color: var(--purple);
			}
			a{
				color: var(--purpleText);
				&:hover{
					color: var(--purpleText);
				}
			}
		}
		// Pink
		&.pink{
			border-color: var(--pink);
			color: var(--pink);
			.callout-icon{
				color: var(--pink);
			}
			a{
				color: var(--pinkText);
				&:hover{
					color: var(--pinkText);
				}
			}
		}
		// Green
		&.green{
			border-color: var(--green);
			color: var(--green);
			.callout-icon{
				color: var(--green);
			}
			a{
				color: var(--greenText);
			}
		}
		// Yellow
		&.yellow{
			border-color: var(--yellow);
			color: var(--yellowText);
			.callout-icon,
			.callout-body{
				color: var(--yellowText);
			}
			a{
				color: var(--yellowText);
			}
		}
		// Grey
		&.grey{
			border-color: var(--border);
			color: var(--border);
			.callout-icon{
				color: var(--border);
			}
			a{
				color: var(--greyText);
				&:hover{
					color: var(--greyText);
				}
			}
		}

		// Sizing
		// small means lil smaller icon and smaller text
		&.small{
			padding: 0 0 0 0;

			.callout-icon{
				font-size: 1.5rem;
			}
			.callout-body{
				padding: 12px 15px 14px 0;
				letter-spacing: 0px;
				font-size: 0.9rem;
			}
		}
		// big means bigger icon and bigger text
		&.big{
			padding: 20px 0 20px 0;

			.callout-icon{
				font-size: 3.5rem;
				padding: 0 24px 0 20px;
			}
		}
		// Unset max width
		&.wide{
			max-width: unset;
			p{
				max-width: unset;
			}
		}
		
		
	}

</style>