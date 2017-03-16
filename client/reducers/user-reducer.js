import {
	REGISTER_USER_REQUEST, 
	REGISTER_USER_SUCCESS, 
	REGISTER_USER_FAILURE
} from '../actions/action-types';

const INITIAL_STATE = {
	status: null,
	message: null,
	error: null,
	loading: false
};

var err;

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case REGISTER_USER_REQUEST:
			return Object.assign(
				{},
				state,
				{
					status: null,
					message: null,
					error: false,
					loading: true
				}
			);
	
		case REGISTER_USER_SUCCESS:
			return Object.assign(
				{},
				state,
				{
					status: action.payload.status,
					message: action.payload.response,
					error: false,
					loading: true
				}
			);

		case REGISTER_USER_FAILURE:
			return Object.assign(
				{},
				state,
				{
					status: action.payload.status,
					message: action.payload.err,
					error: true,
					loading: false
				}
			);   

		default:
			return state; 
	}
}