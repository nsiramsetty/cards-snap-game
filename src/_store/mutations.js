import {initialState} from './initialState';

export const UPDATE_FILTERS = (state, filters) => {
  state.filters = filters;
};

export const CLEAR_ALL_DATA = (state) => {
  state.filters = initialState.filters;
};
