<!--
Privacy Policy
Privacy Policy Document document
-->

<template>
	<div class="page narrow-page">

		<!-- Header -->
		<h1 class="mtop-md">Privacy Policy</h1>
		<p>
			{{company}}'s Privacy Policy was last updated and went into effect <b>July 11, 2022</b>.
		</p>

		<!-- Start of policy -->
		<h1 class="mtop-md">
			tl;dr:
			<small>We're not into collecting data.</small>
		</h1>
		<p>
			<ul>
				<li>Nothing you enter on {{company}} is ever stored on our servers.</li>
				<li>All of your data is stored locally on your computer - in your browser's "local storage".</li>
				<li>No third-party trackers or ad networks are used on this site.</li>
			</ul>
		</p>
		<h3 class="mtop-md">
			Who We Are and What This Policy Covers
		</h3>
		<p>
			Hi! We are the people running {{company}}. Our goal with {{company}} is to make useful tools without all the extra junk.
		</p>
		<p>
			This Privacy Policy applies to information that we collect about you when you use:
			<ul>
				<li>{{company}} and all subdomains and domain variants.</li>
			</ul>
			Throughout this Privacy Policy, we'll refer to our website and other products and services collectively as "Services."
			Below we explain how we collect, use, and share information about you, along with the choices that you have with respect to that information.
		</p>
		<h3 class="mtop-md">
			Collecting Information
		</h3>
		<p>
			The only information we collect is basic website traffic analytics.
			<ul>
				<li><b>Traffic information:</b> {{company}} collects basic information just to see usage. Pageviews, total number of visits, and general location (country, state) of visitor.</li>
				<li><b>Analytics information:</b> We do not use any 3rd party analytics services. We have our own server running an open-source analytics software.</li>
				<li><b>Privacy & Cookies:</b> We do not use any cookies, and all analytics data we collect is anonymous.</li>
			</ul>
		</p>

		<h3 class="mtop-md">
			How And Why We Use Information
		</h3>
		<h4 class="mtop-md">
			Purposes for Using Information
		</h4>
		<p>
			We use information as mentioned above and for the purposes listed below:
			<ul>
				<li>To see if and how many people are using this site.</li>
			</ul>
		</p>
		<h3 class="mtop-md">
			Privacy Policy Changes
		</h3>
		<p>
			Although most changes are likely to be minor, {{company}} may change its Privacy Policy from time to time. {{company}} encourages visitors to frequently check this page for any changes to its Privacy Policy. If we make changes, we will notify you by updating the version number and date at the top of the page, and, in some cases, we may provide additional notice (such as adding a statement to your dashboard account, or sending you a notification through email). Your further use of the Services after a change to our Privacy Policy will be subject to the updated policy.
		</p>


		<!-- Spacer -->
		<div class="ptop-xl pbottom-md"></div>

	</div>
</template>

<script>

export default {
  	name: "PrivacyPolicy",
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
	// 
</style>