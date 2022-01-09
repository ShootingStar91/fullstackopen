import { React } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = (props) => {
  const dispatch = useDispatch()
  const id = useParams().id
  console.log('BLOG PARAMS')
  console.log(props)
  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 6
  }
  const blog = props.blogs.find(blog => blog.id === id)
  if (!blog) {
    return null
  }
  return (
    <div style={blogStyle} data-cy='blog-root'>
      <div><b>Title: </b> {blog.title}</div>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog