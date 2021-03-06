import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_EMAIL,
  },
});

/**
 * @class sendMail
 * @description class contains function for implementing Image Uploads middleware
 */
class sendMail {
  /**
     * @static mailsending
     * @description a middleware fucntion for uploadng images
     * @param {string} email
     * @param {string} temporaryPassword
     * @returns {string} returns status sent
     */
  static async passwordReset(temporaryPassword, email) {
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Subject of your email',
      html: `<p>Your temporary password is "${temporaryPassword}"</p>`,
    };
    try {
      await transporter.sendMail(mailOptions, (info) => {
      });
    } catch (error) {
      return 'sent';
    }
  }
}
export default sendMail;
