<!--
Design Text
Text elements
-->

<template>
	<div>


		<!-- h1 -->
		<h1 class="mtop-md mbottom-sm">
			Heading one
			<small>Adding a &lt;small&gt; block within your header will give you a subheader at 55%</small>
		</h1>
		<!-- p big -->
		<p class="big">
			Lorem ipsum dolor sit amet, <b>large paragraph</b> consectetur <a href="#">adipiscing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h2 -->
		<h2 class="mtop-sm max-width">This is a longer heading 2 going to multiple lines hopefully this is enough.</h2>
		<!-- p regular -->
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<p class="small">
			Lorem ipsum dolor sit amet, <b>small paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h3 -->
		<h3 class="mtop-md">Heading three.</h3>
		<h4 class="mtop-sm max-width">
			Heading with a button
			<button class="button small mleft-md" @click="hello('Hi!', 'far fa-smile', 'pink')">
				<i class="far fa-mouse"></i>
				<span>Button</span>
			</button>
			<small>You can add a button to a header as well</small>
		</h4>
		<!-- p narrow -->
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h4 -->
		<h4 class="mtop-md">Heading four.</h4>
		<h4 class="mtop-sm max-width">This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h4>
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h5 -->
		<h5 class="mtop-md">Heading 5.</h5>
		<h5 class="mtop-sm max-width">This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h5>
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h6 -->
		<h6 class="mtop-md">Heading six.</h6>
		<h6 class="mtop-sm max-width">This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h6>
		<p class="mbottom-xl small">
			Lorem ipsum dolor sit amet, <b>.small paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>


		<!-- Spacer -->
		<div class="mbottom-xl"></div>


	</div>
</template>

<script>

export default {
  	name: "DesignText",
  	components: {
	},
	mixins: [
	],
	data() {
		return{
		};
	},
	created: function () {
	},
	mounted(){

	},
	methods: {
	}
};
</script>

<style lang="scss">
	// 
</style>