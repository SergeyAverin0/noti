const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const mode = process.env.NODE_ENV;
/*
const port = process.env.FRONTEND_PORT;
const host = process.env.FRONTEND_HOST;
*/

const port = 3000;
const host =  '0.0.0.0';


const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./index.html",
    inject: "body",
    hash: false,
  }),
];

if (mode === "development") {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const config = {
  mode: mode === "production" ? "production" : "development",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  context: path.resolve(__dirname, "src"),

  entry: "./index.tsx",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },    
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins,

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: port,
    host: host,
    hot: true,
  },
};

module.exports = config;