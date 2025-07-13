import nodemailer from "nodemailer";

export default async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const link = `http://localhost:5173/verify/${token}`;
  await transporter.sendMail({
    from: `"My AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<h3>Welcome to My AI</h3><p><a href="${link}">Verify Email</a></p>`
  });
}
