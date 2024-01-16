import { api } from "../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapCountries: [],
  settings: [],
  subscriber: null,
  loading: false,
  error: "",
};

export async function homeData() {
  try {
    const response = await api.get("home");
    return { data: response.data, status: response.status };
  } catch (error) {
    return {
      error: error.response.data.message,
      status: error.response.status,
      data: {},
    };
  }
}

export const getCountries = createAsyncThunk(
  "get/countries",
  async (thunkAPI) => {
    try {
      const response = await api.get("country");
      if (response.status === 200) {
        return response?.data?.payload;
      } else {
        return thunkAPI.rejectWithValue(response?.data?.payload);
      }
    } catch (e) {
      if (e.response.status === 401) {
        return localStorage.getItem("checkout")
          ? JSON.parse(localStorage.getItem("checkout"))
          : [];
      }
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const getSettings = createAsyncThunk(
  "get/settings",
  async (thunkAPI) => {
    try {
      const response = await api.get("settings");
      if (response.status === 200) {
        return response?.data?.payload;
      } else {
        return thunkAPI.rejectWithValue(response?.data?.payload);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const addSubscriber = createAsyncThunk(
  "add/subscriber",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("subscriber", data);
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

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.mapCountries = action?.payload;
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action?.payload;
    });
    builder.addCase(addSubscriber.fulfilled, (state, action) => {
      state.subscriber = action?.payload;
    });
  },
});

export default homeSlice.reducer;
