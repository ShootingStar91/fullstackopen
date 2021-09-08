import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
  author: 'Hermione Granger',
  title: 'House-elves are slaves, stop using them!',
  url: 'http://hermionenblogi.fi',
  likes: 213
}


test('renders author and title only', () => {

  const postBlog = jest.fn()

  const component = render(<BlogForm postBlog={postBlog}/>)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)


  expect(postBlog.mock.calls).toHaveLength(1)
  expect(postBlog.mock.calls[0][0]).toBe(blog.title)
  expect(postBlog.mock.calls[0][1]).toBe(blog.author)
  expect(postBlog.mock.calls[0][2]).toBe(blog.url)
  



})

