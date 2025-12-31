import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './Features/Auth/authSlice';
import { baseApi } from './API/baseApi';
import likesReducer from './Features/User/LikeSlice';
import SaveReducer from './Features/Saved/SaveSlice';
import globalReducer from './Features/Global/globalSlice';

const likesPersistConfig = { key: 'likes', storage };
const SavePersistConfig = { key: 'Save', storage };
const persistConfig = { key: 'auth', storage, blacklist: ['accessToken'] };

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedLikesReducer = persistReducer(likesPersistConfig, likesReducer);
const persistedSaveReducer = persistReducer(SavePersistConfig, SaveReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    likes: persistedLikesReducer,
    Save: persistedSaveReducer,
    global: globalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
