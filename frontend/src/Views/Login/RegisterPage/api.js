import axios from 'axios'
import URLConfig from "URLConfig"

export const register = (registerData) => {
  return axios.post(URLConfig + '/api/auth/register', registerData, {withCredentials: true})
}

export const checkUsername = (username) => {
  return axios.post(URLConfig + '/api/auth/checkUsername', { username }, {withCredentials: true})
}

export const checkEmail = (email) => {
  return axios.post(URLConfig + '/api/auth/checkEmail', { email }, {withCredentials: true})
}
