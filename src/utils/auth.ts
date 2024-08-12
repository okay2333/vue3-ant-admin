export function getToken() {
  return localStorage.getItem('user')
}

export function setToken(token: any) {
  return localStorage.setItem('user', JSON.stringify(token))
}

export function removeToken() {
  return localStorage.removeItem('user')
}
