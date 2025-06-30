const authRouter = require("express").Router();
const authCtrl = require("./auth.controller")


// authRouter.post("/register", (req, res, next) => {
//     //user registration logic here
//     res.json({
//         data: {_id: 123, name: "Kaii"},
//         message: "Your account has been registered successfully",
//         status: "SUCCESS"
        
//     });
// })


// authRouter.post("/login", (req, res, next) => {
//     //User login here
//     res.json({
//         data: "Login Request",
//         message: "Log-In successful",
//         status: "SUCCESS"
//     });
// })


// authRouter.get("/Activate/:token", (req, res, next) => {
//     //Actiavte User
//     res.json({
//         data: {
//             params: req.params
//         },
//         message: "User account has been activated successfully",
//         status: "OK"
//     });
// })


// authRouter.put("/user/:id", (req, res, next) => {
//     res.json({
//         data: {
//             params: req.params,
//         },
//         message: "Update User",
//         status: "SUCCESS"
//     });
// })


// authRouter.post("/logout", (req, res, next) => {
//     //User logout logic here
//     res.json({
//         data: null,
//         message: "User has logged out successfully",
//         status: "OK"
//     });
// })

authRouter.post('/register', authCtrl.register)
authRouter.post('/login', authCtrl.login)
authRouter.get('/activate', authCtrl.activate)
authRouter.put('/update', authCtrl.update)
authRouter.post('/Logout', authCtrl.Logout)


module.exports = authRouter;