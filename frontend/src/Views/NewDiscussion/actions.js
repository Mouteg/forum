import history from 'MyHistory'
import {
  POSTING_DISCUSSION_START,
  POSTING_DISCUSSION_END,
  POSTING_DISCUSSION_SUCCESS,
  POSTING_DISCUSSION_FAILURE,

  UPDATE_DISCUSSION_TITLE,
  UPDATE_DISCUSSION_CONTENT,
  UPDATE_DISCUSSION_PIN_STATUS,
  UPDATE_DISCUSSION_TAGS,

  CLEAR_SUCCESS_MESSAGE
} from './constants'
import { postDiscussionApi } from './api'

/**
 * post a new discussion
 * @param  {ObjectId} userId
 * @param  {ObjectId} forumId
 * @param  {String} currentForum
 * @return {action}
 */
export const postDiscussion = (userId, forumId, currentForum) => {
  return (dispatch, getState) => {
    dispatch({ type: POSTING_DISCUSSION_START })

    // validate discussion inputs
    // discussion values are in redux state
    const {
      title,
      content,
      tags,
      pinned
    } = getState().newDiscussion

    let validated = true

    if (!userId || !forumId) {
      validated = false
      return dispatch({
        type: POSTING_DISCUSSION_FAILURE,
        payload: 'error.create.discussion.somethingBad'
      })
    }

    if (title === null || title.length < 5) {
      validated = false
      return dispatch({
        type: POSTING_DISCUSSION_FAILURE,
        payload: 'error.create.discussion.tooShort'
      })
    }

    if (content === null || content.length === 0) {
      validated = false
      return dispatch({
        type: POSTING_DISCUSSION_FAILURE,
        payload: 'error.create.discussion.isEmpty'
      })
    }

    if (tags === null || tags.length === 0) {
      validated = false
      return dispatch({
        type: POSTING_DISCUSSION_FAILURE,
        payload: 'error.create.discussion.noTags'
      })
    }

    // make api call if post is validated
    if (validated) {
      postDiscussionApi({
        userId,
        forumId,
        title,
        content,
        tags,
        pinned
      }).then(
        (data) => {
          if (data.data.created === true) {
            dispatch({ type: POSTING_DISCUSSION_SUCCESS })
            setTimeout(() => { dispatch({ type: CLEAR_SUCCESS_MESSAGE }) }, 2000)

            // issue a redirect to the newly reacted discussion
            history.push(`/${currentForum}/discussion/${data.data.slug}`)
          } else {
            dispatch({
              type: POSTING_DISCUSSION_FAILURE,
              payload: 'error.create.discussion.serverError'
            })
          }
        },
        (error) => {
          dispatch({
            type: POSTING_DISCUSSION_FAILURE,
            payload: error
          })
        }
      )
    }
  }
}

/**
 * update the discussion title in redux state (controlled input)
 * @param  {String} value
 * @return {action}
 */
export const updateDiscussionTitle = (value) => {
  return {
    type: UPDATE_DISCUSSION_TITLE,
    payload: value
  }
}

/**
 * update discussion content in redux state (controlled input)
 * @param  {Object} value
 * @return {action}
 */
export const updateDiscussionContent = (value) => {
  return {
    type: UPDATE_DISCUSSION_CONTENT,
    payload: value
  }
}

/**
 * update discussion pinned status in redux state (controlled input)
 * @param  {Boolean} value
 * @return {action}
 */
export const updateDiscussionPinStatus = (value) => {
  return {
    type: UPDATE_DISCUSSION_PIN_STATUS,
    payload: value
  }
}

/**
 * update discussion tags in redux state (controlled input)
 * @param  {Array} value
 * @return {action}
 */
export const updateDiscussionTags = (value) => {
  return {
    type: UPDATE_DISCUSSION_TAGS,
    payload: value
  }
}
