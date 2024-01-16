import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  newsletterSubscribers: [],
  media: null,
  isLoading: false,
  error: null,
};

export const getNewsletterSubscribers = createAsyncThunk(
  "get/newsletterSubscribers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/subscribers", {
        params: params,
      });
      return response?.data?.payload;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const addNewsletterSubscriber = createAsyncThunk(
  "add/newsletterSubscribers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/subscriber", payload);
      return response?.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const deleteNewsletterSubscriber = createAsyncThunk(
  "delete/newsletterSubscribers",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("/subscribers/" + id);
      return response?.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const adminNewsletterSubscribersSlice = createSlice({
  name: "adminNewsletterSubscribersSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNewsletterSubscribers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsletterSubscribers = action.payload?.subscribers;
      })
      .addCase(getNewsletterSubscribers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getNewsletterSubscribers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(addNewsletterSubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewsletterSubscriber.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewsletterSubscriber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default adminNewsletterSubscribersSlice.reducer;
