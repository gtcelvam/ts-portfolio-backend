const MailRoute = require("express").Router();
const nodeMailer = require("nodemailer");

const sender = nodeMailer.createTransport({
  service: "gmail",
  port: 586,
  auth: {
    user: process.env.NODE_MAIL_ID,
    pass: process.env.NODE_MAIL_PASS,
  },
});

//Send Mail
MailRoute.post("/mail", (req, res) => {
  const composeMail = {
    from: process.env.NODE_MAIL_ID,
    to: process.env.NODE_SENDER_ID,
    subject: "Portfolio Message",
    text: `
      Subject : ${req.body.subject},
      Message : ${req.body.message}
    `,
  };
  sender.sendMail(composeMail, (err, data) => {
    if (err) res.status(404).json({ message: err });
    else res.status(200).json({ message: "Mail sent successfully!" });
  });
});

module.exports = MailRoute;
