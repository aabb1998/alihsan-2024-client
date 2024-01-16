import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  finantialReports: [],
  constitutions: [],
  reportCount: 0,
  constitutionCount: 0,
  loading: false,
  error: "",
};

export const getFinantialReports = createAsyncThunk(
  "get/finantial_reports",
  async (params, thunkAPI) => {
    try {
      const response = await api.get("/financial-reports", {
        params: params,
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

export const getConstitution = createAsyncThunk(
  "get/constitutions",
  async (params, thunkAPI) => {
    try {
      const response = await api.get("/financial-reports/constitution", {
        params: params,
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

export const finantialReportSlice = createSlice({
  name: "impactStory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFinantialReports.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFinantialReports.fulfilled, (state, action) => {
      state.finantialReports = action?.payload?.rows;
      state.reportCount = action?.payload?.count;
      state.loading = false;
    });
    builder.addCase(getFinantialReports.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getConstitution.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getConstitution.fulfilled, (state, action) => {
      state.loading = false;
      state.constitutions = action?.payload?.rows;
      state.constitutionCount = action?.payload?.count;
    });
    builder.addCase(getConstitution.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default finantialReportSlice.reducer;
