import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart") ?? "[]"),
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.data.push(payload.data);
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    changeCart: (state, { payload: { id, count } }) => {
      state.data = state.data.map((item) =>
        item.id === id ? { ...item, count: count } : item
      );
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    removeCart: (state, { payload: { id } }) => {
      state.data = state.data.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    removeCarts: (state, { payload }) => {
      state.data = state.data.filter(
        (item) => !payload.id.some((e) => e == item.id)
      );
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    removeCartApp: (state) => {
      state.data = [];
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
  },
});
export const { addCart, changeCart, removeCart, removeCarts, removeCartApp } =
  cartSlice.actions;
export default cartSlice.reducer;
