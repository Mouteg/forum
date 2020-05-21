/**
 * user profile apis
 */

import axios from 'axios'

import URLConfig from "URLConfig"

export const fetchUserProfileApi = (userSlug) => {
  return axios.get(URLConfig + `/api/user/profile/${userSlug}`, {withCredentials: true})
}
