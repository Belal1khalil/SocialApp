import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "./../../services/api-client";

const initialState: userState = {
  token: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const options = {
      method: "POST",
      url: "/users/signin",
      data: values,
    };
    const { data } = await apiClient.request(options);
    console.log(data);
    return { data };
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(login.fulfilled, () => {
      console.log("Done");
    });
    builder.addCase(login.rejected, () => {
      console.log("rejected");
    });
    builder.addCase(login.pending, () => {
      console.log("pending");
    });
  },
});

export const userReducer = userSlice.reducer;
