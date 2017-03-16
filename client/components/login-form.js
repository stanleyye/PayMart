import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.trim() == '') {
    errors.username = 'Invalid username. Cannot be empty.';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.trim() == '') {
    errors.password  = 'Invalid password. Cannot be empty.';
  }

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

class LoginForm extends Component {
	render() {
		const { handleSubmit, submitting } = this.props;

		return (
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text" label="Username" component={renderField} />
        <Field name="password" type="password" label="Password" component={renderField} />

        <div>
          <button type="submit" disabled={ submitting }>
            Submit
          </button>
        </div>
      </form>
    );
	}
}

// Decorate the form component
LoginForm = reduxForm({
  form: 'login', // a unique name for this form
  validate,
})(LoginForm);

export default LoginForm;