import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    fromValue: 100,
    toValue: 100,
    fromCurrency: "usd",
    toCurrency: "eur",
  },
  reducers: {
    update: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions;

export default counterSlice.reducer;
