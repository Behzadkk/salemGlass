const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../helper/sqlDB").createDB();
const { getById } = require("../helper/getById");

exports.createAUser = function(req, res) {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email =?";
  db.get(sql, [email], (err, rows) => {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (rows) {
      return res.status(404).send("User Already exist!!");
    }
    let user = {};
    bcrypt
      .hash(req.body.password, 12)
      .then(hashedPassword => {
        user.email = req.body.email;
        user.password = hashedPassword;
        return user;
      })
      .then(user => {
        const insert = `INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}")`;
        db.run(insert, {}, function(err, rows) {
          if (err) {
            console.log(err);
          }
        });

        // res.send("user created");
      })
      .catch(err => {
        throw err;
      });
  });
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email =?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      "JHgelsa234jkhJwed",
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.status(200).send({ userId: user.userId, auth: true, token: token });
  });
};
