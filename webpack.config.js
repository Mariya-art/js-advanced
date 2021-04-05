module.exports = {
  mode: 'development',
  entry: './src/script',
  output: {
    filename: './build.js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    compress: true,
  }
};