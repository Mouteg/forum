import axios from 'axios'
import URLConfig from "URLConfig"

export const postDiscussionApi = (discussion) => {
  return axios.post(URLConfig + '/api/post/create', discussion, {withCredentials: true})
}
