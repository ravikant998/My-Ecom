import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../api/axios";
import { register } from "../api/endPoints";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk("signupUser", async (userData) => {
  const response = await Api.post(register, userData);
  return response.data;
});

const signupSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default signupSlice.reducer;
