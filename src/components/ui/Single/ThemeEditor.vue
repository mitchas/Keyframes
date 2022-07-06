<!-- 
Theme Editor
-->
<template>
	<Modal size=""
		:overflow="true"
		:show="showModal"
		title="Theme"
		icon="fas fa-palette"
		confirmText="Done"
		color="invert"
		confirmIcon="fas fa-check"
		@confirmed="closeModal()"
		@dismissed="closeModal()">


		<!-- Theme Preview -->
		<div class="selected-theme">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div id="themeInput">
			<Selections 
				:textSearch="true"
				:suggestions="themes"
				:limit="1" 
				direction="bottom"
				selectLabel="Select Theme"
				noSelectionText="Choose a Theme"
				icon="far fa-palette"
				:activeSelection="selectedTheme"
				@changed="selectTheme">
			</Selections>
		</div>

		<!-- Toggles -->
		<div class="flex wrap">
			<div class="flex mright-sm mbottom-sm">
				<input id="darkCheck" type="checkbox" class="toggle on-off" :checked="userPreferences.dark_mode" @change="$store.dispatch('User/TOGGLE_PREFERENCE', 'dark_mode')"/>
				<label class="vertical mleft-xs" for="darkCheck">Dark Mode</label>
			</div>

			<div class="flex mbottom-sm">
				<input id="roundCheck" type="checkbox" class="toggle yes-no" :checked="userPreferences.round_borders" @change="$store.dispatch('User/TOGGLE_PREFERENCE', 'round_borders')"/>
				<label class="vertical mleft-xs" for="roundCheck">Rounded</label>
			</div>
		</div>

		<!-- Fonts -->
		<div class="flex wrap">
			<div class="flex mright-sm mbottom-sm">
				<input id="sansRadio" type="radio" class="radio" :checked="userPreferences.font == 'sans'" @click="changeFont('sans')"/>
				<label class="vertical mleft-xs sans" for="sansRadio">Sans Font</label>
			</div>
			<div class="flex mright-sm mbottom-sm">
				<input id="monoRadio" type="radio" class="radio" :checked="userPreferences.font == 'mono'" @click="changeFont('mono')"/>
				<label class="vertical mleft-xs mono" for="monoRadio">Mono Font</label>
			</div>
			<div class="flex mbottom-sm">
				<input id="serifRadio" type="radio" class="radio" :checked="userPreferences.font == 'serif'" @click="changeFont('serif')"/>
				<label class="vertical mleft-xs serif" for="serifRadio">Serif Font</label>
			</div>
		</div>

		

	</Modal>
</template>

<script>
import Modal from "@/components/ui/Modals/Modal";
import Selections from "@/components/ui/Forms/Selections";

export default {
	name: "ThemeEditor",
	mixins: [
	],
	components: {
		Modal,
		Selections,
	},
	props: [
	],
	data() {
		return {
			showModal: false,

			selectedTheme: "",

			themes: [
				"Default Theme",
				"Muted Colors",
				"Primary Colors",
				"Greys",
			]
		};
	},
	created() {

	},
	mounted(){
		this.showModal = true;
		
		var themeKeys = {
			"default": {name: "Default Theme"},
			"muted": {name: "Muted Colors"},
			"primary": {name: "Primary Colors"},
			"greys": {name: "Greys"},
		}
		this.selectedTheme = themeKeys[this.userPreferences.theme].name;
	},
	computed: {
		userPreferences: {
			get() {
				return this.$store.getters["User/preferences"]
			},
		},
  	},
	methods: {

		selectTheme: function(theme){

			// Set selected theme
			this.selectedTheme = theme;

			var themeNames = {
				"Default Theme": {name: "default"},
				"Muted Colors": {name: "muted"},
				"Primary Colors": {name: "primary"},
				"Greys": {name: "greys"},
			}

			// Change theme
			var name = themeNames[theme].name;
			this.$store.dispatch('User/CHANGE_THEME', name);
		},

		changeFont: function(font){
			var data = {key: "font", value: font};
			this.$store.dispatch("User/UPDATE_PREFERENCE", data)
		},
		

		closeModal: function(){
			let _this = this;

			this.showModal = false;

			setTimeout(function(){
				_this.$emit("closeEditor");
			}, 500);
		}

	}	
};	

</script>

<style lang="scss">


	#themeInput{
		display: block;
		width: 100%;
		margin-bottom: 25px;
	}
	.selected-theme{
		display: flex;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		flex-wrap: wrap;
		position: relative;
		top: -10px;

		div{
			flex-grow: 3;
			display: flex;
			height: 100%;
			box-sizing: border-box;
			min-width: 28px;
			flex-basis: 28px;
			max-width: 28px;
			height: 28px;
			border: 1px solid var(--border);
			border-right: 0;
			// border-radius: calc(var(--borderRadius));
			// border: 1px solid var(--border);
			font-size: 14px;
			font-weight: 800;
			flex-direction: column;
			justify-content: center;
			text-align: center;

			&:nth-child(1){
				background-color:var(--red);
				color: var(--redText);
			}
			&:nth-child(2){
				background-color:var(--orange);
				color:var(--orangeText);
			}
			&:nth-child(3){
				background-color:var(--yellow);
				color:var(--yellowText);
			}
			&:nth-child(4){
				background-color:var(--green);
				color:var(--greenText);
			}
			&:nth-child(5){
				background-color:var(--blue);
				color:var(--blueText);
			}
			&:nth-child(6){
				background-color:var(--sky);
				color:var(--skyText);
			}
			&:nth-child(7){
				background-color:var(--purple);
				color:var(--purpleText);
			}
			&:nth-child(8){
				background-color:var(--pink);
				color:var(--pinkText);
			}
			&:nth-child(9){
				background-color:var(--background);
				color:var(--backgroundText);
			}
			&:nth-child(10){
				background-color:var(--text);
				color:var(--background);
				border-right: 1px solid var(--border);
			}
		}

	}



</style>