import React, { useState } from 'react'
import Display from './components/Display'
import Button from './components/Button'
import './assets/scss/reset.scss'
import './assets/scss/App.scss'

function App() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const result = eval(input)
        setHistory([...history, `${input} = ${result}`])
        setInput(String(result))
      } catch (error) {
        setInput('Erreur')
      }
    } else if (value === 'C') {
      setInput('')
    } else if (value === '←') {
      setInput(input.slice(0, -1))
    } else if (value === '%') {
      setInput(input + '/100')
    } else {
      setInput(input + value)
    }
  }

  // Exemple simple de boutons pour la calculatrice
  const buttons = [
    '←',
    'C',
    '(',
    ')',
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '%',
    '+',
    '=',
  ]

  return (
    <main className="app">
      <Display input={input} history={history} />
      <div className="button-grid">
        {buttons.map((btn, index) => (
          <Button key={index} onClick={handleButtonClick} text={btn} />
        ))}
      </div>
    </main>
  )
}

export default App
