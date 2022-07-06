<!-- 
Confirm Component
Example: 
<Confirm v-if="show" title="Title" body="Body" confirmText="Yes" cancelText="No, Cancel" v-on:confirmFalse="show = false" v-on:confirmTrue="doSomething()"></Confirm>
-->
<template>
	<div>

		<!-- Lightbox -->
		<transition name="lightbox">
			<div class="lightbox" v-if="show"></div>
		</transition>

		<!-- Modal -->
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="cancel()" v-if="show" v-touch:swipe.self="() => cancel()">

				<div class="modal small" tabindex="0" ref="modal">
					<!-- Header -->
					<div class="modal-title">
						<span>{{title}}</span>
						<i class="far fa-eraser"></i>
					</div>
					<!-- Body Content -->
					<div class="modal-body no-scrollbars">
						<slot></slot>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<!-- Dismiss -->
						<button class="button invert" @click="cancel()" :aria-label="cancelText">
							<i class="far fa-times"></i>
							<span>{{cancelText}}</span>
						</button>
						<!-- Leave -->
						<button :class="'button ' + color" @click="confirm()" :aria-label="confirmText">
							<span>{{confirmText}}</span>
							<i :class="confirmIcon" v-if="confirmIcon"></i>
							<i class="fas fa-check-circle" v-else></i>
						</button>
					</div>
				</div> <!-- End modal body/form -->

			</div>

		</transition>
	</div>
</template>



<script>

export default {
	name: "Confirm",
	mixins: [
	],
	components: {
	},
	props: [
		"title",
		"color",
		"confirmText",
		"confirmIcon",
		"cancelText",
	],
	data() {
		return {
			show: false,
		};
	},
	created() {

	},
	mounted(){
		this.show = true;
	},
	methods: {
		// Confirm
		confirm: function(){
			// Notifies view of confirmation
			this.$emit("confirmTrue");
		},
		// Cancel
		cancel: function(){
			// Notifies view of cancellation
			this.$emit("confirmFalse");
		},
	}	
};	

</script>

<style lang="scss">
	

</style>