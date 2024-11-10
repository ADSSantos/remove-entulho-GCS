import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from "./ducks/clients";

const store = configureStore({
  reducer: {
    clients: clientsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
});

export default store;
