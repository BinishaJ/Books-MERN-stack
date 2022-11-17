import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import { MdEdit, MdDelete } from "react-icons/md";

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
      .then((result) => {
        alert(`Book ISBN ${isbn} deleted!`);
        getData();
      })
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
      <div style={{ margin: "20px 0px" }}>
        <input
          onChange={handleSearch}
          value={search}
          type="number"
          className="search"
          placeholder="Search for book by ISBN"
        />
        <button onClick={Search}>Search</button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Add New</h1>
        <label className="label">ISBN: </label>
        <input
          type="number"
          name="isbn"
          value={isbn}
          required
          onChange={handleChange}
          className="input"
          placeholder="ISBN"
          autoFocus
        />
        <label className="label"> Title: </label>
        <input
          name="title"
          value={title}
          required
          onChange={handleChange}
          className="input"
          placeholder="Title"
        />
        <label className="label">Author: </label>
        <input
          name="author"
          value={author}
          required
          onChange={handleChange}
          className="input"
          placeholder="Author"
        />
        <label className="label">Price: </label>
        <input
          type="number"
          name="price"
          value={price}
          required
          onChange={handleChange}
          className="input"
          placeholder="Price"
        />
        <button type="submit" className="add">
          Submit
        </button>
      </form>
      <div className="tableContainer">
        <table border="1" className="table">
          <thead>
            <tr>
              <th className="row head">ISBN</th>
              <th className="row head">Title</th>
              <th className="row head">Author</th>
              <th className="row head">Price</th>
              <th className="row head"></th>
            </tr>
          </thead>

          {data.length > 0 ? (
            <tbody>
              {data.map((book) => {
                return (
                  <tr key={book.isbn}>
                    <td className="row">{book.isbn}</td>
                    <td className="row">{book.title}</td>
                    <td className="row">{book.author}</td>
                    <td className="row">{book.price}</td>
                    <td className="row">
                      <i className="fa-sharp fa-solid fa-pen"></i>
                      <MdDelete
                        onClick={() => handleDelete(book.isbn)}
                        style={{ color: "#ff0b0b" }}
                        className="button"
                      />

                      <Link to={`/edit/${book.isbn}`}>
                        <MdEdit
                          className="button"
                          style={{ color: "#0b4dff" }}
                        />
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
    </div>
  );
}

export default View;
