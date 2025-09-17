import axios from "axios";

const url = `https://erp-final-1.onrender.com`;
// const staticUrl = `http://localhost:4000`;
const Axios = axios.create({
  baseURL: `${url}/api/v1`,
});

export default Axios;
