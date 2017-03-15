import React from 'react';
import ReactDOM from 'react-dom';

import RegisterForm from './register-form';
import { registerUser } from '../actions/users'

class RegisterPage extends React.Component {
  handleSubmit(values) {
    console.log(values);
    // Do something with the form values    
  }

  render() {
    return (
      <div>
        <h1>
          Register Page
        </h1>
      
        <div>
          <RegisterForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default RegisterPage;

