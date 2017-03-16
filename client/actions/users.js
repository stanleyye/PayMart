import axios from 'axios';
import { 
	REGISTER_USER, 
	REGISTER_USER_REQUEST, 
	REGISTER_USER_SUCCESS, 
	REGISTER_USER_FAILURE 
} from './action-types';

/* Registration */
export function registerUser(formData) {
	return dispatch => {
		dispatch(registerUserRequest());
		
		return axios.post('/register', formData)
			.then(function(response) {
				console.log("response", response);
				dispatch(registerUserSuccess(response.status, response));
			})
			.catch(function(error) {
				console.log("error", error);
				dispatch(registerUserFailure(error.status, error));
			});

		// return {
		// 	type: REGISTER_USER,
		// 	payload: registrationReq
		// };
	}
}

export function registerUserRequest() {
	return {
		type: REGISTER_USER_REQUEST,
 		payload: null
	}
}

export function registerUserSuccess(status, response) {
 	return {
 		type: REGISTER_USER_SUCCESS,
 		payload: {
 			status,
 			response
 		}
 	};
 }

export function registerUserFailure(status, err) {
	return {
		type: REGISTER_USER_FAILURE,
		payload: {
			status,
			err
		}
	};
}