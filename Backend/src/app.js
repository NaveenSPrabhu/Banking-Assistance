const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const branchRoutes = require("./routes/branchRoutes");

const app = express();

/*
|--------------------------------------------------------------------------
| CORS Configuration
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  "https://banking-assistance.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header
      // such as server-side checks or curl.
      if (!origin) {
        return callback(null, true);
      }

      // Allow the deployed Vercel frontend.
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      try {
        const url = new URL(origin);

        const isLocalHost =
          url.hostname === "localhost" ||
          url.hostname === "127.0.0.1";

        const isPrivateNetwork =
          /^10\.\d+\.\d+\.\d+$/.test(url.hostname) ||
          /^192\.168\.\d+\.\d+$/.test(url.hostname) ||
          /^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(
            url.hostname
          );

        const isDevelopmentPort =
          ["5173", "5174"].includes(url.port);

        // Allow local laptop/mobile development.
        if (
          (isLocalHost || isPrivateNetwork) &&
          isDevelopmentPort
        ) {
          return callback(null, true);
        }
      } catch (_) {
        // Invalid origin. Reject below.
      }

      return callback(new Error("Origin not allowed by CORS"));
    },

    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    application: "Banking Assistant Backend",
    version: "1.0.0",
    status: "Running",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "ok",
  });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);
app.use("/api/branches", branchRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;