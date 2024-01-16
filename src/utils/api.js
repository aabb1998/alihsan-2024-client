import axios from "axios";

const token = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")).token : "";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { api };