<!-- 
Modal Component
 	Show modal with buttons at bottom,
 		Accepts props:  
 			- show: condition to show modal
 			- size: large (default/empty), small
 			- color: primary (default/empty), other button colors
 			- icon: header/title icon
 			- title: Text string for modal title
 			- dismissText: text for dismiss button
 			- confirmText: text for main action/confirm button
 			- confirmIcon: icon for confirm button
 			- disableConfirm: if true, confirm button is disabled
-->

<template>
	<div>

		<!-- Lightbox -->
		<transition name="lightbox">
			<div class="lightbox" v-if="show"></div>
		</transition>
		
		<!-- Modal -->
		<transition name="modal">

			<div class="modal-wrapper" v-on:click.self="closeModal()" v-if="show">

				<div class="modal" tabindex="0" v-bind:class="size" ref="modal">
					<!-- Header -->
					<div class="modal-title">
						{{title}}
						<i :class="icon"></i>
					</div>
					<!-- Body Content -->
					<div class="modal-body" :class="{'overflow': overflow}">
						<slot></slot>
					</div>
					<!-- Footer/Buttons -->
					<div class="modal-footer" v-bind:class="{'right': !dismissText, 'reverse': reverseButtons}">
						<!-- Dismiss -->
						<button class="button invert" @click="closeModal()" aria-label="Dismiss" v-if="dismissText">
							<i class="far fa-circle-xmark"></i>
							<span>{{dismissText}}</span>
						</button>
						<!-- Confirm -->
						<button class="button" v-if="confirmText" v-bind:class="color" @click="confirm()" v-bind:aria-label="confirmText" :disabled="disableConfirm">
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
import shortcut from "@/components/mixins/keyboard.js";

export default {
	name: "Modal",
	mixins: [
		// Dismiss modals with escape
		shortcut("escape", function() {
			this.closeModal();
		}),
	],
	components: {
	},
	props: [
		"show",
		"size",
		"overflow", // No scrolling
		"title",
		"color",
		"icon",
		"dismissText",
		"confirmText",
		"disableConfirm",
		"confirmIcon",
		"reverseButtons",

	],
	data() {
		return {
		};
	},
	watch: {
		show () {
			let _this = this;
			if(_this.show){
				setTimeout(function(){
					_this.$refs.modal.focus();
				}, 200);
			}
		}
	},
	created() {

	},
	mounted(){
		
	},
	methods: {

		// Emit close
		closeModal: function(){
			// Notify view to dismiss modal
			this.$emit("dismissed");
		},

		// Emit confirm
		confirm: function(){
			// User pressed action button
			this.$emit("confirmed");
		}
	}	
};	

</script>

<style lang="scss">

</style>