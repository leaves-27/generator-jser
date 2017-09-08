var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// if(process.env.NODE_ENV=="production"){
//   publicPath = "http://gaea.tongbanjie.com/";
// }else{
//   publicPath = "http://gaea.tongbanjie.com:8080/";
// }

var fileContent = fs.readFileSync('./package.json');
var packageJSON = JSON.parse(fileContent);
var dirPath = 'build/'+packageJSON.name;

module.exports = {
  entry : {
    "app" : "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, dirPath),
    publicPath: "/",
    filename: 'static/[name].js',
    chunkFilename:'static/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },{ 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },{ 
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "file-loader" 
      },{ 
        test: /\.(woff|woff2)$/, 
        loader:"url-loader?prefix=font/&limit=5000" 
      },{ 
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url-loader?limit=10000&mimetype=application/octet-stream" 
      },{ 
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url-loader?limit=10000&mimetype=image/svg+xml" 
      },{
        test: require.resolve('jquery'),
        use:[{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase: dirPath,
    historyApiFallback: true,
    noInfo: true,
    inline:true,
    filename: 'static/[name].[chunkhash:8].js',
    disableHostCheck: true //
  },
  performance: {
    hints : false
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename : "index.html", //生成的html文件名
      template : "index.html", //生成html依赖的模板
      inject : false, //自动注入资源
      minify : { 
        removeComments : true,    //移除HTML中的注释
        collapseWhitespace : true    //删除空白符与换行符
      }
    }),
    new CopyWebpackPlugin([{
      from :  __dirname + '/src/manifest.json',
      to: __dirname + '/'+ dirPath
    },{
      from :  __dirname + '/images/*',
      to: __dirname + '/'+ dirPath,
      toType:"dir"
    }])
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}