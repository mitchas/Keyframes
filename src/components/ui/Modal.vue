<!-- 
//  Modal Component
//  _________________________
// 
// 	Show modal with buttons at bottom,
// 		Accepts props:  
// 			- show: condition to show modal
// 			- size: large (default/empty), small
// 			- color: primary (default/empty), other button colors
// 			- title: Text string for modal title
// 			- dismissText: text for dismiss button
// 			- confirmText: text for main action/confirm button
// 			- confirmIcon: icon for confirm button
// 
// 
// 		Styles
// 		_____________________
// 		.lightbox
// 			- show with modal, darken and blur behind, click to dismiss modal
// 		.modal-wrapper
// 			- Outer element to center modal with flex
// 			.modal
// 				- Actual modal element
// 				- Add class .small to decrease size to confirmation-like
// 				
// 				.modal-title
// 				.modal-body
// 				.modal-footer
// 					Add class .center to align content in the middle, .right to right-justify
-->

<template>
	<div>
		<!-- Lightbox -->
		<transition name="lightbox">
			<div class="lightbox" v-if="show"></div>
		</transition>
		<!-- Modal -->
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="$emit('dismissed')" v-if="show">

				<div class="modal" v-bind:class="size">
					<!-- Header -->
					<div class="modal-title">
						{{title}}
					</div>
					<!-- Body Content -->
					<div class="modal-body">
						<slot></slot>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer" v-bind:class="{'center': !dismissText}">
						<!-- Dismiss -->
						<button class="button grey" @click="$emit('dismissed')" aria-label="Dismiss" v-if="dismissText">
							<i class="far fa-times"></i>
							<span>{{dismissText}}</span>
						</button>
						<!-- Leave -->
						<button class="button" v-bind:class="color" @click="$emit('confirmed')" v-bind:aria-label="confirmText">
							<span>{{confirmText}}</span>
							<i v-bind:class="confirmIcon ? confirmIcon : 'fas fa-long-arrow-right'"></i>
						</button>
					</div>
				</div> <!-- End modal body/form -->

			</div>

		</transition>
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
		'show',
		'size',
		'color',
		'title',
		'dismissText',
		'confirmText',
		'confirmIcon',
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

	// Universal Lightbox
	// Blank div with lightbox class
	.lightbox{
		height: 100%;
		width: 100vw;
		background-color: var(--lightbox);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
		backdrop-filter: blur(4px);
	}

	// Modals
	// Flex wrapper - click outside body to close
	.modal-wrapper{
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		transform: scaleX(1);
		transition: var(--transition);
		transform-origin: bottom center;

		// Modal body
		.modal{
			display: flex;
			flex-direction: column;
			background-color: var(--background);
			margin: 0 auto;
			width: 90%;
			max-width: 500px;
			border-radius: var(--borderRadius);
			box-shadow: var(--shadowDark);
			position: relative;
			max-height: 75vh;
			border: 1px solid var(--dark);

			// Small, confirmation modal
			&.small{
				max-width: 300px;

				// Absolute bottom, larger on mobile
				@media (max-width: @screenSM) {
					width: 100%;
					max-width: 100%;
				}
			}

			// Absolute bottom, larger on mobile
			@media (max-width: @screenSM) {
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				max-width: 100%;
				border-top-left-radius: 48px;
				border-top-right-radius: 48px;
				border: none;			
				box-shadow: var(--shadowTop);
			}

			// Close modal button, floats top right
			.modal-close{
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 18px;
				position: absolute;
				top: 0;
				right: 0;
				padding: 6px 10px;
				opacity: 0.2;
				color: var(--medium);
				transition: var(--transition);

				&:hover{
					cursor: pointer;
					opacity: 1;
					color: var(--red);
					transition: var(--transition);
				}

				// Hide on mobile
				@media (max-width: @screenSM) {
					display: none;
				}
			}

			// Modal Title
			.modal-title{
				display: block;
				box-sizing: border-box;
				padding: 20px 20px 20px 20px;
				border-top-right-radius: var(--borderRadiusSmall);
				border-top-left-radius: var(--borderRadiusSmall);
				color: var(--dark);
				font-weight: 600;
				letter-spacing: 0.25px;
				font-size: 24px;
				text-align: left;
				line-height: 24px;

				// Increase size and padding on mobile
				@media (max-width: @screenSM) {
					padding: 25px 25px 0px 25px;
				}
			}

			// Main body/content
			.modal-body{
				box-sizing: border-box;
				padding: 5px 20px 10px 20px;
				overflow: scroll;
				flex-grow: 3;

				// Increase size and padding on mobile
				@media (max-width: @screenSM) {
					padding: 0px 25px 0px 25px;
				}

			}

			// Modal footer/buttons
			.modal-footer{
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 20px;

				// Remove bottom and side padding
				@media (max-width: @screenSM) {
					padding: 15px 25px 20px 25px;
				}

				// Center buttons
				&.center{
					// Space-around centers all elements with gaps between
					justify-content: space-around;
				}
				&.right{
					justify-content: flex-end;

					// Margin left on buttons for spacing
					button{
						margin-left: 12px;
					}
				}
			}
		}
	}

</style>