import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { MyDonationTypes } from "../../utils/constants";
import * as XLSX from "xlsx";
import axios from "axios";

const initialState = {
  activeRecurring: {
    count: 0,
    page: 1,
    rows: [],
    loading: false,
    error: "",
  },
  inactiveRecurring: {
    count: 0,
    page: 1,
    rows: [],
    loading: false,
    error: "",
  },
  onetime: {
    count: 0,
    page: 1,
    rows: [],
    loading: false,
    error: "",
  },
  exportData: [],
};

const handleDownload = async (doc) => {
  try {
    const response = await fetch(doc);
    // const response = axios.get({
    //   baseURL: doc,
    // });
    // const response = await axios({
    //   method: 'get',
    //   url: doc,
    //   // responseType: 'stream'
    // })
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "document.pdf";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

export const generateInvoice = createAsyncThunk(
  "myDonation/invoice",
  async ({ donationId, type }) => {
    try {
      const res = await api.get("donations/generate-invoice/" + donationId);
      handleDownload(res.data.payload);
      return res.data.payload;
    } catch (e) {
      if (e.response?.data) throw new Error(e.response.data.message);
      throw e;
    }
  }
);

export const cancelMyDonation = createAsyncThunk(
  "myDonation/cancel",
  async (donationId) => {
    try {
      await api.get("donations/cancel-donation/" + donationId);
    } catch (e) {
      if (e.response?.data) throw new Error(e.response.data.message);
      throw e;
    }
  }
);

export const exportInvoice = createAsyncThunk(
  "export/invoice",
  async (params) => {
    try {
      const res = await api.get("payment/for-user-export-data", {
        params: params,
      });
      const data = sanitizeExportData(res.data.payload);
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, `export.xlsx`);
      return data;
    } catch (e) {
      if (e.response?.data) throw new Error(e.response.data.message);
      throw e;
    }
  }
);

function sanitizeExportData(data) {
  return data.map((item) => ({
    "Project Name": item.Campaign.name,
    Date: new Date(item.updatedAt).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
    Amount: item.total,
  }));
}
export const getMyDonations = createAsyncThunk(
  "get/mydonation",
  async ({ page, type, search, sort, order }) => {
    try {
      let endpoint = "";
      switch (type) {
        case MyDonationTypes.ACTIVE_RECURRING:
          endpoint = "recurring/active";
          break;
        case MyDonationTypes.INACTIVE_RECURRING:
          endpoint = "recurring/inactive";
          break;
        case MyDonationTypes.ONETIME:
          endpoint = "onetime";
          break;
        default:
          throw new Error("Unknown mydonation type " + JSON.stringify(type));
      }
      const response = await api.get(
        "donations/of-user/" +
          endpoint +
          "?page=" +
          page +
          "&limit=" +
          process.env.REACT_APP_PAGINATION_PER_PAGE +
          "&search=" +
          encodeURI(search) +
          "&sort=" +
          sort +
          "&order=" +
          order
      );
      let data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data?.payload.message || e.message);
    }
  }
);

export const myDonationSlice = createSlice({
  name: "myDonation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyDonations.pending, (state, action) => {
      const key = action.meta.arg.type;
      if (!state[key]) state[key] = {};
      state[key].error = "";
      state[key].loading = true;
    });
    builder.addCase(getMyDonations.fulfilled, (state, action) => {
      const key = action.meta.arg.type;
      state[key].rows = action.payload.rows;
      state[key].count = Math.ceil(
        action.payload.count / process.env.REACT_APP_PAGINATION_PER_PAGE
      );
      state[key].page = action.meta.arg.page;
      state[key].error = "";
      state[key].loading = false;
    });
    builder.addCase(getMyDonations.rejected, (state, action) => {
      const key = action.meta.arg.type;
      state[key].error = action.error.message;
      state[key].loading = false;
    });

    // builder.addCase(exportInvoice.fulfilled, (state, action) => {
    //   state.exportData = action.payload;
    // });
  },
});
export default myDonationSlice.reducer;
