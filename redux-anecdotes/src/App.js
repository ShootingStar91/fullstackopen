import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => { 
      anecdotesService
      .getAll()
      .then(anecdotes =>  {
        console.log("anecdotes: ", anecdotes)
        dispatch(initializeAnecdotes(anecdotes))
      }
      )
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <div>Filter: 
        <Filter />
      </div>
      <AnecdoteList />
      
      <AnecdoteForm />
    </div>
  )
}

export default App
