<!-- 
Command Launcher
Not currently used
-->

<template>
	<div>

		<!-- Command Launcher Lightbox -->
		<transition name="lightbox">
			<div class="lightbox" v-if="show" @click="closeLauncher"></div>
		</transition>
		<transition name="modal">
			<!-- Command Launcher - expanded only -->
			<div id="commandCenter" v-if="show">
				<form @submit.prevent="null;">
					<input type="text" placeholder="Search apps or commands..."/>

					<ul>
						<!-- Apps -->
						<li v-for="(app, key) in appLinks" :key="key" :class="{'hidden': !appData[key].enabled}" @click="closeLauncher">
							<router-link :to="app.path">
								<i :class="app.icon"></i>Open {{app.title}}
							</router-link>
						</li>
					</ul>

				</form>
			</div>
		</transition>


		

	</div>
</template>

<script>

import shortcut from "@/components/mixins/keyboard.js";
import { apply } from "lodash/_baseEach";


// Components
export default {
	name: "Launcher",
	components: {
	},
	props: [
		"show",
	],
	mixins: [
		// Dismiss modals with escape
		shortcut("escape", function() {
			this.$emit("closed", this.selection);
		}),
	],
	data() {
		return {
			commands: [
				{type: "open", title: "Animation Creator", path: "/animations", icon: "far fa-"}
			]
		};
	},
	computed: {
		appLinks(){
			return this.$store.getters["Site/apps"];
		},
		appData(){
			return this.$store.getters["User/apps"];
		},
  	},
	watch:{
	},
	methods: {
		closeLauncher: function(){
			this.$emit("closed", this.selection);
		},

	}
};
</script>

<style lang="scss">

	#commandCenter{
		box-sizing: border-box;
		position: fixed;
		top: 0px;
		left: 50%;
		margin: 100px 0 0 -225px;
		z-index: 220;
		width: 450px;
		max-width: 100%;

		@media (max-width: $screenSM) {
		margin: 40px 0 0 0;
			left: 5%;
			width: 90%;
			max-width: 100%;
		}

		// background-color: rgba(0,0,40,0.25);
		// backdrop-filter: blur(8px);
		form{

			ul{
				list-style-type: none;
				background-color: var(--background);
				border-radius: var(--borderRadius);
				border: 1px solid var(--border);
				margin: 15px auto 0 auto;
				padding: 0;

				li{
					border-bottom: 1px solid var(--borderFade);
					box-sizing: border-box;
					padding: 0;

					a{
						box-sizing: border-box;
						padding: 14px 20px;
						display: block;
						font-size: 0.9em;
						color: var(--text);
						font-weight: 500;

						i{
							font-size: 1.5em;
							vertical-align: middle;
							margin-right: 15px;
						}

						&:hover{
							background-color: var(--greyFade);
							text-decoration: underline;
						}
					}

					&:first-child a{
						border-top-left-radius: var(--borderRadius);
						border-top-right-radius: var(--borderRadius);
					}
					&:last-child a{
						border-bottom-left-radius: var(--borderRadius);
						border-bottom-right-radius: var(--borderRadius);
					}
				}
			}
		}
	}


</style>