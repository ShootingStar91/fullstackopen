const seconds = 10

export const triggerSuccess = (msg) => {
  console.log('trigger success called')
  return async dispatch => {

    const id = setTimeout(() => {
      dispatch({ type: 'EMPTY_SUCCESS' })
    }, seconds * 1000)

    dispatch({ type: 'SET_SUCCESS',
      data: {
        msg: msg,
        success_id: id
      }
    })

  }

}

export const triggerError = (msg) => {
  console.log('trigger error called')

  return async dispatch => {

    const id = setTimeout(() => {
      dispatch({ type: 'EMPTY_ERROR' })
    }, seconds * 1000)

    dispatch({ type: 'SET_ERROR',
      data: {
        msg: msg,
        error_id: id
      }
    })

  }

}


export const emptySuccess = () => {
  return {
    type: 'EMPTY_SUCCESS'
  }
}


export const emptyError = () => {
  return {
    type: 'EMPTY_ERROR'
  }
}





const notificationReducer = (state = { success_msg: '',
  error_msg: '', success_timeout_id: null, error_timeout_id: null }, action) => {
  console.log('notificationReducer STATE: ', state, ' ACTION: ', action)
  switch (action.type) {
  case 'SET_SUCCESS':
    if (state.success_id) {
      clearTimeout(state.success_id)
    }
    return { success_msg: action.data.msg, success_timeout_id: action.data.id,
      error_msg: state.error_msg, error_timeout_id: state.error_timeout_id }
  case 'SET_ERROR':
    if (state.error_id) {
      clearTimeout(state.error_id)
    }
    return { error_msg: action.data.msg, error_timeout_id: action.data.id,
      success_msg: state.error_msg, success_timeout_id: state.error_timeout_id }
  case 'EMPTY_SUCCESS':
    return { success_timeout_id: null, success_msg: '', error_msg: state.error_msg, error_timeout_id: state.error_timeout_id }
  case 'EMPTY_ERROR':
    return { error_timeout_id: null, error_msg: '', success_msg: state.success_msg, success_timeout_id: state.success_timeout_id }
  default:
    return state
  }
}









export default notificationReducer



