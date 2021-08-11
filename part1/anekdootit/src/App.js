import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const DisplayVotes = (props) => {
  let voteAmount = props.votes[props.selected]
  return (
    <p>Ääniä: {voteAmount}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const zero_votes = [0, 0, 0, 0, 0, 0, 0]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(zero_votes)
  const mostVoted = function(votes) {
    return votes.indexOf(Math.max.apply(null, votes))
  }
  

  console.log("Selected: " + selected)
  console.log("Votes: ")
  console.log(votes)
  return (
    <div>
      <h2>Satunnainen anekdootti</h2>
      <p>{anecdotes[selected]}</p>
      <p><Button clickHandler={() => setSelected(Math.floor(Math.random() * 7))} text="Uusi anekdootti"/></p>
      <DisplayVotes votes={votes} selected={selected}/>
      <p><Button clickHandler={() => {
          let new_votes = [...votes]
          new_votes[selected] += 1
          setVotes(new_votes)
        }
        } text="Äänestä"/></p>
      <h2>Suosituin anekdootti</h2>
      <p>{anecdotes[mostVoted(votes)]}</p>
    </div>
  )
}

export default App
