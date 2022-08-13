import axios from "axios";

const clientApi = axios.create({
  baseURL: "http://localhost:8000", 
  headers: {}
});
export default clientApi