import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import * as XLSX from "xlsx";
import { getRecurringLabel } from "../../utils/helper";

const initialState = {
  orders: [],
  dashboardData: null,
  incomeOverView: [],
  visitorsOverview: [],
  isLoading: false,
  isDownloading: false,
  isOrderLoading: false,
  error: null,
};

function sanitizeExportData(data) {
  return data?.payments?.map((item) => ({
    "Project Name": item.Campaign.name,
    Date: new Date(item.updatedAt).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
    Amount: item?.total,
    "Checkout Type": item.Campaign?.checkoutType,
    Description: item.Campaign?.description,
    Email: item?.email,
    FirstName: item?.firstName,
    lastName: item?.lastName,
    address: item?.address,
    Country: item?.country,
    "Donated At": item?.donatedAt,
    Anonymous: item?.isAnonymous ? "Yes" : "No",
    "Last Payment Date": item?.lastPaymentDate,
    "Order Id": item?.orderId,
    "Payment Gateway": item?.paymentGateway,
    Phone: item?.phone,
    State: item?.state,
    Status: item?.status,
    Total: item?.total,
    Zip: item?.zip,
    "Behalf Of": item?.behalfOf,
    "Child Name": item?.childName,
    "Company Name": item?.companyName,
    "Country Donation": item?.countryDonation,
    "Donation Item": item?.donationItem,
    "Donation Item Price": item?.donationItemPrice,
    "Is Recurring": item?.isRecurring?'Yes':'No',
    "Name Plaque": item?.namePlaque,
    "Next PaymentDate": item?.nextPaymentDate,
    Notes: item?.notes,
    "Period Days": getRecurringLabel(item?.periodDays),
    
    Quantity: item?.quantity,
    "Rice Price": item?.ricePrice,
    "Rice Quantity": item?.riceQuantity,
    "Special Request": item?.specialRequest,
    Type: item?.type,
    "Type Price": item?.typePrice,
    "Video RequestUrl": item?.videoRequestUrl,
    "Water Campaign Type": item?.waterCampaignType,
  }));
}

export const getOrders = createAsyncThunk(
  "get/orders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("dashboard/recent-orders", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data.message || "Something went wrong");
    }
  }
);
export const getDashboardData = createAsyncThunk(
  "get/dashboardData",
  async (_) => {
    try {
      const response = await api.get("dashboard");
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);
export const getIncomeOverview = createAsyncThunk(
  "get/incomeOverview",
  async (params) => {
    try {
      const response = await api.get("/dashboard/income-overview", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);
export const getVisitorsOverview = createAsyncThunk(
  "get/visitorsOverview",
  async (params) => {
    try {
      const response = await api.get("/dashboard/unique-visitors", {
        params: params,
      });
      const data = response?.data?.payload;
      return data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  }
);

export const downloadReport = createAsyncThunk(
  "download/report",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/download-reports", {
        params: params,
      });
      const data = sanitizeExportData(response.data.payload);
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, `export.xlsx`);
      return data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Something went wrong");
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isOrderLoading = false;
    });
    builder.addCase(getOrders.pending, (state, action) => {
      state.isOrderLoading = true;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.orders = [];
      state.isOrderLoading = false;
      state.error = action.error;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.dashboardData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDashboardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDashboardData.rejected, (state, action) => {
      state.dashboardData = null;
      state.isLoading = false;
      state.error = action.error;
    });

    // getIncomeOverview
    builder.addCase(getIncomeOverview.fulfilled, (state, action) => {
      state.incomeOverView = action.payload?.incomeGraph;
      state.totalAmount = action.payload?.totalAmount;
      state.isLoading = false;
    });
    builder.addCase(getVisitorsOverview.fulfilled, (state, action) => {
      state.visitorsOverview = action.payload;
    });
    builder.addCase(getIncomeOverview.rejected, (state, action) => {
      state.incomeOverView = null;
      state.isLoading = true;
      state.error = action.error;
    });

    builder.addCase(downloadReport.fulfilled, (state, action) => {
      state.isDownloading = false;
    });
    builder.addCase(downloadReport.pending, (state, action) => {
      state.isDownloading = true;
    });
    builder.addCase(downloadReport.rejected, (state, action) => {
      state.isDownloading = false;
    });
  },
});

export default adminDashboardSlice.reducer;
