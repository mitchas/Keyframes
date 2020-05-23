// animate.js
// Broke off data definitions for animate page because they are long

export default {
	// Holds all css at each step
	// Backdoor to reference to update computed property - not really actually used
	backdoor: 0,
	// Which tab are they editing
	propertiesToggles: {
		transform: true,
		transform3d: false,
		colors: false,
		sizing: false,
		position: false,
		borders: false,
	},
	// Option Toggles
	options: {
	},
	// Help modal
	showHelp: false,
	newUserHelp: false,
	// Prop sidebar hides on mobile
	togglePropSidebar: false,
	// Perspective for 3d transformations
	perspective: '',
	// Enable hover timeline to add step
	addingStep: false,
	// When hovering an existing step
	hideAddStep: false,
	// Animation currently playing, and/or paused
	animationPlaying: false,
	animationPaused: false,
	// Custom CSS for target
	customTargetStyles: "#targetElement{\n    color:var(--text);\n    border-radius: 50%;\n    height: 100px;\n    width: 100px;\n    font-size: 65px;\n    transform-origin: center center;    \n}",
	customTargetCode: "<i class='far fa-ghost kft'></i>",
	// customTargetCode: "<i class='fal fa-alien-monster kft'></i>",
	// Animation name to save
	animationToSaveName: null,
	// Previously saved animations
	savedAnimations: null,
	// Selected step position
	currentStep: {
		left: "0.0%",
	},
	// Hover position on timeline
	timelinePosition: {
		left: "0.0%"
	},

	// Fields
	fields: {
		"Transform": {
			"icon": "far fa-expand-arrows",
			"toggle": "transform",
			"props": {
				"Transform Origin":{
					"placeholder": "bottom left",
					"model": "transformOrigin",
					"tooltipText": "Transform Origin",
					"tooltipCode": "<x-offset> <y-offset>",
					"tooltipExample": "50% 50%",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin",
				},
				"Rotate":{
					"placeholder": "45deg",
					"model": "rotate",
					"transform": true,
					"tooltipText": "Rotate",
					"tooltipCode": "<angle>",
					"tooltipExample": "180deg | 0.5turn | 3.14rad",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate",
				},
				"Scale":{
					"placeholder": "1.5",
					"model": "scale",
					"transform": true,
					"tooltipText": "Scale",
					"tooltipCode": "<number>",
					"tooltipExample": "1.25 | 125%",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale",
				},
				"Translate":{
					"placeholder": "50px, 100px",
					"model": "translate",
					"transform": true,
					"tooltipText": "Translate",
					"tooltipCode": "<x-axis>, <y-axis>",
					"tooltipExample": "100px, 200%",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate",
				},
				"Skew":{
					"placeholder": "22deg",
					"model": "skew",
					"transform": true,
					"tooltipText": "Skew",
					"tooltipCode": "<angle>",
					"tooltipExample": "180deg | 0.5turn | 3.14rad",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew",
				},
			},
		},
		"3d Transform": {
			"icon": "far fa-cube",
			"toggle": "transform3d",
			"props": {
				"Perspective":{
					"placeholder": "20px",
					"perspective": true,
					"tooltipText": "Perspective",
					"tooltipCode": "<length>",
					"tooltipExample": "20px",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/perspective",
				},
				"Translate3d":{
					"placeholder": "42px, -62px, -155px",
					"model": "translate3d",
					"transform": true,
					"tooltipText": "Translate3d",
					"tooltipCode": "<x-length>, <y-length>, <z-length>",
					"tooltipExample": "42px, -62px, -155px",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d",
				},
				"Scale3d":{
					"placeholder": "1, 2, 5",
					"model": "scale3d",
					"transform": true,
					"tooltipText": "Scale3d",
					"tooltipCode": "<x-number>, <y-number>, <z-number>",
					"tooltipExample": "1, 2, 5",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale3d",
				},
				"Rotate3d":{
					"placeholder": "0, 1, 1, 45deg",
					"model": "rotate3d",
					"transform": true,
					"tooltipText": "Rotate3d",
					"tooltipCode": "<x>, <y>, <z>, <angle>",
					"tooltipExample": "0, 1, 1, 45deg",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d",
				},
			},
		},
		"Colors & Text": {
			"icon": "far fa-tint",
			"toggle": "colors",
			"props": {
				"Background":{
					"placeholder": "red",
					"model": "background",
					"tooltipText": "Background",
					"tooltipCode": "<color-value> or url(\'\')",
					"tooltipExample": "red | #ff0000 | url(\'https...\')",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
				},
				"Opacity":{
					"placeholder": "0.5",
					"model": "opacity",
					"tooltipText": "Opacity",
					"tooltipCode": "<aplha-value>",
					"tooltipExample": "0.5 | 50%",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/opacity",
				},
				"Color (Text)":{
					"placeholder": "#0000FF",
					"model": "color",
				},
				"Font Size":{
					"placeholder": "14px",
					"model": "fontSize",
				},
			},
		},
		"Sizing & Spacing": {
			"icon": "far fa-sort-size-up",
			"toggle": "sizing",
			"props": {
				"Width":{
					"placeholder": "100px",
					"model": "width",
				},
				"Height":{
					"placeholder": "50%",
					"model": "height",
				},
				"Margin":{
					"placeholder": "15px 15px",
					"model": "margin",
					"tooltipText": "Margin Syntax",
					"tooltipCode": "<top> <right> <bottom> <left>",
					"tooltipExample": "10px auto 10px auto",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
				},
				"Padding":{
					"placeholder": "10px 0 0 0",
					"model": "padding",
					"tooltipText": "Padding Syntax",
					"tooltipCode": "<top> <right> <bottom> <left>",
					"tooltipExample": "10px 20px 10px 30px",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
				},
			},
		},
		"Position": {
			"icon": "far fa-arrow-to-right",
			"toggle": "position",
			"props": {
				"Top":{
					"placeholder": "15px",
					"model": "top",
				},
				"Right":{
					"placeholder": "50%",
					"model": "right",
				},
				"Bottom":{
					"placeholder": "10vh",
					"model": "bottom",
				},
				"Left":{
					"placeholder": "25px",
					"model": "padding",
				},
			},
		},
		"Borders": {
			"icon": "far fa-border-style-alt",
			"toggle": "borders",
			"props": {
				"Border":{
					"placeholder": "1px solid black",
					"model": "border",
					"tooltipText": "Border Syntax",
					"tooltipCode": "<width> <style> <color>",
					"tooltipExample": "2px solid black",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/border",
				},
				"Border Radius":{
					"placeholder": "15px",
					"model": "borderRadius",
					"tooltipText": "Border Radius",
					"tooltipCode": "<radius>",
					"tooltipExample": "10px | 25%",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
				},
				"Box Shadow":{
					"placeholder": "5px 5px 10px 5px rgba(0,0,0,0.2)",
					"model": "boxShadow",
					"tooltipText": "Box Shadow Syntax",
					"tooltipCode": "<offset-x> <offset-y> <blur> <spread> <color>",
					"tooltipExample": "5px 5px 10px 5px red",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
				},
				"Outline":{
					"placeholder": "2px solid rgba(0,0,0,0.2)",
					"model": "outline",
					"tooltipText": "Outline Syntax",
					"tooltipCode": "<width> <style> <color>",
					"tooltipExample": "3px solid green",
					"tooltipLink": "https://developer.mozilla.org/en-US/docs/Web/CSS/outline",
				},
			},
		},
	},

	// Keyframes
	// Array of all steps and props
	keyframes: {
		'0.0%': {
			"timelinePosition": {
				"left": "0.0%"
			},
			"transformProps": {
			},
			"properties": {
			}
		}
	},

	// Animation timing
	animationProperties: {
		duration: "3s",
		delay: "0s",
		iterations: "infinite",
		timing: "ease",
		direction: "normal",
		fillMode: "none"
	},
	// Timing options so users can toggle instead of type
	timingProps: {
		directionSelected: 0,
		fillModeSelectetd: 0,
		directions: [
			"normal", "reverse", "alternate", "alternate-reverse"
		],
		fillModes: [
			"normal", "none", "forwards", "backwards", "both"
		],
	},
	// Preset animations
	presetAnimations: [
		{
			name: "Spooky",
			animationClass: "preset-spooky",
			targetStyles: "#targetElement{\n    color:var(--text);\n    border-radius: 50%;\n    height: 100px;\n    width: 100px;\n    font-size: 105px;\n    transform-origin: center center;    \n}",
			targetClass: "far fa-ghost",
			animationProperties: {"duration":"5s","delay":"0s","iterations":"infinite","timing":"ease","direction":"normal","fillMode":"forwards"},
			keyframes: {"0.0%":{"timelinePosition":{"left":"0.0%"},"transformProps":{"scale":"1","translate":"-100px, 0","skew":"0deg"},"properties":{"transform":"scale(1) translate(-100px, 0) skew(0deg)"}},"5.1%":{"timelinePosition":{"left":"5.1%"},"transformProps":{"scale":"1","translate":"-100px, 0","skew":"-12deg"},"properties":{"transform":"scale(1) translate(-100px, 0) skew(-12deg)"}},"39.9%":{"timelinePosition":{"left":"39.9%"},"transformProps":{"scale":"1","translate":"100px, 0","skew":"-5deg"},"properties":{"transform":"scale(1) translate(100px, 0) skew(-5deg)"}},"95.1%":{"timelinePosition":{"left":"95.1%"},"transformProps":{"scale":"1","translate":"-100px, 0","skew":"12deg"},"properties":{"transform":"scale(1) translate(-100px, 0) skew(12deg)"}},"99.6%":{"timelinePosition":{"left":"99.6%"},"transformProps":{"scale":"1","translate":"-100px, 0","skew":"0deg"},"properties":{"transform":"scale(1) translate(-100px, 0) skew(0deg)"}},"45.3%":{"timelinePosition":{"left":"45.3%"},"transformProps":{"scale":"1","translate":"100px, -6px","skew":"0deg"},"properties":{"transform":"scale(1) translate(100px, -6px) skew(0deg)"}},"50.3%":{"timelinePosition":{"left":"50.3%"},"transformProps":{"scale":"1","translate":"100px, 0px","skew":"0deg"},"properties":{"transform":"scale(1) translate(100px, 0px) skew(0deg)"}},"55.3%":{"timelinePosition":{"left":"55.3%"},"transformProps":{"scale":"1","translate":"100px, -10px","skew":"0deg"},"properties":{"transform":"scale(1) translate(100px, -10px) skew(0deg)"}},"60.3%":{"timelinePosition":{"left":"60.3%"},"transformProps":{"scale":"1","translate":"100px, 0px","skew":"5deg"},"properties":{"transform":"scale(1) translate(100px, 0px) skew(5deg)"}}}
		},
		{
			name: "Heart",
			animationClass: "preset-heart",
			targetStyles: "#targetElement{\n    color:var(--red);\n    border-radius: 50%;\n    height: 100px;\n    width: 100px;\n    font-size: 65px;\n    transform-origin: center center;    \n}",
			targetClass: "fas fa-heart",
			animationProperties: {"duration":"2s","delay":"0s","iterations":"infinite","timing":"ease","direction":"normal","fillMode":"forwards"},
			keyframes: {"0.0%":{"timelinePosition":{"left":"0.0%"},"transformProps":{"scale":"1"},"properties":{"transform":"scale(1)"}},"40.3%":{"timelinePosition":{"left":"40.3%"},"transformProps":{"scale":"1.35"},"properties":{"transform":"scale(1.35)"}},"60.1%":{"timelinePosition":{"left":"60.1%"},"transformProps":{"scale":"1.15"},"properties":{"transform":"scale(1.15)"}},"79.6%":{"timelinePosition":{"left":"79.6%"},"transformProps":{"scale":"1.35"},"properties":{"transform":"scale(1.35)"}},"99.5%":{"timelinePosition":{"left":"99.5%"},"transformProps":{"scale":"1"},"properties":{"transform":"scale(1)"}},"20.1%":{"timelinePosition":{"left":"20.1%"},"transformProps":{"scale":"1"},"properties":{"transform":"scale(1)"}}}
		},
		{
			name: "Jet",
			animationClass: "preset-jet",
			targetStyles: "#targetElement{\n    color:var(--text);\n    border-radius: 50%;\n    height: 100px;\n    width: 100px;\n    font-size: 65px;\n    transform-origin: center center;    \n}",
			targetClass: "fas fa-fighter-jet",
			animationProperties: {"duration":"3s","delay":"0s","iterations":"infinite","timing":"linear","direction":"normal","fillMode":"none"},
			keyframes: {"0.0%":{"timelinePosition":{"left":"0.0%"},"transformProps":{"translate":"-50px, 0","rotate":"0deg","scale":"1","translate3d":""},"properties":{"transform":"translate(-50px, 0) rotate(0deg) scale(1)"}},"14.7%":{"timelinePosition":{"left":"14.7%"},"transformProps":{"translate":"20px, 0","rotate":"0deg","scale":"1","translate3d":""},"properties":{"transform":"translate(20px, 0) rotate(0deg) scale(1)"}},"99.7%":{"timelinePosition":{"left":"99.7%"},"transformProps":{"translate":"200px, -110px","rotate":"-20deg","scale":"0","translate3d":""},"properties":{"transform":"translate(200px, -110px) rotate(-20deg) scale(0)"}},"26.3%":{"timelinePosition":{"left":"26.3%"},"transformProps":{"translate":"200px, -110px","rotate":"-20deg","scale":"0","translate3d":""},"properties":{"transform":"translate(200px, -110px) rotate(-20deg) scale(0)"}}}
		}
	],
}
