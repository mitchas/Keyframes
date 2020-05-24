<!-- 
// Confirm Leave component
// _________________________
// 
// 	Small modal that displays confirmation to leave defined pages,
// 		Pages defined in plugins.js navigate() function
// 
//		#Template
//			Small modal - nothing too different
// 
//		#Script
//			methods
//				confirmLeave()
//					Called from navigate() in plugins, shows modal
//				leave()
//					Clicked if user confims leave, continues to desired route
// 
-->

<template>
	<div>
		<!-- Lightbox -->
		<transition name="lightbox">
			<div class="lightbox" v-if="show"></div>
		</transition>
		<!-- Modal -->
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="show = false" v-if="show" v-touch:swipe.self="() => show = false">

				<div class="modal small">
					<!-- Header -->
					<div class="modal-title">
						<span>Are you sure?</span>
						<i class="far fa-file-times"></i>
					</div>
					<!-- Body Content -->
					<div class="modal-body">
						Are you sure you want to leave this page? If you have any unsaved changes, they may be lost.
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<!-- Dismiss -->
						<button class="button transparent" @click="show = false" aria-label="Dismiss">
							<i class="far fa-times"></i>
							<span>Stay</span>
						</button>
						<!-- Leave -->
						<button class="button invert" @click="leave()" aria-label="Yes, Leave">
							<span>Leave</span>
							<i class="fas fa-long-arrow-right"></i>
						</button>
					</div>
				</div> <!-- End modal body/form -->

			</div>

		</transition>
	</div>
</template>

<script>

export default {
	name: "Toast",
	data() {
		return {
			route: '/',
			show: false,
		};
	},
	mounted(){
	},
	methods: {
		/////////////////////
		//   Show Toast   //
		///////////////////
		confirmLeave: function(route){
			this.route = route;
			this.show = true;
		},
		// Leave page
		leave: function(){
			this.show = false;
			this.$router.push(this.route);
			document.documentElement.scrollTop = 0;
		},
		
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	///////////////////
	//    Alert     //
	/////////////////
	#alert{
		position: fixed;
		left: 0px;
		bottom: 10vh;
		z-index: 5000;
		display: flex;
		justify-content: center;
		width: 100%;

		b{
			background-color: var(--yellow);
			color: var(--black);
			box-sizing: border-box;
			padding: 5px 6px 6px 6px;
			border-radius: var(--borderRadius);
			font-size: 14px;
			box-shadow: var(--shadow);
			font-weight: 700;
			margin: 0 auto;
			border: var(--borderWidth) solid var(--border);
			max-width: 300px;
			display: flex;
			justify-content: space-between;
			line-height: 18px;

			span, i{
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			i{
				padding-right: 5px;
			}
		}
	}



	// alert from botttom animation
	// alert from botttom animation
	.alert-enter-active {
		animation: alert-in .1s;
	}
	.alert-leave-active {
		animation: alert-out .15s;
	}
	// Comes from bottom on desktop
	@keyframes alert-in {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		80% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes alert-out {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		20% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
	
</style>