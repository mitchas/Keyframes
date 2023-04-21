<!--
Selections.vue
Selection popout with suggestions and optional text box for searching.
-->

<template>

	<div>

		<transition name="lightbox">
			<div class="selections-lightbox show-sm" v-if="editing" @click="editing = false"></div>
		</transition>

 
		<div class="selections-wrapper" :class="{'editing-selections': editing, 'wide': size == 'wide' }">



			<button class="selections-button" type="button" @click.self="editing = !editing" :class="{'active': editing, 'multi': multiSelection.length}">

				<!-- Label for selection -->
				<label class="no-pointer-events">{{selectLabel}}</label>
				<label class="floater no-pointer-events">{{selectLabel}}</label>



				<!-- Multiple selected values -->
				<div v-if="multiSelection.length" class="sb_selection sb_multi">
					<b v-for="(selection, key) in multiSelection" :key="key" class="multi" @click="multiSelection.splice(key, 1);">
						{{selection.title ? selection.title : selection}}{{suffix ? ' ' + suffix : ''}}
					</b>
				</div>

				<!-- Selected Value or placeholder -->
				<div v-else-if="limit == 1 && selection" class="sb_selection no-pointer-events">
					<b  v-if="type == 'icons'">{{selection.title ? selection.title : selection}} <i :class="'pleft-xs far fa-' + selection"></i></b>
					<b v-else>{{selection.title ? selection.title : selection}}{{suffix ? ' ' + suffix : ''}}</b>
				</div>


				<!-- Placeholder / noselection -->
				<div v-else @click="editing = !editing" class="sb_selection placeholder no-pointer-events">
					<b>{{noSelectionText}}</b>
				</div>


				<!-- Dropdown -->
				<i class="sb_button-icon fas no-pointer-events " :class="{'fa-angle-down': !editing || smallScreen, 'fa-angle-up': editing && !smallScreen}"></i>
			</button>


			<!-- Popover -->
			<div class="selections-popover" v-if="editing" :class="direction" @mouseenter="mouseControls(true)" @mouseleave="mouseControls()">

				<!-- Input -->
				<div class="selections-input" v-if="textSearch">
					<input type="text" :placeholder="'Type to filter'" :value='inputValue' @input='evt=>inputValue=evt.target.value' autocomplete="off" spellcheck="false" :maxlength="maxLength"/>
					<!-- Clear Button -->
					<button id="clearTextSuggestion" @click="clearInput()" v-if="inputValue">
						<i class="fas fa-circle-xmark"></i>
					</button>
				</div>

				<!-- Results -->
				<div class="selections-list no-scrollbars"  :class="{'disabled': limit > 1 && multiSelection.length >= limit, direction}">



					<!-- Loop for options -->
					<button type="button" v-for="item in filteredSuggestions" :key="item.title ? item.title : item" @click="selectItem(item)" :class="{'hidden': multiSelection.includes(item)}">
						<!-- Icons only -->
						<span v-if="type == 'icons'" class="button-option"><i :class="'far fa-' + item"></i></span>
						<!-- Text -->
						<span>{{item.title ? item.title : item}}{{suffix ? ' ' + suffix : ''}}</span>
					</button>

					<!-- No Results -->
					<button type="button" class="selections-empty" v-if="!filteredSuggestions.length && !customText">
						<i class="fas fa-circle-xmark"></i>
						No Results
					</button>

					<!-- Add custom -->
					<button type="button" @click="selectItem(inputValue)" v-if="!filteredSuggestions.length && customText">
						<span v-if="customPrefix">{{customPrefix}}</span>
						<span v-else>Add</span>
						<b> {{inputValue}}</b>
						<i v-if="icon" class="far" :class="icon"></i>
						<i v-else class="far fa-plus-circle"></i>
					</button>

					<!-- End of  results -->
					<div class="selections-list-end"></div>

				</div>

				<!-- No results (custom disabled) -->
				<div class="end-of-selections">
					<a @click="selectItem(false)" v-if="showReset && (multiSelection.length || selection)">
						<i class="far fa-circle-xmark"></i> 
						Clear / Reset
					</a>
					<span v-else>
						<i v-if="icon" :class="icon"></i>
						<i v-else class="far fa-hand-peace"></i> 
					</span>
					<span v-if="limit > 1">Selected {{multiSelection.length}} / {{limit}}</span>
				</div>

				
			</div>


			
		</div>
	</div>

</template>

<script>


export default {
	name: "Selections",
	mixins: [
	],
	components: {
	},
	props: [
		"textSearch",
		"suggestions",
		"limit",
		"showReset",
		"direction",
		"type",
		"customPrefix",
		"suffix",
		"size",
		"icon",
		"selectLabel",
		"noSelectionText",
		"maxLength",
		"customText",
		"activeSelection",
	],
	data() {
		return {
		   inputValue: "",
		   editing: false,

		   selection: "",
		   multiSelection: [],

		   hideTimer: null,
		};
	},
	watch: {
		editing(newVal, oldVal) {
			if(this.smallScreen){
				if(newVal == true){
					this.$store.commit("Hold/SCROLL_LOCK", true);
				}else{
					this.$store.commit("Hold/SCROLL_LOCK", false);
				}
			}
			
		},
		// activeSelection(newVal, oldVal) {
		// 	if(newVal != oldVal){
		// 		this.inputValue = this.activeSelection;
		// 	}
		// },
		selection() {
			this.$emit("changed", this.selection);
		},
		multiSelection() {
			this.$emit("changed", this.multiSelection);
		},
		
	},
	created() {

	},
	computed: {

		smallScreen(){
			return this.$store.getters["Device/hasSmallScreen"];
		},

		filteredSuggestions() {

			// Return all suggestions if no value in input
			if(!this.inputValue){
				return this.suggestions;
			}
			// Else process regular array of strings - check against input
			else{
				return this.suggestions.filter(item => {
					return item.toLowerCase().replace(/[^0-9a-z]/gi, "").indexOf(this.inputValue.toLowerCase().replace(/[^0-9a-z]/gi, "")) > -1;
				}).sort();
			}
		}
	},


	mounted(){
		if(this.activeSelection){
			if(this.limit > 1){
				this.multiSelection = this.activeSelection;
			}else{
				this.selection = this.activeSelection;
			}
		}
	},
	methods: {

		// Option selected
		selectItem: function(item){


			var newItem = item;
			var limit = this.limit;
			var current = this.multiSelection.length;
			this.inputValue = "";

			if(limit > 1){

				if(item && limit > current){
					this.multiSelection.push(newItem);
				}else if(item == false){
					this.multiSelection = [];
				}else if(current >= limit){
					this.hello("You've selected " + current + "/" + limit, "far fa-circle-xmark", "red");
				}

			}else{

				if(item == false){
					this.selection = "";
				}else{
					this.selection = newItem;
				}
				this.editing = false;
			}
		},

		hideWithDelay: function(){
			let _this = this;
			setTimeout(() => {
				_this.editing = false;
			}, 500);
		},

		mouseControls: function(show){
			let _this = this;

			// If it's already visible, do nothing
			if(show){
				if(_this.editing){
					clearTimeout(_this.hideTimer);
				}
			}else{
				// Hide after 1 seconds
				this.hideTimer = setTimeout(function(){
					_this.editing = false;
				}, 400);

			}
		},

		// Clears input, emits clear
		clearInput: function(){
			this.inputValue = "";
		}

	}	
};	

</script>

<style lang="scss">


.selections-lightbox{
	z-index: 5;
	background-color: var(--backdrop);
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.selections-wrapper{
	position: relative;
	width: fit-conent;
	max-height: 100%;
	font-family: var(--primaryFont);

	&.wide{
		.selections-button{
			width: 100%;
		}
	}
	
	// On mobile, it's fixed on bottom when editing
	&.editing-selections{
		transition: 0.15s ease;

		@media (max-width: $screenSM) {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 5;
		}
	}

	.selections-button{
		width: fit-content;
		font-size: 14px;
		line-height: 16px;
		font-weight: 500;
		border-radius: var(--borderRadius);
		padding: 0 42px 0 16px;
		background-color: var(--background);
		border: 2px solid var(--border);
		display: flex;
		max-width: 500px;
		position: relative;
		transition: 0s;
		min-width: 160px;
		text-transform: capitalize;
		height: var(--inputHeight);
		min-height: var(--inputHeight);
		
		@media (max-width: $screenSM) {
			width:  100%;
			max-width:  unset;
		}

		// If multi, grow to fit content
		&.multi{
			height: auto;
		}

		// Actual selection (or placeholder) element
		.sb_selection{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-grow: 3;
			text-align: right;
			height: 100%;
			color: var(--text);
			font-family: var(--primaryFont);

			b{
				font-weight: 600;
				display: inline-block;
				padding: 2px 5px 3px 8px;
				position: relative;
				margin: 0 5px;
				font-size: 15px;
				@media (max-width: $screenSM) {
					font-size: 17px;
				}
			}

			// If multiple
			&.sb_multi{
				flex-direction: row;
				max-width: 60vw;
				flex-wrap: wrap;
				padding: 4px 0;
				box-sizing: border-box;
				min-height: var(--inputHeight);

				b{
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 1px 5px 1px 8px;
				}
			}

			// Lighten if placeholder
			&.placeholder{
				b{
					color:  var(--textFade);
				}
			}

			// Add x icon before (delete), and comma after for multi values
			b.multi{	
				&:before{
					content: '\f00d';
					font-family: var(--fontAwesome);
					position: absolute;
					font-weight: 900;
					left: -6px;
					font-size: 12px;
					color: var(--red);
					padding: 0 5px;
				}
				&:after{
					content: ',';
					position: absolute;
					right: 0;
				}
				&:first-child{padding-left: 10px;}
				&:last-child{padding-right: 10px;}
				&:last-child:after{content: '';}

				&:hover{
					color: var(--red);
					text-decoration: line-through;
				}
			}


		}

		// Two labels needed - one with invisible text for spacing, the other to float so it can be vertically centered
		label{
			box-sizing: border-box;
			padding: 0 0 1px 15px;
			color: transparent;
			transform-origin: center center;

			@media (max-width: $screenSM) {
				padding: 0 0 0px 10px;
				font-size: 16px;
			}

			&.floater{
				color: var(--text);
				height: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				position: absolute;
				left: 0;
			}
		}

		// Dropdown icon
		.sb_button-icon{
			padding: 2px 16px 0 0;
			position: absolute;
			right: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 95%;
		}

		// Actively editing selection
		&.active{

			// Mobile only,
			// Change button to full width dorpdown
			@media (max-width: $screenSM) {
				background-color: var(--background);
				max-width: 800px;
				width: 100%;
				font-size: 16px;
				line-height: 18px;
				min-height: var(--inputHeight);
				border-radius: 0;
				border: none;
				border-top-left-radius: 25px;
				border-top-right-radius: 25px;
				padding: 0 55px 0 15px;
				height: fit-content;
				box-shadow: none !important;

				.sb_button-icon{
					padding: 0px 30px 0 0;
				}

				label{
					height: fit-content;
					width: 100%;
					position: absolute;
					left: 0;
					font-size: 18px;
					bottom: 100%;
					padding: 10px 0;
					color: var(--text);
				}

				.sb_selection{
					padding: 0;
					margin: 0 0 0 0;
					text-align: left;

					b{
						font-weight: 600;
						display: inline-block;
						padding: 20px 5px 20px 8px;
						position: relative;
						margin: 0 5px;
						text-align: left;
						font-size: 16px;
					}

					&:not(.placeholder b){
						color: var(--text);
					}

					&.sb_multi{
						position: unset;
						height: 100%;
						min-height: unset;
						vertical-align: middle;
						max-width: unset;
						margin: 24px 0 24px 0;

						b{
							font-weight: 600;
							display: inline-block;
							padding: 3px 5px 3px 8px;
							position: relative;
							margin: 0 5px;
							text-align: left;
						}

						&:not(.placeholder b){
							color: var(--text);
						}

					}
				}
			}
		}

		// Hover button
		&:hover{
			border-color: var(--blue);
		}

	}

	// Popover to make selection
	.selections-popover{
		position: absolute;
		top: 100%;
		top: calc(100% + 6px);
		left: 0;
		background-color: var(--background);
		border-radius: var(--borderRadius);
		// border-radius: calc(var(--borderRadius) * 2);
		border: 2px solid var(--border);
		width: 400px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 0 15px 0;
		z-index: 15;

		@media (max-width: $screenSM) {
			position: relative;
			width: 100%;
			max-width: unset;
			top: unset;
			left: unset;
			max-height: 60vh;
			border-radius: 0;
			bottom: 0;
			z-index: 1000;
			border: none;
			padding: 0 0 10px 0;
		}
		
		&.top{
			// Only applies to above sm
			@media (min-width: $screenSM) {
				top: unset;
				padding: 10px 0 0 0;
				bottom: 100%;
				bottom: calc(100% + 6px);
				flex-direction: column-reverse;
			}
		}
	}

	.selections-input{
		display: block;
		width: 100%;
		box-sizing: border-box;
		padding: 0 0 0 0;
		position: relative;

		&:before{
			content: "\f002";
			font-family: var(--fontAwesome);
			font-size: 16px;
			height: 100%;
			display: flex;
			font-weight: 900;
			flex-direction: column;
			color: var(--primary);
			justify-content: center;
			position: absolute;
			left: 0;
			width: 45px;
			text-align: center;
		}

		input{
			font-size: 15px;
			font-weight: 400;
			border: none;
			padding-left: 45px;
			padding-bottom: 2px;
			background-color: transparent;
			box-sizing: border-box;
			background-color: var(--background);
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			
			&:hover,&:focus{
				background-color: var(--background);
				border-radius: 0 !important;
			}

			@media (max-width: $screenSM) {
				border-radius: 0;
			}
		}

		// Clear/reset
		#clearTextSuggestion{
			position: absolute;
			font-family: var(--fontAwesome);
			right: 15px;
			font-size: 18px;
			height: var(--inputHeight);
			font-weight: 900;
			color: var(--text);
			width: 20px;
			text-align: center;

			&:hover{
				color: var(--red);
			}
		}
	}
	@media (min-width: $screenSM) {
		.selections-popover.top .selections-input{
			input{
				border-top: 2px solid var(--border);
			}
		}
	}


	
	// Results
	.selections-list{
		display: flex;
		flex-direction: column;
		// position: absolute;
		width: 100%;
		padding: 0;
		max-height: 200px;
		overflow: auto;

		@media (max-width: $screenSM) {
			max-height: unset;
			// max-height: 200px;
		}

		.selections-list-end{
			margin: 6px 0 10px 20px;
			width: 40px;
			min-height: 5px;
			border-radius: var(--borderRadius);
			background-color: var(--red);
			
		}

		button,
		.suggestion{
			display: block;
			box-sizing: border-box;
			padding: 11px 18px 11px 32px;
			font-size: 15px;
			color: var(--text);
			font-weight: 500;
			transition: var(--transition);
			text-align: left;
			text-transform: capitalize;
			border-radius: var(--borderRadius);
			position: relative;

			&:first-child{
				margin-top: 0px;
			}
			&:last-child{
				margin-bottom: 15px;
			}

			i{
				margin: 0 10px;
			}
			b{
				font-weight: 700;
			}

			@media (max-width: $screenSM) {
				padding: 12px 30px;
			}

			// Selection dot
			&:after{
				content: '\f111';
				font-weight: 900;
				font-family: var(--fontAwesome);
				color: var(--primary);
				font-size: 8px;
				vertical-align: middle;
				margin-left: 10px;
				opacity: 0;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -4px;
			}


			&:hover{
				cursor: pointer;
				background-color: var(--greyFade);
				transition: var(--transition);

				&:after{
					opacity: 1;
				}
			}
			&:focus{
				background-color: var(--grey);
				color: var(--blueText);
				text-decoration: underline;
				&:after{
					opacity: 1;
					color: var(--textFade);
					text-decoration: none;
				}
			}

			&.hidden{
				display: none;
			}

			// No results button
			&.selections-empty{
				color: var(--red);
				text-align: center;

				i{
					margin: 0 10px 0 0;
					font-size: 22px;
					vertical-align: middle;
				}
				&:hover,
				&:focus{
					text-decoration: none;
					background-color: var(--background);
				}
			}
		}

		// Disabled
		&.disabled{
			button,
			.suggestion{
				color: var(--textFade);
				&:hover,
				&:focus{
					text-decoration: none;
					background-color: var(--background);
				}
			}
		}


	}


	// End of selections
	.end-of-selections{
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		font-weight: 500;
		box-sizing: border-box;
		padding: 13px 22px 0 22px;
		color: var(--textFade);
		border-top: 1px solid var(--textLight);

		@media (max-width: $screenSM) {
			font-size: 14px;
			padding: 10px 22px 0px 22px;
		}

		a{
			font-weight: 400;
			color: var(--red);
		}
	}
	// Only applies to above sm
	@media (min-width: $screenSM) {
		.selections-popover.top .end-of-selections{
			border-top: none;
			border-bottom: 1px solid var(--greyLight);
			padding: 0 22px 13px 22px;
		}
	}


}


</style>