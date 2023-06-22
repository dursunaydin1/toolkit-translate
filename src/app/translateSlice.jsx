import { createSlice } from "@reduxjs/toolkit";
import { getAnswer, getLanguages } from "./actions";

const initialState = {
  languages: [],
  answer: "",
  isLoading: true,
  isError: false,
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    [getLanguages.pending]: (state) => {
      state.isLoading = false;
    },
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },
    [getLanguages.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [getAnswer.pending]: (state) => {
      state.isLoading = false;
    },
    [getAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.answer = action.payload;
      state.isError = false;
    },
    [getAnswer.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    reducers: {
      clearAnswer: (state) => {
        state.answer = "";
      },
    },
  },
  reducers: {
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});
export const { clearAnswer } = translateSlice.actions;
export default translateSlice.reducer;
