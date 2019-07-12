module.exports = function (name) {
  const rules = [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      // options: {
      //   loaders: {
      //     // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
      //     // the "scss" and "sass" values for the lang attribute to the right configs here.
      //     // other preprocessors should work out of the box, no loader config like this necessary.
      //     'scss': 'vue-style-loader!css-loader!sass-loader',
      //     'less': 'vue-style-loader!css-loader!less-loader',
      //     'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
      //   }
        // other vue-loader options go here
      // }
    },
    { 
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: '/node_modules/',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.(vue|tsx?)$/,
      loader: 'string-replace-loader',
      options: {
        multiple: [
          { search: '@src/config/mobile', replace: `@src/config/${name}` }
        ]
      }
    },
    
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'less-loader'
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        // 'postcss-loader'
      ]
    }
  ]

  return rules;
}