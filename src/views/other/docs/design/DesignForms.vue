<!--
//!  Forms
	  Form elements
-->

<template>
	<div class="ptop-lg">

		<h2 class="mbottom-md">
			Buttons
		</h2>

		<!-- Buttons -->
		<button class="button mright-sm mbottom-sm">
			<i class="fas fa-hand-peace"></i>
			<span>Default</span>
		</button>
		<!-- Red Button -->
		<button class="button red mright-sm mbottom-sm">
			<i class="fas fa-syringe"></i>
			<span>Red</span>
		</button>
		<!-- Orange Button -->
		<button class="button orange mright-sm mbottom-sm">
			<i class="fas fa-cat"></i>
			<span>Orange</span>
		</button>
		<!-- Yellow Button -->
		<button class="button yellow mright-sm mbottom-sm">
			<i class="fas fa-sun"></i>
			<span>Yellow</span>
		</button>
		<!-- Green Button -->
		<button class="button green mright-sm mbottom-sm">
			<i class="fas fa-badge-dollar"></i>
			<span>Green</span>
		</button>
		<!-- Blue Button -->
		<button class="button blue mright-sm mbottom-sm">
			<i class="fas fa-shower"></i>
			<span>Blue</span>
		</button>
		<!-- Sky Button -->
		<button class="button sky mright-sm mbottom-sm">
			<i class="fas fa-cloud"></i>
			<span>Sky</span>
		</button>
		<!-- Purple Button -->
		<button class="button purple mright-sm mbottom-sm">
			<i class="fas fa-wine-glass"></i>
			<span>Purple</span>
		</button>
		<!-- Pink Button -->
		<button class="button pink mright-sm mbottom-sm">
			<i class="fas fa-pig"></i>
			<span>Pink</span>
		</button>
		<!-- Grey Button -->
		<button class="button grey mright-sm mbottom-sm">
			<i class="fas fa-headset"></i>
			<span>Grey</span>
		</button>
		<!-- Invert Button -->
		<button class="button invert mright-sm mbottom-sm">
			<i class="fas fa-adjust"></i>
			<span>Invert</span>
		</button>
		<!-- Background Button -->
		<button class="button background mright-sm mbottom-sm">
			<i class="fas fa-alien-monster"></i>
			<span>Background</span>
		</button>
		<!-- Transparent Button -->
		<button class="button transparent mright-sm mbottom-sm">
			<i class="fas fa-ghost"></i>
			<span>Transparent</span>
		</button>
		<!-- Disabled Button -->
		<button class="button transparent mright-sm mbottom-sm" disabled>
			<i class="fas fa-ban"></i>
			<span>Disabled</span>
		</button>
		<!-- Sizes -->
		<!-- Small Button -->
		<button class="button small mright-sm mbottom-sm">
			<i class="fas fa-badge-check"></i>
			<span>Small</span>
		</button>
		<!-- Big Button -->
		<button class="button big mright-sm mbottom-sm">
			<i class="fas fa-badge-check"></i>
			<span>Big Button</span>
		</button>




		<!-- Inputs -->
		<h2 class="mbottom-md mtop-xl">
			Inputs
		</h2>

		<!-- Tooltip -->
		<label class="flex">
			<span>Tooltip</span>
			<Tooltip :link="'https://hotdi.sh'" position="right" linkText="Links Too" color="blue" icon="fas fa-info-square">
				This is a tooltip. You can put whatever in here and change the icons and links.
			</Tooltip>
		</label>
		<small class="italic" v-if="!$store.getters['User/preferences'].tooltips">You have tooltips disabled in your settings, so this demo won't show :)</small>

		<!-- Basic Inputs -->
		<div class="flex wrap between max-width-small mtop-sm">
			<!-- Text Input -->
			<div class="max-width-small mright-sm mbottom-sm">
				<input type="text" placeholder="Text Input"/>
			</div>
			<!-- Disabled Input -->
			<div class="max-width-small">
				<input type="text" placeholder="Disabled Input" disabled/>
			</div>
		</div>

			
		<!-- Select -->
		<div class="aselect mtop-sm max-width-small">
			<select>
				<option selected>Select</option>
				<option>One</option>
				<option>Two</option>
				<option>Three</option>
			</select>
		</div>
	
		<!-- Textarea -->
		<textarea placeholder="Hey what's up hello textarea" class="mtop-md max-width-small"></textarea>


		<!-- Checkbox and Radio -->
		<div class="flex wrap mtop-md">
			<!-- Checkbox -->
			<div class="mright-md mbottom-sm">
				<input id="testCheck" type="checkbox" class="check"/>
			</div>
			<!-- Disabled Checkbox -->
			<div class="mright-md mbottom-sm">
				<input id="testCheck2" type="checkbox" class="check" disabled/>
			</div>
			<!-- Radio -->
			<div class="mright-md mbottom-sm">
				<input id="testCheck" type="radio" class="radio"/>
			</div>
			<!-- Disabled Radio -->
			<div class="mright-md mbottom-sm">
				<input id="testCheck2" type="radio" class="radio" disabled/>
			</div>

		</div>


		<!-- Toggles -->
		<div class="flex wrap mtop-sm">

			<!-- Toggles -->
			<div class="mright-md mbottom-sm">
				<input type="checkbox" class="toggle"/>
			</div>
			<!-- Yes-No -->
			<div class="mright-md mbottom-sm">
				<input type="checkbox" class="toggle yes-no"/>
			</div>
			<!-- On-Off -->
			<div class="mright-md mbottom-sm">
				<input type="checkbox" class="toggle on-off"/>
			</div>
			<!-- true-false -->
			<div class="mright-md mbottom-sm">
				<input type="checkbox" class="toggle true-false"/>
			</div>
			<!-- Disabled -->
			<div class="mright-md mbottom-sm">
				<input type="checkbox" class="toggle" disabled />
			</div>

		</div>
		

		<!-- Input group -->
		<div class="input-group max-width-small mtop-sm">
			<span class="input-group-label">Label:</span>
			<input type="text" placeholder="With input"/>
		</div>
		<!-- Icon Input -->
		<div class="input-group max-width-small mtop-sm">
			<span class="input-group-label"><i class="far fa-cat"></i></span>
			<input type="text" placeholder="With input"/>
		</div>

		<!-- Button Input -->
		<div class="button-input max-width-small mtop-md">
			<input type="text" placeholder="Input with"/>
			<button class="button">
				<i class="fas fa-check-circle"></i>
				<span>Button</span>
			</button>
		</div>


		<!-- Range -->
		<div class="mtop-lg max-width-small">
			<input type="range" max="50" min="1" step="0.2"/>
		</div>



		<!-- Custom Form Element -->
		<h2 class="mbottom-md mtop-xl">
			Custom Forms
		</h2>

		<h3 class="mtop-lg">
			Selections
		</h3>
		<p class="small mbottom-xs">Custom select picker with search, multi select</p>
		<Selections 
			:textSearch="true"
			:suggestions="['Dog', 'Cat', 'Cow', 'Monkey', 'Zebra', 'Giraffe']"
			:limit="2" 
			direction="top"
			selectLabel="Select"
			noSelectionText="Select an animal"
			icon="far fa-cow"
			@changed="null">
		</Selections>



		<!-- Spacer -->
		<div class="mbottom-xl"></div>


	</div>
</template>

<script>
// Components
import Tooltip from "@/components/ui/Common/Tooltip";
import Selections from "@/components/ui/Forms/Selections";

export default {
  	name: "DesignForms",
  	components: {
		  Tooltip,
		  Selections,
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