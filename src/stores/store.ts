import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';

import { authSlice, type AuthenState } from './authSlice';
// import storage from 'redux-persist/lib/storage';
// import { encryptTransform } from 'redux-persist-transform-encrypt';
import type { GlobalState } from './globalSlice';
import { globalSlice } from './globalSlice';
import storePersist from './storePersist';
import storeSessionPersist from './storeSessionPersist';

export const PERSIST_KEY = 'vietocr';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore();
  }

  const persistSessionConfig = {
    key: `${PERSIST_KEY}sesstion`,
    whitelist: ['transfer', 'accountAndCard', 'transferStore'],
    storage: storeSessionPersist,
  };

  const persistConfig = {
    key: PERSIST_KEY,
    // whitelist: ['global'],
    storage: storePersist,
  };

  const rootClientReducer = combineReducers({
    [globalSlice.name]: persistReducer(persistConfig, globalSlice.reducer),
    [authSlice.name]: persistReducer(persistConfig, authSlice.reducer),
  });

  // const persistedSesstionReducer: any = persistReducer(persistSessionConfig, rootReducer);

  const persistedReducer: any = persistReducer(persistSessionConfig, rootClientReducer);

  const store: any = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

  store.__persistor = persistStore(store);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapperStore = createWrapper(makeStore, { debug: false });

// type state redux
export interface RootState {
  [globalSlice.name]: GlobalState;
  [authSlice.name]: AuthenState;
}
