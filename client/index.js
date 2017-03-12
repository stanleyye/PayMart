import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

import App from './app.js';

// import thunk from 'redux-thunk';
// const store = createStore(<insertSomeReducer>?, applyMiddleware(thunk));

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );
console.log(App);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);