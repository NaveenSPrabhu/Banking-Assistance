// Use the Vite dev-server proxy during development.
// This keeps laptop and mobile testing on the same frontend origin:
// laptop -> http://localhost:5173/api -> backend
// mobile -> http://<laptop-ip>:5173/api -> backend
// No localhost/IP changes are required in the React code.

export const API_BASE_URL = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_BASE_URL || "");

export const API_URL = `${API_BASE_URL}/api`;
