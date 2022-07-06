<!--
Design Colors
Color Palette and Logos
-->

<template>
	<div>

		<div class="ui-color-display mtop-lg">

			<div v-for="color in normal_colors" :key="color" :class="'ui-color-box ' + color" :style="'background-color: var(--' + color + ');'">
				<span class="code">{{getCSSVariable(color)}}</span>
				<span>Text {{getCSSVariable(color + "Text")}}</span>
			</div>

		</div>

		<div class="ui-color-display mtop-md">

			<div v-for="color in black_colors" :key="color" :class="'ui-color-box ' + color" :style="'background-color: var(--' + color + ');'">
				<span class="code">{{getCSSVariable(color)}}</span>
				<span>Text {{getCSSVariable(color + "Text")}}</span>
				<small>Variable --{{color}}</small>
			</div>

		</div>


		<h2 class="mbottom-md mtop-xl">
			Logos
		</h2>


		<div class="ui-logo-display">

			<!-- Logo Only -->
			<div class="ui-logo-wrapper">
				<div class="ui-logo-image">
					<img class="desktop" alt="Logo" src="@/assets/branding/logo-light.png" title="Logo"/>
				</div>
				<label>Logo </label>
			</div>
			<div class="ui-logo-wrapper dark">
				<div class="ui-logo-image">
					<img class="desktop" alt="Logo" src="@/assets/branding/logo-dark.png" title="Logo"/>
				</div>
				<label><i class="far fa-moon-stars"/> Logo</label>
			</div>


		</div>


		<!-- Spacer -->
		<div class="mbottom-xl"></div>

	</div>
</template>

<script>

export default {
  	name: "design-colors",
  	components: {
	},
	mixins: [
	],
	data() {
		return{
			normal_colors: [
				"red",
				"orange",
				"yellow",
				"green",
				"blue",
				"sky",
				"purple",
				"pink",
			],
			black_colors: [
				"text",
				"grey",
				"border",
			],
		};
	},
	created: function () {
	},
	mounted(){

	},
	methods: {
		getCSSVariable: function(name){
			return getComputedStyle(document.documentElement)
				.getPropertyValue("--" + name);
		}
	}
};
</script>

<style lang="scss">
	
	// Color Display
	.ui-color-display{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		@media (max-width: $screenSM) {
			gap: 6px;
		}

		.ui-color-box{
			display: flex;
			height: auto;
			width: 280px;
			max-width: 280px;
			padding: 45px 15px;
			box-sizing: border-box;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			flex-grow: 3;
			color: var(--background);
			font-weight: 600;
			line-height: 20px;
			font-size: 14px;
			font-family: var(--monospace);
			border-radius: calc(var(--borderRadius) * 2) !important;
			min-height: 100px;

			@media (max-width: $screenSM) {
				width: 100%;
				min-width: 50%;
				flex-grow: 3;
				max-width: unset;
				padding: 15px 15px;
			}

			&.red{color: var(--redText);}
			&.orange{color: var(--orangeText);}
			&.yellow{color: var(--yellowText);}
			&.green{color: var(--greenText);}
			&.blue{color: var(--blueText);}
			&.sky{color: var(--skyText);}
			&.purple{color: var(--purpleText);}
			&.pink{color: var(--pinkText);}
			&.grey{color: var(--greyText);}

			.code{
				font-size: 20px;
				font-weight: bolder;
				letter-spacing: 0.5px;
			}

			&:first-child{
				border-top-left-radius: var(--borderRadius);
				border-top-right-radius: var(--borderRadius);
			}
			&:last-child{
				border-bottom-left-radius: var(--borderRadius);
				border-bottom-right-radius: var(--borderRadius);
			}
		}

	}


	// Logo Display

	.ui-logo-display{
		display: flex;
		flex-wrap: wrap;


		.ui-logo-wrapper{
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 35px 35px 0;
			box-sizing: border-box;
			padding: 15px;
			border-radius: calc(var(--borderRadius) * 2);
			background-color: var(--white);


			label{
				color: var(--black);
				width: 100%;
				text-align: center;
				padding: 7px 0 0 0;
			}


			&.dark{
				background-color: var(--black);
				label{
					color: var(--white);
				}
			}

			.spacer{
				flex-grow: 3;
			}


			.ui-logo-image{
				width: 100%;
				text-align: center;

				img{
					max-width: 100px;
					height: auto;
					width: auto;
					max-height: 120px;
					margin: 0 auto;
				}

			}
		}
	}

	
</style>