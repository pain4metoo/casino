import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './auth-reducer';

const reducers = combineReducers({
  user: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
