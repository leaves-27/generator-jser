/**
 * 工具类
 */

//创建常量的函数:
export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

//创建reducer的函数
export function createReducer(initialState, reducerMap){
  return (state = initialState, action)=>{
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
    // if (reducerMap.hasOwnProperty(action.type)) {
    //   return reducerMap[action.type](state,action);
    // }else{
    //   return state;
    // }
  };
}

//判断是不是空对象
export function isEmptyObject(e){  
  let t;  
  for(t in e)  
    return !1;  
  return !0  
}
