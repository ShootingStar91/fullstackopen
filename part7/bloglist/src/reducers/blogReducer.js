import blogService from '../services/blogs'
import { triggerError, triggerSuccess } from './notificationReducer'

export const addBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.postBlog(title, author, url)
      dispatch(triggerSuccess('Successfully posted blog'))
      dispatch({
        type: 'ADD_BLOG',
        data: newBlog
      })
    } catch (exception) {
      let error_msg = 'Error posting blog!'
      if (exception.response.status === 400) {
        error_msg = 'Could not post blog. Title and url are required!'
      } else if (exception.response.status === 401) {
        error_msg = 'Invalid login token. Please logout and then login again.'
      } else {
        error_msg = 'Could not post blog. Error unknown.'
      }
      dispatch(triggerError(error_msg))
    }
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((first, second) => {
      if(first.likes > second.likes) {
        return -1
      } else if (first.likes < second.likes) {
        return 1
      } else {
        return 0
      }
    })
    console.log('init blogs dispatching INIT BLOGS')
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  console.log('BLOG INSIDE likeBlog action ')
  console.log(blog)
  return async dispatch => {
    try {
      await blogService.likeBlog(blog.id, blog.likes)
      dispatch(triggerSuccess('Liked blog'))
      dispatch({ type: 'LIKE_BLOG', data: blog.id })
    } catch (exception) {
      dispatch(triggerError('Error liking blog'))
      console.log('like blog error: ')
      console.log(exception)
    }
    dispatch(initBlogs())
  }
}

export const deleteBlog = (blog) => {
  if (!window.confirm(
    'Are you sure you want to delete: ' + blog.title
  )
  ) return

  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch(triggerSuccess('Blog deleted successfully'))
      dispatch({ type: 'DELETE BLOG', data: blog.id })
    } catch (exception) {
      dispatch(triggerError('Error deleting blog'))
    }
    dispatch(initBlogs())
  }
}


const blogReducer = (state = [], action) => {
  console.log('blogReducer')
  console.log(state, action)
  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    state.forEach(blog => {
      if (blog.id === action.data) {
        blog.likes += 1
      }
    })
    return [...state]
  case 'DELETE_BLOG':
    state = state.filter(blog => blog.id !== action.data)
    return [...state]
  default:
    return state
  }
}

export default blogReducer