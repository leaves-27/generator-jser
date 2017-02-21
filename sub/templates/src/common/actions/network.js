import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts(key){
  return {
    type: REQUEST_POSTS,
    key:key
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(key, json) {
  return {
    type: RECEIVE_POSTS,
    key:key,
    data: json,
    receivedAt: Date.now()
  }
}

function fetchPosts(params) {
  const url = params.url;
  const key = params.key;
  const options = params.header || {};

  return dispatch => {
    dispatch(requestPosts(key));
    return fetch(url,options)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(key,json)))
  }
}

function isShouldFetch(state,key) {
  const data = state[key];

  if (!data) { //所要获取的数据不存在，则去发送获取请求
    return true
  }else if(data.isFetching){//所要获取的数据正在获取中，则放弃发送获取请求
    return false
  }else {
    return data.didInvalidate //判断获取的数据是否过期，若过期则重新获取；否则放弃重新获取。
  }
}

export function getNoticeList(key) {
  return (dispatch, getState) => {
    if(isShouldFetch(getState(),key)) {
      const url = "http://localhost:3000/static/mock/notice.json";
      return dispatch(fetchPosts({
        url:url,
        key:key
      }))
    }else{
      return Promise.resolve()
    }
  }
}
