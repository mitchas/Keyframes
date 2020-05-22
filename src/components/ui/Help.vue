<!-- 
//  Help Component
//  _________________________
// 
// 	Show help modal with buttons at bottom,
// 		Accepts props:  
// 			- show: condition to show modal
// 			- title: Text string for modal title
// 			- color: Color of button and other accents
// 			- dismissText: Text for close button
// 			- dismissIcon: Font awesome icon string for close button
// 			- newUser: if true, the first slide will be shown only to new users
// 			- slides: Number of slides/slots in help
// 
-->

<template>
	<div>
		<!-- Lightbox -->
		<transition name="lightbox">
			<div class="help-lightbox" v-if="show"></div>
		</transition>
		<!-- Modal -->
		<transition name="modal">

			<div class="help-wrapper" v-on:click.self="closeHelp()" v-if="show" v-touch:swipe.self="closeHelp">

				<div class="help-body">

					<transition name="basic">
						<h1 class="help-title" v-if="title && !newUser">{{title}}</h1>
					</transition>


					<!-- Middle, slide content -->
					<div class="help-middle" :class="(newUser || slides == 1) && 'fit'">

						<!-- New user slide - only shown if user's first time seeing it -->
						<transition name="slide">
							<div class="help-middle-content" v-if="newUser">
								<slot name="newUser"></slot>
							</div>
						</transition>

						<!-- Rest of slides, 3 max -->
						<transition name="slide">
							<div class="help-middle-content" v-if="slides > 0 && currentSlide == 1 && !newUser" v-touch:swipe.left="swipeForward">
								<slot name="one"></slot>
							</div>
						</transition>
						<transition name="slide">
							<div class="help-middle-content" v-if="slides > 1 && currentSlide == 2" v-touch:swipe.left="swipeForward" v-touch:swipe.right="swipeBackward">
								<slot name="two"></slot>
							</div>
						</transition>
						<transition name="slide">
							<div class="help-middle-content" v-if="slides > 2 && currentSlide == 3" v-touch:swipe.right="swipeBackward">
								<slot name="three"></slot>
							</div>
						</transition>
					</div>

					<!-- Bottom -->
					<div class="help-footer">

						<!-- Dot Controls -->
						<div class="help-slide-dots" v-if="slides > 1 && !newUser">
							<i v-for="index in parseInt(slides)" :key="index" class="dot fas fa-circle" :class="{'active': currentSlide == index}" @click="changeSlide(index)"></i>
						</div>

						<!-- Dismiss -->
						<button class="button" :class="color" @click="closeHelp()" aria-label="Dismiss">
							<i :class="[dismissIcon ? dismissIcon : 'far fa-times']"></i>
							<span>{{dismissText}}</span>
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
		'color',
		'newUser',
		'dismissText',
		'dismissIcon',
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
	watch: {
		// Watch new user, if that changes, change slide to regular user view
		newUser: function(newVal, oldVal) {
			this.changeSlide(1);
		},
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
			}, 110)
		},
		///////////////////
		//  Close Help  //
		/////////////////
		closeHelp: function(){
			this.$emit('dismissed');

			// If new user, emit viewed so it doesn't show again
			if(this.newUser){
				this.$emit('newUserViewed');
			}
		},
		/////////////////////////
		//  Swipe Navigating  //
		///////////////////////
		// Forward, plus one
		swipeForward: function(){
			if(this.slides > this.currentSlide){
				var goto = this.currentSlide + 1;
				this.changeSlide(goto);
			}
		},
		// Backward, minus one
		swipeBackward: function(){
			var goto = this.currentSlide - 1;
			this.changeSlide(goto);
		},
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
		backdrop-filter: blur(2px);
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
			width: 94%;
			max-width: 500px;
			border-radius: var(--borderRadiusMd);
			position: relative;
			border: var(--borderWidth) solid var(--border);
			box-sizing: border-box;
			padding: 30px 45px;
			max-height: 70vh;
			min-height: 70vh;
			height: 70vh;

			// Absolute bottom, larger on mobile
			@media (max-width: @screenSM) {
				width: 90%;
				max-height: 80vh;
				min-height: 50vh;
				padding: 30px 30px;
				height: fit-content;
				border-radius: 10px;
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
				height: 45vh;
				max-height: 45vh;
				min-height: 45vh;

				@media (max-width: @screenSM) {
					height: 40vh;
					max-height: 40vh;
					min-height: 40vh;
				}

				// Fit height to stretch - set if more than one slide, and not new user
				&.fit{
					height: fit-content;
					max-height: fit-content;
					min-height: fit-content;
				}

				// Added inside wrapper to keep height
				.help-middle-content{
					display: flex;
					flex-grow: 3;
					flex-direction: column;
					justify-content: center;
				}

				// Tips layout
				.help-tips{
					display: flex;
					flex-direction: column;
					flex-grow: 3;
					justify-content: center;
					box-sizing: border-box;
					padding: 15px 0;

					.tip{
						display: flex;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 14px 0;

						.tip-icon{
							min-width: 50px;
							text-align: center;
							display: flex;
							margin-right: 15px;
							flex-direction: column;
							justify-content: center;
							font-size: 42px;
						}

						// Text
						.tip-text{
							box-sizing: border-box;
							flex-grow: 3;
							font-size: 14px;
							line-height: 20px;
							font-weight: 500;
							display: flex;
							flex-direction: column;
							justify-content: center;

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
				justify-self: flex-end;

				.help-slide-dots{
					display: flex;
					justify-content: center;
					box-sizing: border-box;
					padding: 0px 0 30px 0;

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
					margin: 0 auto 0 auto;
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
		animation: slide-animation-in .1s ease-in-out both .1s;
	}
	.slide-leave-active {
		animation: slide-animation-out .1s ease-in-out both;
	}
	@keyframes slide-animation-out {
		0% {
			transform: scaleX(1);
		}
		100% {
			transform: scaleX(0);
		}
	}
	@keyframes slide-animation-in {
		0% {
			transform: scaleX(0);
		}
		100% {
			transform: scaleX(1);
		}
	}
</style>