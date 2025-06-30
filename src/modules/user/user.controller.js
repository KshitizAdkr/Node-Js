class userController {

 UserName= (req, res, next) => {
    res.json({
        data: "UserName data",
        message: "Enter UserName",
        status: "SUCCESS"
    })
 };
 Email = (req, res, next) => {
    res.json({
        data: "Email Request",
        message: "Enter Email",
        status: "SUCCESS"
    })
 };
 Password = (req, res, next) => {
    res.json({
        data: "Password Request",
        message: "Enter Password",
        status: "SUCCESS"
    })
 };
 PhoneNo = (req, res, next) => {
    res.json({
        data: "PhoneNo Request",
        message: "Enter PhoneNo",
        status: "SUCCESS"
    })
 };
}

const userCtrl = new userController()

module.exports = userCtrl