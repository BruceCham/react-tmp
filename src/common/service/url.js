import queryString from 'query-string'

// 参数以对象形式转化为序列化客串
export const encodeParam = (params) => {
  let paramArr = []
  Object.keys(params).forEach((key) => {
    if (typeof params[key] !== 'undefined') {
      paramArr.push(`${key}=${encodeURIComponent(params[key])}`)
    }
  })
  return paramArr.join('&')
}

// 拼接 地址加对象形式的参数
export const genUrl = (url, params) => {
  // let paramStr = encodeParam(params)
  let paramStr = queryString.stringify(params)
  if (paramStr.length > 0) {
    let splitChar = url.indexOf('?') === -1 ? '?' : '&'
    return url + splitChar + paramStr
  }
  return url
}
