import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});