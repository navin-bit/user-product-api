const express = require("express");

const { upload } = require("../middlewares/multer");
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  publishedProducts,
  getProductByName,
  getAllProductsByuserId,
} = require("../controllers/product");
const { auth } = require("../middlewares/auth");
const { productValidation } = require("../middlewares/validation");
const productRouter = express.Router();

productRouter.get("/", auth, getAllProducts);
productRouter.get("/:id", auth, getProductById);

productRouter.post(
  "/add",
  auth,

  upload.single("image"),
  productValidation,

  addProduct
);
productRouter.put(
  "/update/:id",
  auth,
  upload.single("image"),
  updateProductById
);
productRouter.delete("/delete/:id", auth, deleteProductById);
productRouter.get("/product/published", auth, publishedProducts);
productRouter.get("/search/product", auth, getProductByName);
productRouter.get("/user/:userId", auth, getAllProductsByuserId);

// GET api/products.                       - get all products
// GET api/products/:id                  -    get products by id
// POST api/products add              -  new products
// PUT api/products/:id                   -  update products by id
// DELETE api/products/:id            -   remove products by id
// GET api/products/published      -  find all published products
// GET api/products?name=           -  find all products by name
// GET api/products/:userId    -    get all products by user id

module.exports = {
  productRouter,
};
