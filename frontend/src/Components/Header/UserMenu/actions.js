import {
  signOut
} from './api'

import history from "history"

export const logOut = () => {
  return signOut().then(
    history.push("/")
  )
}

