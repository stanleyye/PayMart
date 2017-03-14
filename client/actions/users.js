import axios from 'axios';
import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE }

/* Registration */
export function registerUser(formData) {
	const registrationReq = axios.post('/register', formData);

	return {
		type: REGISTER_USER,
		payload: registrationReq
	};
}

export function registerUserSuccess(user) {
	return {
		type: REGISTER_USER_SUCCESS,
		payload: user
	};
}

export function registerUserFailure(err) {
	return {
		type: REGISTER_USER_FAILURE,
		payload: err
	};
}