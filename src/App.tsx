import React, { useState } from 'react'
import './App.css'

// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host('ws://localhost:8080')

function show_log(msg: string) {
  console.log(msg)
}
window.eel.expose(show_log, 'show_log')

export const App = () => {
  const [inputValue, setInputValue] = useState('')

  const encode = (event: any) => {
    window.eel.base64_encode_js(inputValue)
  }

  const decode = (event: any) => {
    window.eel.base64_decode_js(inputValue)
  }

  return (
    <div>
      <input
        placeholder='introduce text'
        onChange={(event: any) => setInputValue(event.target.value)}
      />
      <button onClick={encode}>Encode</button>
      <button onClick={decode}>Decode</button>
    </div>
  )
}

export default App
