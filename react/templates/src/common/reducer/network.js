/*
** 该方法用于一般的网络请求
** author: leaves-27
** date: 2017-01-23
*/

export  function network(state = {},action){
  switch (action.key) {
    case "notice":
      return Object.assign({}, state, {
        items:action.data
      });
    case "media":
      return Object.assign({}, state, {
        items:action.data
      });
    default :
      return state;
  }
}