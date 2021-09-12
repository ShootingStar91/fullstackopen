import React from 'react'
import { vote, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {

  const voteAnecdote = async (anecdote) => {
    props.vote(anecdote)
    props.setNotification('You voted for "' + anecdote.content + '"', 5)
  }

  const anecdotes = () => {
    if (props.filter === '') {
      return props.anecdotes
    } else {
      return props.anecdotes.filter((dote) => dote.toLowerCaps().includes(props.filter.toLowerCaps()))
    }
  }

  sortByVotes(anecdotes())

  return (
    <div>
      {anecdotes().map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { setNotification, vote })(AnecdoteList)

export default ConnectedAnecdoteList