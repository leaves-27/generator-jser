/**
 * Created by leaves-27 on 17-01-20.
 */

import React from 'react';
import { Route, IndexRoute,Redirect } from 'react-router';

import App from './containers/app';
import Contact from './containers/contact/index';
import Notice from './containers/notice/index';
import Media from './containers/media/index';

//import { loginRequireAuth } from '../auth/loginAuth';

const routes = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute  component={Contact}/>
      <Route path="/media" component={Media} />
      <Route path="/notice" component={Notice} />
      <Route path="/contact" component={Contact} />
    </Route>
  )
};

export default routes;