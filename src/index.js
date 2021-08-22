import React from 'react';
import ReactDOM from 'react-dom';


import App from './components/appView';
import './scss/base.scss';

import {Provider} from 'react-redux';
import store from './store/store'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app"))


module.hot.accept();
