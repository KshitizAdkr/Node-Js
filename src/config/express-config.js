const express = require("express");
const router = require("./router.config");
const app = express();

//parsers
//throttle
//cors policy  // 
// error handling
//make global middleware

//test codes
// app.get( (req, res, next ) => {
//     console.log("always goes through here")
//     // only get method
// })

app.use((req, res, next) => {
    req.loggedinUser = {
        _id: 123,
        name: "Admin loggedinUser",
        email: "admin@loggedinUser.com"
    }
    console.log("User", req.loggedinUser);
    console.log("I am here")
    next()
});

app.use((req, res, next) => {
    console.log("I am second middleware")
    console.log("User", req.loggedinUser)
    next()
})

//mounting of router
app.use("/api/v1", router); // app.use() => middleware Application Level

module.exports = app;
