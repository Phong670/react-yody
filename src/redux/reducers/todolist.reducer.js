import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todoList: [],
};

const todoListReducer = createReducer(initialState, {
  ADD_TO_DO: (state, action) => {
    const newValues = {
      ...action.payload,
      id: uuidv4(),
    };
    const newToDoList = [newValues, ...state.todoList];
    return {
      ...state,
      todoList: newToDoList,
    };
  },
  EDIT_TO_DO: (state, action) => {
    const { id, values } = action.payload;
    const newToDoList = [...state.todoList];
    const index = state.todoList.findIndex((item) => item.id === id);
    newToDoList.splice(index, 1, values);
    return {
      ...state,
      todoList: newToDoList,
    };
  },
  REMOVE_TO_DO: (state, action) => {
    const { id } = action.payload;
    const newToDoList = [...state.todoList];
    const index = state.todoList.findIndex((item) => item.id === id);
    newToDoList.splice(index, 1);
    return {
      ...state,
      todoList: newToDoList,
    };
  },
});

export default todoListReducer;
