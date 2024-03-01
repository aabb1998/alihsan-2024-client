import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  rows: [],
  count: 0,
  filters: {
    page: 1,
    country: "",
    search: "",
  },
  loading: false,
  error: "",
  details: null,
  detailsId: null,
  detailsLoading: false,
  detailsError: "",
};

export const getUsers = createAsyncThunk(
  "get/admin-customers",
  async (params) => {
    try {
      const res = await api.get("/users", { params });
      return res.data.payload;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

export const getCustomerDetails = createAsyncThunk(
  "get/admin-customer-details",
  async (id) => {
    try {
      const res = await api.get("/users/" + id);
      const res1 = await api.get("/users/donations/" + id);
      return { details: res.data.payload, donations: res1.data.payload };
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  },
);

const adminCustomersSlice = createSlice({
  name: "adminCustomers",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
        state.filters = action.meta.arg;
        state.error = "";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload.rows;
        state.count = action.payload.count;
      });

    builder
      .addCase(getCustomerDetails.pending, (state, action) => {
        state.detailsLoading = true;
        state.detailsId = action.meta.arg;
        state.detailsError = "";
      })
      .addCase(getCustomerDetails.rejected, (state, action) => {
        if (state.detailsId === action.meta.arg) {
          state.detailsLoading = false;
          state.detailsError = action.error.message;
        }
      })
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        if (state.detailsId === action.meta.arg) {
          state.details = action.payload.details;
          state.donations = action.payload.donations;
          state.detailsLoading = false;
          state.detailsError = "";
        }
      });
  },
});

export default adminCustomersSlice.reducer;
