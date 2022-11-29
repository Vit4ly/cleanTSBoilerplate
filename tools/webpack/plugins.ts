import CompressionPlugin from "compression-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {isProd} from "./consts";
import webpack from "webpack";

const plugins: webpack.Configuration['plugins'] = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'TS Todo',
        template: './public/index.template.html',
        minify: {
            collapseWhitespace: isProd
        }
    }),
    new CopyPlugin({
        patterns: [
            {
                from: './src/assets/',
                to: './',
                noErrorOnMissing: true,
            },
        ]
    }),

    new webpack.ProvidePlugin({
        process: "process/browser"
    }),

    // new HardSourceWebpackPlugin(),
    new LodashModuleReplacementPlugin,
    new MiniCssExtractPlugin(),
]

if (isProd) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    plugins.push(new CompressionPlugin());
}

export default plugins
