import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: 1, content: "list1" },
    { id: 2, content: "list2" },
    { id: 3, content: "list3" },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
