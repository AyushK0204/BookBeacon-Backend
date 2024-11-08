const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./Middlewares/error");

app.use(express.json());
app.use(cookieParser());

//route imports
const user = require("./Routes/userRoute");
const book = require("./Routes/bookRoute");
const order = require("./Routes/orderRoute");

app.use("/api", user);
app.use("/api", book);
app.use("/api", order);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
