import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../hook";

const categorieSlice = createSlice({
  name: "categorie",
  initialState: {
    date: [],
    error:null,
    loading:null,
  },

  reducers: {
    setCategories: (state, { payload }) => {
      state.data = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});
const { setCategories, setError, setLoading } = categorieSlice.actions;
export default categorieSlice.reducer;


export const getCategories = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    axios
      .get(`${API}/categories/`)
      .then((response) => {
        dispatch(setCategories(response?.data));
      })
      .catch((error) => dispatch(setError(error?.response?.data)))
      .finally(() => dispatch(setLoading(null)));
  };
};
