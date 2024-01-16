import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  reports: [],
  reportDetails: null,
  isLoading: false,
  error: null,
};

export const getFinancialReports = createAsyncThunk(
  "get/financialReports",
  async (params, {}) => {
    try {
      const response = await api.get("/financial-reports", { params });
      const data = response?.data?.payload;
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);
export const updateFinancialReports = createAsyncThunk(
  "update/financialReports",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/financial-reports/update-financial-statement/" + payload?.id,
        payload?.data
      );
      return response?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);
export const addFinancialReports = createAsyncThunk(
  "add/financialReports",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/financial-reports/add-financial-statement",
        payload.data
      );
      return response?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);
export const getConstitution = createAsyncThunk(
  "get/constitution",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/financial-reports/constitution", {
        params,
      });
      return response?.data?.payload;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);

export const updateConstitution = createAsyncThunk(
  "update/constitution",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/financial-reports/update-constitution-statement/" + payload?.id,
        payload?.data
      );
      return response?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);
export const addConstitution = createAsyncThunk(
  "add/constitution",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/financial-reports/add-constitution-statement",
        payload?.data
      );
      return response?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);
export const deleteConstitution = createAsyncThunk(
  "delete/constitution",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete("/financial-reports/constitution/" + id);
      return response?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);

export const deleteFinantialReport = createAsyncThunk(
  "delete/finantialReports",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        "/financial-reports/financial-statement/" + id
      );
      return response?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
);

const adminFinancialReportSlice = createSlice({
  name: "adminFundRaisers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFinancialReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.isLoading = false;
      })
      .addCase(getFinancialReports.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFinancialReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getConstitution.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.isLoading = false;
      })
      .addCase(getConstitution.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getConstitution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default adminFinancialReportSlice.reducer;
