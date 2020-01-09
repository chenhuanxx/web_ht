import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get("TokenKey")
}

export function setToken(obj) {
  return Cookies.set("TokenKey", obj)
}

export function removeToken() {
  return Cookies.remove("TokenKey")
}




export function getSesion() {
  return Cookies.get("sesion")
}
export function setSesion(obj) {
  return Cookies.set("sesion", obj)
}

export function removeSesion() {
  return Cookies.remove("sesion")
}



export function getAdmin() {
  return Cookies.get("admin")
}
export function setAdmin(obj) {
  return Cookies.set("admin", obj)
}
export function removeAdmin() {
  return Cookies.remove("admin")
}

export function getcd() {
  return Cookies.get("cd")
}
export function setcd(obj) {
  return Cookies.set("cd", obj)
}