const fs = require('fs');
const path = require('path');
const mime = require('mime');
const changeCase = require('change-case');
const JOSN5 = require('json5');
const getLength = require('utf8-byte-length');
const argv = require('yargs').argv;
const dir = argv.name || 'boms';

const travelFileSync = require('./travelFileSync');

function tansformPath(url) {
  let ret = url.split('?')[0];
  let newArr = [];
  const pathArr = ret.split('/');

  newArr = pathArr.map((item, i) => {
    let pathRet = item;

    if (i > 1) {
      pathRet = changeCase.upperCaseFirst(item);
    }
    return pathRet;
  });

  ret = newArr.join('').replace(/.action$/, '');

  return path.normalize(`${ret}.json`);
}

function json5toJson() {}

/**
 * 简单的 http api connect 中间件请求处理,
 * 把特定路径请求的按路径访问相应的json文件
 *
 * @param  {[object]} options   初始化选项
 * @return {[function]}         处理函数
 */
function serverApi() {
  return (req, res) => {
    const rootUrl = path.join(__dirname, `../data/${dir}`);

    const commonUrl =  path.join(__dirname, `../data/common`);

    const files = travelFileSync(rootUrl).concat(travelFileSync(commonUrl));

    const reqFilename = tansformPath(req.url);

    const fileMime = mime.getType(reqFilename);

    function readDone(resText, url) {
      let msg = resText;

      if (!resText) {
        msg = JSON.stringify({
          state: {
            code: 404,
            msg: `${url} is Not Found!`
          }
        });
      } else {
        let newObject = JOSN5.parse(msg);

        msg = JSON.stringify(newObject);
      }
      // res.setHeader("Content-Range", "bytes");
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', `${fileMime}; charset=UTF-8`);
      res.setHeader('Content-Length', getLength(msg));
      res.end(msg);
      return null;
    }

    const isFind = files.some(item => {
      
      if (item.fileName === reqFilename) {
        const resText = fs.readFileSync(item.pathname);
        readDone(resText, reqFilename, true);
        return true;
      } else {
        return false;
      }
    });

    if (!isFind) {
      readDone(null, reqFilename);
    }
  };
}

module.exports = serverApi;
