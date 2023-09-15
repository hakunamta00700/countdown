const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'cg_countdown.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'CgCountDown',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'cg_countdown.css',
        }),
    ],
    mode: 'production',
};
