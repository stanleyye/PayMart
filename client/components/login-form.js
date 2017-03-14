import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required';

class LoginForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"
          			 validate={required} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password"
          			 validate={required} />
        </div>

        <button type="submit">Submit</button>
      </form>
    );
	}
}

// Decorate the form component
LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);

export default LoginForm;