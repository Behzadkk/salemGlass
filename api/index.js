const express = require("express");
const router = express.Router();

const productController = require("../controllers/products-controller");
const photoController = require("../controllers/photos-controller");
const drawingController = require("../controllers/drawing-controllers");
const projectController = require("../controllers/projects-controller");
const userController = require("../controllers/user-controller");
const indexController = require("../controllers/index-controller");

router.get("/products", productController.getAllProduct);
router.get("/category/:category", productController.getACategory);
router.get("/products/:productType", productController.getAProduct);
router.post("/products", productController.createAProduct);
router.put("/products/:productType", productController.editAProduct);
router.delete("/products", productController.deleteAProduct);

router.get("/gallery", photoController.getAllPhotos);
router.get("/gallery/:productType", photoController.getPhotos);
router.post("/gallery", photoController.uploadPhotos);
router.put("/gallery/:id", photoController.editAPhoto);
router.delete("/gallery", photoController.deleteAPhoto);
router.delete("/photos/projects/:source", photoController.deleteAProjectPhoto);
router.put("/photos/reorder", photoController.reorderPhotos);

router.get("/drawings", drawingController.getAllDrawings);
router.post("/drawings", drawingController.uploadADrawing);
router.put("/drawings/:id", drawingController.editADrawing);
router.delete("/drawings", drawingController.deleteADrawing);

router.get("/projects", projectController.getAllProjects);
router.get("/:productId/projects", projectController.getProjects);
router.get("/projects/:id", projectController.showAProject);
router.post("/projects", projectController.uploadAProject);
router.put("/projects/:id", projectController.editAProject);
router.delete("/projects/:id", projectController.deleteAProject);

router.post("/users", userController.createAUser);
router.post("/login", userController.userLogin);
router.get("/landing", indexController.getLandingPage);
router.put("/landing", indexController.editLandingPage);
router.get("/about", indexController.getAboutPage);
router.put("/about/:id", indexController.updateAboutPage);
router.get("/pages", indexController.getPagesDetails);
router.put("/pages/:id", indexController.updatePagesDetails);
router.get("/footer", indexController.getFooter);
router.put("/footer/:id", indexController.updateFooter);
module.exports = router;
