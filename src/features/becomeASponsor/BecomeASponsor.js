import { api } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

export const addSponsor = createAsyncThunk("add/sponser", async (data) => {
  try {
    const response = await api.post("form/sponsor-add", data);
    if (response.status === 200) {
      return response?.data;
    } else {
      return response?.data;
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
    builder.addCase(addSponsor.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addSponsor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addSponsor.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default fundraise.reducer;
