import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../src/utils/api";

export const getProfile = createAsyncThunk("users/get", async (thunkAPI) => {
  try {
    const response = await api.get("profile");
    let data = response?.data?.payload;
    if (response.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const updateProfile = createAsyncThunk(
  "posts/addNewPost",
  async (payload) => {
    const response = await api.patch("profile", payload);
    return response.data;
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default authenticationSlice.reducer;
