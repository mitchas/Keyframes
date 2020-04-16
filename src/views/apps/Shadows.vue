<!--
// 
// Shadows.vue
// _________________________
//
//	Generate CSS shadows
//
// -->

<template>
	<div class="page-split">
		<!-- Stage that contains target -->
		<div class="page-split-left">
			<div class="page-split-left-top">
				<!-- Options -->
				<div class="option-dropdown">
					<button class="button small grey mright-sm" @click="controlToggles.options = !controlToggles.options">
						<i class="far fa-toggle-on"></i>
						<span>Options</span>
					</button>

					<!-- Dropdown content -->
					<div class="option-dropdown-content" v-if="!controlToggles.options">
						<div class="field horizontal">
							<label for="stageBackground">Background</label>
							<div class="input-wrapper">
								<input type="text" id="stageBackground" v-model="options.stageBackground" placeholder="#FFFFFF"/>
							</div>
						</div>


					</div>
				</div>
				
				<!-- Save -->
				<button class="button small red">
					<i class="far fa-bullseye"></i>
					<span>Target Element</span>
				</button>
			</div>
			<div class="app-stage">
				<div id="targetElement" class="shadow-target">
				</div>
			</div>
			
		</div>
		<!-- Right side - output and adjustments -->
		<div class="page-split-right">
			<h3 class="mbottom-sm">Options</h3>
			<!-- Rotate -->
			<div class="field horizontal">
				<label for="stageBackground">Background</label>
				<div class="input-wrapper">
					<input type="text" id="stageBackground" v-model="options.stageBackground" placeholder="#FFFFFF"/>
				</div>
			</div>

			<!-- Shadow -->
			<h3 class="mbottom-sm">Options</h3>

		</div>

		<!-- Append styles to page - options, shadow output, etc -->
		<v-style>
			.app-stage{
				background: {{options.stageBackground}};
			}
		</v-style>


	</div>
</template>

<script>
// @ is an alias to /src
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "shadowApp",

	components: {
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
			options: {},
			// Which controls are visible
			controlToggles: {
				options: false,
				targetElement: false,
			}
		};
	},

	mounted() {
		this.updateMeta("Shadows | Keyframes.app", "Keyframes gives you a visual timeline to help you create, view, and run animations without having to go back and forth between your browser and editor.")

	},

	computed: {
	},

	watch: {
		
	},
	
	methods: {


	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	.page-split{
		display: flex;
		height: 100%;
		box-sizing: border-box;
		padding: 0 0 15px 0;

		// Left side - controls, stage below
		.page-split-left{
			flex-grow: 3;
			display: flex;
			flex-direction: column;
			margin-right: 25px;

			// Top of left side - controls, save, etc
			.page-split-left-top{
				display: flex;
				padding: 0 0 15px 0;
				height: 24px;
				max-height: 24px;

				button{
					width: fit-content;
				}

				// Option button that displays dropdown content
				.option-dropdown{
					position: relative;
					height: fit-content;
					overflow: visible;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.option-dropdown-content{
						position: absolute;
						margin: 15px 0 0 0;
						top: 100%;
						background-color: var(--primary);
						min-width: 300px;
						max-width: 400px;
						width: 100%;
						border: 1px solid var(--border);
						box-shadow: var(--shadow);
						border-radius: var(--borderRadiusSmall);
						box-sizing: border-box;
						padding: 15px;

						label, h1, h2, h3, h4, h5, h6, p{
							color: var(--white);
						}
					}
				}
			}

			// Stage
			.app-stage{
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex-grow: 3;
				box-sizing: border-box;
				padding: 0 0 25px 0;
				border-radius: var(--borderRadius);

				#targetElement{
				}
			}
		}

		// Right side
		.page-split-right{
			width: 400px;
			height: 100%;
		}
	}

	// Target specific to shadow page
	.shadow-target{
		display: block;
		height: 80px;
		width: 200px;
		background-color: var(--backgroundLayer);
		border-radius: var(--borderRadius);
		margin: 0 auto;
	}

</style>