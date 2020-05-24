<!--
// 
// Tooltip Component
// _________________________
// 
// 	Tooltip icon - hover to show text and/or link,
//
//		#Template
//			Renders icon. Click icon to show tooltip floating right, Link prop floats bottom right of tooltip 
//			 
//			Slots: 
//				Single slot for body - can be text and links
// 
//		#Props
// 			color: Default is green, optional others: red, blue, text, yellow
// 			icon: optional CSS fontawesome string (ie 'f6af') - default is question mark
// 			link: optional link - shown at bottom right of popup
//
-->

<template>
	<!-- Tooltip -->
	<div class="tooltip left hover-right" v-bind:class="[color && color, {'show': show}]" @click="show = !show" v-if="$store.getters.userPreferences.tooltips">
		<i :class="['tooltip-icon', (!icon && !show) && $store.getters.global.tooltipIcon, (icon && !show) && icon, {'far fa-times-circle': show}]"></i>
		<span class="tooltip-text" @mouseleave="show = false">
			<slot></slot>
			<a v-if="link" class="tooltip-link" :href="link" target="_blank">
				<span v-if="link.startsWith('https://developer.m')">View on MDN</span>
				<span v-else>Read More</span>
			</a>
		</span>
	</div>
</template>

<script>
export default {
	name: "Tooltip",
	mixins: [
	],
	components: {
	},
	props: [
		'color',
		'icon',
		'link',
	],
	data() {
		return {
			show: false,
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

	////////////////////////
	////    Tooltip    ////
	//////////////////////
	// Add .tooltip class to element that needs tooltip
	.tooltip{
		transition: 0.1s;
		color: var(--text);
		height: 0px;
		width: 0px;
		position: relative;
		z-index: 5;


		&.left{
			// margin-left: -16px;
			transform: translate(-20px, 0px);
		}
		&.right{
			transform: translate(20px, 0px);
			// margin-right: 16px;
		}

		.tooltip-icon{
			color: var(--text);
			transition: var(--transitionFast);
			opacity: 0.25;
			font-size: 95%;
			min-width: 16px;
			text-align: center;
			display: block;
			position: absolute;
			z-index: -50;

			// Hover, make brighter
			&:hover{
				cursor: pointer;
				opacity: 0.6;
				transition: var(--transitionFast);
			}
		}

		// Tooltip text 
		.tooltip-text{
			// display: none;
			background-color: var(--grey);
			color: var(--text);
			width: fit-content;
			max-width: 260px;
			overflow: auto;
			box-sizing: border-box;
			padding: 8px 10px 0 10px;
			border-radius: var(--borderRadius);
			transform: scale(0);
			transform-origin: center center;
			transition: 0.06s ease;
			font-size: 13.5px;
			line-height: 16px;
			margin-left: 18px;
			position: absolute;
			display: flex;
			z-index:10;
			flex-direction: column;
			border: 1px solid var(--border);

			// Actual text
			span,b{
				display: block;
				min-width: fit-content;
				font-weight: 600;
				white-space: pre;
			}

			b{
				padding-bottom: 6px;
				min-width: 120px;
			}

			// Code text
			.code{
				font-weight: 500;
				font-size: 12.5px;
				font-family: var(--mono);
			}
			.code.example{
				font-style: italic;
				color: var(--textLight);
				position: relative;
			}

			// Right aligned bottom link
			.tooltip-link{
				display: block;
				text-align: right;
				color: var(--links);
				font-size: 12px;
				padding: 4px 0 7px 0;
				font-weight: 600;
				letter-spacing: -0.2px;
			}
		}

		// Hover appears left or right
		&.hover-right{
			.tooltip-text{
				transform-origin: top left;
				right: unset;
				margin-right: 0px;
				transition: 0.08s ease;
				left: 0%;
			}
		}

		// Add class show to show tooltip
		&.show{
			color: var(--blue);

			.tooltip-icon{
				opacity: 1;
				color: var(--red);
			}

			.tooltip-text{
				transform: scale(1);
				transition: 0.06s ease;
			}
		}

		


		// Colors
		&.red i{
			color: var(--red);
		}
		&.blue i{
			color: var(--blue);
		}
		&.green i{
			color: var(--green);
		}
		&.yellow i{
			color: var(--yellow);
		}
	}


</style>