
export default store => next => action => {
  console.log("store",store.getState());
  return next(action);
}