import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';

const App = (props) => (
	<Router>
	  <div>
	    <Route exact path="/" component={Home}/>
	    <Route path="/login" component={LoginPage}/>
	    <Route path="/register" component={RegisterPage}/>
	  </div>
	</Router>
);

export default App;