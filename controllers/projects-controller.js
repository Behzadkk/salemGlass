const db = require("../helper/sqlDB").createDB();
const { postReqQuery, postValuesHandler } = require("../helper/postReqHandler");
// Show all projects// Index
exports.getAllProjects = (req, res) => {
  const sql = "SELECT * FROM Projects";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      projects: rows
    });
  });
};

// Show all projects in a sub category
exports.getProjects = (req, res) => {
  const productId = req.params.productId;
  const sql =
    "SELECT * FROM projects JOIN productProjects ON projects.projId = productProjects.project WHERE productProjects.product = ?";
  db.all(sql, [productId], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      projects: rows
    });
  });
};

exports.showAProject = (req, res) => {
  let projects = [];
  const query = `SELECT * FROM projects WHERE ProjId = "${req.params.id}"`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    } else {
      projects = [...rows];
      const sql = `SELECT * FROM photos WHERE projectId=${rows[0].projId}`;
      db.all(sql, [], (err, photos) => {
        if (err) {
          console.log("ERROR fetching from the database:", err);
          return;
        } else {
          projects.push({ photos });
          res.status(200).json({
            projects: projects
          });
        }
      });
    }
  });
};

exports.uploadAProject = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const safeParams = ["name", "description"];
  const insert = postReqQuery("project", safeParams);
  const insertValues = postValuesHandler(req);
  db.run(insert, { ...insertValues }, function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      project: rows
    });
  });
};

exports.editAProject = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const editingProject = req.body;
  const id = req.params.id;
  if (req.body.products.length > 0) {
    relateProducts(id, req.body.products);
  }
  let sql = `UPDATE projects SET name = "${editingProject.name}", description = "${editingProject.description}", shortDescription="${editingProject.shortDescription}", `;
  if (editingProject.photos) {
    sql += `mainPhoto="${editingProject.photos}", `;
  }
  if (editingProject.videos) {
    sql += `videos="${editingProject.videos}"`;
  } else {
    sql += "videos = NULL";
  }
  sql += ` WHERE projId = ?`;
  console.log(sql);
  db.run(sql, [id], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    res.status(200).json({
      projects: rows
    });
  });
};

exports.deleteAProject = (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const id = req.params.id;
  const sql = `DELETE FROM projects WHERE projId = "${id}"`;
  db.run(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
  });
  res.sendStatus(200);
};

relateProducts = (id, products) => {
  let query = `DELETE FROM productProjects WHERE project = ${id}`;
  db.run(query, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
  });
  let sql = `INSERT INTO productProjects (product , project) VALUES `;
  const values = products.map(p => {
    let str = "(";
    str += `${p}, ${id})`;
    return str;
  });
  sql += values.join(", ");
  db.run(sql, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    } else {
      updateProduct(products);
    }
  });
};

updateProduct = productsList => {
  const products = productsList.join(", ");
  let sql = `UPDATE products set projects = 1 WHERE prodId in (${products})`;
  db.run(sql, [], function(err, rows) {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
  });
};
