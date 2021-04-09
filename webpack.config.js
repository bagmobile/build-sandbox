const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
    const {mode = 'development'} = env;

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getCssLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ];
    }

    const getScssLoaders = () => {
        return [...getCssLoaders(), 'sass-loader']
    }

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                template: "public/index.html",
                scriptLoading: 'blocking',
                title: 'Hi',
                buildTime: new Date().toString()
            })
        ];
        if (isProd){
            plugins.push( new MiniCssExtractPlugin({
                filename: 'main-[hash:8].css'
            }))
        }
        return plugins;
    }

    return {
        mode,
        devServer: {
            open: true,
            port: 9000,
        },
        entry: './src/index.js',
        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined
        },
        module: {
            rules: [
                {
                    test: /\.(jpg|png)$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }]
                },
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: "babel-loader",
                    }]
                },
                {
                    test: /\.(css)$/,
                    use: getCssLoaders()
                },
                {
                    test: /\.(s[ca]ss)$/,
                    use: getScssLoaders()
                }
            ]
        },
        plugins: getPlugins()
    }
}
