require = require("esm")(module);
const { routes } = require("./src/routes.js");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
	chainWebpack: (config) => {
		config.resolve.symlinks(false);
	},
	configureWebpack: {
		plugins: [
		  	new ImageminPlugin({
				disable: process.env.NODE_ENV !== "production",
		  	})
		]
	},
	devServer: {// Environment configuration
        host: "0.0.0.0",
		socket: "socket",
        port: 8080,
        https: false,
        hotOnly: false,
		public: "0.0.0.0:8080",
        disableHostCheck:true,
                 open: true // Configure to automatically start the browser
    },
	pwa: {
		name: process.env.VUE_APP_COMPANY_NAME,
        workboxOptions: {
            skipWaiting: true,
        }
    },
	css: {
		loaderOptions: {
			scss: {
				additionalData: "@import \"~@/styles/variables.scss\";"
			},
		}
	},
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
			analyzerMode: process.env.NODE_ENV === "development" ? "server" : "static",
			reportFilename: "build_analysis.html"
		},
		sitemap: {
			baseURL: "https://keyframes.app",
			outputDir: "dist",
			trailingSlash: true,
			defaults: {
				lastmod:    new Date(),
				changefreq: "daily",
				priority:   0.5,
			},
			routes,
		},
	},
	productionSourceMap: false,
	publicPath: process.env.VUE_APP_BASE_PATH
  };