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
      return state.map((anecdote) => {if (anecdote.id === action.data.id) {
        return(action.data)
      } else { return(anecdote)}})
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (anecdote) => {
  anecdote = {...anecdote, votes: anecdote.votes + 1}
  return async dispatch => {
    await anecdotesService.updateAnecdote(anecdote)
    dispatch ({
      type: 'VOTE_ANECDOTE',
      data: anecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.addAnecdote(content)
    dispatch ({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer