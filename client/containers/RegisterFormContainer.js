import RegisterForm from '../components/register-form';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
  
  };
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);