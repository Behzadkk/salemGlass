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

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Xray server started at port " + port);
});
