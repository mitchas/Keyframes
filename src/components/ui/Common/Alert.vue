<!-- 
Alert
 	Alert element to display short messages
 	Called from plugins with hello("message", "fa font-awesome-icon", color) defined in plugins.js
-->

<template>

	<!-- alert notificaion -->
	<transition name="alert">

		<!-- <div id="alert" v-if="!alertVisible" @click="hideAlert()"> -->
		<div id="alert" v-if="alertVisible" @click="alertVisible = false;">
			<b :class="alertColor">
				<i :class="alertIcon"></i>
				<span>{{alertMessage}}</span>
			</b>
		</div>

	</transition>
</template>

<script>

export default {
	name: "Alert",
	data() {
		return {
			alertMessage: "This is an alert",
			alertIcon: "far fa-engine-warning",
			alertVisible: false,
			hideTimer: null,
			alertColor: ""
		};
	},
	mounted(){
	},
	computed: {
	},
	watch: {
	},
	methods: {
		//   Show Alert 
		showAlert: function(message, icon, color){

			let _this = this;

			// If it's already visible, hide it first, then re-call function
			if(_this.alertVisible){
				// Hide alert, clear previous timer so it doesn't hide new alert early
				_this.alertVisible = false;
				clearTimeout(this.hideTimer);
				// re-call alert after 150ms - bounce out and in effect
				setTimeout(function(){
					_this.showAlert(message, icon, color);
				}, 150);
			}else{
				// Else show alert
				// Set new alert data
				_this.alertMessage = message;
				_this.alertIcon = icon;
				_this.alertColor = color;
				_this.alertVisible = true;

				// Hide after 2.5 seconds
				this.hideTimer = setTimeout(function(){
					_this.alertVisible = false;
				}, 3500);

			}
		},
	
	}
};
</script>

<style lang="scss">

	

	//    Alert 
	#alert{
		position: fixed;
		left: 0px;
		bottom: 10vh;
		display: flex;
		justify-content: center;
		width: 100%;
		z-index: 1000;

		b{
			background-color: var(--yellow);
			color: var(--yellowText);
			box-sizing: border-box;
			padding: 16px 22px 16px 22px;
			border-radius: calc(var(--borderRadius) * 2);
			border-bottom-right-radius: calc(var(--borderRadius) / 2);
			font-size: 0.9rem;
			box-shadow: var(--shadow);
			font-weight: 600;
			margin: 0 auto;
			max-width: 400px;
			min-width: 200px;
			display: flex;
			justify-content: center;
			box-shadow: var(--shadow);

			span, i{
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			i{
				margin: 0 15px 0 0;
				position: relative;
				transform: scale(1.5);
				top: 2px;
			}

			&:hover{
				cursor: pointer;
			}

			// Color variations
			&.red{
				background-color: var(--red);
				color: var(--redText);
			}
			&.orange{
				background-color: var(--orange);
				color: var(--orangeText);
			}
			&.yellow{
				background-color: var(--yellow);
				color: var(--yellowText);
			}
			&.green{
				background-color: var(--green);
				color: var(--greenText);
			}
			&.blue{
				background-color: var(--blue);
				color: var(--blueText);
			}
			&.sky{
				background-color: var(--sky);
				color: var(--skyText);
			}
			&.purple{
				background-color: var(--purple);
				color: var(--purpleText);
			}
			&.pink{
				background-color: var(--pink);
				color: var(--pinkText);
			}
			&.black,
			&.grey{
				background-color: var(--text);
				color: var(--background);
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
			transform: scale(1.2);
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
			transform: scale(1.2);
			opacity: 1;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
	
</style>