<!--
// 
// Home.vue
// _________________________
//
//	Home page view
//
// -->

<template>
	<div class="page text-page no-scrollbars">

		<Callout
			icon="far fa-shapes"
			class="mbottom-sm"
			color="invert"
			size="fit">
			<span>Hello! After two years I decided to rewrite Keyframes to fix some bugs, make it faster, and add tools other than animations. Read more about the changes <a @click="navigate('/changelog')">here</a>. If you want to continue to use the old version, <a href="https://mitchs.co/keyframes1/">you can find it here</a>.</span>
		</Callout>


		<h1>Keyframes is an easy-to-use CSS toolbox.</h1>
		<h4 class="mtop-xs">Live preview and generate CSS animations, shadows, colors, & more.</h4>

		<!-- <p>
			{{savedWork.animations}}
			{{savedWork.palettes}}
		</p> -->


		<p>
			I'm in the process of re-writing Keyframes, and I'm waiting to finish the home page until the tools are done. But feel free to click around and use the tools.
		</p>


		<!-- ///////////////////////////// 
			Featured / App Launcher 
			///////////////////////////// -->
		<!-- Animations -->
		<div class="app-feature">
			<h2>
				<span>Animations</span>
				<!-- Launch Button -->
				<button class="button transparent small" @click="navigate('/animate/')">
					<i class="far fa-stream"></i>
					<span>Start Animating</span>
				</button>
			</h2>
			<p class="big">A video-editor like timeline for creating CSS @keyframe animations.</p>

			<div id="featuredAnimatedTarget">
				<i class="far fa-ghost"></i>
			</div>
			<!-- Timeline copy -->
			<div id="featuredTimeline">
				<div class="marker active"></div>
				<div class="marker dummy"><b>0</b></div>
				<div class="marker dummy"><b>5</b></div>
				<div class="marker dummy"><b>30</b></div>
				<div class="marker dummy"><b>40</b></div>
				<div class="marker dummy"><b>50</b></div>
				<div class="marker dummy"><b>60</b></div>
				<div class="marker dummy"><b>70</b></div>
				<div class="marker dummy"><b>95</b></div>
				<div class="marker dummy"><b>100</b></div>
			</div>
		</div>


		<!-- Colors -->
		<div class="app-feature mbottom-xl">
			<h2>
				<span>Colors</span>
				<!-- Launch Button -->
				<button class="button transparent small" @click="navigate('/animate/')">
					<i class="far fa-tint"></i>
					<span>Create a Palette</span>
				</button>
			</h2>
			<p class="big">Pick your favorite colors & create palettes.</p>

		</div>


	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Callout";
// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "home",

	components: {
		Callout
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
			savedWork: {
			}
		};
	},

	mounted() {
		this.updateMeta("Keyframes.app", "Do cool stuff with CSS.")
		this.getLocalStorage();
	},

	computed: {
	},
	
	methods: {

		// Get Local Storage //
		//////////////////////
		// Gets all saved projects - animations, color palettes, etc
		getLocalStorage: function(){
			// Loop through all local storage, save sttorage names of animations
			// Animations begin with "animation_", Palettes are "palette_"
			var animations = [];
			var palettes = [];
			var keys = Object.keys(localStorage);
			console.log("KEYS")
			console.log(keys)
			var i = keys.length;
			while( i-- ){
				if(keys[i].startsWith("animation_")){
					animations.push(keys[i]);
				}
				if(keys[i].startsWith("palette_")){
					palettes.push(keys[i]);
				}

			}

			// Save to data
			this.savedWork.animations = animations;
			this.savedWork.palettes = palettes;
		}
		
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	.app-feature{
		display: block;
		width: 100%;
		border: 1px solid var(--border);
		background-color: var(--layer);
		box-sizing: border-box;
		padding: 25px;
		margin: 55px 0 0 0;
		border-radius: 3px;

		// Shrink padding on mobile
		@media (max-width: @screenSM) {
			padding: 15px;
		}

		h2{
			font-size: 34px;
			letter-spacing: -0.4px;
			font-weight: 600;	

			display: flex;
			justify-content: space-between;
			max-width: none;

			// Shrink on mobile
			@media (max-width: @screenSM) {
				font-size: 30px;
			}

		}
		p{
			margin: 0;
			padding: 10px 0 0 0;
		}
	}


	// Animation feature block
	// Animated element and timeline
	#featuredAnimatedTarget{
		box-sizing: border-box;
		padding: 22px 0 10px 0;
		position: relative;
		
		i{
			font-size: 52px;
			animation: ghost 10s ease-in-out  0s infinite  normal  forwards;
			transform-origin: center center;
		}
	}
	#featuredTimeline{
		display: block;
		border: 1px solid var(--border);
		height: 80px;
		border-radius: 3px;
		position: relative;

		.marker{
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			width: 12px;
			position: absolute;
			margin-left: -6px;
			top: 0px;
			z-index: 10;
			box-shadow: var(--shadow);
			border-radius: 2px;

			@media (max-width: @screenSM) {
				width: 8px;
				border-radius: 3px;
			}

			// Percentage Label
			b{
				font-size: 12.5px;
				letter-spacing: 0.15px;
				font-weight: bold;
				width: fit-content;
				box-sizing: border-box;
				position: absolute;
				left: -6px;
				top: 50%;
				margin-top: -12px;
				text-align: center;
				width: 24px;
				height: 24px;
				border-radius: 2px;
				display: flex;
				flex-direction: column;
				color: var(--white);
				justify-content: center;
				font-family: var(--systemFont);
				pointer-events: none;
				background-color: var(--text);

				@media (max-width: @screenSM) {
					display: none;
				}
			}

			&.active{
				background-color: var(--red);
				animation: animationTicker 10s linear  0s infinite  normal  forwards;
			}
			&.dummy{
				background-color: var(--text);

				&:nth-child(2){left: 0%;}
				&:nth-child(3){left: 5%;}
				&:nth-child(4){left: 30%;}
				&:nth-child(5){left: 40%;}
				&:nth-child(6){left: 50%;}
				&:nth-child(7){left: 60%;}
				&:nth-child(8){left: 70%;}
				&:nth-child(9){left: 95%;}
				&:nth-child(10){left: 100%;}
			}
		}
	}

	// Keyframes for red animated ticker
	@keyframes animationTicker{
		0%{
			left: 0%;
		}
		100%{
			left: 100%;
		}
	}



/* Copy this @keyframes block to your CSS*/
@keyframes ghost {
	0.0%{
		transform: scale(0) translate(0, 0);
	}
	5.0%{
		transform: scale(1) translate(0, 0);
	}
	30.0%{
		transform: scale(1) translate(180px, 0);
	}
	35.0%{
		transform: scale(1) translate(180px, -15px);
	}
	40.0%{
		transform: scale(1) translate(180px, 0);
	}
	45.0%{
		transform: scale(1) translate(180px, -12px);
	}
	50.0%{
		transform: scale(1) translate(180px, 0px);
	}
	55.0%{
		transform: scale(1) translate(180px, -6px);
	}
	60.0%{
		transform: scale(1) translate(180px, 0px);
	}
	65.0%{
		transform: scale(1) translate(180px, -12px);
	}
	70.0%{
		transform: scale(1) translate(180px, 0px);
	}
	95.0%{
		transform: scale(1) translate(0px, 0px);
	}
	100.0%{
		transform: scale(0) translate(0px, 0px);
	}
}


</style>