

export const setNotification = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    data: msg
  }
}


export const emptyNotification = () => {
  return {
    type: 'EMPTY_NOTIFICATION'
  }
}






const notificationReducer = (state = 'Initial notification', action) => {
  //console.log("notificationReducer STATE: ", state, " ACTION: ", action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'EMPTY_NOTIFICATION':
      return ''
    default:
      return state
  }
}









export default notificationReducer



