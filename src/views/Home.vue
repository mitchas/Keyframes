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
		<div class="text-page-content">

			<!-- Product Hunt Banner -->
			<Callout
				v-if="$route.path == '/v2/' || $route.path == '/v2'"
				icon="fab fa-product-hunt"
				class="mbottom-md"
				color="orange"
				size="">
				<h5>Hi Product Hunt!</h5>
				<span><a href="https://www.producthunt.com/posts/keyframes-app" target="_blank">Two years</a> after version 1, Keyframes 2 is here! A complete rewrite on Vue, everything is much more responsive. The animator has a ton of new features, and I've added new apps to make box shadows and color palettes. Also, v2 is open source, works on phones & tablets, and remembers your preferences & creations.</span>
			</Callout>

			<!-- Regular Banner -->
			<Callout
				v-if="$route.path == '/'"
				icon="far fa-shapes"
				class="mbottom-md"
				color="blue"
				size="">
				<span><b>Welcome to Keyfrmes 2.</b> A complete rewrite on Vue, version 2 has a ton of <a @click="navigate('/changelog')">new features</a> for the animator, new apps for colors & shadows, has dark more and other preferences, and works on phones & tablets. If needed, version 1 can be <a href="https://mitchs.co/keyframes1/">found here</a>.</span>
			</Callout>

			<!-- 
				Hero
			 -->
			<div class="home-hero">
				<h1>Keyframes is an easy-to-use CSS toolbox.</h1>
				<h4>Live preview and generate CSS animations, shadows, colors, & more.</h4>
			</div>

			<!-- <p>
				{{savedWork.animations}}
				{{savedWork.palettes}}
			</p> -->

			<!-- ///////////////////////////// 
				Featured / App Launcher 
				///////////////////////////// -->
			<div id="featuredApps">
			<!-- Animations -->
			<div class="app-feature">
				<div class="app-feature-text">
					<h2>
						<span>Animations</span>
					</h2>
					<p class="big">
						Create basic or complex CSS @keyframe animations with a visual timeline editor similar to video-editing software.
					</p>
					<!-- Open animator -->
					<button class="button invert mtop-sm" @click="navigate('/animate/')">
						<i class="far fa-stream"></i>
						<span>Create an Animation</span>
					</button>
				</div>
				<div class="app-feature-demo">
					<div id="featuredAnimatedTarget">
						<i class="far fa-ghost"></i>
					</div>
					<!-- Timeline copy -->
					<div id="featuredTimeline">
						<div class="marker active"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
						<div class="marker dummy"></div>
					</div>
				</div>
			</div>


			<!-- Colors -->
			<div class="app-feature reverse">
				<div class="app-feature-text">
					<h2>
						<span>Colors</span>
					</h2>
					<p class="big">Pick your favorite colors, convert between hex and rgb, and create & save palettes.</p>
					<!-- Open app -->
					<button class="button invert mtop-sm" @click="navigate('/colors/')">
						<i class="far fa-tint"></i>
						<span>Play with Colors</span>
					</button>
				</div>
				<div class="app-feature-demo">
					<!-- Color Palette copy -->
					<div id="featuredPalette">
						<div class="color" :style="'filter: hue-rotate(' + featuredColorsRange + 'deg);'"></div>
						<div class="color" :style="'filter: hue-rotate(' + featuredColorsRange + 'deg);'"></div>
						<div class="color" :style="'filter: hue-rotate(' + featuredColorsRange + 'deg);'"></div>
						<div class="color" :style="'filter: hue-rotate(' + featuredColorsRange + 'deg);'"></div>
						<div class="color" :style="'filter: hue-rotate(' + featuredColorsRange + 'deg);'"></div>
						<div class="color" :style="'filter: hue-rotate(' + featuredColorsRange + 'deg);'"></div>
					</div>

					<!-- Animated Slider -->
					<div class="slider-wrapper">
						<input type="range" class="color-range" v-model="featuredColorsRange" min="0" max="360" step="1"/>
					</div>
				</div>
			</div>


			<!-- Shadows -->
			<div class="app-feature">
				<div class="app-feature-text">
					<h2>
						<span>Shadows</span>
					</h2>
					<p class="big">
						Adjust sliders to preview and generate CSS for single or multi-layered box shadows.
					</p>
					<!-- Open app -->
					<button class="button invert mtop-sm" @click="navigate('/shadows/')">
						<i class="far fa-eclipse"></i>
						<span>Cast Shadows</span>
					</button>
				</div>
				<div class="app-feature-demo">
					<!-- Shadow Example -->
					<div id="featuredShadow">
						<div class="shadow"><i class="far fa-eclipse"></i></div>
						<div class="shadow"><i class="far fa-sunglasses"></i></div>
						<div class="shadow"><i class="far fa-cloud-sun"></i></div>
						<div class="shadow"><i class="far fa-planet-moon"></i></div>
						<div class="shadow"><i class="far fa-umbrella-beach"></i></div>
					</div>
				</div>
			</div>
			</div>


			<!-- Suggestions -->
			<Callout
				icon="fal fa-sparkles"
				class=" mtop-lg"
				color="invert"
				size="fit">
				<h4 class="mbottom-xs">More coming soon</h4>
				<p class="padding-none">
					Have a suggestion for a tool or feature you would like to see?
				</p>
				<p class="small padding-none">
					Send me an email at <a href="mailto:hello@hotdi.sh" target="_blank">hello@hotdi.sh</a>
				</p>
			</Callout>

			<!-- Spacer -->
			<div class="pbottom-lg"></div>

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
			// Saved work from apps - animations, palettes, etc
			savedWork: {
			},
			// Hue rotate range for color preview
			featuredColorsRange: 0,
		};
	},

	mounted() {
		this.updateMeta("Keyframes.app", "Do cool stuff with CSS.")
		this.getLocalStorage();

	},

	computed: {
	},
	
	methods: {
		////////////////////////
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

	// Hero
	.home-hero{
		box-sizing: border-box;
		text-align: center;
		padding: 55px 0;

		h1{
			margin: 0 auto;
			font-size: 44px;
			line-height: 54px;
			max-width: 590px;
			color: var(--text);
		}

		h4{
			margin: 0 auto;
			line-height: 32px;
			max-width: 450px;
			padding-top: 25px;
			color: var(--textLight);
		}
	}


	// Featured apps
	#featuredApps{
		display: flex;
		flex-direction: column;

		.app-feature{
			width: 100%;
			display: block;
			// border: 1px solid var(--border);
			// background-color: var(--layer);
			box-sizing: border-box;
			padding: 65px 0;
			border-radius: 3px;
			display: flex;
			justify-content: space-between;

			// Full width mobile, stacked
			@media (max-width: @screenMD) {
				flex-direction: column-reverse;
				max-width: 550px;
				padding: 45px 0;
				margin: 0 auto;
			}

			// Reverse flex
			&.reverse{
				flex-direction: row-reverse;
				// No reverse on mobile
				@media (max-width: @screenMD) {
					flex-direction: column-reverse;
				}
			}


			.app-feature-text{
				width: 46%;
				@media (max-width: @screenMD) {
					width: 100%;
					padding: 25px 0 0 0;
				}

				// Header text
				h2{
					font-size: 30px;
					letter-spacing: -0.4px;
					font-weight: 700;	

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

			// Demo of section
			.app-feature-demo{
				width: 46%;
				display: flex;
				flex-direction: column;
				justify-content: center;

				@media (max-width: @screenMD) {
					width: 100%;
				}
			}
		}


		// Animation feature block
		// Animated element and timeline
		#featuredAnimatedTarget{
			box-sizing: border-box;
			padding: 22px 0 15px 0;
			position: relative;

			@media (max-width: @screenMD) {
				padding: 0 0 15px 0;
			}
			
			i{
				color: var(--blue);
				font-size: 52px;
				animation: ghost 10s ease-in-out  0s infinite  normal  forwards;
				transform-origin: center center;
			}
		}
		#featuredTimeline{
			display: block;
			border: 1px solid var(--border);
			height: 50px;
			border-radius: 3px;
			position: relative;
			background-color: var(--layer);
			opacity: 0.9;

			.marker{
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 100%;
				width: 8px;
				position: absolute;
				margin-left: -4px;
				top: 0px;
				z-index: 10;
				box-shadow: var(--shadow);
				border-radius: 2px;

				@media (max-width: @screenSM) {
					width: 8px;
					border-radius: 3px;
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

		// Featured color palette
		#featuredPalette{
			display: flex;
			justify-content: center;
			box-sizing: border-box;
			// Wrap mobile
			@media (max-width: @screenMD) {
			}

			.color{
				height: 60px;
				width: 60px;
				border-radius: 50%;
				margin: 0 4px;
				border: 1px solid var(--border);
				box-sizing: border-box;
				letter-spacing: 0.4px;
				font-weight: 600;
				text-transform: capitalize;
				display: block;
				position: relative;

				// Shrink a bit under xl
				@media (max-width: @screenLG) {
					height: 50px;
					width: 50px;
				}

				&:nth-child(1){background-color: var(--red);}
				&:nth-child(2){background-color: var(--orange);}
				&:nth-child(3){background-color: var(--yellow);}
				&:nth-child(4){background-color: var(--green);}
				&:nth-child(5){background-color: var(--blue);}
				&:nth-child(6){background-color: var(--purple);}
			}

		}

		// Range slider
		.slider-wrapper{
			box-sizing: border-box;
			padding: 25px 20% 0 20%;
			display: flex;
			justify-content: flex-end;
			background: transparent;

			@media (max-width: @screenMD) {
				padding: 25px 5% 0 5%;
			}

			input{
				margin-bottom: 5px;
			}
		}

		// Shadow example
		#featuredShadow{
			display: flex;
			box-sizing: border-box;
			justify-content: center;

			.shadow{
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				height: 60px;
				width: 60px;
				margin: 0 4px;
				background-color: var(--layer);
				font-size: 22px;
				color: var(--text);
				border-radius: 5px;
				border: 1px solid var(--border);
				box-shadow: 0px 15px 25px -2px rgba(30,30,60,0.15);

				// Shrink a bit under xl
				@media (max-width: @screenLG) {
					height: 50px;
					width: 50px;
				}
				
				&:nth-child(1){animation: shadows 3s ease-in-out 0s infinite  alternate  forwards;}
				&:nth-child(2){animation: shadows 3s ease-in-out 0.5s infinite  alternate  forwards;}
				&:nth-child(3){animation: shadows 3s ease-in-out 1s infinite  alternate  forwards;}
				&:nth-child(4){animation: shadows 3s ease-in-out 1.5s infinite  alternate  forwards;}
				&:nth-child(5){animation: shadows 3s ease-in-out 2s infinite  alternate  forwards;}
			}
		}
	}



	// Animations for home page

	// Shadow example animation
	@keyframes shadows{
		0%{
			box-shadow: 0px 15px 20px 2px rgba(30,30,80,0.2), 0px 6px 20px 2px rgba(255,255,255,0.1);
		}
		25%{
			box-shadow: 10px 0px 20px 2px rgba(30,30,80,0.2), 5px 0px 20px 2px rgba(255,255,255,0.1);
		}
		50%{
			box-shadow: 0px -15px 20px 2px rgba(30,30,80,0.2), 0px -6px 20px 2px rgba(255,255,255,0.1);
		}
		75%{
			box-shadow: -10px 0 20px 2px rgba(30,30,80,0.2), -5px 0 20px 2px rgba(255,255,255,0.1);
		}
		100%{
			box-shadow: 0px 15px 20px 2px rgba(30,30,80,0.2), 0px 6px 20px 2px rgba(255,255,255,0.1);
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