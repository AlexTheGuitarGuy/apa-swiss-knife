import React, { ReactNode } from 'react'
import './App.css'
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks'
import CallbackCard from './components/CallbackCard/CallbackCard'
import { fieldsActions, setText, transformText } from './redux/fields-reducer/fields-reducer'
import {
  getDisplayText,
  getCallbacksMap,
  getCurrentCallbacks,
} from './redux/fields-reducer/fields-selector'

import { getKeyByValue } from './utils/object-helpers'

// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host('ws://localhost:8080')

function showLog(msg: string) {
  console.log(msg)
}
window.eel.expose(showLog, 'show_log')

export const App = () => {
  const displayText = useAppSelector(getDisplayText)
  const callbacksMap = useAppSelector(getCallbacksMap)
  const currentCallbacks = useAppSelector(getCurrentCallbacks)

  const dispatch = useAppDispatch()

  const callbackButtons: ReactNode[] = []

  for (const [key, value] of Object.entries(callbacksMap)) {
    callbackButtons.push(
      <CallbackCard
        key={key}
        text={key}
        callback={() => {
          dispatch(fieldsActions.pushToCallbacks(value))
          dispatch(transformText())
        }}
      />,
    )
  }

  const currentCallbackNodeList = currentCallbacks.map((callback: string, index: number) => {
    return (
      <li key={callback + index}>
        {getKeyByValue(callbacksMap, callback)}
        <button
          onClick={() => {
            dispatch(fieldsActions.filterFromCallbacks(index))
            dispatch(transformText())
          }}
          className='ml-4'
        >
          x
        </button>
      </li>
    )
  })

  return (
    <div>
      <input
        placeholder='introduce text'
        onChange={(event: any) => {
          dispatch(setText(event.target.value))
        }}
      />
      <input value={displayText || 'result will be shown here'} className='block' />

      {callbackButtons}

      <ul>{currentCallbackNodeList}</ul>
    </div>
  )
}

export default App
