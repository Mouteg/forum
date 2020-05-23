import {
  signOut
} from './api'

import history from "MyHistory"

export const logOut = () => {
  return signOut().then(
    history.push("/")
  )
}

