const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");

// EXPRESS
const app = express();

// CORS
// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// JSON
app.use(express.json());

// COOKIE
app.use(cookieParser());
app.use(bodyParser.json());

// ROUTES
app.use("/api", userRoutes);

// CEK PORT
const PORT = 5001;
app.listen(PORT, () => {
  console.log("server running!");
});

module.exports = app;
