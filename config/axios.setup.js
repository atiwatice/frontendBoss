import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:8090"

const UNPROTECTED_PATHS = [
    ""
  ]
  
  const isUnprotectedPath = (url) => {
    for (let path of UNPROTECTED_PATHS) {
      if (url.includes(path)) {
        return true
      }
      return false
    }
  }



Axios.interceptors.request.use(
    async config => {
      if (isUnprotectedPath(config.url)) {
        return config
      }
  
      token = cookies.get("token");
      config.headers["Authorization"] = `Bearer ${token}`
      return config
    },
    async error => {
      throw error;
    }
  )

export default Axios;