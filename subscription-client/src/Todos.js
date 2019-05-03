import React from 'react';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

const GET_TODOS = gql`
  subscription {
    todos {
      id
      type
    }
  }
`;

const Todos = () => (
  <Subscription subscription={GET_TODOS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) {console.log(error); return `Error! ${error.message}`};

      return (
        <ul>
          {data.todos.map(todo=> (
            <li>{todo.id}: {todo.type}</li>
          ))}
        </ul>
      );
    }}
  </Subscription>
);

export default Todos;