import { RootState } from '../store'

export const getInputText = (state: RootState) => {
	return state.fieldsReducer.inputText
}

export const getDisplayText = (state: RootState) => {
	return state.fieldsReducer.displayText
}

export const getOperationsMap = (state: RootState) => {
	return state.fieldsReducer.operationsMap
}

export const getCurrentOperations = (state: RootState) => {
	return state.fieldsReducer.currentOperations
}
