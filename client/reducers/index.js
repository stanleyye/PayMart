import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// import currentUser from './current-user';

// Combine Reducers
var reducers = combineReducers({
	//currentUser: currentUser
	form: formReducer
});

export default reducers;