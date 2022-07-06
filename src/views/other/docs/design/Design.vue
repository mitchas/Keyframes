<!--
Design
Internal Design page to show existing UI elements
-->

<template>
	<div>

		<!-- Section tabs -->
		<div class="tabs no-scrollbars mtop-md">

			<!-- Colors -->
			<button class="tab" v-bind:class="{'active': viewTab == 'colors'}" @click="viewTab = 'colors'">
				<i class="fas fa-palette"></i>
				<span>Colors & Logos</span>
			</button>

			<!-- UI -->
			<button class="tab" v-bind:class="{'active': viewTab == 'ui'}" @click="viewTab = 'ui'">
				<i class="fas fa-browser"></i>
				<span>Interface</span>
			</button>
			
			<!-- Forms -->
			<button class="tab" v-bind:class="{'active': viewTab == 'forms'}" @click="viewTab = 'forms'">
				<i class="fas fa-table-list"></i>
				<span>Forms</span>
			</button>
			
			<!-- Typography -->
			<button class="tab" v-bind:class="{'active': viewTab == 'text'}" @click="viewTab = 'text'">
				<i class="fas fa-typewriter"></i>
				<span>Typography</span>
			</button>

		</div>

		<div class="padded">

			<transition-group name="basic">
				<!-- Colors -->
				<DesignColors v-if="viewTab == 'colors'" key="1"></DesignColors>
				<!-- UI -->
				<DesignUI v-if="viewTab == 'ui'" key="3"></DesignUI>
				<!-- Forms -->
				<DesignForms v-if="viewTab == 'forms'" key="4"></DesignForms>
				<!-- Text -->
				<DesignText v-if="viewTab == 'text'" key="6"></DesignText>
			</transition-group>

		</div>
	</div>
</template>

<script>
// Components
import DesignColors from "@/views/other/docs/design/DesignColors.vue";
import DesignUI from "@/views/other/docs/design/DesignUI.vue";
import DesignForms from "@/views/other/docs/design/DesignForms.vue";
import DesignText from "@/views/other/docs/design/DesignText.vue";

export default {
  	name: "Design",
  	components: {
		  DesignColors,
		  DesignUI,
		  DesignForms,
		  DesignText,
	},
	mixins: [
	],
	mounted(){
	},
	data() {
		return{
			viewTab: "colors",
		};
	},
	created: function () {
	},
	methods: {
	}
};
</script>

<style lang="scss">
</style>