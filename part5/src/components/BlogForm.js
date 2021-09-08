import { React, useState } from 'react'


const BlogForm = ({
  postBlog
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postBlog(title, author, url)
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <p>Title: <input id='title' onChange={handleTitleChange} /></p>
        <p>Author: <input id='author' onChange={handleAuthorChange} /></p>
        <p>Url: <input id='url' onChange={handleUrlChange} /></p>
        <p><button id='post-blog-button' type="submit">Post blog</button></p>

      </form>
    </div>
  )
}

export default BlogForm