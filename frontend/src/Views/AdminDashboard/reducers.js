import {
  GET_ALL_INFO_START,
  GET_ALL_INFO_SUCCESS,
  GET_ALL_INFO_FAILURE,

  CREATE_FORUM,
  CREATE_FORUM_SUCCESS,
  CREATE_FORUM_FAILURE,

  DELETE_FORUM,
  DELETE_FORUM_SUCCESS,
  DELETE_FORUM_FAILURE
} from './constants'

const initialState = {
  loadingInfo: false,
  info: {
    discussionCount: 0,
    opinionCount: 0,
    forumCount: 0,
    userCount: 0,
    forums: []
  },
  error: null,

  creatingForum: false,
  creatingForumError: null,

  deletingForum: false,
  deletingForumError: null
}

export const adminInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INFO_START:
      return Object.assign({}, state, {
        loadingInfo: true,
        error: null
      })

    case GET_ALL_INFO_SUCCESS:
      return Object.assign({}, state, {
        loadingInfo: false,
        info: action.payload,
        error: null
      })

    case GET_ALL_INFO_FAILURE:
      return Object.assign({}, state, {
        loadingInfo: false,
        error: 'error.admin.loadInfo'
      })

    case CREATE_FORUM:
      return Object.assign({}, state, {
        creatingForumError: null,
        creatingForum: true
      })

    case CREATE_FORUM_SUCCESS:
      return Object.assign({}, state, {
        creatingForum: false,
        creatingForumError: null
      })

    case CREATE_FORUM_FAILURE:
      return Object.assign({}, state, {
        creatingForum: false,
        creatingForumError: 'error.admin.createForum'
      })

    case DELETE_FORUM:
      return Object.assign({}, state, {
        deletingForum: true,
        deletingForumError: null
      })

    case DELETE_FORUM_SUCCESS:
      return Object.assign({}, state, {
        deletingForum: false,
        deletingForumError: null
      })

    case DELETE_FORUM_FAILURE:
      return Object.assign({}, state, {
        deletingForum: false,
        deletingForumError: 'error.admin.deleteForum'
      })

    default:
      return state
  }
}
