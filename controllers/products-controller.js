const db = require("../helper/sqlDB").createDB();
const { postReqQuery, postValuesHandler } = require("../helper/postReqHandler");
const { putReqHandler } = require("../helper/putReqHandler");

// Show all products// Index
exports.getAllProduct = (req, res) => {
  const sql = "SELECT * FROM products ORDER BY subCat";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      products: rows
    });
  });
};

exports.getACategory = (req, res) => {
  const category = req.params.category.toLowerCase();
  const sql = `SELECT * FROM products WHERE category = "${category}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      products: rows
    });
  });
};

// Show all products in a sub category
exports.getAProduct = (req, res) => {
  const productType = req.params.productType;
  let products = [];
  const query = `SELECT * FROM products WHERE subCat = "${productType}"`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    } else {
      products = [...rows];
      const sql = `SELECT * FROM photos WHERE categoryId=${rows[0].prodId}`;
      db.all(sql, [], (err, photos) => {
        if (err) {
          console.log("ERROR fetching from the database:", err);
          return;
        } else {
          products.push({ photos });
          res.status(200).json({
            products: products
          });
        }
      });
    }
  });
};

exports.createAProduct = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = ["category", "subCat", "name", "description"];
  const insert = postReqQuery("product", safeParams);
  const insertValues = postValuesHandler(req);
  db.run(insert, { ...insertValues, $subCat: slug(req.body.name) }, function(
    err,
    rows
  ) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      products: rows
    });
  });
};

exports.editAProduct = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = [
    "category",
    "description",
    "mainPhotos",
    "banner",
    "moreDetails",
    "moreInfo",
    "keyFeatures",
    "subHeading",
    "videoHeading",
    "videos"
  ];
  const updatedDetails = putReqHandler(req, safeParams);
  console.log(updatedDetails);
  db.run(updatedDetails, [req.params.productType], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      products: rows
    });
  });
};

exports.deleteAProduct = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.body.id;
  const sql = `DELETE FROM products WHERE prodId = "${id}"`;
  db.run(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
  });
  res.sendStatus(200);
};

function slug(words) {
  return words
    .split(" ")
    .map(w => w.toLowerCase())
    .join("_");
}
