const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const formData = require("express-form-data");
const cors = require("cors");
const apiRouter = require("./api");
const isAuth = require("./middleware/is-auth");
const helper = require("./helper/helper");
var nodemailer = require("nodemailer");
const axios = require("axios").default;

// handle HTTP POST requests
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);
app.use("/api", apiRouter);
app.use(formData.parse());
app.use(cors());

app.use("/public", express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   res.send("Hello Xray");
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

app.post("/image-upload", isAuth, (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => {
    const fileName =
      Math.floor(Math.random() * 1000000) +
      "_" +
      helper.escapeRegex(image.name);
    fs.readFile(image.path, (err, data) => {
      const newPath = __dirname + "/frontend/build/images/" + fileName;
      fs.writeFile(newPath, data, error => {
        if (error) {
          console.error(error);
          res.end();
        }
      });
    });
    return { secure_url: "/images/" + fileName };
  });
  res.send(promises);
});

app.post("/upload/drawings", (req, res, next) => {
  console.log(req.files);
  let uploadFile = req.files[0];
  const fileName = helper.escapeRegex(uploadFile.originalFilename);
  fs.readFile(uploadFile.path, (err, data) => {
    const newPath = __dirname + "/frontend/build/drawings/" + fileName;
    fs.writeFile(newPath, data, error => {
      if (error) {
        console.error(error);
        res.end();
      } else {
        console.log("saving");
        res.send({ source: "/drawings/" + fileName });
        //here you can save the file name to db, if needed
      }
    });
  });
});

app.post("/contactUs", (req, res) => {
  var contactName = req.body.name;
  var contactEmail = req.body.email;
  var contactCompany = req.body.company;
  var contactPhone = req.body.phone;
  var contactMessage = req.body.message;

  var data =
    "contactName=" +
    contactName +
    "&contactEmail=" +
    contactEmail +
    "&contactCompany=" +
    contactCompany +
    "&contactPhone=" +
    contactPhone +
    "&contactMessage=" +
    contactMessage;
  axios({
    type: "POST",
    url: "inc/sendEmail.php",
    data: data,
    success: function(msg) {
      if (msg == "OK") {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  });
  // var smtpTransport = nodemailer.createTransport({
  //   rejectUnauthorized: false,
  //   host: "smtp-mail.outlook.com", // hostname
  //   secureConnection: false, // TLS requires secureConnection to be false
  //   port: 587, // port for secure SMTP
  //   tls: {
  //     ciphers: "SSLv3"
  //   },
  //   auth: {
  //     user: "xrayglazingservice@outlook.com",
  //     pass: "Outlookbarayesiteshervin01"
  //   }
  // });
  // var mailOptions = {
  //   to: "bhzdkkvnd@gmail.com",
  //   from: "xrayglazingservice@outlook.com",
  //   subject: "A new email from xray",
  //   text: `Hello \n
  //           You have a new message from \n
  //           sender:  ${req.body.name}\n
  //           email:   ${req.body.email}\n
  //           company: ${req.body.company}\n
  //           phone:   ${req.body.phone}\n
  //           message: ${req.body.message}`
  // };
  // smtpTransport.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     return console.log("ERROR", error);
  //   }
  //   console.log("Message sent: " + info.response);
  //   res.sendStatus(200);
  // });
});
// app.post("/contactUs", (req, res) => {
//   var smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "xraymailserver@gmail.com",
//       pass: "Gmailbarayesiteshervin01"
// EmailServer123!
//     }
//   });
//   var mailOptions = {
//     to: "bhzdkkvnd@gmail.com",
//     from: "xraymailserver@gmail.com",
//     subject: "A new email from xray",
//     text: `Hello \n
//             You have a new message from \n
//             sender:  ${req.body.name}\n
//             email:   ${req.body.email}\n
//             company: ${req.body.company}\n
//             phone:   ${req.body.phone}\n
//             message: ${req.body.message}`
//   };
//   smtpTransport.sendMail(mailOptions, function(err) {
//     if (!err) {
//       res.sendStatus(200);
//     }
//   });
// });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Xray server started at port " + port);
});
