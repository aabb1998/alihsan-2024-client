import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../src/utils/api";

const initialState = {
  quickdonations: [],
  topDonations: [],
  latestDonations: [],
  qucikDonationProject: null,
  quickDonationCount: 0,
  topDonationCount: 0,
  count: 0,
  loading: false,
  error: "",
};

export const getQucikDonation = createAsyncThunk(
  "get/quickDonation",
  async (thunkAPI) => {
    try {
      const response = await api.get("quickdonation");
      let data = response?.data?.payload?.campaigns;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getTopDonation = createAsyncThunk(
  "get/topDonation",
  async (filters, thunkAPI) => {
    try {
      const response = await api.get("donations/campaign-donations", {
        params: filters,
      });
      let data = response?.data?.payload;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getQucikDonationProject = createAsyncThunk(
  "get/quick-donation-project",
  async (id, thunkAPI) => {
    try {
      const response = await api.get("/project/details/" + id);
      let data = response?.data?.payload;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const quickDonationSlice = createSlice({
  name: "quickDonation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQucikDonation.fulfilled, (state, action) => {
      state.quickdonations = action?.payload;
    });

    builder.addCase(getTopDonation.fulfilled, (state, action) => {
      state.topDonations = action?.payload;
    });

    builder.addCase(getQucikDonationProject.fulfilled, (state, action) => {
      state.loading = false;
      state.qucikDonationProject = action?.payload;
      state.error = "";
    });
    builder.addCase(getQucikDonationProject.pending, (state, action) => {
      state.loading = true;
      state.qucikDonationProject = null;
    });

    builder.addCase(getQucikDonationProject.rejected, (state, action) => {
      state.loading = false;
      state.qucikDonationProject = [];
    });
  },
});
export default quickDonationSlice.reducer;
