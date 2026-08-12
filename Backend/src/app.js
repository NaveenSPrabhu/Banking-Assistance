const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const branchRoutes = require("./routes/branchRoutes");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header (for example curl/server checks).
      if (!origin) return callback(null, true);

      try {
        const url = new URL(origin);
        const isAllowedHost =
          url.hostname === "localhost" ||
          url.hostname === "127.0.0.1" ||
          /^10\.\d+\.\d+\.\d+$/.test(url.hostname) ||
          /^192\.168\.\d+\.\d+$/.test(url.hostname) ||
          /^172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+$/.test(url.hostname);

        if (isAllowedHost && ["5173", "5174"].includes(url.port)) {
          return callback(null, true);
        }
      } catch (_) {
        // Fall through to reject an invalid origin.
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

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