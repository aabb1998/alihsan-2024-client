import { api } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

export const submitContactForm = createAsyncThunk(
  "add/contact-us",
  async (data) => {
    try {
      const response = await api.post("form/contact-us-add", data);
      if (response.status === 200) {
        return response?.data;
      } else {
        return response?.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

export const submitComplaintsForm = createAsyncThunk(
  "add/complaints-us",
  async (data) => {
    try {
      const response = await api.post("complaints/add", data);
      if (response.status === 200) {
        return response?.data;
      } else {
        return response?.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

export const contactForm = createSlice({
  name: "contactus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitContactForm.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(submitContactForm.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(submitContactForm.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(submitComplaintsForm.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(submitComplaintsForm.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(submitComplaintsForm.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default contactForm.reducer;
