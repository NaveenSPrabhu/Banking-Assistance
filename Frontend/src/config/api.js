// API configuration
//
// Development:
// Vite proxy handles /api requests.
// Laptop: http://localhost:5173
// Mobile: http://<laptop-ip>:5173
//
// Production:
// VITE_API_BASE_URL points to the deployed Render backend.

const API_BASE_URL = import.meta.env.DEV
  ? ""
  : (
      import.meta.env.VITE_API_BASE_URL ||
      "https://banking-assistance.onrender.com"
    );

export { API_BASE_URL };

export const API_URL = `${API_BASE_URL}/api`;