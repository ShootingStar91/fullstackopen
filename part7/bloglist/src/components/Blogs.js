import React, { useState } from 'react'
import BlogForm from './BlogForm'

const Blogs = (
  props
) => {
  console.log('props inside blogs')
  console.log(props)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  if (!props.user) {
    return null
  }
  return (<div>
    <div>
      <h2>Blogs</h2>
      <p>{props.user.name} is logged in. <button id='logout-button' onClick={props.handleLogoutButton}>Logout</button></p>
      {props.blogs.map(blog =>
        <div key={blog.id}>
          <a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a>
        </div>
      )}
    </div>
    {
      blogFormVisible ? <div><BlogForm postBlog={props.handleSubmitBlogButton}/>
        <p>
          <button onClick={() => setBlogFormVisible(false)}>
          Cancel
          </button>
        </p>
      </div> :
        <div>
          <br/>
          <br/>
          <button id='show-blog-form-button' onClick={() => setBlogFormVisible(true)}>
        Add new blog
          </button>
        </div>
    }
  </div>)
}

export default Blogs