import {
  START_FETCHING_FORUMS,
  STOP_FETCHING_FORUMS,
  FETCHING_FORUMS_SUCCESS,
  FETCHING_FORUMS_FAILURE,
  UPDATECURRENTFORUM,
  START_FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  CHANGE_LANG
} from './constants'

const initialState = {
  fetchingForums: false,
  forums: null,
  currentForum: 'general',
  error: false,
  lang: "en"
}

/**
 * reducer for top level app state
 */
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_FORUMS:
      return Object.assign({}, state, {
        fetchingForums: true
      })

    case STOP_FETCHING_FORUMS:
      return Object.assign({}, state, {
        fetchingForums: false
      })

    case FETCHING_FORUMS_SUCCESS: {
      const current = action.payload.length > 0 ? action.payload[0].slug : ''
      return Object.assign({}, state, {
        forums: action.payload,
        currentForum: current,
        fetchingForums: false,
        error: false
      })
    }

    case FETCHING_FORUMS_FAILURE:
      return Object.assign({}, state, {
        fetchingForums: false,
        error: 'error.forumFetch'
      })

    case UPDATECURRENTFORUM:
      return Object.assign({}, state, {
        currentForum: action.payload
      })

    case CHANGE_LANG:
      return Object.assign({}, state, {
        lang: action.payload
      })

    default:
      return state
  }
}

/**
 * reducer for user
 */
const initialUserState = {
  fetchingUser: true,
  authenticated: false,
  error: null,
  id: null,
  email: null,
  username: null,
  role: null
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case START_FETCHING_USER:
      return Object.assign({}, state, {
        fetchUser: true
      })

    case FETCHING_USER_SUCCESS:
      const {
        id,
        username,
        email,
        role
      } = action.payload

      return Object.assign({}, state), {
        fetchingUser: false,
        authenticated: true,
        error: null,
        id,
        username,
        email,
        role
      }

    case FETCHING_USER_FAILURE:
      return Object.assign({}, initialUserState, {
        fetchingUser: false,
        error: 'error.userFetch'
      })

    default:
      return state
  }
}
