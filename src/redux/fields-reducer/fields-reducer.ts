import { InferAction, InferThunk } from '../store'

const initialState = {
  inputText: '',
  displayText: '',
  currentOperations: [] as string[],
  operationsMap: {
    'Base 64 encrypt': 'base64Encrypt',
    'Base 64 decrypt': 'base64Decrypt',
    'Morse encrypt': 'morseEncrypt',
    'Morse decrypt': 'morseDecrypt',
    Rot13: 'rot13',
    Rot47: 'rot47',
  },
}

export type FieldsReducerState = typeof initialState

type FieldsAction = InferAction<typeof fieldsActions>

type FieldsThunk = InferThunk<FieldsAction>

const fieldsReducer = (state = initialState, action: FieldsAction): FieldsReducerState => {
  switch (action.type) {
    case 'SWISS_KNIFE/FIELDS_REDUCER/SET_INPUT_TEXT':
    case 'SWISS_KNIFE/FIELDS_REDUCER/SET_DISPLAY_TEXT':
      return {
        ...state,
        ...action.payload,
      }
    case 'SWISS_KNIFE/FIELDS_REDUCER/PUSH_TO_OPERATIONS':
      return {
        ...state,
        currentOperations: [...state.currentOperations, action.operation],
      }
    case 'SWISS_KNIFE/FIELDS_REDUCER/FILTER_FROM_OPERATIONS':
      return {
        ...state,
        currentOperations: state.currentOperations.filter(
          (operation: string, index: number) => index !== action.index,
        ),
      }
    case 'SWISS_KNIFE/FIELDS_REDUCER/RESET_OPERATIONS':
      return {
        ...state,
        currentOperations: [],
      }
    default:
      return state
  }
}

export const fieldsActions = {
  setInputText: (inputText: string) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/SET_INPUT_TEXT',
      payload: { inputText },
    } as const),
  setDisplayText: (displayText: string) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/SET_DISPLAY_TEXT',
      payload: { displayText },
    } as const),
  pushToOperations: (operation: string) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/PUSH_TO_OPERATIONS',
      operation,
    } as const),

  filterFromOperations: (index: number) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/FILTER_FROM_OPERATIONS',
      index,
    } as const),

  resetOperations: () =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/RESET_OPERATIONS',
    } as const),
}

export const transformText = (): FieldsThunk => {
  return async (dispatch, getState) => {
    const currentOperations = getState().fieldsReducer.currentOperations
    const text = getState().fieldsReducer.inputText

    let transformed = text

    for (const operation of currentOperations) {
      transformed = await window.eel[operation](transformed)()
    }
    dispatch(fieldsActions.setDisplayText(transformed))
  }
}

export const setText = (text: string): FieldsThunk => {
  return async (dispatch, getState) => {
    dispatch(fieldsActions.setInputText(text))
    dispatch(transformText())
  }
}

export default fieldsReducer
