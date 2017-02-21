import path from 'path';
import Express from 'express';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import router from './router';

const app = Express();
const port = 3000;
const viewPath = path.join(__dirname,'views');

app.set('views',viewPath);
app.set('view engine','ejs');

app.use('/static',Express.static(path.join("", 'build/static')));
app.use('/',router);

app.listen(port);