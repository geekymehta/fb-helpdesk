const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const AppError = require("./model/errorModel");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/auth/token", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token found" });
  }

  res.json({ token });
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use((req, res, next) => {
  console.log(request.orginalrl);
  next(new AppError("Route Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong", stack = null } = err;

  console.log("status : " + status);
  console.log("error_message : " + message);
  console.log("stack : " + stack);
  res.status(status).json({ status: status, error: message, stack: stack });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
