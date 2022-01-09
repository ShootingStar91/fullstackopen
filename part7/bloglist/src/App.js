import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { triggerError, triggerSuccess } from './reducers/notificationReducer'
import { connect } from 'react-redux'

const ShowErrormsg = () => {
  const message = useSelector(state => state.error_msg)
  console.log('Message in showerrormsg: ')
  console.log(message)
  if (message === null || message === '') {
    return null
  }
  return <div id='error-notification' className="error">{message}</div>
}

const ShowSuccessmsg = () => {
  const message = useSelector(state => state.success_msg)
  console.log('Message in showsuccessmsg: ')
  console.log(message)

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

const RawApp = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
      props.triggerSuccess('Login successful')
    } catch (exception) {
      props.triggerError('Login failed')
    }
  }

  const tryLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    props.triggerSuccess('Logged out.')
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
      console.log('Calling trigger success')
      props.triggerSuccess('New blog posted successfully')
      refreshBlogs()
      setBlogFormVisible(false)
    } catch (exception) {
      if (exception.response.status === 400) {
        props.triggerError('Could not post blog. Title and url are required!')
      } else if (exception.response.status === 401) {
        props.triggerError('Invalid login token. Please logout and then login again.')
      } else {
        props.triggerError('Could not post blog. Error unknown.')
      }
    }

  }

  const likeButtonClicked = (blog) => {

    try {
      blogService.likeBlog(blog.id, blog.likes)
      refreshBlogs()
      props.triggerSuccess('Liked blog')
    } catch (exception) {
      props.triggerError('Error with like button')
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

      props.triggerSuccess('Blog deleted')
    } catch (exception) {
      props.triggerError('Error with deleting blog')
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
      <ShowErrormsg />
      <ShowSuccessmsg />
      {user === null ?
        loginPage() :
        loggedInPage() }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state
  }
}

const App = connect(mapStateToProps, { triggerSuccess, triggerError })(RawApp)

export default App