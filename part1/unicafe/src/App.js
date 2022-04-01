import { useState, useEffect } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0.0)
  const [positive, setPositive] = useState(0.0)

  // Set all and averages when anything is updated
  useEffect(() => {
    setAll(good + neutral + bad)
    // Don't show the average as a percentage, but as a decimal
    setAverage((good - bad) / all)
    setPositive(good / all * 100)
  })

  return (
    <div>
      {/* Feedback */}
      <Header text="give feedback" />
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      
      {/* Statistics */}
      <Header text="statistics"/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      ></Statistics>
    </div>
  )
}

export default App

// Header component
const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

// Statistics component
const Statistics = (props) => {
  // If there are more than one feedback, show the statistics
  if (props.all !== 0) {
  return (
    <div>
      <table>
        {/* Individual statistic entries */}
        <StatisticLine text="good" value={props.good}></StatisticLine>
        <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
        <StatisticLine text="bad" value={props.bad}></StatisticLine>
        <StatisticLine text="all" value={props.all}></StatisticLine>
        <StatisticLine text="average" value={props.average}></StatisticLine>
        <StatisticLine text="positive" value={props.positive}></StatisticLine>
      </table>
    </div>
  )
  }
  // If all is 0, then there are no statistics to show
  else {
    return <p>No feedback given</p>
  }
}

// StatisticLine component
const StatisticLine = (props) => {
  if(props.text === "positive") {
    // Show the percentage if the text is "positive" since that's the only percentage field
    return (
      <tr><td>{props.text}</td> <td>{props.value} %</td></tr>
    )
  } else {
  return (
    // Return a table row with the text and value in each data cell
    <tr><td>{props.text}</td> <td>{props.value}</td></tr>
  )}
}

// Button component
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}