const delay = require('mocker-api/utils/delay')

const noProxy = process.env.NO_PROXY === 'true'
const proxy = {
  'POST /cms/webapi/api/sjc/add': { code: 200, msg: '添加成功', data: { name: '49a6ccb5', data: { code: 200, message: 'Hello World' } } },
  'GET /cms/webapi/api/49a6ccb5': { code: 200, msg: '获取成功', data: { code: 200, message: 'Hello World' } },
  'POST /cms/webapi/api/sjc/edit': { code: 200, msg: '获取成功', data: { name: '49a6ccb5', data: { code: 200, message: 'Hello World, BC' } } },
}

module.exports = (noProxy ? {} : delay(proxy, 1000));
