import { api } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApplyNow } from "./ApplyNow";

const initialState = {
  loading: false,
  error: "",
  ourWorks: [],
};

export const addFundraiser = createAsyncThunk(
  "add/fundraiser",
  async (data) => {
    try {
      const response = await api.post("form/fund-raiser-add", data);
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

export const getOurWorks = createAsyncThunk("get/out-works", async (data) => {
  try {
    const response = await api.get("our-works", data);
    if (response.status === 200) {

      return response?.data?.payload;
    } else {
      return response?.data?.payload;
    }
  } catch (e) {
    return e.response.data;
  }
});

export const fundraise = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFundraiser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addFundraiser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addFundraiser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getOurWorks.fulfilled, (state, action) => {
      state.ourWorks = action?.payload?.oruWorks;
    });
  },
});

export default fundraise.reducer;
