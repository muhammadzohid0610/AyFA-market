import { createSlice } from "@reduxjs/toolkit";
import { API } from "../hook";
import axios from "axios";
import { toast } from "react-toastify";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setItems: (state, { payload }) => {
      state.data = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
});
export const { setItems, setError, setLoading } = ordersSlice.actions;
export default ordersSlice.reducer;

export const setOrders = (data, setFunc) => {

  return async (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${API}/orders/`, data)
      .then((response) => {
        dispatch(setItems(response.data));
        console.log(123);
        toast.success("Пост успешно добавлен", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setFunc();
      })
      .catch((error) => dispatch(setError(error?.response?.data)))
      .finally(() => {
        dispatch(setLoading(null));
      });
  };
};
