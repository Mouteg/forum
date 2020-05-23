import axios from 'axios'
import URLConfig from "URLConfig"

export const logIn = (logInData) => {
  return axios.post(URLConfig + '/api/auth/login', logInData, {withCredentials: true})
}
