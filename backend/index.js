//imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const booksRoute = require("./routes/books");

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/books", booksRoute);

app.all("*", (req, res) => {
  res.status(404).send("Error 404! Page not found!");
});

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
