import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const Edit = () => {
  const navigate = useNavigate();
  const { isbn } = useParams();
  const [data, setData] = useState({
    title: "",
    author: "",
    price: "",
  });
  const { title, author, price } = data;

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    axios
      .get(`http://localhost:5000/api/books/${isbn}`)
      .then((res) => {
        setData({
          isbn: isbn,
          title: res.data[0].title,
          author: res.data[0].author,
          price: res.data[0].price,
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/books/${isbn}`, data)
      .then(() => {
        alert("Data edited successfully!");
        navigate("/");
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <div>
      <h1>Books</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Edit</h1>
        <label className="label">ISBN: </label>
        <input
          type="number"
          name="isbn"
          value={isbn}
          required
          onChange={handleChange}
          className="input"
          placeholder="ISBN"
          readOnly
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
        <div className="buttons">
          <button type="submit" className="submit">
            Submit
          </button>
          <button className="cancel" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
