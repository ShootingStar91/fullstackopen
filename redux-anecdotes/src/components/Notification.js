
import React from 'react'
import { useSelector } from 'react-redux'
import { notificationReducer } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log("notification: ", notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === '') {
    return null
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification