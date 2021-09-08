import axios from 'axios'
const baseUrl = '/api/login'

const tryLogin = (username, password) => {
  console.log('Trying login with ', username, ' ', password)
  const request = axios.post(baseUrl,
    { username: username, password: password })

  return request.then(response => {
    return { username: username, token: response.data.token,
      name: response.data.name }
  })
}



const service = { tryLogin }

export default service