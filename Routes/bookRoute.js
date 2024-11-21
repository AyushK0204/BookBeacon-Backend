const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
} = require("../Controllers/bookController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router = express.Router();

router.route("/books").get(getAllBooks);
router
  .route("/book/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBook);
router
  .route("/book/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook)
  .get(getBookDetails);

module.exports = router;
