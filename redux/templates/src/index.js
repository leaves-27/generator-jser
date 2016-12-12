import React from 'react';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import { render } from "react-dom";

import App from './container/App';

import { Page } from './container/Page';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./styles/index.css"

let routes = <Route path="/" component={App}>
      <IndexRoute component={Page}/>
    </Route>;

render(
  <Router routes={routes} history={hashHistory} />,
  document.getElementById('app')
);