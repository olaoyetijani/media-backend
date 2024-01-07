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

const corsOrigin = {
  origin: "https://media-frontend-drab.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200,
  preflightContinue: false,
};

app.use(cors(corsOrigin));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://media-frontend-drab.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS,PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Auth-Toke, Origin, Authorization"
  );
  res.setHeader("Access-Control-Max-Age", 86400);
  next();
});

//app.options("*", cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

app.use(logger("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
//app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello to Media API");
});

// error handler
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
