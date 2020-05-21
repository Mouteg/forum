import axios from 'axios'

import URLConfig from "URLConfig"

export const getAdminDashboardInfoAPI = () => {
  return (axios.get(URLConfig + '/api/admin/', {withCredentials: true}))
}

export const createForumAPI = (forum_obj) => {
  return (axios.post(URLConfig + '/api/forum/create', forum_obj, {withCredentials: true}))
}

export const deleteForumAPI = (forum_id) => {
  return (axios.post(URLConfig + '/api/forum/delete', { id: forum_id }, {withCredentials: true}))
}
