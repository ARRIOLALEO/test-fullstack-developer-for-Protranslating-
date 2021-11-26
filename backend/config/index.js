require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 8000,
  DB: process.env.DB || "mongodb://127.0.0.1:27017/clients",
};

module.exports = { config };
