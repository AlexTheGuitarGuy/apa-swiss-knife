import { InferAction, InferThunk } from '../store'

export type Operation = {
  type: string
  keyed: boolean
  key?: string
}

type OperationsMap = {
  keyless: { [name: string]: string }
  keyed: { [name: string]: string }
}
const initialState = {
  inputText: '',
  displayText: '',
  currentOperations: [] as Operation[],
  operationsMap: {
    keyless: {
      'To Base 64': 'base64Encrypt',
      'From Base 64': 'base64Decrypt',
      'To Morse': 'morseEncrypt',
      'From Morse': 'morseDecrypt',
      Rot13: 'rot13',
      Rot47: 'rot47',
    },
    keyed: {
      // below methods require keys
      'Vigenere Encode': 'vigenereEncode',
      'Vigenere Decode': 'vigenereDecode',
      'Caesar Encode': 'caesarEncode',
      'Caesar Decode': 'caesarDecode',
      'Transposition Encode': 'transpositionEncode',
      'Transposition Decode': 'transpositionDecode',
    },
  } as OperationsMap,
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
    case 'SWISS_KNIFE/FIELDS_REDUCER/UPDATE_KEY':
      const newOperations = state.currentOperations.map((operation, index) => {
        if (index !== action.index) return operation
        const newOperation = operation
        newOperation.key = action.key
        return newOperation
      })

      return {
        ...state,
        currentOperations: [...newOperations],
      }
    case 'SWISS_KNIFE/FIELDS_REDUCER/FILTER_FROM_OPERATIONS':
      return {
        ...state,
        currentOperations: state.currentOperations.filter(
          (operation, index) => index !== action.index,
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
  pushToOperations: (operation: Operation) =>
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
  updateKey: (index: number, key: string) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/UPDATE_KEY',
      index,
      key,
    } as const),
}

export const transformText = (): FieldsThunk => {
  return async (dispatch, getState) => {
    const currentOperations = getState().fieldsReducer.currentOperations

    let transformed = getState().fieldsReducer.inputText

    for (const { type, key, keyed } of currentOperations) {
      if (keyed) {
        if (!key) return
        transformed = await window.eel[type](transformed, key)()
      } else transformed = await window.eel[type](transformed)()
    }
    dispatch(fieldsActions.setDisplayText(transformed))
  }
}

export const setText = (text: string): FieldsThunk => {
  return async (dispatch) => {
    dispatch(fieldsActions.setInputText(text))
    dispatch(transformText())
  }
}

export default fieldsReducer
