import constants from "";


const initialState= {

	signInStatus:false
}

export function SignInReducerStatus(state = initialState, action){

	switch(action.type){

		case "SIGN_OUT":
			return !state.signInStatus;
			break;

		case "SIGN_IN":
			return !state.signInStatus;
			break;

		case "STATUS":
			return state.signInStatus;
			break;

		default:
			return state;
			break;
	}
}