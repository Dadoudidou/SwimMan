var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    quiet: false,
    hot: true,
    noInfo: false,
    inline: true,
    historyApiFallback: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}).listen(3001, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3001');
});