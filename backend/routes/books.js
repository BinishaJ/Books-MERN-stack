const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const booksValidation = require("../validation");

//get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
});

//create
router.post("/", async (req, res) => {
  //check schema error
  const { error } = booksValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { isbn, title, author, price } = req.body;
  try {
    //check for duplicate
    const findBook = await Book.find({ isbn: isbn });
    if (findBook.length > 0)
      return res
        .status(404)
        .json({ message: `Book with ISBN ${isbn} already exists!` });

    //new book
    const newBook = new Book({
      isbn: isbn,
      title: title,
      author: author,
      price: price,
    });
    const saveBook = await newBook.save();
    return res.status(201).json(saveBook);
  } catch (err) {
    return res.json({ message: err });
  }
});

//read specific book by isbn
router.get("/:isbn", async (req, res) => {
  try {
    //find book with given isbn
    const findBook = await Book.find({ isbn: req.params.isbn });

    //no book with isbn
    if (findBook.length < 1)
      return res
        .status(404)
        .json({ message: `No book found with ISBN ${req.params.isbn}` });

    //get book
    res.json(findBook);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete book
router.delete("/:isbn", async (req, res) => {
  try {
    //find book
    const findBook = await Book.find({ isbn: req.params.isbn });

    //no book with isbn
    if (findBook.length < 1) {
      return res
        .status(404)
        .json({ message: `No book found with ISBN ${req.params.isbn}` });
    }

    //delete book
    const newBooks = await Book.deleteOne({ isbn: req.params.isbn });
    res
      .status(201)
      .json({ message: `Book with ISBN ${req.params.isbn} deleted!` });
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:isbn", async (req, res) => {
  try {
    //check for isbn
    const findBook = await Book.find({ isbn: req.params.isbn });
    if (findBook.length < 1) {
      return res
        .status(404)
        .json({ message: `No book with ISBN ${req.params.isbn} found` });
    }

    //update
    await Book.updateOne({ isbn: req.params.isbn }, { $set: req.body });
    const updated = await Book.find({ isbn: req.params.isbn });
    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
