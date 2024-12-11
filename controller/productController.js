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


const getAll = (req, res) => {
  Product.find()
    .then((products) => {
      if (!products || products.length === 0) {
        return res
          .status(404)
          .json({ status: false, message: "No item available" });
      }
      return res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500).json({ status: false, error: error.message });
    });
};


const getOne = async (req, res) => {
  // console.log(req.params);
  
  const { productId } = req.params;
  // console.log(productId);
  
  Product.findById(productId).then((product) => {
    if(!product){
      return res
          .status(404)
          .json({ status: false, message: "No item available" });
    }
    // console.log(product);
    return res.status(200).json(product);
  }).catch((error) => {
    res.status(500).json({ status: false, error: error.message });
  });
}



// const getOne = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ status: false, message: "No such product found" });
//     }
//     return res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ status: false, error: error.message });
//   }
// };

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
    console.log(productId);
    
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
      message: "Ekahnei shomossha",
      // message: error.message,
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
