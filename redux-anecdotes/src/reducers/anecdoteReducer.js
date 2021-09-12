import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const sortByVotes = (anecdotes) => {
  console.log("sort: ", anecdotes)
  return anecdotes.sort((prev, next) => {
    const diff = prev.votes - next.votes
    if (diff > 0) {
      return -1
    } else if (diff < 0) {
      return 1
    }
    return 0
  })
}


const anecdoteReducer = (state = [], action) => {
  console.log("anecdoteReducer STATE: ", state, " ACTION: ", action)
  switch(action.type) {
    case 'VOTE_ANECDOTE':
      return state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          return {...anecdote, votes: anecdote.votes + 1}
        } else {
          return (anecdote)
        }})
    case 'ADD_ANECDOTE':
      
      return [...state, action.data]
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'ADD_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  console.log("initializeAnecdotes, data: ", anecdotes)
  return {
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer