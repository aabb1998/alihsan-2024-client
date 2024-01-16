import { api } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

export const addVolunteer = createAsyncThunk("add/volunteer", async (data) => {
  try {
    const response = await api.post("form/volunteer-add", data);
    if (response.status === 200) {
      return response?.data;
    } else {
      return response?.data;
    }
  } catch (e) {
    return e.response.data;
  }
});

export const volunteerWithUs = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addVolunteer.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addVolunteer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addVolunteer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default volunteerWithUs.reducer;
