import axios, { AxiosResponse } from 'axios'
import { AxiosPromise } from 'axios'

const baseURL =  '/api/v1'

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json, x-access-token',
    'Content-type': 'application/json',
  },
})

export type ApiReturnType = {
  success: boolean
  message: string
  errors: any
  body: Record<string, any>
}

const req = (reqPromise): AxiosPromise<ApiReturnType> => {
  return reqPromise
    .then((res) => {
      res.config.data = {}
      return res
    })
    .catch((err) => {
      if (err.response) err.message = err.response.data.message
      return err
    })
}

export default {
  req,
  apiClient,
}

apiClient.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('x-access-token')) {
      config.headers['x-access-token'] = localStorage.getItem('x-access-token')
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  function (response: AxiosResponse<ApiReturnType>) {
    if (response.data.success) {
      const accessToken = response.data.body.accessToken
      if (accessToken) {
        window.localStorage.setItem('x-access-token', accessToken.accessToken)
        window.localStorage.setItem('x-token-expire', accessToken.expireTime)
      }
      //TODO: HandleSuccess
    } else {
      // TODO: HandleFailure
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
