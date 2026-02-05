import axios from "axios";

// Set your backend URL
axios.defaults.baseURL = "http://localhost:4002";
axios.defaults.withCredentials = true; // send cookies along with requests

export default axios;
