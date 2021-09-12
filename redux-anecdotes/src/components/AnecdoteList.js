import React from 'react'
import { vote, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification, emptyNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    console.log("anecdotelist, state: ", state)
    return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
  })
  const dispatch = useDispatch()

  const voteAnecdote = async (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification('You voted for "' + anecdote.content + '"', 5))
  }

  sortByVotes(anecdotes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

export default AnecdoteList