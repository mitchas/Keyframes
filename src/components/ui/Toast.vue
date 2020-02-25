<template>
	<!-- Toast notificaion -->
	<transition name="toast">

		<div id="toast" v-bind:class="{'hide ': hidingToast} + ' ' + toastData.color" v-if="toastData.visible" @click="hideToast()">
			<!-- Floaing x - clicking anywhere will close it, though -->
			<div class="toast-close">
				<i class="fas fa-times"></i>
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
	methods: {
		//////////////////
		//    Toast    //
		////////////////
		// Call with toast([]) with these props:
		// "[Title Text]", "[Body Text]", 
		//"[color (blue is blank/default, red, or green)]", 
		// "[fontAwesome class (ex: fas fa-check)]")
		
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

			// Hide after 5 seconds
			setTimeout(function(){
				_this.hideToast();
			}, 5000)
		},

		// Hide toast,
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
		background-color: var(--backgroundLayer);
		border-radius: 6px;
		transition: var(--transition);
		box-shadow: var(--shadow);
		z-index: 50000;
		transform: translateY(0px);
		transform-origin: center right;

		@media (max-width: @screenSM) {
			right: unset;
			width: 100%;
			border-radius: 0;
			border-top-right-radius: 12px;
			border-top-left-radius: 12px;
			bottom: 0;
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
			font-size: 13px;
			right: 6px;
			top: 6px;
			height: 24px;
			width: 24px;
			border-radius: 50%;
			color: var(--text);
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: transparent;
			transition: var(--transition);
			opacity: 0.3;

			@media (max-width: @screenSM) {
				font-size: 18px;
				width: 30px;
				height: 30px;
				right: 6px;
				top: 6px;
				opacity: 0.2;
			}
		}

		// Hover state increases size a little, brightens close, cursor
		&:hover{
			cursor: pointer;
			transform: translateY(3px);
			transition: var(--bezierTransitionSlow);

			.toast-close{
				transition: var(--transition);
				opacity: 0.8;
				background-color: var(--backgroundLayer);
			}

		}

		.toast-content{
			flex-grow: 3;
			box-sizing: border-box;
			padding: 18px 24px 20px 14px;
			display: flex;
			color: var(--text);

			// Increase padding on smaller screens
			@media (max-width: @screenSM) {
				padding: 18px 28px 23px 18px;
			}

			// Icon left on toast
			.toast-icon{
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				width: 56px;
				min-width: 56px;
				max-width: 56px;
				font-size: 38px;
				box-sizing: content-box;
				padding-right: 18px;
				height: auto;
				padding-bottom: 2px;
				border-right: 1px solid var(--textLight);
				color: var(--primary);
			}

			// Body of the toastt
			.toast-text{
				flex-grow: 3;
				display: flex;
				flex-direction: column;
				justify-content: center;
				box-sizing: border-box;
				padding-left: 15px;
				max-width: 280px;
				min-width: 160px;
				color: var(--text);

				// Adjust spacing on small screens
				@media (max-width: @screenSM) {
					max-width: none;
					min-width: 0px;
					padding-left: 25px;
					padding-top: 6px;
				}

				.toast-title{
					font-size: 15px;
					padding-bottom: 5px;
					font-weight: 700;
					letter-spacing: 0.45px;
				}
				.toast-body{
					font-size: 12px;
					line-height: 18px;
					letter-spacing: 0.45px;
				}
			}

		}

		// Progress bar that shows when toast will be dismissed
		.toast-bar{
			position: absolute;
			bottom: 0px;
			display: block;
			width: 100%;
			height: 4px;
			min-height: 4px;
			max-height: 4px;

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
				background-color: var(--primary);
				border-bottom-left-radius: 4px;
			}

			// Show progress moving when class is added with v-if
			&.progress:after{
				animation: toastBar 5s 1 0s linear;
			}
		}

		// Color Variations
		// Color Variations
		// Color Variations
		// Red
		&.red{
			.toast-icon{
				color: var(--red);
			}
			.toast-bar:after{
				background-color: var(--red);
			}
		}
		
		// Green
		&.green{
			.toast-icon{
				color: var(--green);
			}
			.toast-bar:after{
				background-color: var(--green);
			}
		}
		// Yellow
		&.yellow{
			.toast-icon{
				color: var(--yellow);
			}
			.toast-bar:after{
				background-color: var(--yellow);
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