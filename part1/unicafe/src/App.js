import React, { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const avg_points = (props.good - props.bad) / total
  const positive = props.good / total * 100
  if (total === 0) {
    return <div><p>No feedback given</p></div>
  }
  return (
    <div>
          <table>
            <tbody>
          <StatisticLine name="All" value={total}/>
          <StatisticLine name="Average" value={avg_points}/>
          <StatisticLine name="Positive" value={positive}/>
          </tbody>
        </table>
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

const StatisticLine = (props) => {
  let valuetoprint = "" + props.value
  if (props.name === "Positive") {
    valuetoprint = props.value + " %"
  }
  return (
    <tr>
      <td>{props.name}</td>
      <td>{valuetoprint}</td>
    </tr>
  )
}

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
      <h2>Give feedback!</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Display good={good} neutral={neutral} bad={bad} />
      <h2>Statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App