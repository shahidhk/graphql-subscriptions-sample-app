import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './Todos';
import AddTodo from './AddTodo';

function App() {
  return (
    <div className="App">
      <Todos />
      <AddTodo />
    </div>
  );
}

export default App;
