import path from 'path'
import {Configuration} from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import {isDev, isProd,filename, chunkFilename} from "./tools/webpack/consts";
import optimization from "./tools/webpack/optimization";
import rules from "./tools/webpack/moduleRules";
import plugins from "./tools/webpack/plugins";

const config: Configuration = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval' : 'source-map',
    target: ['web', 'es6'],
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: filename('js', isProd),
        chunkFilename: chunkFilename('js', isProd),
        clean: true,
        publicPath: 'auto',
        asyncChunks: true
    },
    optimization: optimization(isProd),
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins,
}

export default process.env.SMP === 'OFF' ? config : new SpeedMeasurePlugin().wrap(config);
