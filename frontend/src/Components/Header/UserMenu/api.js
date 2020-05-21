import axios from 'axios'
import URLConfig from "URLConfig"

export const signOut = () => {
  return axios.get(URLConfig + '/api/auth/logout', {withCredentials: true})
}
