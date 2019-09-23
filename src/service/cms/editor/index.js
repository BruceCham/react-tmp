import { fetchApi, postApi } from 'service/cms/http'

export const getJsonDataById = (id = '') => {
  return fetchApi(`/cms/webapi/api/${id}`)
}

export const saveJsonData = (data = {}) => {
  return postApi('/cms/webapi/api/sjc/edit', data)
}

export const addJsonData = (data = {}) => {
  return postApi('/cms/webapi/api/sjc/add', data)
}