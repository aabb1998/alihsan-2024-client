import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  settings: {},
  settingsLoader: false,
  qurbanValues: [],
  qurbanLoader: false,
};

export const getQurban = createAsyncThunk(
  "get/settings/qurban",
  async () => {
    try {
      const response = await api.get("settings/qurban-groups");
      return response.data.payload;
    } catch (e) {
      throw new Error(e.response?.data?.message || 'Somehting went wrong');
    }
  }
);

export const addQurban = createAsyncThunk(
  "add/settings/qurban",
  async (params) => {
    try {
      const response = await api.post("settings/add-qurban-group", params);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);
export const deleteQurban = createAsyncThunk(
  "delete/settings/qurban",
  async (id) => {
    try {
      const response = await api.delete("settings/delete-qurban-group/"+id);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);
export const editQurban = createAsyncThunk(
  "edit/settings/qurban",
  async ({id, payload}) => {
    try {
      const response = await api.patch("settings/update-qurban-group/"+id, payload);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);

export const getSettings = createAsyncThunk(
  "get/tags",
  async () => {
    try {
      const response = await api.get("settings");
      return response.data.payload;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);

export const updateCampaignOptions = createAsyncThunk(
  "update/settings",
  async(payload) => {
    try {
      const response = await api.post("settings/campaign-options", payload);
      return response.data.payload;
    } catch (e) {
      throw new Error("Something went wrong");
    }
  }
)

const adminSettingsSlice = createSlice({
  name: "adminSettings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSettings.fulfilled, (state, action) => {
        state.settingsLoader = false;
        state.settings = action.payload;
      })
      .addCase(getSettings.pending, (state, action) => {
        state.settingsLoader = true;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.settingsLoader = false;
      });

    builder
      .addCase(updateCampaignOptions.fulfilled, (state, action) => {
        state.settingsLoader = false;
        state.settings = {
          ...state.settings,
          ...action.meta.arg,
        };
      })
      .addCase(updateCampaignOptions.pending, (state, action) => {
        state.settingsLoader = true;
      })
      .addCase(updateCampaignOptions.rejected, (state, action) => {
        state.settingsLoader = false;
      });
    builder
      .addCase(getQurban.fulfilled, (state, action) => {
        state.qurbanLoader = false;
        state.qurbanValues = action.payload;
      })
      .addCase(getQurban.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getQurban.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(addQurban.fulfilled, (state, action) => {
        state.qurbanLoading = false;
        state.qurbanValues = [...state.qurbanValues, {
          ...action.meta.arg,
          country: action.meta.arg.country.split(','),
          id: action.payload.payload
        }];
      })
      .addCase(addQurban.pending, (state, action) => {
        state.qurbanLoading = true;
      })
      .addCase(addQurban.rejected, (state, action) => {
        state.qurbanLoading = false;
      });

    builder
      .addCase(editQurban.fulfilled, (state, action) => {
        state.qurbanLoading = false;
        let qv = [];
        for(let i=0; i<state.qurbanValues.length; i++) {
          let v = state.qurbanValues[i]
          if(v.id===action.meta.arg.id)
            v = {
							id: v.id,
							...action.meta.arg.payload,
							country: action.meta.arg.payload.country?.split(',')
						};
          qv.push(v)
        }
        state.qurbanValues = qv;
      })
      .addCase(editQurban.pending, (state, action) => {
        state.qurbanLoading = true;
      })
      .addCase(editQurban.rejected, (state, action) => {
        state.qurbanLoading = false;
      });

    builder
      .addCase(deleteQurban.fulfilled, (state, action) => {
        state.qurbanLoading = false;
        const qv = [];
        for(let i=0; i<state.qurbanValues.length; i++) {
          const v = state.qurbanValues[i]
          if(v.id!==action.meta.arg)
            qv.push(v)
        }
        state.qurbanValues = qv;
      })
      .addCase(deleteQurban.pending, (state, action) => {
        state.qurbanLoading = true;
      })
      .addCase(deleteQurban.rejected, (state, action) => {
        state.qurbanLoading = false;
      });
  },
});

export default adminSettingsSlice.reducer;
