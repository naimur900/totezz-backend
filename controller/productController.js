const Product = require("../model/Product");

const addProduct = async (req, res) => {
  const product = req.body;
  console.log(product);
  try {
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

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ status: false, message: "There is no product" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({
      _id: productId,
    });

    // Need to fix error showcasing
    if (!product) {
      res.status(404).json({ status: false, message: "product is not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const updateProductById = async (req, res) => {
  const productId = req.params.productId;
  // console.log(productId);
  const updatedProperties = req.body;
  // console.log(updatedProperties);
  try {
    const product = await Product.findById(productId);
    // console.log(product);
    if (!product) {
      res.status(404).json({
        status: flase,
        message: "No such product is found",
      });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedProperties },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        status: true,
        message: "Item updated successfully",
        updatedProduct: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(404).json({
        status: flase,
        message: "product not found",
      });
    } else {
      await Product.findByIdAndDelete(productId);
      res.status(200).json({
        status: true,
        message: "product deleted successfully",
      });
    }
  } catch (error) {
    res.status(300).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProductById,
  getProduct,
  updateProductById,
  deleteProductById,
};
