import axios from "axios";

// The ONE place that knows how to talk to the real backend.
// Nothing else in the app should import axios directly - services/ call
// this instead. When the real API Gateway URL exists, set VITE_API_URL in
// .env and this file needs no other changes.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attaches the logged-in user's Cognito token to every request, once one
// exists. Reads from the same place AuthContext stores it.
apiClient.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("mediconnect_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalises errors so every service/page can rely on `error.message`
// being something sensible to show the user, instead of digging through
// axios's response shape everywhere.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
