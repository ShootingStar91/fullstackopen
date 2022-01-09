import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const ShowErrormsg = ({ message }) => {
  if (message === null || message === '') {
    return null
  }
  return <div id='error-notification' className="error">{message}</div>
}

const ShowSuccessmsg = ( { message } ) => {
  if (message === null || message === '') {
    return null
  }
  return <div id='success-notification' className="success">{message}</div>
}

const LoginPage = (props) => {
  return (
    <div>
      <h2>Login to bloglist app</h2>
      <form onSubmit={props.tryLogin}>
        <p>Username <input id="username" onChange={props.handleUsernameChange} />
        </p>
        <p>
          Password <input id="password" type="password" onChange={props.handlePasswordChange} />
        </p>
        <p>
          <button id="login-button" type="submit">Log in</button>
        </p>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormsg, setErrormsg] = useState('')
  const [successmsg, setSuccessmsg] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const triggerError = (message) => {
    setErrormsg(message)
    setTimeout(() => {
      setErrormsg('')
    }, 5000)
  }


  const triggerSuccess = (message) => {
    setSuccessmsg(message)
    setTimeout(() => {
      setSuccessmsg('')
    }, 5000)
  }
  const refreshBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((first, second) => {
        if(first.likes > second.likes) {
          return -1
        } else if (first.likes < second.likes) {
          return 1
        } else {
          return 0
        }
      })
      setBlogs( blogs )
    })
  }
  useEffect(() => {
    refreshBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const tryLogin = async (event) => {
    event.preventDefault()
    console.log('Attempting to log in...')
    try {
      const user = await loginService.tryLogin(username, password)
      blogService.setToken(user.token)

      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      triggerSuccess('Login successful')
    } catch (exception) {
      triggerError('Login failed')
    }
  }

  const tryLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    triggerSuccess('Logged out.')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const submitBlog = async (title, author, url) => {
    try {
      await blogService.postBlog(title, author, url)
      triggerSuccess('New blog posted successfully')
      refreshBlogs()
      setBlogFormVisible(false)
    } catch (exception) {
      if (exception.response.status === 400) {
        triggerError('Could not post blog. Title and url are required!')
      } else if (exception.response.status === 401) {
        triggerError('Invalid login token. Please logout and then login again.')
      } else {
        triggerError('Could not post blog. Error unknown.')
      }
    }

  }

  const likeButtonClicked = (blog) => {

    try {
      blogService.likeBlog(blog.id, blog.likes)
      refreshBlogs()
      triggerSuccess('Liked blog')
    } catch (exception) {
      triggerError('Error with like button')
      console.log(exception.response)
    }
  }

  const deleteButtonClicked = async (blog) => {
    if (!window.confirm(
      'Are you sure you want to delete: ' + blog.title
    )
    ) return
    try {
      await blogService.deleteBlog(blog.id)
      refreshBlogs()

      triggerSuccess('Blog deleted')
    } catch (exception) {
      triggerError('Error with deleting blog')
    }
  }

  const loginPage = () => {
    return (
      <LoginPage
        tryLogin={tryLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange} />)
  }



  const loggedInPage = () => {
    return (<div>
      <div>
        <h2>Blogs</h2>
        <p>{user.name} is logged in. <button id='logout-button' onClick={tryLogout}>Logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeButtonClicked={likeButtonClicked}
            deleteButtonClicked={deleteButtonClicked} />
        )}
      </div>
      {
        blogFormVisible ? <div><BlogForm postBlog={submitBlog}/>
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



  return (
    <div>
      <ShowErrormsg message={errormsg} />
      <ShowSuccessmsg message={successmsg} />
      {user === null ?
        loginPage() :
        loggedInPage() }
    </div>
  )
}

export default App