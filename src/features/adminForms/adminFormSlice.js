import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  formDatas: [],
  formDetails: null,
  isLoading: false,
  error: null,
};

export const getFundraisers = createAsyncThunk(
  "get/fundraisers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/form/fund-raiser-list", {
        params: params,
      });
      const data = response?.data?.payload?.FundRaiserList;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const getSponsors = createAsyncThunk(
  "get/sponsors",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/form/sponsor-list", {
        params: params,
      });
      const data = response?.data?.payload?.sponsorList;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const getVolunteer = createAsyncThunk(
  "get/volunteers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/form/volunteer-list", {
        params: params,
      });
      const data = response?.data?.payload?.volunteerList;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const getContacts = createAsyncThunk(
  "get/contacts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/form/contact-us-list", {
        params: params,
      });
      const data = response?.data?.payload?.contactUsList;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getTechnicalSupports = createAsyncThunk(
  "get/technical-support-list",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/form/technical-support-list", {
        params: params,
      });
      const data = response?.data?.payload?.technicalSupportList;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const getComplaints = createAsyncThunk(
  "get/complaints",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/complaints/list", {
        params: params,
      });
      const data = response?.data?.payload?.complaints;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const deleteForm = createAsyncThunk(
  "delete/form",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.delete(payload);
      const data = response?.data;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const getFormDetails = createAsyncThunk(
  "get/formDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(payload);
      let data;
      if (payload.includes("volunteer")) {
        data = response?.data?.payload?.volunteerList;
      } else if (payload.includes("sponsor")) {
        data = response?.data?.payload?.sponsorList;
      } else {
        data = response?.data?.payload;
      }
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const updateFormStatus = createAsyncThunk(
  "get/formUpdate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(
        payload?.url + payload?.data?.id,
        payload?.data
      );
      let data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const exportForm = createAsyncThunk(
  "export/form",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.get(payload?.url, payload?.data);
      let data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

const adminFormSlice = createSlice({
  name: "adminFundRaisers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFundraisers.fulfilled, (state, action) => {
        state.formDatas = action.payload;
        state.isLoading = false;
      })
      .addCase(getFundraisers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFundraisers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getSponsors.fulfilled, (state, action) => {
        state.formDatas = action.payload;
        state.isLoading = false;
      })
      .addCase(getSponsors.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSponsors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getVolunteer.fulfilled, (state, action) => {
        state.formDatas = action.payload;
        state.isLoading = false;
      })
      .addCase(getVolunteer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getVolunteer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.formDatas = action.payload;
        state.isLoading = false;
      })
      .addCase(getContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(getTechnicalSupports.fulfilled, (state, action) => {
        state.formDatas = action.payload;
        state.isLoading = false;
      })
      .addCase(getTechnicalSupports.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTechnicalSupports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.formDatas = action.payload;
        state.isLoading = false;
      })
      .addCase(getComplaints.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(getFormDetails.fulfilled, (state, action) => {
        state.formDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(getFormDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFormDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        state.formDetails = null;
      });

    // updateFormStatus

    builder
      .addCase(updateFormStatus.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateFormStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateFormStatus.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default adminFormSlice.reducer;
