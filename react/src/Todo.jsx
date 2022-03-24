import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [todos, setTodos] = useState([
    { item: 'breakfast', status: 'Complete' },
    { item: 'lunch', status: 'Incomplete' },
  ]);
  const getTodo = () => {
    axios
      .get('/todomysql')
      .then((res) => {
        setTodos(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTodo();
  }, []);
  const addTodo = (event) => {
    event.preventDefault();
    const obj = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios.post('/todomysql', obj).then((res) => {
      getTodo();
      console.log(res.data);
    });
  };
  const deleteItem = (index) => {
    axios.delete(`/todomysql/${index}`).then((res) => {
      console.log(res.data);
      getTodo();
    });
  };
  const updateItem = (todo) => {
    setEdit(true);
    setEditTodo(todo);
  };
  const saveTodo = (event) => {
    event.preventDefault();
    const obj = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios.put(`/todomysql/${editTodo.id}`, obj).then((res) => {
      getTodo();
      setEdit(false);
      console.log(res.data);
    });
  };
  return (
    <div className="container">
      {edit ? (
        <div className="form">
          <h1>Edit Todo</h1>
          <form onSubmit={saveTodo}>
            <div>
              <b>Enter Todo item:</b>
            </div>
            <input type="text" placeholder={editTodo.item} name="item" />
            <br />
            <div>
              <b>Select Status:</b>
            </div>
            <select name="status" placeholder={editTodo.status}>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button type="submit">Save Todo</button>
          </form>
        </div>
      ) : (
        <div className="form">
          <h1>Add Todo</h1>
          <form onSubmit={addTodo}>
            <div>
              <b>Enter Todo item:</b>
            </div>
            <input type="text" placeholder="enter Item" name="item" />
            <br />
            <div>
              <b>Select Status:</b>
            </div>
            <select name="status" placeholder="Select Status">
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button type="submit">Add Todo</button>
          </form>
          <button type="button" onClick={() => deleteItem('delete')}>
            Delete all Todos
          </button>
        </div>
      )}

      <div className="list">
        <h1>Todos List</h1>
        <div className="list-box">
          {todos.map((val) => (
            <div className="item">
              <div>Todo:{val.item}</div>
              <div>Status:{val.status}</div>
              <div>
                <button type="button" onClick={() => deleteItem(val.id)}>
                  Remove
                </button>
              </div>
              <div>
                <button type="button" onClick={() => updateItem(val)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Todo;
