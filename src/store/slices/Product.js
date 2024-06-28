import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../hook";

const userSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: false,
    oneData: {},
    filter: false,
    maxPrice: [],
    currentPage: 1,
  },
  reducers: {
    setMaxPrice: (state, { payload }) => {
      state.maxPrice = payload;
    },
    setProducts: (state, { payload }) => {
      state.data = payload;
    },
    setProduct: (state, { payload }) => {
      state.oneData = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    addItemLast: (state, { payload }) => {
      state.data?.results?.push(...payload);
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});
export const {
  setProducts,
  setError,
  setLoading,
  setProduct,
  setFilter,
  setMaxPrice,
  addItemLast,
  setCurrentPage,
} = userSlice.actions;
export default userSlice.reducer;

export const getProducts = (params, AfterGet) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(`${API}/product/${params ? params : ""}`, {
        params: { page_size: 12, page: 1 },
      })
      .then((response) => {
        dispatch(setProducts(response?.data));
        AfterGet(response.data);
      })
      .catch((error) => dispatch(setError(error?.response?.data)))
      .finally(() => dispatch(setLoading(false)));
  };
};

export const getProduct = ({ id }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    axios
      .get(`${API}/product/${id}`)
      .then((response) => {
        dispatch(setProduct(response.data));
      })
      .catch((error) => dispatch(setError(error.response.data)))
      .finally(() => dispatch(setLoading(null)));
  };
};

export const getMaxPrice = () => {
  return async (dispatch) => {
    axios
      .get(`${API}/product/?ordering=-price`)
      .then((response) => {
        dispatch(setMaxPrice(response?.data?.results[0].price));
      })
      .catch((error) => dispatch(setError(error.response.data)));
  };
};
