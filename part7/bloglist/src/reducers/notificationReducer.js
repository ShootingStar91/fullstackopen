

export const setNotification = (msg, seconds) => {

  return async dispatch => {

    const id = setTimeout(() => {
      dispatch({ type: 'EMPTY_NOTIFICATION' })
    }, seconds * 1000)

    dispatch( { type: 'SET_NOTIFICATION',
      data: {
        msg: msg,
        id: id
      }
    })

  }

}


export const emptyNotification = () => {
  return {
    type: 'EMPTY_NOTIFICATION'
  }
}





const notificationReducer = (state = { msg: 'Initial notification', timeout_id: null }, action) => {
  //console.log("notificationReducer STATE: ", state, " ACTION: ", action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    if (state.id) {
      clearTimeout(state.id)
    }
    return action.data
  case 'EMPTY_NOTIFICATION':
    return { timeout_id: null, msg: '' }
  default:
    return state
  }
}









export default notificationReducer



