import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          margin: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <h1>Edit</h1>
        <label>ISBN: </label>
        <input type="number" name="isbn" value={isbn} readOnly />
        <label> Title: </label>
        <input name="title" required value={title} onChange={handleChange} />
        <label>Author: </label>
        <input name="author" required value={author} onChange={handleChange} />
        <label>Price: </label>
        <input
          type="number"
          name="price"
          required
          value={price}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
