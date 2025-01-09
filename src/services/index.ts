import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASEURL

console.log(baseURL);

export const http = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': baseURL,
    'ngrok-skip-browser-warning': true,
  },
})


// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

