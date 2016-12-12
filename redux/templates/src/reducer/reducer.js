import {Map,List} from 'immutable';
import { combineReducers } from 'redux'; 
import { createReducer } from 'redux-convenient-utils'; 

function setState(state, newState) {
  return state.merge(Map({
    winner:newState
  }));
}

const stateApp = createReducer(Map(),{
  ['SET_WINNER'](state,action){
    return setState(state, action.state)
  }
});

export default stateApp;