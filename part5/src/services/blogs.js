import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = 'bearer ' + newToken
}

const postBlog = (title, author, url) => {
  const request = axios.post(baseUrl, { title, author, url }, {
    headers: { Authorization: token }
  })
  return request.then(response => response.data)
}

const likeBlog = (id, likes) => {
  const request = axios.put(baseUrl + '/' + id, { likes: likes + 1 })
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const request = axios.delete(baseUrl + '/' + id, {
    headers: { Authorization: token }
  })
  return request.then(response => response.data)
}

const service = {
  getAll, setToken, postBlog, likeBlog, deleteBlog
}

export default service
