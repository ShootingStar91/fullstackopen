import axios from 'axios'
const baseUrl = '/api/login'

const tryLogin = (username, password) => {
  console.log('Trying login with ', username, ' ', password)
  const request = axios.post(baseUrl,
    { username: username, password: password })

  return request.then(response => {
    console.log('RESPONSE FROM tryLogin')
    console.log(response)
    return { username: username, token: response.data.token,
      name: response.data.name, id: response.data.id }
  })
}



const service = { tryLogin }

export default service