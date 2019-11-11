const db = require("../helper/sqlDB").createDB();
const { putReqHandler } = require("../helper/putReqHandler");
exports.getLandingPage = (req, res) => {
  const sql = "SELECT * FROM landingPage";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      data: rows
    });
  });
};

exports.editLandingPage = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = [
    "carousel",
    "hero",
    "heroMobile",
    "info",
    "infoPhoto",
    "heroMobile",
    "about",
    "aboutPhoto",
    "productsHeading",
    "videoHeading",
    "videos"
  ];

  let updatedDetails = "UPDATE landingPage SET ";
  safeParams.forEach(par => {
    if (req.body[par]) {
      updatedDetails += ` ${par} = "${req.body[par]}", `;
    }
  });
  updatedDetails += `test = 1`;
  db.run(updatedDetails, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      data: rows
    });
  });
};

exports.getAboutPage = (req, res) => {
  const sql = "SELECT * FROM aboutPage";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      data: rows
    });
  });
};

exports.updateAboutPage = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = [
    "sectionName",
    "textOne",
    "banner",
    "photo",
    "text2",
    "formHeading"
  ];

  let updatedDetails = "UPDATE aboutPage SET ";
  safeParams.forEach(par => {
    if (req.body[par]) {
      updatedDetails += ` ${par} = '${req.body[par]}', `;
    } else {
      updatedDetails += ` ${par} = NULL, `;
    }
  });
  if (req.body.videos) {
    updatedDetails += `videos = "${req.body.videos}"`;
  } else {
    updatedDetails += "videos = NULL";
  }
  updatedDetails += ` WHERE id =?`;
  db.run(updatedDetails, [req.params.id], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      data: rows
    });
  });
};

exports.getPagesDetails = (req, res) => {
  const sql = "SELECT * FROM pages";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      pages: rows
    });
  });
};

exports.updatePagesDetails = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  let sql = `UPDATE pages SET pageText = "${req.body.pageText}" , videos = "${req.body.videos}" WHERE pageId = ${req.params.id}`;
  if (!req.body.videos) {
    sql = `UPDATE pages SET pageText = "${req.body.pageText}" , videos = NULL WHERE pageId = ${req.params.id}`;
  }
  db.run(sql, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      data: rows
    });
  });
};

exports.getFooter = (req, res) => {
  const sql = "SELECT * FROM footer";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      footer: rows
    });
  });
};

exports.updateFooter = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = [
    "groupName",
    "text1",
    "link1",
    "text2",
    "link2",
    "text3",
    "link3",
    "text4",
    "link4",
    "text5",
    "link5"
  ];

  let updatedDetails = "UPDATE footer SET ";
  safeParams.forEach(par => {
    if (req.body[par]) {
      updatedDetails += ` ${par} = '${req.body[par]}', `;
    } else {
      updatedDetails += ` ${par} = NULL, `;
    }
  });
  updatedDetails += `test = 1 WHERE footerId = ?`;
  db.run(updatedDetails, [req.params.id], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      data: rows
    });
  });
};
