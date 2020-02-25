<template>
	<div class="page">

		<!-- Terms of service -->
		<!-- Terms of service -->
		<!-- Terms of service -->
		<h1>Terms of Service</h1>
		<span class="doc-v">v.1.0 - February 10, 2020</span>
		<p>
			ABCDEFG's Terms of Service was last updated and went into effect <b>February 10, 2020</b>.
		</p>

		<h2 class="mtop-md">
			1. Terms
		</h2>
		<p>
			By accessing the website at https://ABCEDFG.com and all subdomains, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
		</p>
		<h2 class="mtop-md">
			2. Use License
		</h2>
		<p>
			Permission is granted to temporarily use ABCDEFG's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: 
			<ul>
				<li>Modify or copy the source materials;</li>
				<li>Attempt to decompile or reverse engineer any software contained on ABCDEFG's website;</li>
				<li>Remove any copyright or other proprietary notations from the materials; or</li>
				<li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
			</ul>
			This license shall automatically terminate if you violate any of these restrictions and may be terminated by ABCDEFG at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
		</p>
		<h2 class="mtop-md">
			3. Disclaimer
		</h2>
		<p>
			The materials on ABCDEFG's website are provided on an 'as is' basis. ABCDEFG makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
		</p>
		<p>
			The materials on ABCDEFG's website are provided on an 'as is' basis. ABCDEFG makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
		</p>
		<h2 class="mtop-md">
			4. Limitations
		</h2>
		<p>
			In no event shall ABCDEFG or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ABCDEFG's website, even if ABCDEFG or a ABCDEFG authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
		</p>
		<h2 class="mtop-md">
			5. Accuracy of materials
		</h2>
		<p>
			The materials appearing on ABCDEFG website could include technical, typographical, or photographic errors. ABCDEFG does not warrant that any of the materials on its website are accurate, complete or current. ABCDEFG may make changes to the materials contained on its website at any time without notice. However ABCDEFG does not make any commitment to update the materials.
		</p>
		<h2 class="mtop-md">
			6. Links
		</h2>
		<p>
			ABCDEFG has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ABCDEFG of the site. Use of any such linked website is at the user's own risk.	
		</p>
		<h2 class="mtop-md">
			7. Modifications
		</h2>
		<p>
			ABCDEFG may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
		</p>
		<h2 class="mtop-md">
			8. Governing Law
		</h2>
		<p>
			These terms and conditions are governed by and construed in accordance with the laws of Minnesota and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
		</p>
	</div>
</template>

<script>
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
  	name: "TermsOfService",
  	components: {

	},
	mixins: [
		metaMixin
	],
	created: function () {
		this.updateMeta("Terms of Service", "Read our Terms of Service")
	},
	methods: {
	}
}
</script>

<style lang="less">
	@import '~@/styles/variables.less';

	.doc-v{
		background-color: var(--secondary);
		box-sizing: border-box;
		font-size: 12px;
		margin: 10px 0;
		display: inline-block;
		padding: 5px 6px 4px 6px;
		border-radius: var(--borderRadiusSmall);
		color: var(--background);
		font-family: var(--sans);
		font-weight: 600;
	}

</style>