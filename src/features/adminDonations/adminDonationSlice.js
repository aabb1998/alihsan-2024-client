import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  donations: [],
  subscriptionPayments: [],
  donation: null,
  infoTileData: null,
  isInfoTileDataLoading: false,
  isLoading: false,
  error: null,
};

export const getDonations = createAsyncThunk(
  "get/donations",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("donations", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getDonation = createAsyncThunk(
  "get/donation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get("donations/" + id);
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getInfoTileData = createAsyncThunk(
  "get/infoTilesData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("subscriptions/counts", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getSubscriptions = createAsyncThunk(
  "get/subscriptions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("subscriptions", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getCustomers = createAsyncThunk(
  "get/customers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("users/all-list");
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getSubscriptionPayments = createAsyncThunk(
  "get/subscriptionPayments",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get("donations/payments/" + payload?.id, {
        params: payload?.params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

const adminDonationSlice = createSlice({
  name: "adminDonations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDonations.fulfilled, (state, action) => {
      state.donations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDonations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDonations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
      state.donations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSubscriptions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSubscriptions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getInfoTileData.fulfilled, (state, action) => {
      state.infoTileData = action.payload;
      state.isInfoTileDataLoading = false;
    });
    builder.addCase(getInfoTileData.pending, (state, action) => {
      state.isInfoTileDataLoading = true;
    });
    builder.addCase(getInfoTileData.rejected, (state, action) => {
      state.infoTileData = null;
      state.isInfoTileDataLoading = false;
      state.error = action.error;
    });

    builder.addCase(getDonation.fulfilled, (state, action) => {
      state.donation = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDonation.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDonation.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customersList = action.payload;
    });

    builder.addCase(getSubscriptionPayments.fulfilled, (state, action) => {
      state.subscriptionPayments = action.payload;
    });
  },
});

export default adminDonationSlice.reducer;
