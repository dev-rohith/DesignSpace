import nodemailer from "nodemailer";
import { otp_email_template } from "./mail-templetes/otp.js";

class Email {
  constructor(name, email) {
    if (!name || !email) {
      throw new Error("Name and email are required to send an email.");
    }

    this.name = name;
    this.email = email;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILSERVICE_GMAIL_USERNAME,
        pass: process.env.MAILSERVICE_GMAIL_PASSWORD,
      },
    });
  }

 async send(subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.email,
      subject,
      html,
      text: 'your mail provider not support html'
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendOtp(otp) {
    try {
      if (!otp) {
        throw new Error("OTP is required");
      }
      
      const template = otp_email_template(this.name, otp);
      const subject = "Verify code for creating account";
      const info = await this.send(subject, template);
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email.");
    }
  }


}

export default Email;