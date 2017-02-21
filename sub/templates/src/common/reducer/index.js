import { combineReducers } from 'redux';
import { REQUEST_POSTS,RECEIVE_POSTS } from '../actions/network';

import { posts } from './posts';
import { network } from './network';

const initialState = {
  navigator:[{
    id:"contact",
    name:"联系我们"
  },{
    id:"media",
    name:"媒体报道"
  },{
    id:"notice",
    name:"铜板街公告"
  }],
  currentNav:"contact"
};

export function about(state = initialState,action){
  switch (action.type){
    case REQUEST_POSTS:
      return Object.assign({},state,{
        [action.key]: posts(state[action.key],action)
      });
    case RECEIVE_POSTS:
      return Object.assign({},state,{
        [action.key]: posts(state[action.key],action,network)
      });
    default:
      return state
  }
};


