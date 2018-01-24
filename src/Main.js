import React from 'react';
import { Provider } from 'react-redux';

import createStore from './store';
import AppWrapper from './components/AppWrapper';

const store = createStore();

const Main = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default Main
