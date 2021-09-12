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

  const timeout = (ms) => {
    return new Promise( res => setTimeout(res, ms))
  }

  const voteAnecdote = async (id, anecdote) => {
    const voteReturn = vote(id)
    dispatch(voteReturn)
    dispatch(setNotification('You voted for "' + anecdote + '"'))
    await timeout(5000);
    dispatch(emptyNotification())
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
            <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

export default AnecdoteList