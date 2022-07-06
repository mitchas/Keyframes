<!--
	Colors App
-->

<template>
	<div class="fixed-page" id="colorApp">

		<nav class="secondary-nav">
			<button>
				<i class="fas fa-hashtag"></i>
				<span class="hint">Number of colors</span>
			</button>
			<div class="spacer"></div>
			<button>
				<i class="fas fa-sliders-simple"></i>
				<span class="hint left">Adjust</span>
			</button>
			<button>
				<i class="fas fa-glasses"></i>
				<span class="hint left">Color Blindness</span>
			</button>
			<button>
				<i class="fas fa-circle-half-stroke"></i>
				<span class="hint left">Contrast</span>
			</button>
			<hr/>
			<button @click="toggleSidebar('export')">
				<i :class="viewSidebar == 'export' ? 'fas fa-times' : 'fas fa-share-nodes'"></i>
				<span class="hint left">Export</span>
			</button>
			<button @click="toggleSidebar('save')">
				<i :class="viewSidebar == 'save' ? 'fas fa-times' : 'fas fa-floppy-disk'"></i>
				<span class="hint left">Save / Load</span>
			</button>
			<button @click="toggleSidebar('more')">
				<i :class="viewSidebar == 'more' ? 'fas fa-times' : 'fas fa-bars'"></i>
				<span class="hint left">More</span>
			</button>
		</nav>

		<div class="stage">

			<div id="colorGrid">
				<div v-for="(color, key) in currentPalette" :key="key" class="color_block">
					{{color.hex}}
				</div>
			</div>

			<!-- Sidebar -->
			<div class="stage-sidebar" :class="{'expanded': viewSidebar != null}">

				<transition-group name="basic">
					<!-- Export -->
					<div class="stage-sidebar-content" v-if="viewSidebar == 'export'" :key="0">
						<h3>Export</h3>
					</div>
					
					<!-- Save -->
					<div class="stage-sidebar-content" v-if="viewSidebar == 'save'" :key="1">
						<h3>Save</h3>
					</div>

					<!-- More -->
					<div class="stage-sidebar-content" v-if="viewSidebar == 'more'" :key="2">
						<h3>More</h3>
					</div>
				</transition-group>


			</div>

		</div>

	</div>
</template>

<script>
// Components


export default {
	name: "Colors",

	components: {
	},

	mixins: [
	],

	data() {
		return {
			viewSidebar: null,

			currentPalette: [
				{hex: "#FFFFFF"},
				{hex: "#FFFFFF"},
				{hex: "#FFFFFF"},
				{hex: "#FFFFFF"},
				{hex: "#FFFFFF"},
				{hex: "#FFFFFF"},
			]
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

		toggleSidebar: function(name){
			if(this.viewSidebar == name){
				this.viewSidebar = null;
			}else{
				this.viewSidebar = name;
			}
		}


	}
};

</script>


<style lang="scss">

#colorApp{
	display: flex;
	flex-direction: column;
}

.stage{
	display: flex;
	flex-grow: 3;

	#colorGrid{
		width: 100%;
		display: flex;
		flex-wrap: wrap;

		.color_block{
			flex-grow: 3;
			background-color: var(--red);
			flex-basis: 33%;

			&:nth-child(2){background-color: blue;}
			&:nth-child(3){background-color: green;}
			&:nth-child(4){background-color: yellow;}
			&:nth-child(5){background-color: orange;}
		}
	}

	.stage-sidebar{
		width: 0;
		height: 100%;
		transition: var(--transition);
		background-color: var(--layer);
		border-left: 1px solid var(--border);
		box-shadow: var(--shadow);

		&.expanded{
			transition: var(--transition);
			width: 33%;
			max-width: 400px;
		}


		// Content
		.stage-sidebar-content{
			display: block;
			box-sizing: border-box;

			h3{
				width: 100%;
				text-align: center;
				font-size: 1em;
				line-height: 1em;
				margin: 0;
				font-weight: 600;
				padding: 16px 0;
				border-bottom: 1px solid var(--borderFade);
			}
		}
	}

	
}


</style>