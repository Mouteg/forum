import {
  LOGIN_START,
  LOGIN_END,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  CLEAR_SUCCESS_MESSAGE
} from './constants'

const initialState = {
  loginSuccess: false,
  errorMsg: null,
  loggingIn: false
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return Object.assign({}, state, {
        loggingIn: true
      })

    case LOGIN_SUCCESS:
      return Object.assign({}, initialState, {
        loginSuccess: true,
        loggingIn: false,
        errorMsg: null
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loginSuccess: false,
        loggingIn: false,
        errorMsg: action.payload
      })

    case CLEAR_SUCCESS_MESSAGE:
      return Object.assign({}, initialState, {
        loginSuccess: false
      })

    default:
      return state
  }
}
