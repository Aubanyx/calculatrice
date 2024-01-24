import React from 'react'

function Display({ input, history }) {
  return (
    <div className="display">
      <div className="history">
        {history.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className="input">{input}</div>
    </div>
  )
}

export default Display
