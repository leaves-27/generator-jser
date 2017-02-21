import React from 'react';
import { renderToString } from 'react-dom/server';
import { match ,RouterContext} from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import routes from '../../common/router';
import { about } from '../../common/reducer/index';

import middlewareConfig from '../../common/middleware-config';

const store = middlewareConfig(about);

function Home(){}

Home.prototype.get = function(req, res, next){
  match({
    routes: routes(store.getState()), 
    location: req.url
  },function(err, redirectLocation, renderProps){
    if(err){
      res.status(500).end(`Internal Server Error ${err}`);
    }else if(redirectLocation){
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    }else if(renderProps){
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      
      res.render('index',{
        __html__: html,
        __state__: JSON.stringify(store.getState())
      });
    }else{
      res.status(404).end('Not found');
    }
  });
};

module.exports = Home;