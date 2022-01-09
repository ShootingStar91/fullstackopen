import React, { useState } from 'react'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

const Blogs = (
  props
) => {
  console.log('props inside blogs')
  console.log(props)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  if (!props.user) {
    return null
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {props.blogs.map(blog =>
            <tr key={blog.id}><td>
              <a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a>
            </td>
            </tr>
          )}
        </tbody>
      </Table>
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