import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Author() {
  const [authors, setAuthors] = useState([
    { first_name: 'karuna' },
    { last_name: 'sree' },
  ]);
  const getAuthor = () => {
    axios
      .get('/authors')
      .then((res) => {
        setAuthors(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAuthor();
  }, []);
  const addAuthor = (event) => {
    event.preventDefault();
    const obj = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      dob: event.target.dob.value,
      dod: event.target.dod.value,
    };
    axios.post('/authors', obj).then((res) => {
      getAuthor();
      console.log(res.data);
    });
  };
  const deleteItem = (index) => {
    axios.delete(`/authors/${index}`).then((res) => {
      console.log(res.data);
      getAuthor();
    });
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Add Author</h1>
        <form onSubmit={addAuthor}>
          <div>
            <b>Enter First Name:</b>
          </div>
          <input type="text" placeholder="first name" name="first_name" />
          <br />
          <div>
            <b>Enter Last Name:</b>
          </div>
          <input type="text" placeholder="enter Item" name="last_name" />
          <br />
          <div>
            <b>Choose Date of Birth:</b>
          </div>
          <input type="date" placeholder="enter Item" name="dob" />
          <br />
          <div>
            <b>Choose Date of Death:</b>
          </div>
          <input type="date" placeholder="enter Item" name="dod" />
          <br />

          <button type="submit">Add Author</button>
        </form>
        <button type="button" onClick={() => deleteItem('delete')}>
          Delete all Authors
        </button>
      </div>
      <div className="list">
        <h1>Authors List</h1>
        <div className="list-box">
          {authors.map((val) => (
            <div className="item">
              <div>
                <b>first_name: </b>
                {val.first_name}
              </div>
              <div>
                <b>last_name: </b>
                {val.last_name}
              </div>
              <div>
                <b>Date of Birth: </b>
                {val.dob}
              </div>
              <div>
                <b>Date of Death: </b>
                {val.dod}
              </div>
              <div>
                <button type="button" onClick={() => deleteItem(val.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Author;
