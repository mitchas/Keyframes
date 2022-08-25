<!--
Changelog
-->

<template>
	<div class="page narrow-page">

		<h2 class="mtop-md mbottom-md">Changelog</h2>

		<div v-for="(change, key) in changes" :key="key" class="changelog-block">
			<div class="changelog-date">
				{{change.date}}
			</div>
			<div class="changelog-body">

				<h4>
					{{change.title}}&nbsp;
					<i v-if="change.icon" :class="'text-' + change.color + ' ' + change.icon"></i>
				</h4>

				<p>{{change.description}}</p>
				<p>
					<ul v-if="change.items[0]" class="changelog-ul">
						<li v-for="(item, itemkey) in change.items" :key="itemkey">
							{{item}}
						</li>
					</ul>
				</p>


			</div>
		</div>
		


		<!-- Spacer -->
		<div class="ptop-xl pbottom-md"></div>

	</div>
</template>

<script>
const changelog = require("@/definitions/changelog.js");

export default {
  	name: "Changelog",
  	components: {

	},
	mixins: [
	],
	created: function () {
	},
	mounted(){
	},
	data() {
		return {
			changes: changelog.changes,
			company: process.env.VUE_APP_COMPANY_NAME,
			url: process.env.VUE_APP_FULL_URL,
		};
	},
	mounted(){
	},
	methods: {
		
	}
};
</script>

<style lang="scss">

// Changelog/Feature block
.changelog-block{
	display: flex;
	flex-wrap: wrap;
	padding: 45px 0 0 0;

	.changelog-date{
		width: 30%;
		min-width: 200px;
		font-size: 16px;
		font-weight: 600;
		padding: 5px 0 15px 0;
		box-sizing: border-box;
		color: var(--primary);

		@media (max-width: $screenSM) {
			width: 100%;
		}
	}

	.changelog-body{
		flex-grow: 3;

		h4{
			margin: 0;
			padding: 0;
		}

		.changelog-ul{
			font-size: 18px;
			li{
				margin: 4px 0;
			}
		}
	}
}
</style>