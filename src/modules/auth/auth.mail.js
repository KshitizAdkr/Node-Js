const { AppConfig, SmtpConfig } = require("../../config/config");
const MailService = require("../../services/email.service");

class AuthMailService extends MailService{
   async sendActivationEmail(user) {
    try {
      let activationLink = AppConfig.frontendUrl+"activate/"+user.activationToken
      let resendLink = AppConfig.frontendUrl+"resend-link/"+user.activationToken

      await this.sendEmail({
        to: user.email,
        sub: "Activate your account!!!!",
        message: `
        <div style="background:#5f5f5f; color: #e0f2f1; width: 100%; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background:rgb(34, 160, 152); border-radius: 8px; overflow: hidden;">
            <div style="padding: 24px 16px 12px 16px; text-align: center;">
              <h1 style="color: #14b8a6; margin-bottom: 8px; font-size: 2rem; letter-spacing: 1px;">Welcome to Our Platform, ${user.name}!</h1>
              <p style="color: #e0f2f1; font-size: 1.1rem; margin: 0 0 12px 0;">
                We're thrilled to have you join our community. Your journey with us begins now!
              </p>
              <p style="color:rgb(96, 116, 119); font-size: 1rem; margin: 0 0 18px 0;">
                To get started, please activate your account by clicking the button below.
              </p>
              <a href="${activationLink}" style="display: inline-block; background: linear-gradient(90deg, #0d9488 0%, #059669 100%); color: #f0fdfa; text-decoration: none; font-weight: bold; padding: 14px 0; width: 100%; border-radius: 4px; font-size: 1.1rem; margin-bottom: 18px; box-shadow: 0 2px 8px rgba(20,184,166,0.15);">
                Activate My Account
              </a>
              <p style="color: #67e8f9; font-size: 0.95rem; margin: 18px 0 0 0;">
                Or copy and paste this link into your browser:<br>
                <span style="color:rgb(255, 255, 255); word-break: break-all;">${activationLink}</span>
              </p>
              <p style="color: #e0f2f1; font-size: 0.95rem; margin: 18px 0 0 0;">
                <strong>Note:</strong> This activation link is valid for 24 hours. If your link has expired, you can <a href="${resendLink}" style="color: #22d3ee; text-decoration: underline; font-weight: bold;">resend the activation link here</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #155e75; margin: 24px 0 16px 0;">
              <p style="color: #67e8f9; font-size: 0.9rem; margin: 0;">
                If you did not request this registration, please ignore this email.<br>
                Do not reply directly to this message.
              </p>
              <p style="color: #94a3b8; font-size: 0.9rem; margin: 16px 0 0 0;">
                Regards,<br>
                System Admin<br>
                <span style="color:rgb(255, 255, 255);">${SmtpConfig.from}</span>
              </p>
            </div>
          </div>
        </div>
        `,
      });
    } catch(exception) {
      throw exception
    }
  }
}

const authMailSvc = new AuthMailService()
module.exports = authMailSvc;