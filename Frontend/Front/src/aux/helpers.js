import axios from 'axios'
export function LogOut() {
    axios.defaults.headers.common["Authorization"] = "";
    clearAuthToken();
    clearlogin();
    clearId();
  }
  export function clearAuthToken() {
    return localStorage.removeItem("token");
  }
  export function clearlogin() {
    return localStorage.removeItem("login");
  }
  export function clearId() {
    return localStorage.removeItem("id");
  }
