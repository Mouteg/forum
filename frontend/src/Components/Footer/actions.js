import {
  CHANGE_LANG
} from './constants'

export const setLanguage = (lang) => {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_LANG, payload: lang })
  }
}