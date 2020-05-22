<!--
// 
// CharacterCodes.vue
// _________________________
//
//	Search for characters, view their html and css content codes
//
//	- setPalette(hexString)
// 		takes value as hexString ie ('ff0000,f0ff00,aa0f11') and loads them as a palette. Used for loading local storage or url params
// -->

<template>
	<div class="page">
		<div id="characterPage">

			<div id="characterPageTop" class="pbottom-lg ptop-md">
				<h1 class="mbottom-sm">Character Codes</h1>
				<input type="text" placeholder="Search for a character..." v-model="searchString"/>
				<p class="small padding-none mtop-xs">
					Click on the character, CSS, or HTML to copy the value to your clipboard.
				</p>
			</div>

			<!-- Character loop -->
			<transition-group name="longlist"  class="character-display">
				<div class="character" v-for="(char, index) in searchCharacters" :key="index">
					<!-- Name -->
					<div class="character-name">{{char.name}}</div>
					<!-- Big character -->
					<div class="character-big" v-html="'&#' + char.htmlNumber + ';'" @click="copyToClipboard(char.name, char.character)"></div>
					<!-- Codes -->
					<div class="character-codes">
						<!-- CSS code -->
						<div class="code" @click="copyToClipboard('\\00' + char.css, '\\00' + char.css)">
							<span>CSS</span>
							<span>\00{{char.css}}</span>
						</div>
						<!-- HTML code - show name if available, otherwise number -->
						<div class="code" @click="copyToClipboard('&' + char.htmlName + ';', '&' + char.htmlName + ';')" v-if="char.htmlName">
							<span>HTML</span>
							<span>&{{char.htmlName}};</span>
						</div>
						<div class="code" @click="copyToClipboard('&#' + char.htmlNumber + ';', '&#' + char.htmlNumber + ';')" v-else>
							<span>HTML</span>
							<span>&#{{char.htmlNumber}};</span>
						</div>
					</div>
				</div>
			</transition-group>

			<!-- End of page -->
			<transition name="basic">
				<div class="page-bottom-label" v-if="!searchCharacters.length">
					<i class="fal fa-empty-set"></i>
					<h4>There are no results for that.</h4>
					<p>Try another search.</p>
				</div>
			</transition>
			<transition name="basic">
				<div class="page-bottom-label" v-if="searchCharacters.length">
					<i class="fal fa-arrow-to-bottom"></i>
					<h4>You've reached the end of the results.</h4>
				</div>
			</transition>

		</div>
	</div>
</template>

<script>
// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";

// Data broken into separate file because it was long
import data from "@/views/apps/apps-data/characters.js";

export default {
	name: "CharacterApp",

	components: {
	},

	mixins: [
		metaMixin,
	],

	// External data
	data() {
		return data;
	},

	mounted() {
		this.updateMeta("Character Codes | Keyframes.app", "Search for html and css content character codes.")
	},

	computed: {
		searchCharacters() {
      		return this.characters.filter(char => {
        		return char.name.toLowerCase().includes(this.searchString.toLowerCase())
		  	})
		}
	},

	watch: {
		
	},
	
	methods: {
		/////////////////////////////
		// Set palette from load  //
		///////////////////////////
		search: function(hexString){
		},

		
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	#characterPage{
		max-width: 1280px;
		margin: 0 auto;

		#characterPageTop{
			display: block;
			margin: 0 auto;
			max-width: 500px;
			width: 90%;

			h1{
				text-align: center;
			}
			
			input{
				height: 65px;
				font-size: 28px;
				text-align: center;
			}

			p{
				text-align: center;
			}
		}
	}

	// Character display
	.character-display{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		height: fit-content;
		min-height: fit-content;
		margin: 15px 0 55px 0;

		// Space between on mobile
		@media (max-width: @screenSM) {
			justify-content: space-between;
		}

		.character{
			width: 150px;
			height: 150px;
			margin: 15px;
			border: 1px solid var(--border);
			border-radius: var(--borderRadius);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 10px;
			transform: scale(1);
			transition: var(--transition);

			// Shrink on mobile - 50% width
			@media (max-width: @screenSM) {
				width: 47%;
				margin: 15px 0;
			}

			.character-name{
				text-align: center;
				font-weight: 600;
				font-size: 14px;
				user-select: none;
			}

			.character-big{
				font-size: 42px;
				font-weight: 600;
				user-select: all;
				text-align: center;
				flex-grow: 3;
				display: flex;
				flex-direction: column;
				justify-content: center;
				transition: var(--transition);

				&:hover{
					cursor: pointer;
					color: var(--blue);
					transition: var(--transition);
				}
			}

			.character-codes{
				width: 100%;
				display: flex;
				justify-content: space-between;

				.code{
					font-weight: 700;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 14px;
					font-family: var(--mono);

					// Align text right on right elements - html
					&:nth-child(2){
						text-align: right;
					}

					// Code label - css or html
					span:first-child{
						color: var(--textLight);
						padding-bottom: 2px;
						font-size: 13px;
						user-select: none;
						font-weight: 600;
						margin-top: 0;
					}
					// Code
					span:last-child{
						user-select: all;
					}

					// Hover - click to copy
					&:hover{
						cursor: pointer;

						span:first-child{
							text-decoration: underline;
							color: var(--text);
						}
						span:last-child{
							color: var(--blue);
						}
					}
				}
			}


			// Hover Character
			&:hover{
				transform: scale(1.1);
				transition: var(--transition);
			}
		}
	}

	// Bottom of characters page - end of results, no results
	.page-bottom-label{
		box-sizing: border-box;
		padding: 0 15px 10vh 15px;
		color: var(--textLight);

		i,h4,p{
			margin: 0 auto;
			display: block;
			max-width: 500px;
			text-align: center;
		}

		i{
			font-size: 62px;
			padding-bottom: 18px;
		}
	}




</style>