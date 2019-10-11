const mix = require('laravel-mix');

mix.webpackConfig(() => {
	return {
		resolve: {
			alias: {
				comps: path.resolve(__dirname, 'assets/src/js/components/'),
				style: path.resolve(__dirname, 'assets/src/scss/'),
				deps: path.resolve(__dirname, 'assets/src/js/dependencies/')
			}
		}
	};
});

mix.setPublicPath('assets/dist');

mix.js('assets/src/js/apps/tebak-gambar.js', 'assets/dist/js/app.js').version();
