import axios from "axios";

const Axios = axios.create({
    baseURL:"https://erp-final.onrender.com/api/v1"
})

export default Axios
