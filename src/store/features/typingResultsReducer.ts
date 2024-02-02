import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './../store'
import { TypingResult } from '../../types/index';
import { LOCAL_STORAGE_RESULTS_KEY } from '../../types/constants';

// Define a type for the slice state
interface TypingResultState {
  typingResults: TypingResult[];
}

// Define the initial state using that type
const initialState: TypingResultState = {
  typingResults: [],
};

export const appSettingSlice = createSlice({
  name: 'typingResults',
  initialState,
  reducers: {
    initializeState: (state: TypingResultState) => {
      const str = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY)
      if (!str) return;
      try {
        const oldData = JSON.parse(str);
        if (oldData && Array.isArray(oldData)) {
          state.typingResults = oldData
        }
      } catch (error) {
        console.error("Old typing result parsing error from local storage.")
      }
    },
    addResult: (
      state: TypingResultState,
      action: PayloadAction<TypingResult>
    ) => {
      const results = [...state.typingResults, action.payload];
      state.typingResults = results;
      localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, JSON.stringify(results))
    },
  },
});

export const { addResult, initializeState } = appSettingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.appSetting.theme

export default appSettingSlice.reducer;
