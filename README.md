![Keyframes](/public/img/icons/apple-touch-icon-76x76.png)
# Keyframes


This is a collection of web apps to live preview and generate various CSS styles. It originally started as a tool just for creating CSS animations (hence the name Keyframes), but now has additional tools.

## Tools:

 * *Animations*: A video-editor like timeline to create CSS @Keyframe animations.
 * *Colors*: Full screen RGB color picker. Convert between HEX/RGB. Save palettes to local storge.
 * *Shadows*: A visual CSS box-shadow generator. Single or multi-layer shadows.
 

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


# Everything else you should know

## Third-party libraries
I tried to use as few as possible. Apart from Vue and everything required by it, this project includes:
 * [VueMoment](https://www.npmjs.com/package/vue-moment) (MomentJS) for time formatting
 * [FontAwesome](http://fontawesome.com/) (Pro) for icons. You'll have to switch out icons if you don't have pro.
 * [Vue Lodash](https://www.npmjs.com/package/vue-lodash) For working with the data.
 * [Color Convert](https://www.npmjs.com/package/color-convert) for working with color values.

## Other Features
 * Fully responsive/PWA support
 * Soft keyboard detection to hide elements on mobile for more space when keyboard is visible.
 * Lock scrolling when modal is visible
 * LESS Styles with global light/dark themes
 * Preferences stored in local storage.

