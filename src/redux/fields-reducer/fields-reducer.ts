import { InferAction, InferThunk } from '../store'

const initialState = {
  inputText: '',
  displayText: '',
  currentCallbacks: [] as string[],
  callbacksMap: {
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
    case 'SWISS_KNIFE/FIELDS_REDUCER/PUSH_TO_CALLBACKS':
      return {
        ...state,
        currentCallbacks: [...state.currentCallbacks, action.callback],
      }
    case 'SWISS_KNIFE/FIELDS_REDUCER/FILTER_FROM_CALLBACKS':
      return {
        ...state,
        currentCallbacks: state.currentCallbacks.filter(
          (callback: string, index: number) => index !== action.index,
        ),
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
  pushToCallbacks: (callback: string) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/PUSH_TO_CALLBACKS',
      callback,
    } as const),

  filterFromCallbacks: (index: number) =>
    ({
      type: 'SWISS_KNIFE/FIELDS_REDUCER/FILTER_FROM_CALLBACKS',
      index,
    } as const),
}

export const transformText = (): FieldsThunk => {
  return async (dispatch, getState) => {
    const currentCallbacks = getState().fieldsReducer.currentCallbacks
    const text = getState().fieldsReducer.inputText

    let transformed = text

    for (const callback of currentCallbacks) {
      transformed = await window.eel[callback](transformed)()
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
