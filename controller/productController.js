const Product = require("../model/Product");

const add = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({
      status: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res
        .status(404)
        .json({ status: false, message: "No item available" });
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "No such product found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { productId, updatedProperties } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "No such product found",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedProperties },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: true,
      message: "Item updated successfully",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "No such product is found",
      });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      status: true,
      message: "Product is deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
