const { Product } = require("../models/product");

const addProduct = async (req, res) => {
  const { name, description, published, price, rating } = req.body;
  try {
    // Check if image is uploaded
    if (!req.file) {
      logger.error("Please upload an image");
      return res.status(400).json({ message: "Please upload an image" });
    }

    const newProduct = await Product({
      name,
      description,
      published,
      userId: req.user._id,
      image: req.file.path, //add image file path to store image in database
      price,
      rating,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    await newProduct.save();
    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    logger.error("Error adding product");
    return res.status(500).json({ message: "Error adding product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    looger.error("Error fetching all products");
    return res.status(500).json({ message: "Error fetching all products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      logger.error("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    logger.error("Error fetching product ");
    return res.status(500).json({ message: "Error fetching  product" });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const productUpdate = await Product.findByIdAndUpdate(id);

    if (!productUpdate) {
      logger.error("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    logger.error("Error updating product");
    return res.status(500).json({ message: "Error updating  product" });
  }
};
const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    logger.error("Error deleting product");
    return res.status(500).json({ message: "Error delete  product" });
  }
};

const publishedProducts = async (req, res) => {
  try {
    const publishedProducts = await Product.find({ published: true }); //find all published products
    return res.status(200).json(publishedProducts);
  } catch (error) {
    logger.error("Error fetching published products");
    return res
      .status(500)
      .json({ message: "Error find all published products" });
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.query;
  try {
    const productsByName = await Product.find({ name: name }); //find product by name
    return res.status(200).json(productsByName);
  } catch (error) {
    logger.error("Error fetching product by name");
    return res.status(500).json({ message: "Error find product by name" });
  }
};

const getAllProductsByuserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const productsByUserId = await Product.find({ createdBy: userId }); //find products by userId

    return res.status(200).json(productsByUserId);
  } catch (error) {
    logger.error("Error fetching products by user id");
    return res.status(500).json({ message: "Error find products by userId" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  publishedProducts,
  getProductByName,
  getAllProductsByuserId,
};
