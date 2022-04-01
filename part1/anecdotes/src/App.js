import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  // Create an array of points, where the value is initially 0, length of the array
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  // Selected anecdote
  const [selected, setSelected] = useState(0)
  // Highest voted anecdote
  const [highest, setHighest] = useState(0)

  // function to copy the points object and add 1 to the value of the index of the point that was clicked, then set the new points object
  const copy = (index_num) => {
    // Copy
    const newArray = [...points];
    // Add 1
    newArray[index_num] = newArray[index_num] + 1;
    // Set
    setPoints(newArray);
  }

  // function to find the highest voted anecdote when points array is updated
  useEffect(() => {
    // Find the highest voted anecdote
    const highest_num = Math.max(...points)
    // Set the highest anecdote
    setHighest(points.indexOf(highest_num))
  }, [points])

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>It has {points[selected]} votes</p>
      </div>

      <div>
        <button onClick={() => { copy(selected)}}>vote</button>
        <button onClick={() => random_anecdote()}>Next anecdote</button>
      </div>
      
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[highest]}</p>
        <p>It has {points[highest]} votes</p>
      </div>
    </div>
    
  )

  // Get a random number between 0 and the length of the anecdotes array
  function random_anecdote() {
  setSelected( Math.floor(Math.random() * anecdotes.length))
  }

}

export default App
