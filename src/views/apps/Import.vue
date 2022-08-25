<!--
// Import.vue
// Quick page to import data
// -->
<template>
	<div class="page">

		<h1>Import your old data</h1>
		<p>Paste the JSON you copied from the new version of Keyframes in the box below, then hit the button to import.</p>

		<textarea v-model="importString" id="importTextArea"></textarea>
		<button class="button invert mtop-sm" @click="importData()">
			<i class="far fa-database"></i>
			<span>Import Data</span>
		</button>


	</div>
</template>

<script>
export default {
	name: "ImportApp",

	components: {
	},

	mixins: [
	],

	data() {
		return {
			importString: "",
		};
	},

	mounted() {
	},

	computed: {
	},

	watch: {
		
	},
	
	methods: {
		importData: function(){

			let _this = this;
			var data = JSON.parse(this.importString);

			Object.keys(data).forEach(function (k) {
				localStorage.setItem(k, data[k]);
			});
			
			console.log("Import completed")
			this.hello("Import Successful!", "far fa-grimace");
			this.importString = "";

			setTimeout(function(){
				_this.navigate("/");
			}, 1000)

		},

	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	#importTextArea{
		max-width: 500px;
		display: block;
		height: 300px;
	}


</style>