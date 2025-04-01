import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logoutUser: (state) => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    },
    saveProfile: (state, action) => {
      state.user = action.payload.user;
    },
  },
});
export const {
  loginUser,
  logoutUser,
  saveProfile,
} = userSlice.actions;

export default userSlice.reducer;
