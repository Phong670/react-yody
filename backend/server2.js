const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const ggAuth = require("google-auth-library");

const config = require("config");
// const dateFormat = require("dateformat");
const moment = require("moment");
const querystring = require("qs");
const crypto = require("crypto");
const order = require("./order");
const app = express();
app.use(express.json());

app.use(cors());

app.get("/", function (req, res) {
  res.json({
    message: "This is Mail Server",
  });
});

app.use("/order", order);

const APP_PORT = 5000;
const APP_HOST = "localhost";
const GOOGLE_MAILER_CLIENT_ID =
  "1022225479410-brk13mmus3t67u6bva1i33kosjbbgrba.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04tHV88Q2R_ENCgYIARAAGAQSNwF-L9IrjgmigPmflSrCK8afQOlp4UHMLoRv6GSmH7djmAFh8lXaKw-0VpHNWHMfFBEyaA-kPL0";
const ADMIN_EMAIL_ADDRESS = "phongtestmail2805@gmail.com";

const myOAuth2Client = new ggAuth.OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

app.post("/email/send", async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    if (!email || !subject || !content)
      throw new Error("Please provide email, subject and content!");

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });

    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: subject, // Tiêu đề email
      html: `<h3>${content}</h3>`, // Nội dung email
    };

    await transport.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error.message });
  }
});
app.listen(APP_PORT, () => {
  console.log(`Backend mail server running at http://localhost:5000/`);
});
