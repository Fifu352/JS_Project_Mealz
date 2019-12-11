import axios from "axios";

axios.defaults.headers.common["Authorization"] = "XYZ";

export default axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/",
  baseURL: "http://localhost:4000/",
  responseType: "json"
});
