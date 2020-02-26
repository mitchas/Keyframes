# Vue Local Template

### Demo this at [mitchs.co/vuelocal](https://mitchs.co/vuelocal)


This is a template for a Vue app. It's the same as [VueFirebase](https://github.com/mitchas/VueFirebase), without the firebase. Instead, preferences are saved in Local Storage, and no database is required.

It includes the basic structure for a Vue webapp.
 * Toast notifications.
 * Super responsive, smooth animations, feels native on mobile.
 * Auto dark-mode based on device settings. Users can toggle their preference.
 * Settings modal with other preference toggles.
 * PWA ready.
 * Terms of Service & Privacy policy.

 

# Project Installation & Development

### Packages
```bash
npm install
```

## NPM Commands

#### Serve on [localhost:8080](https://localhost:8080)
```bash
npm run serve
```

#### Build for production
```bash
npm run build
```

#### Run your tests
```bash
npm run test
```
#### Lints and fixes files
```bash
npm run lint
```

# Other things to set up

### Environment Variables
Fill in your VUE_APP_BASE_URL and VUE_APP_BASE_PATH in `.env` and `.env.production`. The base URL should be the bare URL it'll be hosted at (ie https://example.com - no trailing slash) and the base path should be the path at the URL (ie /app if it'll be at example.com/app). For the root, leave it at /.

### Production Public Path
If the app is going to be deployed in a sub directory (ie website.com/app/), edit the path in vue.config.js.

### Replace project name
CMD/CTRL+F to find and replace every **ABCDEFG** - which is used as a placeholder for wherever the project name is supposed to be.

### Terms of Service & Privacy Policy
Read the TOS and Privacy Policy. There's stuff you'll need to replace (like email addresses and URLs), but also make sure it's accurate for your site. These documents were taken from [Automattic's Legalmattic](https://github.com/Automattic/legalmattic) documents (and modified a bit).

The docs were written for a site with authentication that collects user data. This template does not collect any user data - unless you make it.


# Everything else you should know

## Third-party libraries
I tried to use as few as possible. Apart from Vue and everything required by it, this project includes:
 * [VueMoment](https://www.npmjs.com/package/vue-moment) (MomentJS) for time formatting
 * [FontAwesome](http://fontawesome.com/) (Pro) for icons. You'll have to switch out icons if you don't have pro.
 * [Vue Lodash](https://www.npmjs.com/package/vue-lodash) For working with the data.


## Other Features
 * Detect soft keyboard to hide bottom elements
 * Lock scrolling when modal is visible
 * LESS Styles with global light/dark variables
 * Page transitions
 * Uses system fonts (for paragraphs, not headers/display text) to feel more native
 * Users can toggle UI animations in their preferences.
