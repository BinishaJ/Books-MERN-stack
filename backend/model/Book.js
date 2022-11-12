const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
