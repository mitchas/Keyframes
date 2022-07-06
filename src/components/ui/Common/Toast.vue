<!-- 
Toast
 	Toast element to display messages
-->

<template>
	<!-- Toast notificaion -->
	<transition name="toast">

		<!-- <div id="toast" v-bind:class="toastData.color" @click="hideToast(true)"> -->
		<div id="toast" class="focusable" v-bind:class="toastData.color" v-if="toastData.visible" @click="hideToast(true)" tabindex="0" aria-label="Alert" ref="toast">
			
			<!-- Content -->
			<div class="toast-content" v-touch:swipe.self="() => hideToast()">
				<div class="toast-icon">
					<i v-bind:class="toastData.icon"></i>
				</div>
				<div class="toast-text">
					<div class="toast-title">
						{{toastData.title}}
					</div>
					<div class="toast-body">
						{{toastData.body.message ? toastData.body.message : toastData.body}}
					</div>
					<div class="toast-info" v-if="toastData.path">
						<span v-if="toastData.info" class="hide-sm">Click {{toastData.info}}</span>
						<span v-else class="hide-sm">Click to learn more</span>
						<span v-if="toastData.info" class="show-sm">Tap {{toastData.info}}</span>
						<span v-else class="show-sm">Tap to learn more</span>
					</div>
				</div>
			</div>

			<!-- 5 second progress bar -->
			<div class="toast-bar progress"></div>
		</div>

	</transition>
</template>

<script>

export default {
	name: "Toast",
	data() {
		return {
			toastData: {
				"visible": false,
				"icon": "far fa-bread-slice",
				"color": "red",
				"title": "Test Toast",
				"body": "This is a test toast, you're not supposed to see it.",
				"path": "/",
				"info": "to learn more",
			}
		};
	},
	methods: {
		//   Show Toast 
		showToast: function(title, body, color, icon, path, info){
			let _this = this;

			// Set new toast data
			// Setting visible to true shows it
			_this.toastData = {
				"visible": true,
				"icon": icon,
				"color": color,
				"title": title,
				"body": body,
				"path": path || "",
				"info": info || ""
			};

			// Focus
			setTimeout(function(){
				_this.$refs.toast.focus();
			}, 100);

			// If navigating, Hide after 6.5 seconds longer time to click
			if(path && path.length){
				setTimeout(function(){
					_this.hideToast();
				}, 6500);
			}
			// Else normal toast, 4 seconds
			else{
				setTimeout(function(){
					_this.hideToast();
				}, 4000);
			}
			
		},
		

		//   Hide Toast 
		hideToast: function(touchAction){
			
			let _this = this;

			setTimeout(function(){
				_this.toastData.visible = false;
				if(_this.toastData.path && touchAction == true){
					_this.navigate(_this.toastData.path);
				}
			}, 0);
		}
	}
};
</script>

<style lang="scss">

	

	//    Toast  
	#toast{
		position: fixed;
		top: 80px;
		right: 20px;
		float: right;
		opacity: 1;
		display: flex;
		flex-direction: column;
		background-color: var(--blue);
		border-radius: var(--borderRadius);
		border-radius: calc(var(--borderRadius) * 2);
		transition: var(--transition);
		transform: translateY(0px);
		transform-origin: center right;
		box-shadow: var(--shadow);
		z-index: 1000;
		color: var(--blueText);

		@media (max-width: $screenSM) {
			// top: unset;
			right: unset;
			width: calc(100% - 20px);
			border-radius: var(--borderRadius);
			top: 80px;
			box-sizing: border-box;
			left: 10px;
		}

		// Transition down when hiding beore unmount
		&.hide{
			bottom: -250px;
			transition: var(--transition);
		}

		// Hover state increases size a little, brightens close, cursor
		&:hover{
			cursor: pointer;
			transform: translateY(2px);
			transition: var(--transition);
		}

		.toast-content{
			flex-grow: 3;
			box-sizing: border-box;
			padding: 15px 10px 15px 20px;
			display: flex;
			color: inherit;


			// Icon left on toast
			.toast-icon{
				text-align: center;
				font-size: 2.5rem;
				box-sizing: content-box;
				height: auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			// Body of the toastt
			.toast-text{
				flex-grow: 3;
				display: flex;
				flex-direction: column;
				justify-content: center;
				box-sizing: border-box;
				padding: 0 15px 6px 15px;
				max-width: 280px;
				min-width: 160px;

				.toast-title{
					font-size: 1rem;
					font-weight: 700;
					padding-bottom: 6px;
					word-wrap: break-word;
				}
				.toast-body{
					font-size: 0.9rem;
					line-height: 1.2rem;
					font-weight: 500;
					word-wrap: break-word;
				}
				.toast-info{
					font-size: 0.8rem;
					padding-top: 4px;
					font-weight: 500;
					line-height: 1.6rem;
					opacity: 0.6;
					text-align: right;
				}
			}

		}

		// Progress bar that shows when toast will be dismissed
		.toast-bar{
			position: absolute;
			bottom: 7px;
			left: 30%;
			display: block;
			width: 40%;
			height: 5px;
			min-height: 5px;
			max-height: 5px;
			transform: rotate(180deg);

			// Bar that shows progress
			&:after{
				content: " ";
				display:flex;
				width: 0%;
				height: 100%;
				background-color: var(--text);
				opacity: 0.3;
				border-radius: 4px;
			}

			// Show progress moving when class is added with v-if
			&.progress:after{
				animation: toastBar 4s 1 0s linear;
			}
		}

		// Color Variations
		// Red
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
			color: var(--purpleText)
		}
		&.pink{
			background-color: var(--pink);
			color: var(--pinkText)
		}
		&.invert,
		&.black,
		&.grey{
			background-color: var(--text);
			color: var(--background);
		}
		

	}

	// Animation
	// Makes bar under toast go from left to right
	// 100% width to 0% in 5 seconds.
	@keyframes toastBar{
		0%{width: 0%;}
		1%{width: 100%;}
		100%{width: 0%;}
	}


	// Toast from botttom animation
	// Toast from botttom animation
	.toast-enter-active {
		animation: toast-in-up .22s;
	}
	.toast-leave-active {
		animation: toast-out-up .3s;
	}
	// Comes from top on desktop
	@keyframes toast-in-up {
		0% {
			opacity: 0;
			transform: translateY(-250px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	@keyframes toast-out-up {
		0% {
			opacity: 1;
			transform: translateY(0px);
		}
		100% {
			opacity: 0;
			transform: translateY(-250px);
		}
	}

	
</style>