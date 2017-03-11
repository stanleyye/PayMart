var React = require('react');
var ReactDOM = require('react-dom');

class LoginForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // event.preventDefault();
    //alert('A name was submitted: ' + this.state.value);
  }

  render() {
    return (
      <form role="form" action="/register" method="post" onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" placeholder="Enter username" />
        </label>
        <label>
        	Password:
        	<input type="password" name="password" placeholder="Enter password" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
	<LoginForm />, 
	document.getElementById('login-form')
);