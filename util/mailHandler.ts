import nodemailer from "nodemailer";
import { formatHtmlEmail } from "./helpers";

const SENDER_EMAIL = "";
const MAIL_APP_PSWRD = "";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: MAIL_APP_PSWRD,
  },
});

export const sendEmail = async ({
  email,
  subject,
  message,
  title,
}: {
  email: string;
  subject: string;
  message: string;
  title: string;
}) => {
  // Setup email data
  let mailOptions = {
    from: `eVENTA(${SENDER_EMAIL})`,
    to: email,
    subject: subject,
    html: formatHtmlEmail(title, message),
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
