module.exports = {
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: '@babel/preset-env',
        query: {
          presets: [
            ['latest', { modules: false }],
          ],
        },
      },
    ],
  },
};