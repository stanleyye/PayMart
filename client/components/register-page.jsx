import React from 'react';
import ReactDOM from 'react-dom';

import RegisterForm from './register-form';

class RegisterPage extends React.Component {
  handleSubmit(values) {
    // Do something with the form values
    console.log(values);
  }

  render() {
    return (
      <RegisterForm onSubmit={this.handleSubmit} />
    );
  }
}

export default RegisterPage;

