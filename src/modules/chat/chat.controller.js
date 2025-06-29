class chatController {

 Automation= (req, res, next) => {
    res.json({
        data: "Automated message request",
        message: "Automated message",
        status: "SUCCESS"
    })
 };
 
 CustomerSupport = (req, res, next) => {
    res.json({
        data: "Customer Support Request",
        message: "Succesfully called Customer Service ",
        status: "SUCCESS"
    })
 };
}

const chatCtrl = new chatController()

module.exports = chatCtrl;