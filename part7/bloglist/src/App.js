import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import User from './components/User'
import { triggerError, triggerSuccess } from './reducers/notificationReducer'
import { tryLogin, logout, checkLogin } from './reducers/userReducer'
import { addBlog, initBlogs } from './reducers/blogReducer'
import { connect } from 'react-redux'
import userService from './services/users'
import { Navbar, Nav } from 'react-bootstrap'

import {
  Routes,
  Route,
  Link
} from 'react-router-dom'

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
  console.log('LOGIN PAGE PROPS')
  console.log(props)
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
  console.log('PROPS INSIDE USERS COMPONENT:')
  console.log(props)
  if (!props.users || props.users.length < 1) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {props.users.map(user => <tr key={user.id}><td><a href={`/users/${user.id}`}>{user.name}</a></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

const BasePage = (
  props
) => {
  console.log('BASE PAGE props')
  console.log(props)

  if (!props.user) {
    return (
      <LoginPage
        handleLoginButton={props.handleLoginButton}
        handleUsernameChange={props.handleUsernameChange}
        handlePasswordChange={props.handlePasswordChange} />
    )
  }
  else {
    return (
      <Blogs
        handleSubmitBlogButton={props.handleSubmitBlogButton}
        handleLogoutButton={props.handleLogoutButton}
        user={props.user}
        blogs={props.blogs} />
    )
  }


}

const RawApp = (props) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  console.log('Blogs at start of App: ')
  console.log(blogs)

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

  useEffect(() => {
    userService.getAll().then(response => setUsers(response))
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLoginButton = (event) => {
    event.preventDefault()
    console.log('Trying to login with ', username, ' ', password)
    props.tryLogin(username, password)
  }

  const handleLogoutButton = (event) => {
    event.preventDefault()
    props.logout()
  }

  const handleSubmitBlogButton = async (title, author, url) => {
    props.addBlog(title, author, url)
    refreshBlogs()
  }

  console.log('USERS HERE')
  console.log(users)

  const basePageProps = {
    handleLoginButton,
    handleLogoutButton,
    handleSubmitBlogButton,
    handlePasswordChange,
    handleUsernameChange,
    user,
    blogs
  }

  const padding = {
    padding: 4
  }

  return (
    <div className="container">
      <ShowErrormsg />
      <ShowSuccessmsg />
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              { user ? <em>{user.name}logged in<button id='logout-button' onClick={handleLogoutButton}>Logout</button></em>: <Link to="/login">Login</Link> }
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/users/:id" element={<User user={user} blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/" element={<BasePage { ...basePageProps } />} />
      </Routes>
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