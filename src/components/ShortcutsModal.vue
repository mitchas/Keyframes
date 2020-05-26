<!-- 
// ShortcutsModal.vue
// _________________________
// 
// 	Shows modal containing keyboard shortcuts
//		Universal message for every page - general shortcuts to use throughout the app
//
//		Template
//			Specific message for app pages with their own shortcuts
//			based on route - ex animate or shadow
//
//		Props:
//			showShortcuts - true/false to show modal
//
//		Functions:
//			boop() Called when user presses keyboard shortcut - calls random alert message
// 
-->


<template>
	<div>

		<Modal
			v-bind:show="showShortcuts"
			color="transparent"
			dismissText="Close"
			@dismissed="$emit('shortcutsModalClosed');">

			<!-- Modal Heder -->
			<template v-slot:header>
				<span>Shortcuts</span>
				<i class="far fa-keyboard"></i>
			</template>

			<!-- Body -->
			<template v-slot:body>

				<!-- Suggestions -->
				<Callout
					v-if="$route.name == 'Home' || $route.name == 'PromoHome'"
					icon="fas fa-sparkles"
					class="mbottom-sm"
					color="yellow"
					size="tiny margin-auto">
					<span>
						This window will show shortcuts specific to the app you're using - so come back to it later!
					</span>
				</Callout>


				<div class="settings-group">

					<!-- Animate Page Keyboard shortcut table -->
					<label class="setting-label-large ptop-xs" v-if="$route.name == 'Animate'">
						Animation Keyboard Shortcuts
					</label>
					<div class="keyboard-shortcut-display" v-if="$route.name == 'Animate'">
						<!-- Save - Cmd + s -->
						<div class="shortcut">
							<div class="action">Save Animation to local storage.</div>
							<div class="keys">
								<div>
									<span>{{ctrlCmd()}}</span>
									<i class="far fa-plus"></i>
									<span>s</span>
								</div>
							</div>
						</div>
						<!-- Run Animation / Enter -->
						<div class="shortcut">
							<div class="action">Start or Stop animation.</div>
							<div class="keys"><span>enter</span></div>
						</div>
						<!-- Play/Pause animation - shift + enter -->
						<div class="shortcut">
							<div class="action">Play or Pause animation.</div>
							<div class="keys">
								<div>
									<span>shift</span>
									<i class="far fa-plus"></i>
									<span>enter</span>
								</div>
							</div>
						</div>
					</div>


					<!-- Universal Keyboard shortcut table -->
					<label class="setting-label-large ptop-xs">
						Universal Keyboard Shortcuts
					</label>
					<div class="keyboard-shortcut-display">
						<!-- Dark mode - cmd+d -->
						<div class="shortcut">
							<div class="action">Toggle light or dark mode</div>
							<div class="keys">
								<div>
									<span @click="boop()">Shift</span>
									<i class="far fa-plus"></i>
									<span @click="boop()">{{ctrlCmd()}}</span>
									<i class="far fa-plus"></i>
									<span @click="boop()">u</span>
								</div>
							</div>
						</div>
						<!-- Close window - esc -->
						<div class="shortcut">
							<div class="action">Close windows and popups popups</div>
							<div class="keys">
								<div>
									<span @click="escape()">esc</span>
								</div>
							</div>
						</div>
						
					</div>


					<!-- PWA Banner -->
					<!-- Suggestions -->
					<Callout
						v-if="($route.name == 'Home' || $route.name == 'PromoHome') &&  !$store.getters.device.standalone"
						icon="far fa-bullhorn"
						class="mtop-sm"
						color="borderless"
						size="tiny margin-auto">
						<span class="text-light">
							You can install Keyframes as a progressive web app alongside your other apps if your browser supports it.
						</span>
					</Callout>

				</div>

				

				<!-- <div class="badge green">
					<i class="far fa-code-branch"></i>
					<span>Badge!</span>
				</div> -->


			</template>

		</Modal>

	</div>
</template>

<script>
// Components
import Modal from "@/components/ui/Modal.vue";
import Callout from "@/components/ui/Callout";

export default {
	name: "ShortcutsModal",
	mixins: [
	],
	components: {
		Modal,
		Callout,
	},
	props: [
		'showShortcuts'
	],
	data() {
		return {
		};
	},
	mounted() {
	},
	methods: {

		///////////
		// Boop //
		/////////
		boop: function(){
			var messages = [
				"Boop","Beep","Bop","..."
			]

			var choice = messages[Math.floor(Math.random()*messages.length)];
			if(choice != null){
				this.hello(choice, 'far fa-robot');
			}
		},
		// Escape
		escape: function(){
			let _this = this;

			setTimeout(function(){
				_this.$emit('shortcutsModalClosed');

				// Message after delay
				setTimeout(function(){
					_this.hello("Told you...", "far fa-grimace");
				}, 500)
			}, 150)
		},

		// CtrlCmd
		ctrlCmd: function(){
			if(this.$store.getters.device.isMac){
				return "⌘";
			}else{
				return "ctrl"
			}
		}
	
	}
};
</script>

<style lang="less">

	@import '~@/styles/variables.less';

	.keyboard-shortcut-display{
		display: block;

		.shortcut{
			display: flex;
			padding: 2px 0;

			&:nth-child(even){
				background-color: var(--background);
			}

			.key,
			.action{
				display: flex;
				flex-direction: column;
				justify-content: center;
				box-sizing: border-box;
			}

			.action{
				flex-grow: 3;
				box-sizing: border-box;
				font-size: 13px;
				padding: 8px 8px 8px 15px;
				line-height: 16px;
				color: var(--textLight);
				font-weight: 500;
			}
			.keys{
				padding: 8px 0 8px 8px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				white-space: pre;

				span{
					background-color: var(--background);
					border: 1px solid var(--border);
					border-bottom-width: 3px;
					box-sizing: border-box;
					padding: 3px 4px 4px 4px;
					min-width: 24px;
					text-align: center;
					display: inline-block;
					position: relative;
					font-size: 13px;
					border-radius: var(--borderRadius);
					font-weight: 700;
					transition: var(--transition);
					user-select: none;
					top: 0;

					&:active{
						border-bottom-width: 1px;
						transition: var(--transition);
						top: 2px;
						background-color: var(--layer);
					}
				}

				// Plus icon between
				.fa-plus{
					text-align: center;
					font-size: 12px;
					line-height: 22px;
					height: 100%;
					transition: 0s;
					margin: 0 3px;
				}
			}
		}
	}
</style>