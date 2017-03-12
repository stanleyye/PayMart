import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import Home from './components/home';

const App = (props) => (
	<BrowserRouter>
	  <div className="app">
	  	<h1>Hello World</h1>
	  </div>
	  <Match exactly pattern="/" component={Home}/>
  </BrowserRouter>
);

export default App;