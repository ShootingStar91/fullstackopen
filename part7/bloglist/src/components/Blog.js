import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ( { blog } ) => {
  const dispatch = useDispatch()
  console.log('blog inside blog')
  console.log(blog)
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 6
  }




  if (visible) {
    return (
      <div style={blogStyle} data-cy='blog-root'>
        <div><b>Title: </b> {blog.title} <button onClick={() => setVisible(false)}>Hide</button></div>
        <div><b>Author:</b> {blog.author}</div>
        <div><b>Url:   </b> {blog.url}</div>
        <div><b>Likes: </b> {blog.likes} <button data-cy='like-button' onClick={() => dispatch(likeBlog(blog))}>Like</button></div>
        {blog.user ?
          <div><b>Added by:</b> {blog.user.name}</div> :
          <div><b>Added by:</b> Data missing.</div>
        }
        <div><button data-cy='delete-button' onClick={() => dispatch(deleteBlog(blog))}>Remove</button></div>
      </div>
    )
  }
  else
    return (
      <div>
        {blog.title} {blog.author} <button data-cy='show-button' onClick={() => setVisible(true)}>Show</button>
      </div>
    )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog