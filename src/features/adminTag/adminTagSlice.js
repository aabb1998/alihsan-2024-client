import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  tags: [],
  isLoading: false,
  error: null,
};

export const getTags = createAsyncThunk(
  "get/tags",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("blog/tags", {
        params: params,
      });
      const data = response.data?.payload;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const addOrUpdateTag = createAsyncThunk(
  "add/tag",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api[payload?.id ? "put" : "post"](
        `blog/tag/${payload?.id || ""}`,
        payload?.data
      );
      return response?.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const removeTag = createAsyncThunk(
  "remove/tag",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("blog/tag/" + id);
      return response?.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const adminTagSlice = createSlice({
  name: "adminTag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTags.fulfilled, (state, action) => {

        state.tags = action.payload;
        state.isLoading = false;
      })
      .addCase(getTags.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default adminTagSlice.reducer;
