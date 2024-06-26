import { TCalender } from "@/app/types/calender";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  calenderData: TCalender[];
  calenderLoading: boolean;
  activeCalender: Partial<TCalender> | null;
  calenderDrawerLoading: boolean;
  updateCalenderLoading: boolean;
  updateStatusCalender: TCalender | null;
};

const initialState: TinitialState = {
  calenderData: [],
  calenderLoading: true, // initial loading true if calender does not have
  activeCalender: null,
  calenderDrawerLoading: false,
  updateCalenderLoading: false,
  updateStatusCalender: null,
};

export const calenderSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCalenderData: (state, action: PayloadAction<TCalender[]>) => {
      state.calenderData = action.payload;
      return state;
    },
    setCalenderLoading: (state, action: PayloadAction<boolean>) => {
      state.calenderLoading = action.payload;
      return state;
    },
    setActiveCalender: (
      state,
      action: PayloadAction<Partial<TCalender> | null>,
    ) => {
      state.activeCalender = action.payload;
      return state;
    },
    setCalenderDrawerLoading: (state, action: PayloadAction<boolean>) => {
      state.calenderDrawerLoading = action.payload;
      return state;
    },
    setUpdateCalenderLoading: (state, action: PayloadAction<boolean>) => {
      state.updateCalenderLoading = action.payload;
      return state;
    },
    setUpdateStatusCalender: (
      state,
      action: PayloadAction<TCalender | null>,
    ) => {
      state.updateStatusCalender = action.payload;
      return state;
    },
    resetCalender: (state) => {
      return initialState;
    },
  },
});

export const {
  setCalenderData,
  setActiveCalender,
  setCalenderLoading,
  setCalenderDrawerLoading,
  resetCalender,
  setUpdateCalenderLoading,
  setUpdateStatusCalender,
} = calenderSlice.actions;
export const calenderReducer = calenderSlice.reducer;
