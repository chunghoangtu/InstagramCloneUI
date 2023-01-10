import { ApiInstance, abortRequest } from './apiInterceptor'

const buildFormData = (formData, params, parentKey) => {
  if (params && typeof params === 'object'
    && !(params instanceof Date) && !(params instanceof File) && !(params instanceof Blob)) {
    Object.keys(params).forEach(key => {
      buildFormData(formData, params[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else {
    const formValue = params === null ? '' : params
    formData.append(parentKey, formValue)
  }
}

const get = (url = '', additioncalConfigs = {}) => {
  return ApiInstance.get(url, additioncalConfigs)
}

const getWithSearchParams = (url = '', params = {}) => {
  const queryParams = (new URLSearchParams(params)).toString()
  return ApiInstance.get(`${url}?${queryParams}`)
}

const post = (url = '', params = {}) => {
  return ApiInstance.post(url, params)
}

const postWithFormData = (url = '', params = {}) => {
  const formData = new FormData()
  buildFormData(formData, params)
  return ApiInstance.post(url, formData)
}

const put = (url = '', params = {}) => {
  return ApiInstance.put(url, params)
}

const putWithFormData = (url = '', params = {}) => {
  const formData = new FormData()
  buildFormData(formData, params)
  return ApiInstance.put(url, formData)
}

const deleteRequest = (url = '', additioncalConfigs = {}) => {
  return ApiInstance.delete(url, additioncalConfigs)
}

export const ApiServices = {
  get,
  getWithSearchParams,
  post,
  postWithFormData,
  put,
  putWithFormData,
  deleteRequest,
  abortRequest
}
