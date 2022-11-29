import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import {Configuration} from "webpack";

const optimization = (isProd) => {
    const config: Configuration['optimization'] = {}
    if(isProd) {
        config.minimize = true;
        config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin({parallel:true})]
    }

    config.sideEffects = true;
    config.runtimeChunk = 'single';
    config.moduleIds = 'deterministic';
    config.splitChunks = {
        chunks: "all",
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: "all"
            }
        }
    }

    return config
}

export default optimization;
