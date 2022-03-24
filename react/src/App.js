import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Todo from './Todo';
import Author from './Author';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <BrowserRouter>
        <NavLink activeClassName="active" className="links" to="/todos">
          Todo
        </NavLink>
        <NavLink activeClassName="active" className="links" to="/authors">
          Authors
        </NavLink>
        <Routes>
          <Route path="/todos" element={<Todo />} />
          <Route path="/authors" element={<Author />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
