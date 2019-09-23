import fetch from 'isomorphic-fetch'
import { HTTP_STATUS, COMMON_STATUS } from 'consts/statusCode'
import { genUrl, encodeParam } from 'common/service/url'

const METHOD_GET = 'GET'
const METHOD_POST = 'POST'

const commonFetch = (api, config = {}) => {
  return fetch(api, config)
}

export async function fetchJson(api, config) {
  const COMMON_ERROR_MESSAGE = '出错了，请稍后再试...'
  /* eslint-disable no-throw-literal */
  try {
    let response = await commonFetch(api, config)
    if (response.status === HTTP_STATUS.AUTHENTICATE) {
      throw { status: COMMON_STATUS.AUTH_FAILED, data: null, message: '认证错误' }
    } else if (response.status === HTTP_STATUS.CLIENT_ERROR) {
      throw { status: COMMON_STATUS.CLIENT_ERROR, data: null, message: COMMON_ERROR_MESSAGE }
    } else if (response.status === HTTP_STATUS.SERVER_ERROR) {
      throw { status: COMMON_STATUS.EXCEPTION, data: null, message: COMMON_ERROR_MESSAGE }
    } else if (response.status !== 200) {
      throw { status: response.status, data: null, message: COMMON_ERROR_MESSAGE }
    }
    response = await response.json()
    let res = response || { status: COMMON_STATUS.EXCEPTION, message: COMMON_ERROR_MESSAGE }
    // 转化后台返回的数据 res key值
    const { code, msg, data } = res
    res = Object.assign({}, { status: code, message: msg, data })
    return res
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`错误类型：${err.name}，错误信息：${err.message}`)
    }
    throw err
  }
}

export const fetchApi = (url, params, options) => {
  let cfg = {
    method: METHOD_GET,
    credentials: 'same-origin',
  };
  // is_web 标识为新的接口，方便后台
  let thisParams = { ...params, is_web: 1 }
  let fetchUrl = genUrl(url, thisParams)
  return fetchJson(fetchUrl, Object.assign({}, cfg, options))
}

export const postApi = (url, data, options) => {
  let thisParams = { ...data, is_web: 1 }
  let cfg = {
    method: METHOD_POST,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(thisParams),
  }
  return fetchJson(url, Object.assign({}, cfg, options))
}

export const postFormData = (url, data, options) => {
  let cfg = {
    method: METHOD_POST,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeParam(data),
  }
  return fetchJson(url, Object.assign({}, cfg, options))
}
