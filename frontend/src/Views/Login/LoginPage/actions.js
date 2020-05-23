import history from 'MyHistory'
import {
  LOGIN_START,
  LOGIN_END,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  CLEAR_SUCCESS_MESSAGE
} from './constants'

import { logIn } from './api'

/**
 * Log In
 * @param  {String} userName
 * @param  {String} passwrd
 * @return {action}
 */
export const loginUser = (userName, passwrd) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START })

    // validate inputs

    let validated = true

    if (userName === null || userName.length === 0) {
      validated = false
      return dispatch({
        type: LOGIN_FAILURE,
        payload: 'error.login.username.isEmpty'
      })
    }

    if (passwrd === null || passwrd.length === 0) {
      validated = false
      return dispatch({
        type: LOGIN_FAILURE,
        payload: 'error.login.password.isEmpty'
      })
    }

    // make api call if data is validated
    if (validated) {
      logIn({
        username: userName,
        passwordHash: passwrd
      }).then(
        (data) => {
          dispatch({ type: LOGIN_SUCCESS })
          setTimeout(() => { dispatch({ type: CLEAR_SUCCESS_MESSAGE }) }, 2000)

          // issue a redirect to /
          history.push(`/`)
        },
        (error) => {

          if (error.message == "Request failed with status code 403") {
            dispatch({
              type: LOGIN_FAILURE,
              payload: 'error.login.403'
            })
          }
          else {
            dispatch({
              type: LOGIN_FAILURE,
              payload: error
            })
          }
        }
      )
    }
  }
}