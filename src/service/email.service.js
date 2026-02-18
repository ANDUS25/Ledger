import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.USER_MAIL,
    clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLOUD_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Error in transporter:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_MAIL,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    console.log("Preview URL :", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(
      "This is error occurred form the node mailer transporter verify",
      error,
    );
  }
};

const sendRegistrationEmail = (userName, email) => {
  const subject = "Welcome to Ledger!";
  const text = `Hi ${userName},\n\nThank you for registering with Ledger! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Ledger Team`;
  const html = `<p>Hi ${userName},</p><p>Thank you for registering with Ledger! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The Ledger Team</p>`;
  sendMail(email, subject, text, html);
};

export default sendRegistrationEmail;
