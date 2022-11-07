import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import API from "../../../helpers/devApi";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [],
  menuType: localStorage.getItem("menuType")
    ? JSON.parse(localStorage.getItem("menuType"))
    : "",
  menu: [],
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        userInfo
      );

      const userData = jwtDecode(data.data.access_token);
      console.log({ userData });
      const user = {
        ...data.data,
        data: userData,
      };
      return user;
      // return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changePhoto: (state, action) => {
      state.user = {
        ...state.user,
        company: { ...state.user.company, image: action.payload.image },
        data: {
          ...state.user.data,
          name: action.payload.name,
          phone: action.payload.phone,
        },
      };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = [];
      localStorage.setItem("user", []);
      localStorage.removeItem("menuType");
    },
    changeMenu: (state, action) => {
      state.menuType = action.payload;
      localStorage.setItem("menuType", JSON.stringify(action.payload));
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(state.user));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changePhoto,
  logout,
  setMenu,
  changeMenu,
  increment,
} = authSlice.actions;

export default authSlice.reducer;
