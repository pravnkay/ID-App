module.exports = {
  pwa: {
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      name: 'In Detail App',
      short_name: 'InDetail',
      start_url: '.',
      display: 'standalone',
      theme_color: '#1a73e8',
      background_color: '#ffffff'
    },
    
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
	},
	// devServer: {
  //   host: 'localhost:8080'
  // }
};