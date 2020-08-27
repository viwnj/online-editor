import AppReducer from './app/reducers';
import { combineReducers } from 'redux';

const reducers = {
  AppReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
