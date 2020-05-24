<!-- 
// 	Toast
// 	_________________________
// 
// 	Larger/more visible than alert
// 	Called with toast("title", "body", "color", "icon") defined in plugins.js
//
//		#Template
//			Notification message with icon, title, and smaller body text - click to dismiss, no othe interaction
//			Floats bottom right on desktop and md, full width bottom on mobile
// 
//		#Props
// 			visible - visiblity of toast
// 			icon - Font Awesome full icon class (ex 'far fa-star')
// 			color - color class - red, green, yellow, or primary (default)
// 			title - Short bold text on top
// 			body - the long text for the toast message
// 
//		#Script
//			methods
//				showToast()
//					Sets alert icon and message, shows message, then hides after delay.
//				hideToast()
//					called on click - sets hidingToast to true, which transitions off page before hiding after delay.

-->


<template>
	<!-- Toast notificaion -->
	<transition name="toast">

		<!-- <div id="toast" class="yellow" v-if="!toastData.visible" @click="hideToast()"> -->
		<div id="toast" v-bind:class="toastData.color" v-if="toastData.visible" @click="hideToast()">
			<!-- Floaing x - clicking anywhere will close it, though -->
			<div class="toast-close">
				<i class="far fa-times"></i>
			</div>
			<!-- Contetnt -->
			<div class="toast-content">
				<div class="toast-icon">
					<i v-bind:class="toastData.icon"></i>
				</div>
				<div class="toast-text">
					<div class="toast-title">
						{{toastData.title}}
					</div>
					<div class="toast-body">
						{{toastData.body}}
					</div>
				</div>
			</div>
			<!-- 5 second progress bar -->
			<div class="toast-bar progress"></div>
		</div>

	</transition>
</template>

<script>

export default {
	name: "Toast",
	data() {
		return {
			hidingToast: false,
			toastData: {
				"visible": false,
				"icon": "fas fa-times",
				"color": "red",
				"title": "Toast title",
				"body": "Toast body"
			}
		};
	},
	mounted(){
	},
	methods: {
		/////////////////////
		//   Show Toast   //
		///////////////////
		showToast: function(title, body, color, icon){

			let _this = this;

			// Set new toast data
			// Setting visible to true shows it
			_this.toastData = {
				"visible": true,
				"icon": icon,
				"color": color,
				"title": title,
				"body": body
			}

			// Hide after 4 seconds
			setTimeout(function(){
				_this.hideToast();
			}, 4000)
		},
		

		/////////////////////
		//   Hide Toast   //
		///////////////////
		hideToast: function(){
			let _this = this;

			// Hiding toast
			_this.hidingToast = true;

			// 300ms delay for animation out
			setTimeout(function(){
				_this.hidingToast = false;
				_this.toastData.visible = false;
			}, 0)
		}
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	///////////////////
	//    Toast     //
	/////////////////
	#toast{
		position: fixed;
		bottom: 25px;
		float: right;
		opacity: 1;
		right: 25px;
		display: flex;
		flex-direction: column;
		background-color: var(--layer);
		backdrop-filter: blur(3px);
		border-radius: var(--borderRadiusMd);
		transition: var(--transition);
		box-shadow: var(--shadow);
		z-index: 50000;
		transform: translateY(0px);
		transform-origin: center right;
		border: 1px solid var(--inputBorder);
		background-color: var(--blue);
		color: var(--white);

		@media (max-width: @screenSM) {
			right: unset;
			width: 100%;
			border-radius: 0;
			bottom: 0;
			padding: 8px 0;
		}

		// Color Variations
		// Color Variations
		// Red
		&.red{
			background-color: var(--red);
		}
		// Green
		&.green{
			background-color: var(--green);
			color: var(--inputBorder);
		}
		// Yellow
		&.yellow{
			background-color: var(--yellow);
			color: var(--inputBorder);
		}

		// Transition down when hiding beore unmount
		&.hide{
			// transform: translateY(250px);
			bottom: -250px;
			transition: var(--transition);
		}


		// Close icon top right corner
		.toast-close{
			position: absolute;
			font-size: 18px;
			right: 3px;
			top: 3px;
			height: 24px;
			width: 24px;
			border-radius: 50%;
			color: var(--inputBorder);
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: transparent;
			transition: var(--transition);
			opacity: 0.5;

			@media (max-width: @screenSM) {
				width: 30px;
				height: 30px;
				right: 6px;
				top: 6px;
				opacity: 0.7;
			}

			i{
				font-weight: 400;
			}
		}

		// Hover state increases size a little, brightens close, cursor
		&:hover{
			cursor: pointer;
			transform: translateY(3px);
			transition: var(--bezierTransition);

			.toast-close{
				transition: var(--transition);
				opacity: 0.8;
			}

		}

		.toast-content{
			flex-grow: 3;
			box-sizing: border-box;
			padding: 14px 12px 16px 10px;
			display: flex;

			// Increase padding on smaller screens
			@media (max-width: @screenSM) {
				padding: 18px 25px 18px 15px;
			}

			// Icon left on toast
			.toast-icon{
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				width: 44px;
				min-width: 44px;
				max-width: 44px;
				font-size: 36px;
				box-sizing: content-box;
				padding-bottom: 2px;
				height: auto;
				@media (max-width: @screenSM) {
					font-size: 46px;
					min-width: 60px;
					max-width: 60px;
				}
			}

			// Body of the toastt
			.toast-text{
				flex-grow: 3;
				display: flex;
				flex-direction: column;
				justify-content: center;
				box-sizing: border-box;
				padding-left: 8px;
				max-width: 280px;
				min-width: 160px;

				// Adjust spacing on small screens
				@media (max-width: @screenSM) {
					max-width: none;
					min-width: 0px;
					padding-left: 8px;
				}

				.toast-title{
					font-size: 16px;
					font-weight: 700;
					letter-spacing: 0.25px;
					padding-bottom: 3px;

					// Spacing on mobile
					@media (max-width: @screenSM) {
						padding-bottom: 4px;
					}
				}
				.toast-body{
					font-size: 13px;
					line-height: 18px;
					letter-spacing: 0.35px;
					font-weight: 500;
					font-family: var(--systemFont);

					// Spacing on mobile
					@media (max-width: @screenSM) {
						font-size: 13px;
						line-height: 16px;
					}
				}
			}

		}

		// Progress bar that shows when toast will be dismissed
		.toast-bar{
			position: absolute;
			bottom: 0px;
			display: block;
			width: 100%;
			height: 6px;
			min-height: 6px;
			max-height: 6px;

			// Make a bit bigger on mobile
			@media (max-width: @screenSM) {
				height: 6px;
				min-height: 6px;
				max-height: 6px;
			}

			// Bar that shows progress
			&:after{
				content: " ";
				display:flex;
				width: 0%;
				height: 100%;
				background-color: var(--inputBorder);
				border-bottom-left-radius:  var(--borderRadiusMd);
			}

			// Show progress moving when class is added with v-if
			&.progress:after{
				animation: toastBar 4s 1 0s linear;
			}
		}

	}

	// Animation
	// Makes bar under toast go from left to right
	// 100% width to 0% in 5 seconds.
	@keyframes toastBar{
		0%{width: 0%;}
		1%{width: 100%;}
		100%{width: 0%;}
	}


	// Toast from botttom animation
	// Toast from botttom animation
	.toast-enter-active {
		animation: toast-in .22s;
	}
	.toast-leave-active {
		animation: toast-out .3s;
	}
	// Comes from bottom on desktop
	@keyframes toast-in {
		0% {
			opacity: 0;
			transform: translateY(250px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	@keyframes toast-out {
		0% {
			opacity: 1;
			transform: translateY(0px);
		}
		100% {
			opacity: 0;
			transform: translateY(250px);
		}
	}
	
</style>