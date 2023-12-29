const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");

const postsRouter = require("./routes/postsRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "Teejay");

app.use(cors());
app.use(logger("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
//app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/user", userRouter);

// error handler
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
