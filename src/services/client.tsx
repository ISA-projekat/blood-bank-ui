import axios from "axios";
// import { TokenStorage } from "../store/auth/TokenStorage";

const baseURL = process.env.REACT_APP_API_URL;
const client = axios.create({ baseURL });

client.interceptors.request.use((config) => {
  config!.headers!.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

export default client;
