<!--
UI Elements
-->

<template>
	<div>


		<h2 class="mbottom-md">
			Toast & Alerts
		</h2>

		<!-- Toast -->
		<div class="mbottom-md">
			<div class="input-group mright-sm mbottom-xs max-width-small">
				<label class="input-group-label" for="toastTitle">Toast Title</label>
				<input type="text" class="small" id="toastTitle" maxlength="15" v-model="testToast.title"/>
			</div>
			<div class="input-group mright-sm mbottom-xs max-width-small">
				<label class="input-group-label" for="toastBody">Toast Body</label>
				<input type="text" class="small" id="toastBody" maxlength="155" v-model="testToast.body"/>
			</div>
			<div class="input-group mright-sm mbottom-xs max-width-small">
				<label class="input-group-label" for="toastIcon">Toast Icon</label>
				<input type="text" class="small" id="toastIcon" maxlength="100" v-model="testToast.icon"/>
			</div>
			<div class="input-group max-width-small">
				<label class="input-group-label" for="toastColor">Color</label>
				<div class="aselect">
					<select v-model="testToast.color" class="small" id="toastColor">
						<option value="">Default (Blue)</option>
						<option value="red">Red</option>
						<option value="orange">Orange</option>
						<option value="yellow">Yellow</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
						<option value="sky">Sky</option>
						<option value="purple">Purple</option>
						<option value="pink">Pink</option>
						<option value="grey">Grey</option>
					</select>
				</div>
			</div>
			<!-- Show toast -->
			<button class="button green mtop-sm" @click="toast(testToast.title, testToast.body, testToast.color, testToast.icon);">
				<i class="far fa-bread-slice"></i>
				<span>Show Toast!</span>
			</button>
			<code class="block mtop-xs mbottom-sm">
				<b>Call:</b> toast('Title', 'Toast Body.', 'color', 'icon-string');
			</code>
		</div>


	
		<!-- Hello Alert -->
		<div class="mtop-xl">
			<div class="input-group mright-sm mbottom-xs max-width-small">
				<label class="input-group-label" for="alertMessage">Alert Message</label>
				<input type="text" class="small" id="alertMessage" maxlength="15" v-model="testHello.message"/>
			</div>
			<div class="input-group mright-sm mbottom-xs max-width-small">
				<label class="input-group-label" for="alertIcon">Alert Icon</label>
				<input type="text" class="small" id="alertIcon" maxlength="100" v-model="testHello.icon"/>
			</div>
			<div class="input-group max-width-small">
				<label class="input-group-label" for="toastColor">Color</label>
				<!-- <input type="text" class="small" id="toastIcon" maxlength="100" v-model="testToast.icon"/> -->
				<div class="aselect">
					<select v-model="testHello.color" class="small" id="toastColor">
						<option value="">Default (Yellow)</option>
						<option value="red">Red</option>
						<option value="orange">Orange</option>
						<option value="yellow">Yellow</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
						<option value="sky">Sky</option>
						<option value="purple">Purple</option>
						<option value="pink">Pink</option>
						<option value="grey">Grey</option>
					</select>
				</div>
			</div>
			<!-- Show Alert -->
			<button class="button yellow mtop-sm" @click="hello(testHello.message, testHello.icon, testHello.color);">
				<i class="far fa-comment-exclamation"></i>
				<span>Show Alert!</span>
			</button>

			<code class="mtop-xs mbottom-sm block">
				<b>call:</b> hello('Message', 'icon-string', 'color');
			</code>
		</div>


		<!-- Tags -->
		<h2 class="mtop-xl mbottom-md">
			Tags
		</h2>

		<div class="flex gap flex-wrap">
			<div class="tag inline-block">
				Cow
			</div>
			<div class="tag red inline-block">
				Beavers
			</div>
			<div class="tag orange inline-block">
				<i class="far fa-cat"></i> Cat
			</div>
			<div class="tag yellow inline-block">
				Bee
			</div>
			<div class="tag green inline-block">
				<i class="far fa-bird"></i> Eagle
			</div>
			<div class="tag blue inline-block">
				Bear
			</div>
			<div class="tag sky inline-block">
				Gorilla
			</div>
			<div class="tag pink inline-block">
				Flamingo
			</div>
			<div class="tag purple inline-block">
				Bear
			</div>
			<div class="tag grey inline-block">
				Coyote
			</div>
		</div>

		
		
		<!-- Callouts -->
		<div>

			<h2 class="mbottom-md mtop-xl">
				Callout
			</h2>

			<!-- Small Callout -->
			<Callout
				icon="far fa-money-bill-alt"
				class="mbottom-sm max-width-small"
				color="grey"
				size="small">
				<span>Small Callout.</span>
			</Callout>
			<!-- Regular Callout -->
			<Callout
				icon="far fa-hat-wizard"
				class="mbottom-sm max-width-small"
				color="green">
				<span>Regular Callout.</span>
			</Callout>
			<!-- Big Callout -->
			<Callout
				icon="far fa-shield-cross"
				class="mbottom-sm max-width-small"
				size="big"
				color="blue">
				<span>Big Callout.</span>
			</Callout>
		</div>



		<h2 class="mtop-xl mbottom-sm">
			Other Stuff
		</h2>


		<h4 class="mbottom-sm mtop-lg">Loaders</h4>

		<p>Toggle the loader to indicate something is happening.</p>
		<!-- Left button -->
		<button class="button small" @click="showDataLoader()">
			<i class="far fa-undo"></i>
			<span>Show Data Loader</span>
		</button>

		<h4 class="mbottom-sm mtop-lg">BreadCrumbs</h4>
		<!-- Breadcrumbs -->
		<div class="breadcrumbs">
			<div class="crumb">
				<span>Breadcrumb</span>
			</div>
			<div class="crumb">
				<span>another</span>
			</div>
			<div class="crumb">
				<span>wow</span>
			</div>
		</div>


		


		<!-- Spacer -->
		<div class="mbottom-xl"></div>


	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Common/Callout";

export default {
  	name: "DesignUI",
  	components: {
		  Callout,
	},
	mixins: [
	],
	data() {
		return{
			// Definitions
			// Hold/Toggle
			hold: {
				selectedColor: "red",
			},

			testToast:{
				title: "Toast!",
				body: "Click the button to show a toast message",
				color: "",
				icon: "far fa-bread-slice",
			},
			testHello:{
				message: "Little Message",
				color: "",
				icon: "far fa-smile",
			},
		};
	},
	created: function () {
	},
	mounted(){

	},
	methods: {
		// Show then hide data loader
		showDataLoader: function(){
			let _this = this;
			_this.$store.dispatch("Hold/LOADING", "data");
			setTimeout(function(){
				_this.$store.dispatch("Hold/STOP_LOAD");
			}, 4000);
		},
		// Show then hide page loader
		showPageLoader: function(){
			let _this = this;
			_this.$store.dispatch("Hold/LOADING", "page");
			setTimeout(function(){
				_this.$store.dispatch("Hold/STOP_LOAD");
			}, 4000);
		},
	}
};
</script>

<style lang="scss">
	// 
</style>