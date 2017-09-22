const webpack = require("webpack");
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
console.log("Export en mode " + process.env.NODE_ENV.toUpperCase());
//#endregion

const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: !production
});


module.exports = {
    name: "Client",
    entry: path.resolve(__dirname, "./app/index.tsx"),
    output: {
        filename: "client.js",
        path: path.resolve(__dirname, "./../../build")
    },
    resolve: {
        extensions: [".json", ".ts", ".tsx", ".js"],
        alias: { 
            "modules": path.resolve(__dirname, "./modules"),
            "app": path.resolve(__dirname, "./app")
        },
        modules: [
            path.resolve(__dirname, "."),
            "node_modules"
        ]
    },
    module: {
        
        loaders: [
            // -- typescripts
            {
                test: /.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(__dirname, "./tsconfig.json")
                }
            },
            // -- sass - css
            {
                test: /\.s?css$/,
                loader: extractCss.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader'}
                    ]
                })
            },
            // -- images
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    name: "img/img-[hash:6].[ext]",
                    limit: 50
                }
            },
            // -- fonts
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: {
                    name: "fonts/[name].[ext]",
                    publicPath: (!production) ? undefined : "../",
                    limit: 10000
                }
            }

        ]
    },
    devtool: 'source-map',
    devServer: {
      hot: true,
      inline: true,
      port: 5081,
      stats: {
        warnings: false
      },
      proxy: {
          "*": {
              target: "http://localhost:5080",
              //secure: false
          }
      }
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(production),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        }),
        new htmlWebpackPlugin({
            title: 'react-hot-ts',
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, './app/index.html')
        }),
        extractCss
    ],
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
}