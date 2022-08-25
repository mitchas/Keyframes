<!--
	Shadows App
-->

<template>
	<div class="fixed-page" id="shadowsApp">

		<!-- Secondary nav / Toolbar -->
		<nav class="secondary-nav">

			<label>Shadows</label>
			<!-- Add color -->
			<button @click="null;">
				<i class="fas fa-plus-circle"></i><span class="hint">Add Color</span>
			</button>

			<!-- Gap -->
			<div class="spacer"></div>

			<!-- Loop for other secondary buttons -->
			<button v-for="(button, key) in secondary_nav" :key="key" @click="toggleSidebar(button.id)" 
				:class="{'notification-dot': false}">
				<i :class="view_sidebar == button.id ? 'fas fa-times' : button.icon"></i>
				<span class="hint left">{{button.title}}</span>
			</button>
		</nav>



		<div class="app-layout">

			<div class="app-stage">
				{{view_sidebar}}
			</div>


			<!-- Sidebar -->
			<div class="app-sidebar" :class="{'expanded': view_sidebar != null}">

				<transition-group name="basic">
					<!-- Export -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'export'" :key="0">
						<h3>Export</h3>
					</div>
					
					<!-- Save -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'save'" :key="1">
						<h3>Save</h3>
					</div>

					<!-- More -->
					<div class="app-sidebar-content" v-if="view_sidebar == 'settings'" :key="2">
						<h3>More</h3>

						<!-- Gap -->
						<div class="mtop-md"></div>

						<h4>Danger</h4>
						<!-- Reset Shadow -->
						<button class="button mtop-sm mbottom-lg margin-auto block" @click="resetDefault()" :class="{'red' : resetting_default, 'grey': !resetting_default}">
							<i :class="{'far fa-exclamation-circle' : resetting_default, 'far fa-eraser' : !resetting_default}"></i>
							<span>{{resetting_default ? "Again to Confirm" : "Reset Shadow"}}</span>
						</button>
					</div>
				</transition-group>


			</div>

		</div>

	</div>
</template>

<script>
// Components


export default {
	name: "Template",

	components: {
	},

	mixins: [
	],

	data() {
		return {
			view_sidebar: null,
			resetting_default: false,

			secondary_nav: [
				// {title: "Adjust / View", id: "adjust",  icon: "fas fa-dial"},
				{title: "Shadow Layers", id: "layers",  icon: "fas fa-layer-group"},
				{title: "Target Element", id: "target",  icon: "fas fa-bullseye"},
				{title: "Export", id: "export",  icon: "fas fa-share-nodes"},
				{title: "Save / Load", id: "save",  icon: "fas fa-floppy-disk"},
				{title: "Settings", id: "settings",  icon: "fas fa-bars"},
			],

		};
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

		// Toggles sidebar with button id
		toggleSidebar: function(name){
			if(this.view_sidebar == name){
				this.view_sidebar = null;
			}else{
				this.view_sidebar = name;
			}
		},


		// Resets to default
		resetDefault: function(){
			let _this = this;

			if(this.resetting_default){
				this.resetting_default = false;
				this.hello("Poof!", "fas fa-wand-magic-sparkles", "yellow");
			}else{
				this.resetting_default = true;
				setTimeout(function(){
					_this.resetting_default = false;
				}, 5000);
			}
		},	


	}
};

</script>


<style lang="scss">

#shadowsApp{
	display: flex;
	flex-direction: column;
}


</style>