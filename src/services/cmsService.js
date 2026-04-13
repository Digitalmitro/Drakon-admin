import axios from 'axios'
import API_BASE_URL from '../config/api'

const baseUrl = API_BASE_URL.replace(/\/+$/, '')

const buildUrls = (resource, id) => {
  const safeResource = String(resource || '').replace(/^\/+/, '')
  const suffix = id ? `/${id}` : ''

  return [
    `${baseUrl}/${safeResource}${suffix}`,
    `${baseUrl}/cms/${safeResource}${suffix}`,
  ]
}

const callWithFallback = async (method, resource, { id, data } = {}) => {
  const urls = buildUrls(resource, id)
  let lastError

  for (const url of urls) {
    try {
      return await axios({ method, url, data })
    } catch (error) {
      lastError = error
      if (error?.response?.status !== 404) {
        throw error
      }
    }
  }

  throw lastError
}

const normalizeList = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (payload?.data) {
    return [payload.data]
  }

  return []
}

export const fetchCmsList = async (resource) => {
  const response = await callWithFallback('get', resource)
  return normalizeList(response.data)
}

export const fetchCmsById = async (resource, id) => {
  const response = await callWithFallback('get', resource, { id })
  return response.data?.data || response.data
}

export const upsertCms = async (resource, payload) => {
  const response = await callWithFallback('post', resource, { data: payload })
  return response.data
}

export const patchCms = async (resource, id, payload) => {
  const response = await callWithFallback('patch', resource, {
    id,
    data: payload,
  })
  return response.data
}

export const putCms = async (resource, id, payload) => {
  const response = await callWithFallback('put', resource, {
    id,
    data: payload,
  })
  return response.data
}

export const deleteCms = async (resource, id) => {
  const response = await callWithFallback('delete', resource, { id })
  return response.data
}

export const getFirstCmsEntry = async (resource) => {
  const list = await fetchCmsList(resource)
  return list[0] || null
}
