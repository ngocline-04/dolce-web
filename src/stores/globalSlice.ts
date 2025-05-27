import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from './store';

export enum LANGUAGE_TYPE {
  vi = 'vi',
  en = 'en',
}

export interface GlobalState {
  theme: string;
  language: LANGUAGE_TYPE;
}

const initialState: GlobalState = {
  theme: 'light',
  language: LANGUAGE_TYPE.vi,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },

  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.global,
  //     };
  //   },
  // },
});

export const { setTheme, setLanguage } = globalSlice.actions;

export const selectTheme = (state: AppState) => state.global?.theme;
export const selectLanguage = (state: AppState) => state.global?.language;

export default globalSlice.reducer;
