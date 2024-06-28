import { createSlice } from "@reduxjs/toolkit";
import { API } from "../hook";
import axios from "axios";
import { changeCart } from "./Cart";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("user") ?? "{}"),
    loading: null,
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

export const { setItems, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;

export const registration = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${API}/auth/register/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(setItems(response.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.replace("/");
      })
      .catch((error) => {
        dispatch(setError(error.response.data));
        dispatch(setLoading(false));
      })
      .finally(() => {
        toast.success("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(setLoading(false));
      });
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${API}/auth/login/`, data)
      .then((response) => {
        dispatch(setItems(response.data));
        localStorage.setItem("token", response.data.token_key);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.replace("/");
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.response.data));
      })
      .finally(() => dispatch(setLoading(false)));
  };
};

export const getProfile = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(`${API}/auth/profile/${id}/`)
      .then((response) => {
        dispatch(setItems(response.data));
        localStorage.setItem("token", response.data.token_key);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.response.data));
      })
      .finally(() => dispatch(setLoading(false)));
  };
};

export const changeUserData = (data, id, back) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    axios
      .patch(`${API}/auth/profile/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(setItems(response.data));
        localStorage.setItem("token", response.data.token_key);
        localStorage.setItem("user", JSON.stringify(response.data));
        back();
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.response.data));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const changeUserPassword = (data, back) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const token = `Token ${localStorage.getItem("token")}`;
    axios
      .patch(`${API}/auth/change-password/`, data, {
        headers: { Authorization: token },
      })
      .then(() => {
        back();
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error.response.data));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
