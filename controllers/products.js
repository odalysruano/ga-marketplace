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
  const regex = new RegExp(req.query.search, "i"); // 'i' for case-insensitive search
  const products = await Product.find({ name: regex });
  console.log(products);

  res.render("products/index", { title: "Filter Products", products });
}
