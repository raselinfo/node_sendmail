const express = require("express");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json({ limit: 120000 }));
app.use(express.urlencoded({ extended: true }));

const clientId =
  "913705696471-ujei15mnvovdk8uuhs9kcup5vlsa25it.apps.googleusercontent.com";
const client_secret = "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";
const redirect_url = "https://developers.google.com/oauthplayground";
const refreshToken =
  "1//046Iv-RmS8hIqCgYIARAAGAQSNwF-L9IrueFJSVZlYatzClOqvu4s2E19VdKlq6EcnNhLWNoC52uEXtVyFfMYcUb-4HmEHlnNbZQ";

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  client_secret,
  redirect_url
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

// Todo: Send Main function
const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "raselhossainy52@gmail.com",
        clientId: clientId,
        clientSecret: client_secret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "RaselOfficial 📧 <raselhossainy52@gmail>",
      to: "raselinfo52@gmail.com",
      subject: "Hello from gmail using API",
      text: "This is the message body from hello RaselOfficial",
      html: `<h1>Hello World</h1> <a href="https://raselofficial.com/">Click Here</a>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
};

sendMail()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
