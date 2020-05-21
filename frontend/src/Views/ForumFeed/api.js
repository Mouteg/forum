import axios from 'axios'

import URLConfig from "URLConfig"

/**
 * feed apis
 */
export const fetchDiscussions = (forum_id, sortingMethod) => {
  return axios.get(URLConfig + `/api/forum/${forum_id}/posts?sorting_method=${sortingMethod}`, {withCredentials: true})
}

export const fetchPinnedDiscussions = (forum_id) => {
  return axios.get(URLConfig + `/api/forum/${forum_id}/pinned`, {withCredentials: true})
}
