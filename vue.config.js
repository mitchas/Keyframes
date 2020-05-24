const manifestJSON = require('./public/manifest.json')
var webpack = require('webpack');

// Get version
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
	// Make version number available
	configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
	},
	
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

	// Server Options
	// Uncomment this to force https to test PWA stuff on phones
	// It'll still be insecure, but you can bypass it.
	// devServer: {
	// 	https: {
	// 		key: fs.readFileSync('./certs/example.com+5-key.pem'),
	// 		cert: fs.readFileSync('./certs/example.com+5.pem'),
	// 	},
	// 	public: 'https://localhost:8080/'
	// },
}