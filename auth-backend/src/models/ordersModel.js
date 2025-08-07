const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  
    name: String,
    description: String,
    price: Number,
    inStock: Boolean,
    category: String
});
  module.exports = mongoose.model("order", ordersSchema);
    