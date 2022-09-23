import { RootState } from '../store'

export const getInputText = (state: RootState) => {
	return state.fieldsReducer.inputText
}

export const getDisplayText = (state: RootState) => {
	return state.fieldsReducer.displayText
}

export const getCallbacksMap = (state: RootState) => {
	return state.fieldsReducer.callbacksMap
}

export const getCurrentCallbacks = (state: RootState) => {
	return state.fieldsReducer.currentCallbacks
}
