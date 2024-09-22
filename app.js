const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./Middlewares/error");

app.use(express.json());
app.use(cookieParser());

//route imports
const user = require("./Routes/userRoute");

app.use("/api", user);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
