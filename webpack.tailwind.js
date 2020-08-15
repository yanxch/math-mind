const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    syntax: 'postcss-scss',
                    plugins: () => [
                        require('postcss-import'),
                        require('tailwindcss'),
                        require('autoprefixer'),
                    ],
                },
            },
        ],
    },
};
