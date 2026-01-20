import axios from "axios";


  export const apiClient = axios.create({
    baseURL:"https://linked-posts.routemisr.com"
  })

  apiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
      config.headers.Authorization = `Bearer ${token}`;
    }
 
    return config;
  })

  apiClient.interceptors.response.use(
    (response)=>{
      return Promise.resolve({
        success:true,
        data:response.data
      })
    },
    (error)=>{
      return Promise.reject({
        success:false,
        error:error,
      })
    }
  )

