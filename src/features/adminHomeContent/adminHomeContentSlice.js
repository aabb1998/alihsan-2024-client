import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  medias: [],
  media: null,
  isLoading: false,
  error: null,
};
export const updateBannerImage = createAsyncThunk(
  "update/homePageBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("settings/banner-image", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const updateFeaturedCampaign = createAsyncThunk(
  "update/featuredCampaign",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("settings/featured-campaign", payload);
      const data = response?.data;
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
// settings/featured-campaign
const adminHomeContentSlice = createSlice({
  name: "adminHomeContent",
  initialState,
  reducers: {
    resetMedia: (state, action) => {
      state.media = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateBannerImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medias = action.payload;
      })
      .addCase(updateBannerImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateBannerImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(updateFeaturedCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateFeaturedCampaign.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateFeaturedCampaign.rejected, (state, action) => {
        state.isLoading = false;
      });
    //
  },
});

export default adminHomeContentSlice.reducer;
