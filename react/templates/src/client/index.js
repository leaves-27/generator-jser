import React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { Router,browserHistory,match} from 'react-router';

import { about } from '../common/reducer/index';
import middlewareConfig from '../common/middleware-config';
import routes from '../common/router';

import stylus from './index.styl'

const initialState = window.__INITIAL_STATE__;
const store = middlewareConfig(about,initialState);

match({
  history: browserHistory,
  routes:routes(store.getState())
}, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps}/>
    </Provider>,
    document.getElementById('root')
  )
});