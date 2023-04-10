const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/js/index.js',
    },
    output: {
        clean: false,
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: 'src/assets/images/[name].[ext]',
    },
    mode: 'development',
    devServer: {
        static: "./src",
        compress: true,
        port: 8080,
        hot: true
    },
    module: {
        rules:[
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/public/index.html'),
            filename: 'index.html',
            chunks: ['index'],
        }),
    ],
}