import axios from 'axios'

import URLConfig from "URLConfig"

/**
 * single discussion apis
 */
export const fetchSingleDiscussion = (slug) => {
  return axios.get(URLConfig + `/api/post/${slug}`, {withCredentials: true})
}

export const toggleFavoriteApi = (discussion_id) => {
  return axios.get(URLConfig + `/api/post/like/${discussion_id}`, {withCredentials: true})
}

export const postOpinionApi = (opinion) => {
  return axios.post(URLConfig + '/api/comment/create', opinion, {withCredentials: true})
}

export const deletePostApi = (discussionSlug) => {
  return axios.post(URLConfig + `/api/post/delete`, { slug: discussionSlug }, {withCredentials: true})
}

export const deleteOpinionApi = (opinionId) => {
  return axios.post(URLConfig + `/api/comment/delete`, { id: opinionId }, {withCredentials: true})
}
