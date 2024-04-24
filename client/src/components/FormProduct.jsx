import React, { useState, useEffect } from "react";
import axios from "axios";
import { remove,create,read } from "../functions/product";
import { Link } from "react-router-dom";



const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      read()
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const handleChang = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    create(form)
      .then((res) => {
        loadData();
      })
      .catch((err) => console.error(err));
  };

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };



  return (
    <div>
      <h3>FormProduct5555</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChang(e)}
          placeholder="name"
        />
        <br />

        <input
          type="text"
          name="detail"
          placeholder="detail"
          onChange={(e) => handleChang(e)}
        />
        <br />

        <input
          type="number"
          name="price"
          placeholder="price"
          onChange={(e) => handleChang(e)}
        />
        <br />

        <button type="submit">Submit</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">price</th>
            <th scope="col">action</th>
            <th scope="col">edit</th>
          </tr>
        </thead>

        <tbody>
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td onClick={() => handleRemove(item._id)}>delete</td>
                  <td>
                    <Link to={`/edit/${item._id}`}>
                      edit
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;
