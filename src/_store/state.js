export const STORAGE_KEY = 'westpac-cards-snap-game';
import {initialState} from './initialState';

let currentState = initialState;

if (localStorage.getItem(STORAGE_KEY)) {
  let storeState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  let tempConfig = {...initialState};
  if (typeof (storeState) !== 'undefined' && storeState !== null) {
    for (let key in initialState) {
      if (initialState.hasOwnProperty(key)) {
        if (typeof (storeState[key]) !== 'undefined' && storeState[key] !== null) {
          tempConfig[key] = storeState[key];
        }
      }
    }
  }
  currentState = {...tempConfig};
}

export const state = currentState;
