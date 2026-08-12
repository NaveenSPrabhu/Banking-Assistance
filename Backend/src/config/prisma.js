const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: [
    "query",
    "info",
    "warn",
    "error",
  ],
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL");
    console.error(error);
    process.exit(1);
  }
}

module.exports = prisma;
module.exports.connectDB = connectDB;