
import { triggerSuccess, triggerError } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

export const checkLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Found logged in with info ', loggedUserJSON)
      dispatch({ type: 'SET_USER', data: user })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({ type: 'LOGOUT_USER', data: null })
    dispatch(triggerSuccess('Logged out'))
  }
}

export const tryLogin = (username, password) => {
  return async dispatch => {
    try {
      console.log('TRYING LOGIN IN ACTION CREATOR')
      const user = await loginService.tryLogin(username, password)
      blogService.setToken(user.token)
      dispatch({ type: 'SET_USER', data: user })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(triggerSuccess('Login successful'))
    } catch (exception) {
      dispatch(triggerError('Login failed'))
    }
  }
}





const userReducer = (state = null, action) => {
  console.log('userReducer:')
  console.log(state, action)
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }

}

export default userReducer
