<!--
Terms of Service
 Terms of Service document
-->
<template>
	<div class="page narrow-page">

		<!-- Page Header -->
		<h1 class="mtop-md">Terms of Service</h1>
		<p>
			{{company}}'s Terms of Service was last updated and went into effect <b>July 11, 2022</b>.
		</p>

		<!-- Start of terms -->
		<h1 class="mtop-md">
			tl;dr:
		</h1>
		<p>
			<ul>
				<li>Don't use this site if you don't agree to the rules and terms.</li>
				<li>Don't steal or attempt to modify the website or source</li>
				<li>Sometimes the site may be down for maintenance, or we may change or remove features. We aren't responsible for damages due to loss of data/profit/business interruptions. 
				<li>We can revise these terms (or anything else on the site) at any time without notice.</li>
			</ul>
		</p>

		<!-- Start of terms -->
		<h3 class="mtop-md">
			1. Terms
		</h3>
		<p>
			By accessing the website at https://{{url}} and all subdomains, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
		</p>
		<h3 class="mtop-md">
			2. Use License
		</h3>
		<p>
		<p>
			Permission is granted to temporarily use {{company}}'s website for personal and commercial use. This is the grant of a license, not a transfer of title, and under this license you may not: 
			<ul>
				<li>Modify or copy the source materials;</li>
				<li>Attempt to decompile or reverse engineer any software contained on {{company}}'s website; or</li>
				<li>Remove any copyright or other proprietary notations from the materials;</li>
			</ul>
			This license shall automatically terminate if you violate any of these restrictions and may be terminated by {{company}} at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
		</p>
		<h3 class="mtop-md">
			3. Disclaimer
		</h3>
		<p>
			The materials on {{company}}'s website are provided on an 'as is' basis. {{company}} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
		</p>
		<h3 class="mtop-md">
			4. Limitations
		</h3>
		<p>
			In no event shall {{company}} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {{company}}'s website, even if {{company}} or a {{company}} authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
		</p>
		<h3 class="mtop-md">
			5. Accuracy of materials
		</h3>
		<p>
			The materials appearing on {{company}} website could include technical, typographical, or photographic errors. {{company}} does not warrant that any of the materials on its website are accurate, complete or current. {{company}} may make changes to the materials contained on its website at any time without notice. However {{company}} does not make any commitment to update the materials.
		</p>
		<h3 class="mtop-md">
			6. Links
		</h3>
		<p>
			{{company}} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {{company}} of the site. Use of any such linked website is at the user's own risk.	
		</p>
		<h3 class="mtop-md">
			7. Modifications
		</h3>
		<p>
			{{company}} may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
		</p>
		<h3 class="mtop-md">
			8. Governing Law
		</h3>
		<p>
			These terms and conditions are governed by and construed in accordance with the laws of Minnesota and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
		</p>
		
		<!-- Spacer -->
		<div class="ptop-xl pbottom-md"></div>

	</div>
</template>

<script>

export default {
  	name: "TermsOfService",
  	components: {

	},
	mixins: [
	],
	data() {
		return {
			company: process.env.VUE_APP_COMPANY_NAME,
			url: process.env.VUE_APP_FULL_URL,
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