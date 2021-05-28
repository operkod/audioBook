import axios from 'axios'

axios.defaults.baseURL = window.location.origin
axios.defaults.headers.authorization = `Bearer ${window.localStorage.getItem("token")}`

declare global {
  interface Window {
    axios: typeof axios
  }
}
window.axios = axios

export default axios
