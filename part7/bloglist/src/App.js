import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import { triggerError, triggerSuccess } from './reducers/notificationReducer'
import { tryLogin, logout, checkLogin } from './reducers/userReducer'
import { addBlog, initBlogs } from './reducers/blogReducer'
import { connect } from 'react-redux'

const ShowErrormsg = () => {
  const message = useSelector(state => state.notifications.error_msg)
  console.log('Message in showerrormsg: ')
  console.log(message)
  if (message === null || message === '') {
    return null
  }
  return <div id='error-notification' className="error">{message}</div>
}

const ShowSuccessmsg = () => {
  const message = useSelector(state => state.notifications.success_msg)
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
      <form onSubmit={props.handleLoginButton}>
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

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {props.users.map(user => <tr key={user.id}><th>{user.name}</th><th>{props.user.blogs.length}</th></tr>)}
      </table>
    </div>
  )
}

const RawApp = (props) => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  console.log('Blogs at start of App: ')
  console.log(blogs)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const refreshBlogs = () => {
    props.initBlogs()
  }

  useEffect(() => {
    refreshBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('Trying to login with ', username, ' ', password)
    props.tryLogin(username, password)
  }

  const submitBlog = async (title, author, url) => {
    props.addBlog(title, author, url)
    refreshBlogs()
    setBlogFormVisible(false)
  }


  const loginPage = () => {
    return (
      <LoginPage
        handleLoginButton={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange} />)
  }



  const loggedInPage = () => {
    return (<div>
      <div>
        <h2>Blogs</h2>
        <p>{user.name} is logged in. <button id='logout-button' onClick={() => props.logout()}>Logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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
    notifications: state.notification,
    blogs: state.blog,
    user: state.user
  }
}

const App = connect(mapStateToProps, { triggerSuccess, triggerError, addBlog, initBlogs, tryLogin, logout, checkLogin })(RawApp)

export default App