const Order = require("../Models/orderModel");
const Book = require("../Models/bookModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderBooks, fromDate, toDate, returnDate } = req.body;

  const order = await Order.create({
    orderBooks,
    fromDate,
    toDate,
    returnDate,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName lastName email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found for this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders -- admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

//update order status -- admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found for this ID", 404));
  }

  if (order.orderStatus === "Placed") {
    return next(new ErrorHandler("You have already provided this order", 400));
  }

  order.orderBooks.forEach(async (o) => {
    await updateStock(o.book, o.quantity);
  });

  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const book = await Book.findById(id);

  book.stock -= quantity;
  await book.save({ validateBeforeSave: false });
}

//delete order -- admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found for this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
