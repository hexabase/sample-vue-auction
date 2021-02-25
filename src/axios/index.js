import Vue from "vue";
import Axios from "axios";

const http = Axios.create({
  withCredentials: true
});

http.interceptors.response.use(
  function(response) {
    console.log("200:", response);
    return response;
  },
  function(error) {
    console.log("401:", error);
    if (error.response.status === 401) {
      // Vue.toasted.clear()
      // Vue.toasted.error(error.response.data.message)
    } else if (error.response.status === 500) {
      // Vue.toasted.clear()
      // Vue.toasted.error(error.response.data.message)
    }
    return Promise.reject(error);
  }
);

export default http;
