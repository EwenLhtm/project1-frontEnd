module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        enforce: 'post',
        exclude: [
          /node_modules/,
          /\.spec\.ts$/,
          /\.cy\.ts$/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['istanbul']
          }
        }
      }
    ]
  }
};
