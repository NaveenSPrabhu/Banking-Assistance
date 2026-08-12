require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/prisma");

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log("======================================");
    console.log("🚀 Banking Assistant Backend");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("======================================");
  });
}

startServer();