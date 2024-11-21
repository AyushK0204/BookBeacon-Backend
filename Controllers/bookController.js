const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Book = require("../Models/bookModel");
const ApiFeatures = require("../Utils/apiFeatues");

//create book -- admin
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    book,
  });
});

//get book details
exports.getBookDetails = catchAsyncErrors(async (req, res, nest) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 500));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

//get all books
exports.getAllBooks = catchAsyncErrors(async (req, res, nest) => {
  const resultPerPage = 8;
  const booksCount = await Book.countDocuments();
  const apiFeature = new ApiFeatures(Book.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const books = await apiFeature.query;
  res.status(200).json({
    success: true,
    books,
    booksCount,
  });
});

//update book -- admin
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 500));
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    book,
  });
});

//delete book
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 500));
  }
  await book.deleteOne();
  res.status(200).json({
    success: true,
    message: "Book Deleted Successfully",
  });
});
