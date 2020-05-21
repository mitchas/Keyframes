<!--
// 
// Home.vue
// _________________________
//
//	Home page view
//	Landing page with links to and examples of each app
//
//		Functions
//			getLocalStorage()
//				Called on mount, gets local storage, sets arrays for display
//			cycleColors(val)
//				Cycles demo colors - updates value every x seconds. 
// 				Called on mount, never stops. After timeout, calls itself with random val
//
// -->

<template>
	<div class="page no-scrollbars">
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
				<span><b>Welcome to Keyframes 2.</b> A complete rewrite on Vue, version 2 has a ton of <a @click="navigate('/changelog')">new features</a> for the animator, new apps for colors & shadows, has dark more and other preferences, and works on phones & tablets. If needed, version 1 can be found <a href="https://mitchs.co/keyframes1/">here</a>.</span>
			</Callout>

			<!-- 
				Hero
			 -->
			<div class="home-hero">
				<h1>Keyframes helps you write better CSS.</h1>
				<h4>A straightforward way to create animations, shadows, colors, & more.</h4>
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
						<i class="fal fa-ghost" @click="hello('Boo!', 'fas fa-exclamation')"></i>
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
						<input type="range" @mousedown="colorRangeRunning = false" @input="colorRangeRunning = false" v-model="featuredColorsRange" min="0" max="360" step="1"/>
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
						<div class="sun">
							<i class="fad fa-sun fa-swap-opacity"></i>
						</div>
						<div class="shadow">
							<i class="fas fa-globe-americas"></i>
						</div>
					</div>
				</div>
			</div>
			</div>


			<!-- Suggestions -->
			<Callout
				icon="fal fa-sparkles"
				class=" mtop-lg"
				color="invert"
				size="fit margin-auto">
				<p class="big padding-none">
					More coming soon.
				</p>
				<p class="padding-none">
					Have a suggestion for a feature or another app you would like to see?
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
			colorRangeRunning: true,
		};
	},

	mounted() {
		let _this = this;

		// Update title
		_this.updateMeta("Keyframes", "Do cool stuff with CSS.")
		// Get local storage
		_this.getLocalStorage();

		// Start color cycle after 3s
		setTimeout(function(){
			_this.cycleColors(0);
		}, 3000)
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
		},

		///////////////////
		// Cycle Colors //
		/////////////////
		// Cycles through color demo hue-rotate - updates range slider
		cycleColors: function(value){
			let _this = this;

			// Set color
			_this.featuredColorsRange = value;

			// If user hasn't changed value, run it again after 2s
			if(_this.colorRangeRunning){
				setTimeout(function(){
					// Get random number between 1 and 36 - add 0 to it
					var random = Math.random() * (36 - 0) + 0;
					random = random * 10;
					// Run again
					_this.cycleColors(random)
				}, 2000)
			}
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
			// border: var(--borderWidth) solid var(--border);
			// background-color: var(--layer);
			box-sizing: border-box;
			padding: 65px 0;
			border-radius: var(--borderRadius);
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
				color: var(--text);
				font-size: 52px;
				animation: home-ghost 10s ease-in-out  0s infinite  normal  forwards;
				transform-origin: center center;
			}
		}
		#featuredTimeline{
			display: block;
			border: 3px solid var(--border);
			height: 60px;
			border-radius: var(--borderRadiusMd);
			position: relative;
			background-color: var(--layer);
			opacity: 0.9;

			.marker{
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 80%;
				width: 6px;
				position: absolute;
				top: 10%;
				box-shadow: var(--shadow);
				border-radius: 2px;
				z-index: 5;

				&.active{
					background-color: var(--red);
					animation: animationTicker 10s linear  0s infinite  normal  forwards;
					height: 130%;
					top: -15%;
					margin-left: -10px;
					border-radius: 2px;
					width: 8px;
					z-index: 10;
					opacity: 0.8;
				}
				&.dummy{
					background-color: var(--text);

					&:nth-child(2){left: 6px;}
					&:nth-child(3){left: 5%;}
					&:nth-child(4){left: 30%;}
					&:nth-child(5){left: 40%;}
					&:nth-child(6){left: 50%;}
					&:nth-child(7){left: 60%;}
					&:nth-child(8){left: 70%;}
					&:nth-child(9){left: 93.5%;}
					&:nth-child(10){left: 100%;margin-left: -12px;}
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
				border: 3px solid var(--border);
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
			flex-direction: column;
			box-sizing: border-box;
			justify-content: center;
			background-color: var(--white);
			box-sizing: border-box;
			padding: 35px 0;
			border-radius: var(--borderRadius);
			border: 3px solid var(--border);
			width: fit-content;
			min-width: 280px;
			margin: 0 auto;

			.sun{
				text-align: center;
				width: 50px;
				font-size: 42px;
				margin: 0 auto 0 auto;
				color: var(--yellow);
				animation: home-shadow-sun 10s linear 0s infinite alternate none;
			}
			.shadow{
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				height: 50px;
				width: 50px;
				border-radius: 50%;
				background: transparent;
				color: var(--blue);
				font-size: 52px;
				margin: 0 auto;
				animation: home-shadow 10s linear 0s infinite alternate none;
			}
		}
	}



	// Animations for home page

	
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
	@keyframes home-ghost {
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

	// Shadow
	@keyframes home-shadow {
		0.0%{
			box-shadow: 24px 14px 10px -2px rgba(30,30,60,0.45);
		}
		50%{
			box-shadow: 0px 6px 2px -2px rgba(30,30,60,0.25);
		}
		100%{
			box-shadow: -24px 14px 10px -2px rgba(30,30,60,0.45);
		}
	}
	@keyframes home-shadow-sun {
		0.0%{
			transform: translate(-70px, 0);
		}
		25%{
			transform: translate(-30px, -10px);
		}
		50%{
			transform: translate(0px, -15px);
		}
		75%{
			transform: translate(30px, -10px);
		}
		100%{
			transform: translate(70px, 0);
		}
	}

</style>