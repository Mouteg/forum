import {
  REGISTER_START,
  REGISTER_END,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

  CLEAR_SUCCESS_MESSAGE
} from './constants'

const initialState = {
  registerSuccess: false,
  errorMsg: null,
  registering: false
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return Object.assign({}, state, {
        registering: true
      })

    case REGISTER_SUCCESS:
      return Object.assign({}, initialState, {
        registerSuccess: true,
        registering: false,
        errorMsg: null
      })

    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        registerSuccess: false,
        registering: false,
        errorMsg: action.payload
      })

    case CLEAR_SUCCESS_MESSAGE:
      return Object.assign({}, initialState, {
        registerSuccess: false
      })

    default:
      return state
  }
}
