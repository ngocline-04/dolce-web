import { createSlice } from '@reduxjs/toolkit';
import type { AppState } from './store';

export interface AuthenState {
  infoUser: {
    email: string;
    uid: string;
    name: string;
    role: string;
  };
}

const initialState: AuthenState = {
  infoUser: {
    email: '',
    uid: '',
    name: '',
    role: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInfoUser(state, action) {
      const { email, uid, name, role } = action.payload;
      state.infoUser.email = email;
      state.infoUser.uid = uid;
      state.infoUser.name = name;
      state.infoUser.role = role;
    },
    setResetUser(state) {
      return initialState;
    },
  },
});

export const { setInfoUser, setResetUser } = authSlice.actions;
export const selectInfoUser = (state: AppState) => state.global.infoUser;
