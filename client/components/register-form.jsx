import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required';

class RegisterForm extends Component {
	render() {
		const { handleSubmit, pristine, submitting} = this.props;

		return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <Field name="first_name" component="input" type="text"
                 validate={required} />
        </div>

        <div>
          <label htmlFor="last_name">Last Name</label>
          <Field name="last_name" component="input" type="text"
                 validate={required} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"
                 validate={required} />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <Field name="username" component="input" type="text"
                 validate={required} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password"
                 validate={required} />
        </div>
        
        <button type="submit" disabled={ submitting }>
          Submit
        </button>
      </form>
    );
	}
}

// Decorate the form component
RegisterForm = reduxForm({
  form: 'login' // a unique name for this form
})(RegisterForm);

export default RegisterForm;