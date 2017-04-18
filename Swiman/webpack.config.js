const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const assign = require("object-assign");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const tag_compiler = "compiler ";
const tag_compiler_error = "ERR!";
const tag_compiler_tests = "TEST";

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
console.log(tag_compiler, "Export en mode " + process.env.NODE_ENV.toUpperCase());
//#endregion

//#region FUNCTIONS
function LoadApplications(apps_dir, indexFiles, onAddApplication) {


    if (indexFiles == undefined) indexFiles = ["index.js", "index.jsx", "index.ts", "index.tsx"];
    if (onAddApplication == undefined) onAddApplication = function (name, file) {
        let obj = {};
        obj[name] = [file];
        return obj;
    }

    let applications = {};
    let files;
    try { files = fs.readdirSync(apps_dir); } catch (e) { }
    if (!files) {
        console.log(tag_compiler, tag_compiler_err, "No files in " + apps_dir);
        return;
    }

    files.forEach(function (file) {
        //check if file is directory
        let _npath = path.resolve(apps_dir, file), _npathStats;
        try { _npathStats = fs.lstatSync(_npath); } catch (e) { }
        if (_npathStats && _npathStats.isDirectory()) {

            let _trouve = false, i = 0, _nfile;
            //recherche des fichiers index
            while (_trouve == false && i < indexFiles.length) {
                _nfile = path.resolve(_npath, indexFiles[i]);
                let _nfileStats;
                let _logtest = "file [" + _nfile + "]";
                try { _nfileStats = fs.lstatSync(_nfile); } catch (e) { }
                if (_nfileStats && _nfileStats.isFile()) {
                    console.log(tag_compiler, tag_compiler_tests, _logtest, "OK");
                    _trouve = true;
                } else {
                    console.log(tag_compiler, tag_compiler_tests, _logtest, "NOT FOUND");
                }
                i++;
            }
            //ajoute ou non
            if (_trouve) {
                applications = assign(applications, onAddApplication(file, _nfile));
                /*applications[file] = [
                    'webpack-dev-server/client?http://localhost:3000',
                    'webpack/hot/only-dev-server',
                    _nfile
                ];*/
            }
        }
    });

    return applications;
}

//#endregion

//#region CHARGEMENT APPLICATIONS
var apps_dir = path.resolve(__dirname, './__scripts__/applications/');
var applications = LoadApplications(apps_dir, ["index.ts", "index.tsx"], function (name, file) {
    let obj = {};
    obj[name] = [];
    if (!production) {
        obj[name].push('webpack-dev-server/client?http://localhost:3001');
        obj[name].push('webpack/hot/only-dev-server');
    }
    obj[name].push(file);

    return obj;
});


let length = 0; for (var i in applications) { length++; }
if (length == 0) {
    console.log(tag_compiler, tag_compiler_err, "Cannot found applications");
}
//#endregion

var outFolder = path.resolve(__dirname, "./wwwRoot");
var webpackConfig = {
    cache: false,
    node: {
        fs: "empty"
    }
};

// **********************
// ENTRIES
// **********************
webpackConfig.entry = applications;

// **********************
// OUTPUT
// **********************
webpackConfig.output = {
    path: outFolder,
    filename: "js/[name].js",
    publicPath: (!production) ? 'http://localhost:3001/static/' : undefined
};

// **********************
// RESOLVE MODULE
// **********************
webpackConfig.resolve = {
    modules: [
        path.resolve(__dirname, "./__scripts__"),
        "node_modules"
    ],
    extensions: [".webpack.js", ".js", ".ts", ".tsx"]
};

// **********************
// DEV SERVER
// **********************
webpackConfig.devServer = {
    headers: { "Access-Control-Allow-Origin": "*" },
    port : 3001
};

// **********************
// PLUGINS
// **********************
if (!webpackConfig.plugins) webpackConfig.plugins = [];

//Environnement
webpackConfig.plugins.push(new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(production),
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
}));

//Hot module replacement plugin
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

//Compression
if (production) {
    //webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false, // suppression des warnings
        },
    }));
}




// **********************
// DEV TOOL
// **********************
webpackConfig.devtool = (production) ? false : 'source-map';
webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({ debug: !production }));

// **********************
// MODULES
// **********************
if (!webpackConfig.module) webpackConfig.module = {};
if (!webpackConfig.module.loaders) webpackConfig.module.loaders = [];

//Typescript
webpackConfig.module.loaders.push(
    { test: /\.tsx?$/, loaders: ['react-hot-loader', 'ts-loader'] }
);

//Sass Css

const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: !production
});

webpackConfig.module.loaders.push(
    {
        test: /\.s?css$/,
        loader: extractCss.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader' },
                { loader: 'sass-loader'}
            ]
        })
    }
);

//externalisation du css
webpackConfig.plugins.push(
    extractCss
);




//Images
webpackConfig.module.loaders.push(
    {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
            name: "img/img-[hash:6].[ext]",
            limit: 50
        }
    }
);

//Fonts
webpackConfig.module.loaders.push(
    {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
            name: "fonts/[name].[ext]",
            publicPath: (!production) ? undefined : "../",
            limit: 10000
        }
    }
);



module.exports = webpackConfig;
