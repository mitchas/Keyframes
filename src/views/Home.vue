<template>
	<div class="page">

		<!-- If name has been saved in local storage, greet them by name -->
		<h1 v-if="nameInStorage">Welcome back, {{user_name}}</h1>
		<!-- Otherwise general hello  -->
		<h1 v-else>Hello</h1>

		<!-- Form to enter name -->
		<form @submit.prevent="saveName()" v-if="!nameSaved" class="mtop-md">

			<!-- Name field -->
			<div class="basic-field mbottom-sm">
				<label for="name" v-if="!nameInStorage">
					What's your name?
				</label>
				<label for="name" v-else>
					Change your name:
				</label>
				<div class="field-body">
					<input type="text" v-model="user_name" id="name" required>
				</div>
			</div>

			<!-- Save button -->
			<button type="submit" class="button" :disabled="!user_name">
				<span v-if="!nameInStorage">Save to Local Storage</span>
				<span v-else>Update in Local Storage</span>
				<i class="far fa-database"></i>
			</button>
		</form>

		<!-- Explanation for local storage -->
		<div v-if="nameSaved">
			<p>
				Your name has been saved into local storage to use next time you visit this site.
			</p>
			<p>
				Refresh this page to see that your name has been saved.
			</p>
		</div>

	</div>
</template>

<script>
// @ is an alias to /src
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "home",

	components: {
	},

	mixins: [
		toastMixin,
		metaMixin,
	],

	data() {
		return {
			user_name: "",
			nameSaved: false,
			nameInStorage: false
		};
	},

	mounted() {
		this.updateMeta("Home", "This is the home page description.")

		// Get saved name:
		this.getName();
	},

	computed: {
	},
	
	methods: {
		// Save name to local storage
		saveName: function(){
			// Save name under `name` field in localstorage
			localStorage.setItem("name", this.user_name);
			console.log("Name saved to local storage")
			// Save success
			this.nameSaved = true;
			// Toast
			this.toast("Success!", "Your name has been saved to local storage.", "green", "far fa-laugh-wink");
		},
		// Get name from local storage
		getName: function(){
			// Get username from localstorage that we set with saveName()
			this.user_name = localStorage.getItem("name");

			if(this.user_name == null){
				console.log("No user name in storage");
				this.nameInStorage = false;
			}else{
				this.nameInStorage = true;
				console.log(this.user_name + "'s name retrieved from storage");
			}
		}
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

</style>