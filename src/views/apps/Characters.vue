<!--
	Chracters App
-->

<template>
	<div class="fixed-page" id="characterApp">


		<!-- Secondary nav / Toolbar -->
		<nav class="secondary-nav">

			<!-- Add color -->
			<!-- <button @click="addColor()">
				<i class="fas fa-plus-circle"></i><span class="hint">Add Char</span>
			</button> -->
			<label>Character Search</label>

			<!-- Gap -->
			<div class="spacer"></div>

			<!-- Loop for other secondary buttons -->
			<button v-for="(button, key) in secondary_nav" :key="key" @click="toggleSidebar(button.id)" >
				<i :class="view_sidebar == button.id ? 'fas fa-times' : button.icon"></i>
				<span class="hint left">{{button.title}}</span>
			</button>
		</nav>

		
		<!-- Main stage area -->
		<div class="app-layout">

			<!-- Main character search area -->
			<div id="characterSearch">

				<!-- Search input -->
				<div id="searchForm">
					<div class="input-group">
						<label class="input-group-label">Search</label>
						<input type="text" v-model="searchString"/>
					</div>
				</div>

				<ul id="characterList">
					<!-- Title -->
					<li>
						<div class="character"></div>
						<div class="name">Name</div>
						<div class="css">CSS</div>
						<div class="html">HTML</div>
					</li>
					<!-- Loop for results -->
					<li v-for="(char, key) in searched" :key="key">
						<button class="character" @click="copyToClipboard(char.character)">
							<span>{{char.character}}</span>
						</button>
						<div class="name">{{char.name}}</div>
						<button class="css" @click="copyToClipboard(char.css)">
							<span>{{char.css}}</span>
						</button>
						<button class="html" @click="copyToClipboard(char.html)">
							<span>{{char.html}}</span>
						</button>
					</li>
					<!-- No results :() -->
					<li v-if="!searched.length">
						<div class="character"><i class="fas fa-face-sad-tear"></i></div>
						<div class="name">No Results</div>
					</li>
				</ul>


				<!-- Spacer -->
				<div class="mbottom-xl mtop-xl"></div>

			</div>


			<!-- Sidebar -->
			<div class="app-sidebar" :class="{'expanded': view_sidebar != null}">

				<transition-group name="basic">

					<!-- Settings -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'settings'" key="settings">
						<h3>Character Settings</h3>
						<div class="app-sidebar-content-scroll">
							<div class="padded">

								<p class="small">
									This app is very basic. If you have suggestions for other features for this, send me an email at <a href="mailto:hello@hotdi.sh" target="_blank">hello@hotdi.sh</a>
								</p>


							</div>
						</div>
					</div>
				</transition-group>


			</div>

		</div>

	</div>
</template>

<script>
// Components
const characters = require("@/definitions/characters.js");


export default {
	name: "Characters",

	components: {
	},

	mixins: [
	],

	data() {

		return {

			characters: characters.all,
			searchString: "",

			// App Settings
			colorPrefs: {
				enableOpacity: false,
				enableCheckers: false,
				stageBackground: "#FFFFFF",
				customNames: false,
				colorGap: false,
			},

			// App Functions
			view_sidebar: null,

			// App Definitions / Loops
			secondary_nav: [
				{title: "Settings", id: "settings",  icon: "fas fa-bars"},
			],
		};
	},

	computed: {
		searched() {
      		return this.characters.filter(char => {
        		return char.name.toLowerCase().includes(this.searchString.toLowerCase())
		  	})
		}
	},
	watch: {
	},
	mounted() {
	},
	created: function () {
	},
	beforeDestroy(){
	},
	methods: {
		

		// Make sidebar visible
		toggleSidebar: function(name){
			// Clear if same one clicked
			if(this.view_sidebar == name){
				this.view_sidebar = null;
			}else{
				// Else set as name
				this.view_sidebar = name;
			}
		},

	}
};

</script>


<style lang="scss">

#characterApp{
	display: flex;
	flex-direction: column;
	max-height: 100vh;	
}


// Color Grid / Display
#characterSearch{
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow: auto;
	box-sizing: border-box;

	#searchForm{
		max-width: 300px;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 10vh 0;
	}

	#characterList{
		margin: 0;
		padding: 0;
		list-style-type: none;
		max-width: 600px;
		width: 100%;
		margin: 0 auto;

		li{
			display: flex;
			justify-content: space-between;
			height: 60px;
			padding: 0 15px;
			border-radius: var(--borderRadius);
			gap: 10px;

			&:nth-child(odd){
				background-color: var(--grey);
			}

			&:nth-child(1){
				font-weight: bold;
				height: 40px;
			}

			.character,.name,.html,.css{
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.character{
				font-size: 2em;
				width: 60px;
				font-weight: bolder;
			}
			.name{
				flex-grow: 3;
			}
			.css,
			.html{
				width: 60px;
				text-align: center;
			}

			button{
				margin: 10px 0;
				border-radius: var(--borderRadius);
				width: 60px;

				span{
					margin: 0 auto;
				}

				&:hover{
					background-color: var(--backdrop);
				}
			}
		}
	}
}







// Gradient
#gradientStage{
	width: 100%;
	min-height: 180px;
	border-radius: var(--borderRadius);
	margin: 15px auto 0 auto;
	transition: background 0.5s ease;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	box-sizing: border-box;
	border: 1px solid var(--border);
	background-size: cover;
	background-position: center center;

	#gradientStageButtons{
		display: flex;
		box-sizing: border-box;
		padding: 10px;
		gap: 8px;
		
		button{
			height: 34px;
			width: 34px;
			position: relative;
			border-radius: var(--borderRadius);
			background-color: rgba(255,255,255,0.25);
			color: rgba(0,0,0,0.6);

			&.active{
				background-color: rgba(255,255,255,0.75);
				color: var(--black);
			}

			&:hover:not(.active){
				background-color: rgba(255,255,255,0.55);
				color: rgba(0,0,0,0.8);
			}
		}
	}
}

// Special wcag tags
.wcag-tag{
	opacity: 0.85;
	background-color: #fbd2d0;
	color: #5f0d07;
	border-radius: calc(var(--borderRadius) / 2);
	box-sizing: border-box;
	padding: 3px 4px;
	display: inline-block;
	font-size: 0.65rem;
	font-weight: 700;
	border: 2px solid #5f0d07;

	&:after{content: " Fail";}

	&.green{
		border-color: #0d5f07;
		background-color: #c6ffc3;
		color: #0d5f07;
		&:after{content: " Pass";}
	}
}


// List of palettes from local storage
.palette-view{
	.pv_bar{
		width: 100%;
		background-color: var(--grey);
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		padding:  0 7px 0 10px;
		border-bottom-left-radius: var(--borderRadius);
		border-bottom-right-radius: var(--borderRadius);
	
		.pv__i{
			flex-grow: 3;
			font-size: 0.65em;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: left;
			padding: 5px 0;

			b{
				font-size: 0.95rem;
				font-weight: 500;
				padding-bottom: 2px;
			}
		}
		// Palette view Actions
		.pv__a{
			font-size: 0.9em;
			padding: 6px;
			margin: 6px 0;
			border-radius: var(--borderRadius);
			opacity: 0;
			@media (max-width: $screenSM) {opacity: 1;}

			&:hover{
				overflow: 1;
				cursor: pointer;
				background-color: rgba(0,0,0,0.05);

				&.red{color: var(--red);}
			}
		}

		// Show action buttons on hover
		&:hover{
			.pv__a{
				opacity: 1;
			}
		}


	}
}
// Preview for palettes
.palette-preview{
	display: flex;
	border-radius: var(--borderRadius);

	&.hoverable:hover{
		cursor :pointer;
	}

	.palette-preview-color{
		display: block;
		height: 42px;
		flex-grow: 3;

		&:first-child{
			border-top-left-radius: var(--borderRadius);
			// border-bottom-left-radius: var(--borderRadius);
		}
		&:last-child{
			border-top-right-radius: var(--borderRadius);
			// border-bottom-right-radius: var(--borderRadius);
		}
	}
}






#colorList{
	list-style-type: none;
	padding: 0 0 0 0;

	li{
		height: 30px;
		width: 100%;
		border-radius: 0;
		margin: 5px 0 5px 0;
		display: flex;
		justify-content: space-between;

		button{
			color: var(--textFade);

			i{
				font-size: 1.15em;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 20px;
				text-align: center;
			}

			&:disabled{
				opacity: 0;
			}
			&:hover{
				color: var(--text);
			}
		}

		span.cp{
			display: block;
			height: 100%;
			border-radius: calc(var(--borderRadius) / 2);
			flex-grow: 3;
		}
	}
}


</style>