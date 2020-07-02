import axios from 'axios'

  export function clearAuthToken() {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
  }
  export function clearlogin() {
    return localStorage.removeItem("login");
  }
  export function clearId() {
    return localStorage.removeItem("id");
  }
  
  export function LogOut() {
    clearAuthToken();
    clearlogin();
    clearId();
  }

  export function isLogged() {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      return true;
    }
    return false;
  }

  export function formatDateToDB(date) {
    return format(date, "MM-dd-yyyy");
  }