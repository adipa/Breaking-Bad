import axios from "axios";

export default axios.create({
  baseURL: "https://www.breakingbadapi.com/api/characters",
  headers: {
    "Content-type": "application/json"
  }
});