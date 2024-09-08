import { combineReducers } from '@reduxjs/toolkit';
import { homeReducer } from './reducers/homeReducer';

const rootReducers = combineReducers({
  home: homeReducer,
});

export default rootReducers;
