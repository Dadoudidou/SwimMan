const webpack = require("webpack");
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

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
            {
                test: /.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(__dirname, "./tsconfig.json")
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
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        }),
        new htmlWebpackPlugin({
            title: 'react-hot-ts',
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, './app/index.html')
        })
    ],
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
}