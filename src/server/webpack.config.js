const webpack = require("webpack");
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    name: "Server",
    entry: path.resolve(__dirname, "./index.ts"),
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "./../../build")
    },
    target: "node",
    resolve: {
        extensions: [".json", ".ts", ".tsx", ".js"],
        alias: { },
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
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: [
                "nodemon ./../../build/server.js --watch ./../../build"
            ]
        })
    ]
}