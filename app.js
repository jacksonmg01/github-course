var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(cookieParser());

const router = require("./routes/index");
const routerApi = require("./routes/api");

app.use("/", router);
app.use("/api", routerApi);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://calc:workg9999@cluster0-973rr.gcp.mongodb.net/calcservice?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Connection to Db CalcService Atlas successful!"))
  .catch(err => console.error(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
