
import { configureStore } from '@reduxjs/toolkit'; // CHANGED SOURCE
import rootReducer from './reducers';

// You don't need 'redux-thunk' or 'redux-devtools' imports anymore!
// They are built-in to configureStore.

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  
});

export default store;