// import axios from "axios";


// axios.defaults.baseURL = "http://localhost:4002";
// axios.defaults.withCredentials = true; // send cookies along with requests

// export default axios;


import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export default axios;
