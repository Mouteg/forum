import axios from 'axios'
import URLConfig from "URLConfig"

export const fetchForums = (forum_id) => {
  return axios.get(URLConfig + '/api/forum/', {withCredentials: true})
}

export const fetchUser = () => {
  return axios.get(URLConfig + '/api/user/me', {withCredentials: true})
}
