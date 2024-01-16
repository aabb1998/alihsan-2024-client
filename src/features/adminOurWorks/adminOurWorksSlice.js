import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  ourWorks: [],
  ourWork: null,
  reportDetails: null,
  isLoading: false,
  error: null,
};

export const getOurWorks = createAsyncThunk(
  "get/ourWorks",
  async (params, {}) => {
    try {
      const response = await api.get("/our-works/admin-list", { params });
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

export const addOurWork = createAsyncThunk(
  "add/ourWork",
  async (params, {}) => {
    try {
      const response = await api.post("our-works/add", params);
      const data = response?.data;
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
export const updateOurWork = createAsyncThunk(
  "update/ourWork",
  async (payload, {}) => {
    try {
      const response = await api.put(
        "our-works/update/" + payload?.id,
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
export const getOurWork = createAsyncThunk("get/ourWork", async (id, {}) => {
  try {
    const response = await api.get("/our-works/details/" + id);
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
});

export const deleteOurWork = createAsyncThunk(
  "delete/ourWork",
  async (id, {}) => {
    try {
      const response = await api.delete("/our-works/delete/" + id);
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

const adminOurWorksSlice = createSlice({
  name: "adminOurWorks",
  initialState,
  reducers: {
    resetOurWork: (state) => {
      state.ourWork = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOurWorks.fulfilled, (state, action) => {
        state.ourWorks = action.payload;
        state.isLoading = false;
      })
      .addCase(getOurWorks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOurWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(getOurWork.fulfilled, (state, action) => {
        state.ourWork = action.payload;
        state.isLoading = false;
      })
      .addCase(getOurWork.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOurWork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { resetOurWork } = adminOurWorksSlice.actions;
export default adminOurWorksSlice.reducer;
