import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function View() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    price: "",
  });

  const { isbn, title, author, price } = book;

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const Search = async () => {
    axios
      .get(`http://localhost:5000/api/books/${search}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const getData = async () => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleDelete = async (isbn) => {
    await axios
      .delete(`http://localhost:5000/api/books/${isbn}`)
      .then((result) => getData())
      .catch((error) => alert(error.response.data.message));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/books", book)
      .then(() => {
        alert("Data added successfully!");
        setBook({ isbn: "", title: "", author: "", price: "" });
        getData();
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div>
      <h1>Books</h1>
      <label>Search</label>
      <input
        onChange={handleSearch}
        value={search}
        type="number"
        placeholder="Search for book by ISBN"
      />
      <button onClick={Search}>Search</button>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          margin: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <h1>Add New</h1>
        <label>ISBN: </label>
        <input
          type="number"
          name="isbn"
          value={isbn}
          required
          onChange={handleChange}
        />
        <label> Title: </label>
        <input name="title" value={title} required onChange={handleChange} />
        <label>Author: </label>
        <input name="author" value={author} required onChange={handleChange} />
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={price}
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <table border="1">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
          </tr>
        </thead>

        {data.length > 0 ? (
          <tbody>
            {data.map((book) => {
              return (
                <tr key={book.isbn}>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>
                    <button onClick={() => handleDelete(book.isbn)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/edit/${book.isbn}`}>
                      <button>Edit</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </div>
  );
}

export default View;
