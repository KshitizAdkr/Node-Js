const express = require("express")
require("./mongodb.config");

const router = require("./router.config")
const path = require("path");

const app = express()

// parsers 
app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({limit: "5mb"}))
// throttle 
// cors policy 
// error handling 


// static middleware 
app.use("/assets/", express.static(path.join(__dirname, "../../public")));

// mounting of router
app.use('/api/v1', router)      // app.use() => middleware Application Level 


// global middleware for 404
app.use((req, res, next) => {
  next({
    detail: "Route Not found",
    message: "Not Found",
    status: "ERR_NOT_FOUND",
    code: 404,
  });
})

// error handling middleware
app.use((error, req, res, next) => {
  //console.log(error)
  let code = error.code || 500
  let detail = error.detail || "Internal App Error..."
  let message = error.message || "Internal server error..."
  let status = error.status || "ERR_SERVER_ERROR"

  // TODO:
  if (error.name === "MongoServerError") {
    code= 400;
    message= "Validation failed";
    status = "VALIDATION_FAILED_ERR"
    detail = {}

    Object.keys(error.keyPattern).map((key) => {
      detail = `${key} already exists`;
    })
  } 
  // console.log(error)
  res.status(code).json({
    error: detail,
    message: message,
    status: status,
  });
});
module.exports = app;