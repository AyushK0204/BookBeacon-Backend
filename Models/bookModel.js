const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Please enter book name"],
  },
  author: {
    type: String,
    required: [true, "Please enter author name"],
  },
  language: {
    type: String,
    default: "",
  },
  publisher: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Book Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  bookStatus: {
    type: String,
    default: "Available",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
