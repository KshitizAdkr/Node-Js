const frontRouter = require("express").Router()

// routing below
frontRouter.get("/", (req, res) => {
  res.json({
    data: "any",
    // error: "any",
    message: "Notify",
    status: "OK",
  });
});

frontRouter.use("/test", (req, res) => {
  // this is test router
});


module.exports = frontRouter