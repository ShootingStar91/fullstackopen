import { React, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeButtonClicked, deleteButtonClicked }) => {

  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 6
  }

  const handleDeleteButton = () => {
    deleteButtonClicked(blog)
  }

  const handleLikeButton = () => {
    likeButtonClicked(
      blog
    )
    blog.likes += 1
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div><b>Title: </b> {blog.title} <button onClick={() => setVisible(false)}>Hide</button></div>
        <div><b>Author:</b> {blog.author}</div>
        <div><b>Url:   </b> {blog.url}</div>
        <div><b>Likes: </b> {blog.likes} <button onClick={handleLikeButton}>Like</button></div>
        {blog.user ?
          <div><b>Added by:</b> {blog.user.name}</div> :
          <div><b>Added by:</b> Data missing.</div>
        }
        <div><button onClick={handleDeleteButton}>Remove</button></div>
      </div>
    )
  }
  else
    return (
      <div>
        {blog.title} <button onClick={() => setVisible(true)}>Show</button>
      </div>
    )
}

Blog.propTypes = {
  blog: PropTypes.func.isRequired,
  likeButtonClicked: PropTypes.func.isRequired,
  deleteButtonClicked: PropTypes.func.isRequired
}

export default Blog