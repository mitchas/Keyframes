<!-- 
Confirm Component
Example: 
<Confirm v-if="show" icon="far fa-circle-xmark" title="Title" color="red" confirmText="Yes" cancelText="No, Cancel" v-on:confirmFalse="show = false" v-on:confirmTrue="doSomething()"></Confirm>
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
						<i :class="icon"></i>
					</div>
					<!-- Body Content -->
					<div class="modal-body no-scrollbars">
						<slot></slot>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer">
						<!-- Dismiss -->
						<button class="button invert" @click="cancel()" :aria-label="cancelText" ref="cancel">
							<i class="far fa-circle-xmark"></i>
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
import shortcut from "@/components/mixins/keyboard.js";

export default {
	name: "Confirm",
	mixins: [
		// Dismiss modals with escape
		shortcut("escape", function() {
			this.cancel();
		}),
	],
	components: {
	},
	props: [
		"title",
		"color",
		"icon",
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
		let _this = this;

		this.show = true;
		setTimeout(function(){
			_this.$refs.cancel.focus();
		}, 400	);
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