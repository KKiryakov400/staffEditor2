const path = require('path');
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
  	module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
			        test: /\.(scss|css)$/,
              exclude: /node_modules/,
        			use: [	miniCss.loader,'css-loader','postcss-loader','sass-loader',]
        	}
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
      },
  	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new miniCss({	filename: '../dist/style.css',}),
      ],
      devServer: {
        contentBase: './dist',
        historyApiFallback: true,
  	    //overlay: true,
  	    open: true,
  	    hot: true
      }
  };
