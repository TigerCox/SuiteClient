import React from 'react';
import {render} from 'react-dom';

import configureStore from './store/configureStore'; // eslint-disable-line import/default

import HomePage from './components/pages/HomePage';

import 'fusion-theme/dist/fusion-theme.min.css'; // eslint-disable-line
import './styles/index.css';

const store = configureStore();

// Don't need React Router?
// Reference your top level component instead of <Router> below
render(
  <Provider store={store}>
    <HomePage />
    {/* <Router history={browserHistory} routes={routes} /> */}
  </Provider>, document.getElementById('app')
);
