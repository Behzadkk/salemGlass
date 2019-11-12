const db = require("../helper/sqlDB").createDB();
const { postReqQuery, postValuesHandler } = require("../helper/postReqHandler");

// Show all photos// Index
exports.getAllPhotos = (req, res) => {
  const sql =
    "SELECT * FROM photos JOIN products ON products.prodId = photos.categoryId ORDER BY priority";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      photos: rows
    });
  });
};

// Show all photos in a sub category
exports.getPhotos = (req, res) => {
  const productType = req.params.productType;
  const sql =
    "SELECT photos.* FROM photos JOIN products ON products.prodId = photos.categoryId WHERE products.subCat = ? ORDER BY priority";
  db.all(sql, [productType], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      photos: rows
    });
  });
};

exports.uploadPhotos = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  let sql = `INSERT INTO photos (categoryId , projectId, source) VALUES `;
  const newPhotos = req.body;
  const values = newPhotos.map(photo => {
    let str = "(";
    photo.category ? (str += photo.category + ", ") : (str += 0 + ",");
    photo.project ? (str += photo.project + ", ") : (str += 0 + ",");
    str += `"${photo.source}")`;
    return str;
  });
  sql += values.join(", ");
  db.run(sql, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      photos: rows
    });
  });
};

exports.editAPhoto = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const editingPhoto = req.body;
  const id = req.params.id;
  const sql = `UPDATE photos SET categoryId = ${editingPhoto.categoryId ||
    0}, projectId = ${editingPhoto.projectId || 0} WHERE photoId = ?`;
  db.run(sql, [id], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      photos: rows
    });
  });
};

exports.deleteAPhoto = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.body.id;
  const sql = `DELETE FROM photos WHERE photoId = "${id}"`;
  db.run(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
  });
  res.sendStatus(200);
};

exports.deleteAProjectPhoto = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const source = req.params.source;
  const sql = `DELETE FROM photos WHERE source = "/images/${source}"`;
  db.run(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.sendStatus(200);
  });
};

exports.reorderPhotos = (req, res) => {
  let pool = "(";
  let sql = "UPDATE photos SET priority = (CASE ";
  req.body.photos.map((photo, i) => {
    sql += `WHEN (source = "${photo}") THEN ${i + 1} `;
    pool += `"${photo}", `;
  });
  pool += "'' )";
  sql += `ELSE (priority) 
END)
WHERE source IN ${pool}`;
  db.run(sql, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      photos: rows
    });
  });
};
