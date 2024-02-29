const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Product", productSchema);
