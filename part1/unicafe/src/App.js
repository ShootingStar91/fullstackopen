import React, { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const avg_points = (props.good - props.bad) / total
  const positive = props.good / total * 100
  return (
    <div>
      <p>All: {total}</p>
      <p>Average: {avg_points}</p>
      <p>Positive: {positive} %</p>
    </div>
  )
}

const Display = (props) => (
  <div>
    <p>Good: {props.good}</p>
    <p>Neutral: {props.neutral}</p>
    <p>Bad: {props.bad}</p>
    
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Display good={good} neutral={neutral} bad={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App