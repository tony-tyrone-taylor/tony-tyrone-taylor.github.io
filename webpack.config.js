const webpack = require('webpack');

module.exports = {
  entry:process.cwd()+'/src/app/main.ts',
  output:{
    path:process.cwd()+'/dist/js/',
    filename:'main.bundle.min.js'
  },
  module:{
    loaders:[
      {test:/\.ts$/,loader:'ts'}
    ]
  },
  resolve:{
    extensions:['','.js','.ts']
  },
  plugins:[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({})
  ]
}