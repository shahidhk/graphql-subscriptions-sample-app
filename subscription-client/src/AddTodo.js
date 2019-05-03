import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation AddTodo($type: String) {
    insert_todos(objects:{type: $type}) {
      returning {
        id
        type
      }
    }
  }
`;

const AddTodo = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data, loading, error }) => {
        if (loading) return "Loading...";
        if (error) {console.log(error); return `Error! ${error}`};
        return(
            <div>
            <form
                onSubmit={e => {
                e.preventDefault();
                addTodo({ variables: { type: input.value == '' ? null : input.value } });
                input.value = "";
                }}
            >
                <input
                ref={node => {
                    input = node;
                }}
                />
                <button type="submit">Add Todo</button>
            </form>
            </div>
        );
      }}
    </Mutation>
  );
};

export default AddTodo;