const HtmlWebpackPlugin = require('html-webpack-plugin');

const getPages = require('../utils/getPages');

const path = require('path');

const helpers = require('../utils/helpers');

module.exports = function getEntry (name) {
  const entry = {};
  const plugins = [];

  return getPages(name).then((pageMap) => {
    const pageList = Object.keys(pageMap);
    pageList.forEach((page) => {
      const entryName = page.split(`${name}/`)[1];
      const pageObj = pageMap[page];
      if (pageObj.html && (pageObj.ts || pageObj.js)) {
        entry[entryName] = [helpers.resolve(`../../src/${pageObj.ts || pageObj.js}`)];
        const filename = pageObj.html.split(`${name}/`)[1];
        console.log( helpers.resolve(`../../src/${pageObj.html}`));
        plugins.push(
          new HtmlWebpackPlugin({
            template: helpers.resolve(`../../src/${pageObj.html}`),
            filename,
            chunks: ['manifest', entryName]
          }),
        )
      }
    })

    console.log(entry)
    console.log((plugins))
    return { 
      entry,
      plugins
    }
  })
}