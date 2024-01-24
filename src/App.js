import React, { useState } from 'react'
import { evaluate } from 'mathjs'
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
        // Validation de l'expression avant de l'évaluer
        if (isValidExpression(input)) {
          const expression = input.replace(/,/g, '.').replace(/%/g, '/100')
          const result = evaluate(expression)
          setHistory([...history, `${input} = ${result}`])
          setInput('')
        } else {
          throw new Error('Expression invalide')
        }
      } catch (error) {
        setInput('Expression invalide')
      }
    } else if (value === 'C') {
      setInput('')
    } else if (value === 'AC') {
      setInput('')
      setHistory([])
    } else if (value === '←') {
      setInput(input.slice(0, -1))
    } else {
      setInput(input + value)
    }
  }

  const isValidExpression = (expression) => {
    // Vérifier les virgules consécutives
    if (expression.includes(',,') || /[\+\-\*\/]{2,}/.test(expression)) {
      return false
    }
    return true
  }

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
    ',',
    '%',
    '+',
    'AC',
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
