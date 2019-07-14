import 'whatwg-fetch';

export default (type = 'GET', url = '', data: any = {}, old: any) => {
  return new Promise((resolve, reject) => { // 返回一个promise
    type = type.toUpperCase();
    const requestObj: any = {
      credentials: 'include',
      method: type,
      headers: {
      }
    };

    requestObj.headers['Content-Type'] = 'application/json;charset=UTF-8';

    if (type === 'GET') {
      let dataStr = ''; // 数据拼接字符串
      Object.keys(data).forEach(key => {
        if (data[key]) {
          dataStr += key + '=' + data[key] + '&';
        }
      });
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    } else if (type === 'POST') {
      Object.defineProperty(requestObj, 'body', {
        value: JSON.stringify(data)
      });
    } else {
      reject('error type');
    }

    fetch(url, requestObj).then((res: any) => {
      if (res.status === 401) {
        reject(res);
      } else if (res.status === 400) {
        reject(res);
      } else if (res.status === 302) {
        reject(res);
      } else {
        return res.json();
      }
    }).then((json: any) => {
      resolve(json);
    }).catch(err => {
      reject(err);
    });
  });
};
