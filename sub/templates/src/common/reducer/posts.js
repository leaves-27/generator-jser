/*
** 每个网络请求的state是必须设计为如下方式，且reduce的RECEIVE_POSTS的state设计和action的处理不一致:
** isFetching： 
** didInvalidate：
** lastUpdated：
** data:
**/

import { REQUEST_POSTS ,RECEIVE_POSTS } from '../actions/network';

export function posts(state = {}, action,callback){
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
      
    case RECEIVE_POSTS:
      const data = callback({},action);

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        data: data
      });

    default:
      return state
  }
}