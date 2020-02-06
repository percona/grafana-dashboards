"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require('fs');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = tslib_1.__importStar(require("webpack"));
var loaders_1 = require("./webpack/loaders");
exports.findModuleFiles = function (base, files, result) {
    files = files || fs.readdirSync(base);
    result = result || [];
    if (files) {
        files.forEach(function (file) {
            var newbase = path.join(base, file);
            if (fs.statSync(newbase).isDirectory()) {
                result = exports.findModuleFiles(newbase, fs.readdirSync(newbase), result);
            }
            else {
                var filename = path.basename(file);
                if (/^module.tsx?$/.exec(filename)) {
                    // @ts-ignore
                    result.push(newbase);
                }
            }
        });
    }
    return result;
};
var getModuleFiles = function () {
    return exports.findModuleFiles(path.resolve(process.cwd(), 'src'));
};
var getManualChunk = function (id) {
    if (id.endsWith('module.ts') || id.endsWith('module.tsx')) {
        var idx = id.lastIndexOf(path.sep + 'src' + path.sep);
        if (idx > 0) {
            var name_1 = id.substring(idx + 5, id.lastIndexOf('.'));
            return {
                name: name_1,
                module: id,
            };
        }
    }
    return null;
};
var getEntries = function () {
    var entries = {};
    var modules = getModuleFiles();
    modules.forEach(function (modFile) {
        var mod = getManualChunk(modFile);
        // @ts-ignore
        entries[mod.name] = mod.module;
    });
    return tslib_1.__assign(tslib_1.__assign({}, entries), loaders_1.getStylesheetEntries());
};
var getCommonPlugins = function (options) {
    var packageJson = require(path.resolve(process.cwd(), 'package.json'));
    return [
        new MiniCssExtractPlugin({
            // both options are optional
            filename: 'styles/[name].css',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new CopyWebpackPlugin([
            { from: 'plugin.json', to: '.' },
            { from: './README.md', to: '.' },
            { from: '../LICENSE', to: '.' },
            { from: 'img/*', to: '.' },
            { from: '**/*.json', to: '.' },
            { from: '**/*.svg', to: '.' },
            { from: '**/*.png', to: '.' },
            { from: '**/*.html', to: '.' },
        ], { logLevel: options.watch ? 'silent' : 'warn' }),
        new ReplaceInFileWebpackPlugin([
            {
                dir: 'dist',
                files: ['plugin.json', 'README.md'],
                rules: [
                    {
                        search: '%VERSION%',
                        replace: packageJson.version,
                    },
                    {
                        search: '%TODAY%',
                        replace: new Date().toISOString().substring(0, 10),
                    },
                ],
            },
        ]),
    ];
};
exports.getWebpackConfig = function (options) {
    var plugins = getCommonPlugins(options);
    var optimization = {};
    if (options.production) {
        optimization.minimizer = [new TerserPlugin(), new OptimizeCssAssetsPlugin()];
    }
    else if (options.watch) {
        plugins.push(new HtmlWebpackPlugin());
    }
    return {
        mode: options.production ? 'production' : 'development',
        target: 'web',
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
        },
        context: path.join(process.cwd(), 'src'),
        devtool: 'source-map',
        entry: getEntries(),
        output: {
            filename: '[name].js',
            path: path.join(process.cwd(), 'dist'),
            libraryTarget: 'amd',
            publicPath: '/',
        },
        performance: { hints: false },
        externals: [
            'lodash',
            'jquery',
            'moment',
            'slate',
            'emotion',
            'prismjs',
            'slate-plain-serializer',
            '@grafana/slate-react',
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'rxjs',
            'd3',
            'angular',
            '@grafana/ui',
            '@grafana/runtime',
            '@grafana/data',
            // @ts-ignore
            function (context, request, callback) {
                var prefix = 'grafana/';
                if (request.indexOf(prefix) === 0) {
                    return callback(null, request.substr(prefix.length));
                }
                // @ts-ignore
                callback();
            },
        ],
        plugins: plugins,
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
        },
        module: {
            rules: tslib_1.__spread([
                {
                    test: /\.tsx?$/,
                    loaders: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', { modules: false }]],
                                plugins: ['angularjs-annotate'],
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: { onlyCompileBundledFiles: true },
                        },
                    ],
                    exclude: /(node_modules)/,
                }
            ], loaders_1.getStyleLoaders(), [
                {
                    test: /\.html$/,
                    exclude: [/node_modules/],
                    use: {
                        loader: 'html-loader',
                    },
                }
            ], loaders_1.getFileLoaders()),
        },
        optimization: optimization,
    };
};
//# sourceMappingURL=webpack.plugin.config.js.map