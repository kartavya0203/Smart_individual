import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isSignIn: true,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setIsSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
  },
});

export const { addUser, removeUser, setIsSignIn } = userSlice.actions;

export default userSlice.reducer;
