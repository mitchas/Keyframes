<!-- 
//  Help Component
//  _________________________
// 
// 	Show help modal with buttons at bottom,
// 		Accepts props:  
// 			- show: condition to show modal
// 			- title: Text string for modal title
// 			- newUser: if true, the first slide will be shown only to new users
// 			- slides: Number of slides/slots in help
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
			<div class="help-lightbox" v-if="show"></div>
		</transition>
		<!-- Modal -->
		<transition name="modal">

			<div class="help-wrapper" v-on:click.self="$emit('dismissed')" v-if="show">

				<div class="help-body">
					<h1 class="help-title">{{title}}</h1>


					<!-- Middle, slide content -->

						<transition name="slide">
							<div class="help-middle" v-if="newUser && currentSlide == 0">
								<slot name="newUser"></slot>
							</div>
						</transition>

						<transition name="slide">
							<div class="help-middle" v-if="slides > 0 && currentSlide == 1">
								<slot name="one"></slot>
							</div>
						</transition>
						<transition name="slide">
							<div class="help-middle" v-if="slides > 1 && currentSlide == 2">
								<slot name="two"></slot>
							</div>
						</transition>
						<transition name="slide">
							<div class="help-middle" v-if="slides > 2 && currentSlide == 3">
								<slot name="three"></slot>
							</div>
						</transition>


					<!-- Bottom -->
					<div class="help-footer">

						<!-- Dot Controls -->
						<div class="help-slide-dots" v-if="(newUser && slides == 1) || slides > 1">
							<i class="dot fas fa-circle" :class="{'active': currentSlide == 0}" @click="changeSlide(0)" v-if="newUser"></i>
							<i v-for="index in parseInt(slides)" :key="index" class="dot fas fa-circle" :class="{'active': currentSlide == index}" @click="changeSlide(index)"></i>
						</div>

						<!-- Dismiss -->
						<button class="button invert" @click="$emit('dismissed')" aria-label="Dismiss">
							<i class="far fa-times"></i>
							<span>Close</span>
						</button>
					</div>
				</div> <!-- End modal body/form -->

			</div>

		</transition>
	</div>
</template>

<script>
export default {
	name: "Help",
	mixins: [
	],
	components: {
	},
	props: [
		'show',
		'title',
		'newUser',
		'slides',
	],
	data() {
		return {
			// Current slide
			currentSlide: 1,
		};
	},
	created() {

	},
	mounted(){
		if(this.newUser){
			this.currentSlide = 0;
		}else{
			this.currentSlide = 1;
		}
	},
	methods: {
		///////////////////
		// Change Slide //
		/////////////////
		changeSlide: function(slide){
			var _this = this;

			_this.currentSlide = -1;

			setTimeout(function(){
				_this.currentSlide = slide;
			}, 250)
		}
	}	
}	

</script>

<style lang="less">
	@import '~@/styles/variables.less';

	// Help Lightbox
	// Blank div with lightbox class
	.help-lightbox{
		height: 100%;
		width: 100vw;
		background-color: var(--lightbox);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 500;
	}

	// Modals
	// Flex wrapper - click outside body to close
	.help-wrapper{
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
		.help-body{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: var(--pageBackground);
			margin: 0 auto;
			width: 90%;
			max-width: 500px;
			border-radius: var(--borderRadiusMd);
			position: relative;
			max-height: 75vh;
			border: var(--borderWidth) solid var(--border);
			box-sizing: border-box;
			padding: 25px 25px;
			max-height: 70vh;
			min-height: 70vh;
			height: 70vh;

			// Absolute bottom, larger on mobile
			@media (max-width: @screenSM) {
				width: 100%;
				position: absolute;
				bottom: 0;
				left: -1px;
				max-width: 100%;
				border-top-left-radius: 30px;
				border-top-right-radius: 30px;
				border:none;
			}


			.help-title{
				margin: 0;
				padding: 0;
				font-size: 22px;
				text-align: center;
				font-weight: 600;
				line-height: 22px;
			}


			// Middle section - slide content
			.help-middle{
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				transform-origin: center center;
				flex-grow: 3;

				// Tips layout
				.help-tips{
					display: flex;
					flex-direction: column;
					flex-grow: 3;
					justify-content: center;

					.tip{
						display: flex;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 10px 0;

						.tip-icon{
							min-width: 90px;
							text-align: center;
							display: flex;
							flex-direction: column;
							justify-content: center;
							font-size: 42px;
						}

						// Text
						span{
							box-sizing: border-box;
							flex-grow: 3;
							padding-right: 15px;
							font-size: 14px;
							line-height: 22px;
							font-weight: 500;

							code{
								font-family: var(--mono);
								font-weight: 600;
								font-style: italic;
								letter-spacing: -0.4px;
							}
						}

						// Color icons
						&:nth-child(1) .tip-icon{color: var(--blue);}
						&:nth-child(2) .tip-icon{color: var(--green);}
						&:nth-child(3) .tip-icon{color: var(--red);}
						&:nth-child(4) .tip-icon{color: var(--purple);}
						&:nth-child(5) .tip-icon{color: var(--yellow);}
					}
				}
			}

			// Bottom section - dots and dismiss button
			.help-footer{
				display: flex;
				flex-direction: column;

				.help-slide-dots{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					padding: 0px 0 10px 0;

					.dot{
						margin: 0 4px;
						color: var(--text);
						opacity: 0.2;
						transition: var(--transition);
						font-size: 14px;

						&:hover{
							cursor: pointer;
							opacity: 0.5;
						}
						&.active{
							opacity: 1;
							color: var(--blue);
							transition: var(--transition);
							&:hover{cursor:default;}
						}

					}
				}

				button{
					margin: 25px auto 0 auto;
					width: 200px;
				}
			}
		}
	}

	////////////////////////
	////    Slide    ///////
	//////////////////////
	// Use for blocks of several items/lists
	.slide-enter-active {
		animation: slide-animation-in .15s ease both 0.15s;
	}
	.slide-leave-active {
		animation: slide-animation-out .15s ease reverse both;
	}
	@keyframes slide-animation-out {
		0% {
			opacity: 0;
			transform: scaleX(0);
			transform-origin: center right;
			// transform: translateX(30%);
		}
		100% {
			// transform: scaleX(1);
			transform: scaleX(1);
			// transform: translateX(0px);
			opacity: 1;
		}
	}
	@keyframes slide-animation-in {
		0% {
			transform-origin: center left;
			transform: scaleX(0);
			opacity: 0;
			// transform: translateX(-30%);
		}
		100% {
			// transform: scaleX(0);
			transform: translateX(1);
			opacity: 1;
		}
	}
</style>