/* eslint-disable import/no-commonjs, global-require,import/unambiguous */
// noinspection NodeJsCodingAssistanceForCoreModules
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const sourceMap = process.env.SOURCE_MAP ? 'source-map' : 'eval';

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
});

module.exports = {
    devtool: sourceMap,
    entry: {
        bundler: [path.resolve(__dirname, './src/index.js')],
        bundlev: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'react-router',
        ],
    },
    output: {
        path: path.resolve(__dirname, './public/assets'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            App: path.resolve(__dirname, 'app'),
            Actions: path.resolve(__dirname, 'app/actions'),
            Api: path.resolve(__dirname, 'app/api'),
            Components: path.resolve(__dirname, 'app/components'),
            Containers: path.resolve(__dirname, 'app/containers'),
            Constants: path.resolve(__dirname, 'app/constants'),
            Core: path.resolve(__dirname, 'app/core'),
            Types: path.resolve(__dirname, 'app/flowTypes'),
            Src: path.resolve(__dirname, 'src'),
            Stores: path.resolve(__dirname, 'app/stores'),
            Utils: path.resolve(__dirname, 'app/core/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules([\\/]*jss*|!?[\\/]css-vendor*|!?[\\/]react-swipe-component*|!?[\\/]react-virtualized*)/,
                loader: 'babel-loader',
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules([\\/]*jss*|!?[\\/]css-vendor*|!?[\\/]react-swipe-component*|!?[\\/]react-virtualized*)/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                modules: true,
                                localIdentName: '[name]__[local]_[hash:base64:5]',
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                            },
                        },
                    ],
                }),

            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            minimize: true,
                            sourceMap: true,
                            localIdentName: '[local]_[hash:base64:4]',
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                                require('postcss-global-import')({ sync: true }),
                                require('postcss-nested')(),
                                require('postcss-import'),
                                require('postcss-use')({ modules: '*' }),
                                require('postcss-at-rules-variables'),
                                require('postcss-simple-vars'),
                                require('postcss-calc'),
                                require('postcss-conditionals'),
                                require('postcss-color-function'),
                                require('postcss-image-set-polyfill'),
                                require('postcss-colour-functions'),
                                require('postcss-custom-media'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                include: path.resolve(__dirname, './public'),
                exclude: /node_modules/,
                use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
            },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({ title: 'bundler.js', alwaysNotify: true }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bundlev',
            minChunks: Infinity,
        }),

        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true,
            },
        }),

        extractSass,
    ],
};
