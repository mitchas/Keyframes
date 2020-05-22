<!--
// 
// Commands.vue
// _________________________
//
//	An unlisted page to test different commands and functions
//
// -->

<template>
	<div class="page no-scrollbars">
		<div class="text-page-content">

			<Callout
				icon="fal fa-cat"
				class="mbottom-sm mtop-sm"
				color="red">
				<h4>Command Center</h4>
				Hey, you found a secret page! This is just a page I use to test different things around the website.
			</Callout>


			<div id="commandControls">
				<!-- Command form -->
				<form @submit.prevent="runCommand()" id="commandInputForm">
					<input type="text" placeholder="command..." v-model="commandString"/>
					<button type="submit" hidden></button>
				</form>

				<!-- Command list -->
				<ul id="commandList">
					<li v-for="(command, index) in commands" :key="index">
						<b @click="commandString = command.example; runCommand();">{{index}}</b>
						<code>{{command.format}}</code>
					</li>
				</ul>
			</div>


			<!-- Modal -->
			<!-- Shown as example, or with content -->
			<Modal
				v-bind:show="modal.show"
				:title="modal.title"
				:color="modal.color"
				:size="modal.size"
				confirmText="Close"
				confirmIcon="far fa-times"
				@dismissed="resetModal();"
				@confirmed="resetModal();">



				<!-- Modal Heder -->
				<template v-slot:header>
					<span>{{modal.title}}</span>
					<i class="far fa-window"></i>
				</template>


				<!-- Body -->
				<template v-slot:body>

					<!-- Example modal content -->
					<div v-if="modal.example">
						<p class="padding-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					</div>


					<!-- Local Storage Content -->
					<div v-if="showLocalStorage">
						<code id="commandModalCode">{{localStorageData}}</code>
					</div>

				</template>
			</Modal>


			


		</div>
	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Callout";
import Modal from "@/components/ui/Modal.vue";

// Mixins
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "Commands",

	components: {
		Callout,
		Modal
	},

	mixins: [
		metaMixin,
	],

	data() {
		return {
			commandString: "",
			showLocalStorage: false,
			localStorageData: null,
			modal:{
				show: false,
				size: "",
				color: "red",
				example: false,
			},
			commands:{
				"Toast": {
					format: "toast,<title>,<body>,<color>,<icon string>",
					example: "toast,I'm a toast!,You clicked on the example toast command,blue,far fa-bread-slice"
				},
				"Alert": {
					format: "alert,<message>,<icon string>",
					example: "alert,You've been alerted!,far fa-bell-on,red"
				},
				"Show Modal": {
					format: "modal,<title>,<color>,<size>",
					example: "modal,Example Modal,blue,small"
				},
				"View Local Storage": {
					format: "ls:view",
					example: "ls:view"
				},
				"Clear Local Storage": {
					format: "ls:clear",
					example: "ls:clear"
				},
			}
		};
	},

	mounted() {
		this.updateMeta("Commnds", "Do cool stuff with CSS.")
	},

	computed: {
	},
	
	methods: {
		//////////////////
		// Run Command //
		////////////////
		// Takes string, parses, tries to run function
		runCommand: function(){

			var split = this.commandString.split(",");
			var type = split[0].toLowerCase();

			// Toast
			if(type == "toast"){
				this.toast(
					split[1] ? split[1] : "Toasty!", 
					split[2] ? split[2] : "This is the body of your toast message.", 
					split[3] ? split[3] : "green", 
					split[4] ? split[4] : "far fa-fire-alt"
				);
			}
			// Alert
			else if(type == "alert"){
				this.hello(
					split[1] ? split[1] : "This is an alert!", 
					split[2] ? split[2] : "far fa-siren-on",
					split[3] ? split[3] : ""
				);
			}
			// Modal
			else if(type == "modal"){
				this.modal = {
					show: true,
					title: split[1] ? split[1] : "Modal",
					color: split[2] ? split[2] : "",
					size: split[3] ? split[3] : "",
					example: true,
				};
			}
			// Local storage stuff
			else if(type == "ls:clear"){
				// Clear local storage
				localStorage.clear();
				this.hello("Local storage has been cleared", "far fa-database")
			}else if(type == "ls:view"){
				this.getLocalStorage();
			}
			// Else invalid command
			else{
				this.hello("That command isn't valid", "far fa-terminal")
			}

		},

		// Reset modal to default state after dismiss
		resetModal: function(){
			this.modal = {
				show: false,
				size: "",
				color: "red",
				example: false,
			};

			// Hide local storage
			this.showLocalStorage = false;
		},

		// Get all local storge
		getLocalStorage: function(){
			var values = [];
			var keys = Object.keys(localStorage);
			var i = keys.length;

			while( i-- ){
				var item = {}
				item[keys[i]] = localStorage.getItem(keys[i])

				values.push(item);
			}


			this.localStorageData = JSON.stringify(values, null, 4).split('\\').join('');

			// Show modal 
			this.showLocalStorage = true;
			this.modal = {
				show: true,
				title: "View Local Storage",
				color: "green"
			};

		}
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

	#commandControls{
		display: block;
		max-width: 600px;
		margin: 55px auto;

		// Input to run custom commands
		#commandInputForm{
			margin: 0 0 55px 0;

			input{
				height: 60px;
				font-size: 20px;
				font-family: var(--mono);
				font-weight: 600;
				padding-left: 20px;
				padding-right: 20px;
				text-align: center;
			}
		}

		// List of possible inputs
		#commandList{
			list-style-type: none;
			padding: 0; 
			margin: 0;

			li{
				text-align: center;
				padding: 0 0 15px 0;

				// Label - has hover state because it can be clicked to trigger
				b{
					font-size: 20px;
					font-weight: 600;
					padding-bottom: 5px;
					transition: var(--transition);

					&:hover{
						cursor: pointer;
						color: var(--links);
						text-decoration: underline;
						transition: var(--transition);
					}
				}
				
				code{
					font-style: italic;
					display: block;
					font-family: var(--mono);
				}
			}
		}
	}


	// Modal code - local storage, etc
	#commandModalCode{
		box-sizing: border-box;
		padding: 15px;
		white-space: pre;
	}


</style>