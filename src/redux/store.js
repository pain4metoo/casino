import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './auth-reducer';
import WelcomeReducer from './welcome-reducer';
import LoginReducer from './login-reducer';
import gameReducer from './game-reducer';

const reducers = combineReducers({
  auth: authReducer,
  welcomePage: WelcomeReducer,
  loginPage: LoginReducer,
  game: gameReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
