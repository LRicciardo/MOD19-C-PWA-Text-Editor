// Must be BEFORE the WebpackPwaManifest in the plugins array
const HtmlWebpackPlugin = require("html-webpack-plugin");

// -WebpackPwaManifest - connects modularized applications while running in the browser, contains the loading and resiolving logic needed to connect these modules.
// -Generates a 'manifest.json' for your Progressive Web Application, with auto icon resizing and fingerprinting support.
const WebpackPwaManifest = require("webpack-pwa-manifest");

// -Extracts CSS into separate files
// -Creates a CSS file per JS file which contains CSS
// -Supports On-Demand-Loading of CSS and SourceMaps
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// -Provides utilities for working with file and directory paths
const path = require("path");

// Inject Manifest will generate a manifest(list) of URLS to precache and add that list to the service worker file.
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    // sets the mode to development unless explicitly overridden by the package.json script
    mode: "development",
    watchOptions: {
      ignored: /node_modules/,
    },
    // entry points using Object Syntax. Each entry point can have attributes.
    entry: {
      // main entry point
      main: "./src/js/index.js",
      // entry point to install
      install: "./src/js/install.js",
      // entry point for editor
      editor: "./src/js/editor.js",
      // entry point for header
      header: "./src/js/header.js"
    },
    // what to name the bundle file and where to write put it (ONLY ONE)
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATEditor"
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: ' A PWA Text Editor',
        // background_color: '#21b649',
        background_color: '#218EB6',
        theme_color: '#21b649',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // Defining the files, applies loaders and types
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource"
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime"
              ]
            }
          }
        }
      ]
    }
  };
};
