const manifestJSON = require('./public/manifest.json')

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
	  ? '/' 
	  // Change this ^^ path if the app won't be at root level ie website.com/app/ - put "/app/"
	  : '/',

	  pwa: {
			themeColor: manifestJSON.theme_color,
			name: manifestJSON.short_name,
			msTileColor: manifestJSON.background_color,
			appleMobileWebAppCapable: 'yes',
			appleMobileWebAppStatusBarStyle: 'black',
			workboxPluginMode: 'InjectManifest',
			workboxOptions: {
				swSrc: 'service-worker.js',
			},
	  },
  }