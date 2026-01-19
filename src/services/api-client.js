import axios from "axios";


  export const apiClient = axios.create({
    baseURL:"https://linked-posts.routemisr.com"
  })