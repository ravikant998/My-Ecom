import axios from "axios";

// Create an instance of axios with default settings
const Api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
