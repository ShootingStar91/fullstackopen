import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  author: 'Hermione Granger',
  title: 'House-elves are slaves, stop using them!',
  url: 'http://hermionenblogi.fi',
  likes: 213
}

const blogComponent =
  <Blog blog={blog} likeButtonClicked={() => {}} 
        deleteButtonClicked={() => {}}/>


test('renders author and title only', () => {

  const component = render(
    blogComponent
  )

  expect(component.container).toHaveTextContent(
    'House-elves are slaves, stop using them'
  )
  expect(component.container).toHaveTextContent(
    'Hermione Granger'
  )
  expect(component.container).not.toHaveTextContent(
    213
  )  
  expect(component.container).not.toHaveTextContent(
    'http://hermionenblogi.fi'
  )
})

test('clicking the show button calls event', () => {

const component = render(
  blogComponent
)
  const button = component.getByText('Show')

  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'House-elves are slaves, stop using them'
  )
  expect(component.container).toHaveTextContent(
    'Hermione Granger'
  )
  expect(component.container).toHaveTextContent('213')
  expect(component.container).toHaveTextContent('http://hermionenblogi.fi')

})

test('clicking like button of blog registers', () => {

  const mockHandlerLike = jest.fn()


  const component = render(
    <Blog blog={blog} likeButtonClicked={mockHandlerLike} 
      deleteButtonClicked={() => {}}/>

  )

  const showButton = component.getByText('Show')

  fireEvent.click(showButton)

  const likeButton = component.getByText('Like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandlerLike.mock.calls).toHaveLength(2)

})

