import {
	REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE
} from '../actions/action-types';

const INITIAL_STATE = {
	user: null,
	status: null,
	error: null,
	loading: false
};

var err;

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case REGISTER_USER:
			return {
				...state,
				user: null,
				status: 'signup',
				error: null,
				loading: true
			};

		case REGISTER_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				status: 'signup',
				error: null,
				loading: true
			};

		case REGISTER_USER_FAILURE:
			err = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    	return { 
    		...state, 
    		user: null, 
    		status:'signin', 
    		error: err, 
    		loading: false
    	};

		default:
			return state; 
	}
}