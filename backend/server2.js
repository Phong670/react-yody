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
// app.listen(80, function () {
//   console.log("CORS-enabled web server listening on port 80");
// });
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.get("/", function (req, res) {
  res.json({
    message: "This is Mail Server",
  });
});

app.use("/order", order);

const APP_PORT = 5000;
const APP_HOST = "localhost";
const GOOGLE_MAILER_CLIENT_ID =
  "1022225479410-a1donk6nchh8cov91si3ag2bm0vhjle5.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04qv3HfUqrQXPCgYIARAAGAQSNwF-L9Irl8mR6bs4GJprxpvndRL42fh26Do8WiyWcO1Ih_jlWiTtYkFw1VhTQjirNFQfU3_sgpY";
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
