
import axios from 'axios'

const url = "http://localhost:3001/persons"

const getAll = (callBack) => {
  let result = axios
                  .get(url)
                  .then(response => {
                    callBack(response.data)
                  })
  return result
}

const create = person => {
    const request = axios.post(url, person)
    return (request.then(response => response.data))
}

const deletePerson = (person_id, callBack, errorCallBack) => {
  const request = axios.delete(`${url}/${person_id}`)
  .then(response => {callBack()}).catch((error) => errorCallBack())
  return(request)
}

const update = person => {

  const request = axios.put(`${url}/${person.id}`, person)
  return (request)
}


export default {
    getAll, create, deletePerson, update
}