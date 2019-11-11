const db = require("../helper/sqlDB").createDB();
const { postReqQuery, postValuesHandler } = require("../helper/postReqHandler");

// Show all drawings// Index
exports.getAllDrawings = (req, res) => {
  let drawings = [];
  const sql =
    "SELECT products.name As product, drawings.* FROM products JOIN drawings ON products.prodId = drawings.categoryId";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    } else {
      drawings = [...rows];

      res.status(200).json({
        drawings
      });
    }
  });
};

exports.uploadADrawing = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = ["source", "categoryId", "name"];

  const insert = postReqQuery("drawing", safeParams);
  const insertValues = postValuesHandler(req);
  console.log(insert, insertValues);
  db.run(insert, { ...insertValues }, function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      drawings: rows
    });
  });
};

exports.editADrawing = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const editingDrawing = req.body;
  const id = req.params.id;
  const sql = `UPDATE drawings SET categoryId = ${editingDrawing.categoryId ||
    0} WHERE drawingId = ?`;
  console.log(sql);
  db.run(sql, [id], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      drawings: rows
    });
  });
};

exports.deleteADrawing = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.body.id;
  const sql = `DELETE FROM drawings WHERE drawingId = "${id}"`;
  db.run(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
  });
  res.sendStatus(200);
};
