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
					<div class="modal-body no-scrollbars">
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
	name: "ConfirmLeave",
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

	
</style>