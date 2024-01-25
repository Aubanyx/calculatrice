import React, { useState, useEffect } from 'react'
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
        const validation = isValidExpression(input)
        if (!validation.valid) {
          throw new Error(validation.error)
        }

        const expression = input.replace(/,/g, '.').replace(/%/g, '/100')
        let result = evaluate(expression)

        // Assurez-vous que le résultat n'est pas undefined avant de convertir
        if (result !== undefined) {
          // Remplacer les points par des virgules pour la sortie
          result = result.toString().replace('.', ',')
          setHistory([...history, `${input} = ${result}`])
          setInput('')
        } else {
          throw new Error('Expression invalide')
        }
      } catch (error) {
        setInput(error.message) // Affiche le message d'erreur spécifique
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
    // Vérifie s'il y a des caractères non autorisés
    if (/[^0-9+\-*/(),.%]/.test(expression))
      return { valid: false, error: 'Caractères non valides' }

    // Vérifie si un nombre contient plus d'une virgule
    const parts = expression.split(/[+\-*/()]/) // Sépare par les opérateurs
    if (parts.some((part) => (part.match(/,/g) || []).length > 1)) {
      return { valid: false, error: 'Trop de virgule dans un nombre' }
    }

    // Vérifie les opérateurs consécutifs
    if (/[+\-*/]{2,}/.test(expression))
      return { valid: false, error: 'Opérateurs consécutifs' }

    // Vérifie si l'expression commence ou se termine par un opérateur
    if (/^[+\-*/.]|.*[+\-*/.]$/.test(expression))
      return { valid: false, error: 'Commence ou termine par un opérateur' }

    // Vérifie les parenthèses mal appariées
    if (!areParenthesesBalanced(expression))
      return { valid: false, error: 'Parenthèses mal appariées' }

    return { valid: true, error: '' }
  }

  const areParenthesesBalanced = (expression) => {
    const stack = []
    for (let char of expression) {
      if (char === '(') stack.push(char)
      else if (char === ')') {
        if (!stack.pop()) return false
      }
    }
    return stack.length === 0
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault() // Empêche le comportement par défaut du navigateur
      const key = event.key
      switch (key) {
        case 'Enter':
          if (input) {
            // Vérifiez si l'input n'est pas vide avant d'appeler handleButtonClick
            handleButtonClick('=')
          }
          break
        case 'Escape':
          handleButtonClick('C')
          break
        case 'Backspace':
          handleButtonClick('←')
          break
        case ',':
          handleButtonClick(',')
          break
        case '/':
          handleButtonClick('/')
          break
        case '*':
          handleButtonClick('*')
          break
        case '-':
          handleButtonClick('-')
          break
        case '+':
          handleButtonClick('+')
          break
        case '(':
          handleButtonClick('(')
          break
        case ')':
          handleButtonClick(')')
          break
        case '%':
          handleButtonClick('%')
          break
        default:
          if ('0123456789'.includes(key)) {
            handleButtonClick(key)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

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
