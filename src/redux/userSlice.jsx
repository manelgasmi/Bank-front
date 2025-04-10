import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "", 
    user: null, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logoutUser: (state) => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});
export const {
  setUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
