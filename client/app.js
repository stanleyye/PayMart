import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';

const App = (props) => (
	<Router>
	  <div>
	    <Route exact path="/" component={Home}/>
	  </div>
	</Router>
);

export default App;