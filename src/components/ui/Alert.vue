<!-- 
// 	Alert
// 	_________________________
// 
// 	Alert element to display short messages
// 
-->

<template>
	<!-- alert notificaion -->
	<transition name="alert">

		<!-- <div id="alert" v-if="!alertVisible" @click="hideAlert()"> -->
		<div id="alert" v-if="alertVisible" @click="hideAlert()">
			<b>
				<i :class="alertIcon"></i>
				<span>{{alertMessage}}</span>
			</b>
		</div>

	</transition>
</template>

<script>

export default {
	name: "Toast",
	data() {
		return {
			hidingAlert: false,
			alertMessage: 'This is an alert',
			alertIcon: 'fas fa-house',
			alertVisible: false,
		};
	},
	mounted(){
	},
	methods: {
		/////////////////////
		//   Show Toast   //
		///////////////////
		showAlert: function(message, icon){

			let _this = this;

			// Set new alert data
			_this.alertMessage = message;
			_this.alertIcon = icon;
			_this.alertVisible = true;

			// Hide after 2.5 seconds
			setTimeout(function(){
				_this.hideAlert();
			}, 2500)
		},
		

		/////////////////////
		//   Hide Alert   //
		///////////////////
		hideAlert: function(){
			let _this = this;

			// Hiding alert
			_this.hidingAlert = true;

			// 300ms delay for animation out
			setTimeout(function(){
				_this.hidingAlert = false;
				_this.alertVisible = false;
			}, 0)
		}
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