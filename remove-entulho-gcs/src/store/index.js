import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

const rootReducer = {
  // Aqui vamos adicionar os reducers conforme criarmos
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  // O DevTools já vem configurado por padrão no configureStore!
});

export default store;
