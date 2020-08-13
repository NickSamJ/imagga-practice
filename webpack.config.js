const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),

    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            // {
            //     test: /\.css$/,
            //     loader: "css-loader"
            // }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 9000,
        liveReload: true
    }
};