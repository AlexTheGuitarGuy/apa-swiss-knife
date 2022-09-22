import React, { useState } from 'react'
import './App.css'

// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host('ws://localhost:8080')

function showLog(msg: string) {
  console.log(msg)
}
window.eel.expose(showLog, 'show_log')

export const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [text, setText] = useState('')

  const { base64Encrypt, base64Decrypt, morseEncrypt, morseDecrypt, rot13, rot47 } = eel

  const encrypt = (event: any, callback: any) => {
    callback(inputValue)().then((message: string) => setText(message))
  }

  const decrypt = (event: any, callback: any) => {
    callback(inputValue)().then((message: string) => setText(message))
  }

  return (
    <div>
      <input placeholder='introduce text' onChange={(e) => setInputValue(e.target.value)} />
      <div>{text || 'results will be shown here'}</div>
      <div className='bg-red-200'>
        Base 64
        <div className='space-x-4'>
          <button onClick={(e) => encrypt(e, base64Encrypt)}>Encode</button>
          <button onClick={(e) => decrypt(e, base64Decrypt)}>Decode</button>
        </div>
      </div>
      <div className='bg-orange-200'>
        Morse
        <div className='space-x-4'>
          <button onClick={(e) => encrypt(e, morseEncrypt)}>Encode</button>
          <button onClick={(e) => decrypt(e, morseDecrypt)}>Decode</button>
        </div>
      </div>
      <div className='bg-amber-200'>
        Rotation
        <div className='space-x-4'>
          <button onClick={(e) => encrypt(e, rot13)}>13</button>
          <button onClick={(e) => decrypt(e, rot47)}>47</button>
        </div>
      </div>
    </div>
  )
}

export default App
