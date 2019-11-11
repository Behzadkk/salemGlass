const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    // console.log("no authHeader");
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    // console.log("no token");
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "JHgelsa234jkhJwed");
  } catch (err) {
    // console.log("not verified");
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    // console.log("no decodedtoken");
    req.isAuth = false;
    return next();
  }
  // console.log("authenticated");
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
