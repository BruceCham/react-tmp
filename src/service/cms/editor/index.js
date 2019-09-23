import { fetchApi, postApi } from 'service/cms/http'

export const getJsonDataById = (id = '') => {
  return fetchApi(`webapi/cms/api/${id}`)
}

export const saveJsonData = (data = {}) => {
  return postApi('/webapi/cms/api/sjc/edit', data)
}

export const addJsonData = (data = {}) => {
  return postApi('/webapi/cms/api/sjc/add', data)
}