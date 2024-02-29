const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
  show,
  index,
  filterProducts,
};

async function show(req, res) {
  const product = await Product.findById(req.params.id);
  const seller = await User.findById(product.seller);
  res.render("products/show", { title: "Product Detail", product, seller });
}

async function index(req, res) {
  const products = await Product.find({});
  res.render("products/index", { title: "All Products", products });
}

async function filterProducts(req, res) {
  const userInput = new RegExp(req.query.search, "i"); // 'i' for case-insensitive search
  const category = new RegExp(req.query.category, "i"); // 'i' for case-insensitive search
  let products = await Product.find({ name: userInput });
  console.log(req.query.search);
  if (req.query.category){
    products = await Product.find({ category: category });
    console.log(category);
    console.log(products);
  }
  res.render("products/index", { title: "Filter Products", products });
}
