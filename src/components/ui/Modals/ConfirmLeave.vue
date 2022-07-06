<!-- 
Confirm Leave component
 	Small modal that displays confirmation to leave defined pages,
 		Pages defined in plugins.js navigate() function
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

				<div class="modal small" tabindex="0" ref="modal">
					<!-- Header -->
					<div class="modal-title">
						<span>Are you sure?</span>
						<i class="far fa-file-times"></i>
					</div>
					<!-- Body Content -->
					<div class="modal-body no-scrollbars">
						<p class="padding-none">Are you sure you want to leave this page? If you have any unsaved changes, they may be lost.</p>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<!-- Dismiss -->
						<button class="button invert" @click="show = false" aria-label="Dismiss">
							<i class="far fa-times"></i>
							<span>Stay</span>
						</button>
						<!-- Leave -->
						<button class="button" @click="leave()" aria-label="Yes, Leave">
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
			route: "/",
			show: false,
		};
	},
	mounted(){
		
	},
	methods: {
		//   Show Toast 
		confirmLeave: function(route){
			let _this = this;
			_this.route = route;
			_this.show = true;
			// Focus modal
			setTimeout(function(){
				_this.$refs.modal.focus();
			}, 200);
		},
		
		// Leave page
		leave: function(){
			this.show = false;
			this.$router.push(this.route);
			document.documentElement.scrollTop = 0;
			// Disable confirm leave
			this.$store.dispatch("Hold/CONFIRM_LEAVE", false);
		},
		
	}
};
</script>

<style lang="scss">

	

	
</style>