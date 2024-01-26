import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  countries: [],
  isLoading: false,
  error: null,
};

export const getCountries = createAsyncThunk(
  "get/countries",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("map-country/admin-list", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);

export const addOrUpdate = createAsyncThunk(
  "addOrUpdate/country",
  async (payload, { rejectWithValue }) => {
    try {
      let response;
      if (payload?.id) {
        response = await api.put("map-country/" + payload?.id, payload?.data);
      } else {
        response = await api.post("map-country", payload?.data);
      }
      const data = response?.data;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);


export const deleteCountry = createAsyncThunk(
  "delete/country",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete("map-country/" + id);
      let data = response?.data;
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


const adminCountrySlice = createSlice({
  name: "adminCountries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCountries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addOrUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addOrUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addOrUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    //
  },
});

export default adminCountrySlice.reducer;
