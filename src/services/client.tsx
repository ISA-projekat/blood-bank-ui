import axios from "axios";
// import { TokenStorage } from "../store/auth/TokenStorage";

const baseURL = process.env.REACT_APP_API_URL;
const client = axios.create({ baseURL });
client.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem('token')

export default client;
