import path from "path";
import webpack from "webpack";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

// const { ModuleFederationPlugin } = require("webpack").container;
// const deps = require("./package.json").dependencies;

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const webpackConfig = (env): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: true,
        historyApiFallback: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            // {
            //     test: /bootstrap\.tsx$/,
            //     loader: "bundle-loader",
            //     options: {
            //       lazy: true,
            //     },
            // },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: '@svgr/webpack',
                    options: {
                      native: false,
                    }
                  },
                  {
                    loader: 'url-loader'
                  }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        }),
        // new ModuleFederationPlugin({
        //     name: "hostApp",
        //     library: { type: "var", name: "hostApp" },
        //     filename: "remoteEntry.js",
        //     exposes: {
        //       "./App": "./src/App"
        //     },
        //     shared: [
        //       {
        //         react: {
        //           singleton: true,
        //           requiredVersion: deps.react,
        //           eager: true,
        //         },
        //         "react-dom": {
        //           singleton: true,
        //           requiredVersion: deps["react-dom"],
        //           eager: true,
        //         },
        //         "@material-ui/core": {
        //           singleton: true,
        //           eager: true,
        //         }
        //       }
        //     ]
        //   }),
    ]
});

export default webpackConfig;
