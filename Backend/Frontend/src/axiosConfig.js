// import axios from "axios";


// axios.defaults.baseURL = "http://localhost:4002";
// axios.defaults.withCredentials = true; // send cookies along with requests

// export default axios;


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;
