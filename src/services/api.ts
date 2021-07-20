import client from './client'
const { req, apiClient } = client

export default {
  sayHello() {
    return req(apiClient.get('test/hello'))
  },
  LOGIN(payload) {
    return req(apiClient.post('auth/login', payload))
  },
}
