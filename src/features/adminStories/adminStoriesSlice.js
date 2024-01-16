import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  stories: [],
  isLoading: false,
  error: null,
};
export const deleteStories = createAsyncThunk(
  "get/story",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("impact-stories/delete" + id);
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const addStory = createAsyncThunk(
  "add/story",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("impact-stories/add", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const updateStory = createAsyncThunk(
  "update/story",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "impact-stories/update/" + payload?.id,
        payload?.data
      );
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const adminStoriesSlice = createSlice({
  name: "adminStories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deleteStories.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteStories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(addStory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addStory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
      builder
      .addCase(updateStory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateStory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default adminStoriesSlice.reducer;
