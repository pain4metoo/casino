import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './auth-reducer';
import WelcomeReducer from './welcome-reducer';
import LoginReducer from './login-reducer';
import gameReducer from './game-reducer';
import loadingSlice from './loading-reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    welcomePage: WelcomeReducer,
    loginPage: LoginReducer,
    game: gameReducer,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// import {
//   applyMiddleware,
//   combineReducers,
//   legacy_createStore as createStore,
// } from 'redux';

// const reducers = combineReducers({
// });

// const store = createStore(reducers, applyMiddleware(thunk));

// window.store = store;

// export default store;
