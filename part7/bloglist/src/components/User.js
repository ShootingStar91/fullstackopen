import React from 'react'
import { useParams } from 'react-router-dom'

const User = (props) => {
  const id = useParams().id
  console.log('User component props')
  console.log(props)
  if (!props.user) {
    return null
  }
  const usersBlogs = props.blogs.filter(blog => blog.user.id === id)
  console.log(usersBlogs)
  return (
    <div>
      <h2>Blogs added by {props.user.name}</h2>
      <ul>{usersBlogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  )
}

export default User