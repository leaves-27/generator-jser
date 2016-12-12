import {createStore,applyMiddleware} from 'redux';
import io from 'socket.io-client';

import { setWinner } from '../action/action_creators';
import reducer from '../reducer/reducer';

import remoteActionMiddleware from '../middleware/remote_action_middleware';


const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware()
)(createStore);

const store = createStoreWithMiddleware(reducer);
store.dispatch(setWinner("X"));
export default  store;