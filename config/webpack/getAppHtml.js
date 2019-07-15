/**
 * 
 * 
 * data:webpackHtmlPlugin 插件数据;
 *  
 * */
const cheerio = require('cheerio');
const fs = require('fs');
const helpers = require('../utils/helpers')

function getAppHtml (data) {
  const titles = [];
  data.forEach((item) => {
    const { template, filename } = item.options;
    const html = fs.readFileSync(template);
    const $ = cheerio.load(html);
    const text =  $('title').text();
    titles.push(`<div><a href=/${filename}>${text}</a> </div>`);
  })
  const appHtmlTemplate = fs.readFileSync(helpers.resolve('../tpl/index.tpl'), 'utf-8');
  const template =  appHtmlTemplate.replace('${content}', titles.join(''));
  return template;
}

module.exports = getAppHtml;