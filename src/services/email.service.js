const nodemailer = require("nodemailer");
const { SmtpConfig } = require("../config/config");

class MailService{
  #transport;
  constructor() {
    try {
      console.log(SmtpConfig)
      this.#transport = nodemailer.createTransport({
        host: SmtpConfig.host,
        port: SmtpConfig.port, 
        service: "gmail",
        auth: {
          user: SmtpConfig.user,
          pass: SmtpConfig.password
        }
      })
      console.log("****** SMTP Server Connected ******")
    } catch(exception) {
      // console.log(exception)
      throw {code: 500, message: "SMTP Server conneciton Error", status: "ERR_SMTP_CONNECT"}
    }
  }

  async sendEmail({sub, to, message, attachments=null,cc=null, bcc=null}) {
    try {
      let messageBody = {
        to: to,
        subject: sub,
        from: SmtpConfig.from,
        html: message,
      };
      if(cc) {
        messageBody['cc'] =cc
      }
      if (bcc) {
        messageBody["bcc"] = bcc;
      }
      if (attachments) {
        messageBody["attachments"] = attachments;
      }
      return await this.#transport.sendMail(messageBody)
    } catch(exception) {
      console.log(exception)
      throw {code: 500, message: "Email Sending Error", status: "ERR_EMAIL_SENING"}
    }
  }
}
module.exports = MailService