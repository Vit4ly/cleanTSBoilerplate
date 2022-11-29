import path from 'path';
import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {isProd} from "./consts";

const tsLoader = (test: RegExp, extraPreset?: string) => {
    const presets = ['@babel/preset-env', '@babel/preset-typescript'];
    const plugins: unknown[] = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
    ];

    if (extraPreset) {
        presets.push(extraPreset);
    }

    const use = [
        'thread-loader',
        {
            loader: 'babel-loader',
            options: {
                plugins,
                presets,
            },
        },
    ];

    return {
        test,
        use,
        include: [path.resolve('./src'), path.resolve('./generated')],
    };
};

const styleLoader = (test: RegExp, extraLoader?: string) => {
    const use: (RuleSetRule | string)[] = ['thread-loader', isProd
        ? MiniCssExtractPlugin.loader
        : 'style-loader'];

    if (extraLoader) {
        use.push({

            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]__[hash:base64:5]',
                    exportLocalsConvention: 'camelCase',

                },
            },
        });
        use.push(extraLoader);
    } else {
        use.push('css-loader');
    }

    return {
        test,
        use,
    };
};

const rules = [
    tsLoader(/\.(j|t)s$/),
    styleLoader(/\.css$/),
    styleLoader(/\.less$/, 'less-loader'),

    {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
    },
    {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
    },
];

export default rules;


