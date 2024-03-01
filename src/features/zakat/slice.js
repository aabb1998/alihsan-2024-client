import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  step: 1,
  prices: {
    goldUsd: 0,
    silverUsd: 0,
    audToUsd: 0,
    updatedAt: null,
    loading: false,
  },
  amounts: {
    cash: 0,
    unit: "AUD",
    bank: 0,
    silver: [
      {
        karat: "1",
        unit: "gram",
        weight: 0,
        value: 0,
      },
    ],
    gold: [
      {
        karat: "1",
        unit: "gram",
        weight: 0,
        value: 0,
      },
    ],
    investmentProfit: 0,
    shareResale: 0,
    merchandise: 0,
    loan: 0,
    other: 0,
  },
  goldAudList: [],
  goldUsdList: [],
};

export const getMetalPrices = createAsyncThunk(
  "zakat-caculator/get-metal-prices",
  async () => {
    try {
      const response = await api.get("/metal-price");
      return response.data.payload;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

const slice = createSlice({
  name: "zakat-calculator",
  initialState,
  reducers: {
    zakatStep(state, action) {
      state.step += action.payload;
    },
    zakatInput(state, action) {
      state.amounts[action.payload.name] = action.payload.value;
    },
    zakatMetalInput(state, action) {
      const arrayToUpdate = state.amounts[action.payload.name];
      const existingIndex = arrayToUpdate.findIndex(
        (item) => item.key === action.payload.key
      );
      if (existingIndex !== -1) {
        // If the index exists, replace the element at that index
        arrayToUpdate[existingIndex ] = action.payload;
      } else {
        // If the index doesn't exist, push the new element into the array
        arrayToUpdate.push(action.payload);
      }
      state.amounts[action.payload.name] = arrayToUpdate;
      // state.amounts[action.payload.name].push(action.payload);
      // state.amounts[action.payload.name].karat = action.payload.karat;
      // state.amounts[action.payload.name].unit = action.payload.unit;
      // state.amounts[action.payload.name].weight = action.payload.weight;
      // state.amounts[action.payload.name].value = action.payload.value;
    },
    zakatResetInput(state, action) {
      state.amounts = initialState.amounts;
    },
    resetZakatInput: (state) => {
      // Reset the state to its initial value
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMetalPrices.fulfilled, (state, action) => {
      state.prices.goldUsd = action.payload?.price.goldPriceInUsd;
      state.prices.silverUsd = action.payload?.price.silverPriceInUsd;
      state.prices.audToUsd =
        action.payload?.price.goldPriceInUsd /
        action.payload?.price.goldPriceInAud;
      state.prices.loading = false;
      state.prices.updatedAt = action.payload?.price?.updatedAt;
      //////
      state.goldPriceList = {
        goldPriceInUsd: action.payload.goldPriceInUsd,
        goldPriceInAud: action.payload.goldPriceInAud,
        silverFinePriceInUsd: action.payload.silverFinePriceInUsd,
        silverFinePriceInAud: action.payload.silverFinePriceInAud,
        silverSterlingPriceInUsd: action.payload.silverSterlingPriceInUsd,
        silverSterlingPriceInAud: action.payload.silverSterlingPriceInAud,
      };
    });
  },
});

export default slice.reducer;

export const {
  zakatStep,
  zakatInput,
  zakatMetalInput,
  zakatResetInput,
  resetZakatInput,
} = slice.actions;
