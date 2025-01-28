// src/utils/axios.js
import axios from "axios";
import Swal from "sweetalert2";

// Create an axios instance with any global configuration
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // Use env variable or fallback to localhost
});

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token.replace(/^"|"$/g, "") : null;
};
// Request interceptor to add token to headers before each request
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or store
    const token = getToken();

    // If token exists, add it to the request header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response; // Return the response if successful
  },
  (error) => {
    // Show the error alert with SweetAlert2
    if (error.response) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message || error.response.statusText,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (error.request) {
      Swal.fire({
        title: "Error",
        text: "No response received from server.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: `Error in setting up request: ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

export default instance;
