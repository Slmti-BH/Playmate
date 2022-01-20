const express = require("express");
const app = express();
const cors=require("cors");
const authRoutes=require("./routes/auth")
// to make .env files available
require("dotenv").config();
const PORT = process.env.PORT || 6060;

// cors middle ware to allow access to requests from client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.use("/auth",authRoutes);

app.listen(PORT, () => {
  console.log("🚀 Listening on 8080");
});
