import React from 'react'
import './App.css'
import Operations from './components/Operations/Operations'
import InputOutput from './components/InputOutput/InputOutput'
import CurrentOperations from './components/CurrentOperations/CurrentOperations'

// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host('ws://localhost:8080')

function showLog(msg: string) {
  console.log(msg)
}
window.eel.expose(showLog, 'show_log')

export const App = () => {
  return (
    <div
      className='grid grid-cols-3 
                    w-full h-screen
                    divide-x-4'
    >
      <Operations />
      <CurrentOperations />
      <InputOutput />
    </div>
  )
}

export default App
