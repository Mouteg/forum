import history from 'MyHistory'
import {
  REGISTER_START,
  REGISTER_END,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

  CLEAR_SUCCESS_MESSAGE
} from './constants'

import { register, checkUsername, checkEmail } from './api'

/**
 * Log In
 * @param  {String} userName
 * @param  {String} passwrd
 * @param  {String} email
 * @return {action}
 */
export const registerUser = (userName, passwrd, email) => {
  const emailPattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
  const passwordPatterns = ["[0-9]", "[a-z]", "[A-Z]"]

  return async (dispatch) => {
    dispatch({ type: REGISTER_START })

    // validate inputs

    let validated = true

    if (userName === null || userName.length === 0) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.username.isEmpty'
      })
    }

    if (passwrd === null || passwrd.length === 0) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.password.isEmpty'
      })
    }

    if (email === null || email.length === 0) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.email.isEmpty'
      })
    }

    if (!email.match(emailPattern)) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.email.notValid'
      })
    }

    let check = (await checkUsername(userName)).data

    if (check) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.username.notFree'
      })
    }

    check = (await checkEmail(email)).data

    if (check) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.email.notFree'
      })
    }

    if (passwrd.length < 6) {
      validated = false
      return dispatch({
        type: REGISTER_FAILURE,
        payload: 'error.login.password.tooShort'
      })
    }

    passwordPatterns.forEach((pattern) => {
      if (!passwrd.match(pattern)) {
        validated = false
        return dispatch({
          type: REGISTER_FAILURE,
          payload: 'error.login.password.notValid'
        })
      }
    })

    // make api call if data is validated
    if (validated) {
      register({
        username: userName,
        email,
        passwordHash: passwrd
      }).then(
        (data) => {
          dispatch({ type: REGISTER_SUCCESS })
          setTimeout(() => { dispatch({ type: CLEAR_SUCCESS_MESSAGE }) }, 2000)

          // issue a redirect to /login
          history.push(`/login`)
        },
        (error) => {
          dispatch({
            type: REGISTER_FAILURE,
            payload: error
          })
        }
      )
    }
  }
}