const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        "index": "./src/index.ts"
    },
    output: {},
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: true,
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                }
            })
        ]
    },
    externals: {
        axios: 'axios'
    },
    resolve: {extensions: ['.js', '.ts']},
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
        ]
    },
};
