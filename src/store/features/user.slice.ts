import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "./../../services/api-client";
import { toast } from "react-toastify";
const initialState: userState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  userData: null,
  isLoading: false,
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
    return data;
  },
);

export const signup = createAsyncThunk("user/signup", async (values: any) => {
  try {
    const options = {
      method: "POST",
      url: "/users/signup",
      data: values,
    };
    const { data } = await apiClient.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
});

export const getProfile = createAsyncThunk("user/getProfile", async () => {
  try {
    const options = {
      method: "GET",
      url: "/users/profile-data",
    };
    const { data } = await apiClient.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Get profile failed:", error);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      toast.info("Logged out successfully");
    },
  },
  extraReducers: function (builder) {
    // Login cases
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.success("Welcome back!");
    });
    builder.addCase(login.rejected, (state, action) => {
      toast.error("Incorrect Email or Password");
    });
    builder.addCase(login.pending, () => {
      toast.info("Signing in...");
    });

    // Signup cases
    builder.addCase(signup.fulfilled, (state, action) => {
      toast.success("Signup successful!");
    });
    builder.addCase(signup.rejected, (state, action) => {
      toast.error("Email already exists!");
    });
    builder.addCase(signup.pending, () => {
      toast.info("Signing up...");
    });

    // Get Profile cases
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload.user;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
      toast.error("Failed to load profile data.");
    });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
