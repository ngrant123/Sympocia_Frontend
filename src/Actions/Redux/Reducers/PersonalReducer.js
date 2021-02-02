const initialState={
	id:"0",
	firstName:'',
	lastName:'',
	email:'',
	signInStatus:false,
	paymentPlan:'',
	firstTimeIndicator:false,
	loggedIn:false,
	accessToken:"",
	refreshToken:"",
	isGuestProfile:false,
	isTokenRefreshing:false
}

const PersonalProfile=(state={initialState},action)=>{
	debugger;
	const { type, payload }=action;
	switch(type){

		case 'ADD_EMAIL':{
			return {
				...state,
				email:payload
			}
			break;
		}

		case 'ADD_FIRST_NAME':{
			return {
				...state,
				firstName:payload
			}
			break;
		}

		case 'ADD_LAST_NAME':{
			return{
				...state,
				lastName:payload
			}
			break;
		}

		case 'ADD_USER_ID':{
			return{
				...state,
				id:payload
			}
			break;
		}

		case 'UPDATE_SIGNIN_STATUS':{
			return {
				...state,
				signInStatus:payload
			}
			break;
		}

		case 'ADD_PAYMENT_PLAN':{
			return{
				...state,
				paymentPlan:payload
			}
			break;
		}

		case 'FIRST_TIME_INDICATOR':{
			return{
				...state,
				firstTimeIndicator:payload
			}
			break;
		}



		case 'LOGIN_PERSONAL_PAGE':{
			return{
				...state,
				loggedIn:payload
			}
			break;
		}

		case 'SIGN_IN_PERSONAL_USER':{
			debugger;
			const {
				firstName,
				lastName,
				email,
				_id,
				accessToken,
				refreshToken
			}=payload;

			return {
				...state,
				id:_id,
				firstName,
				lastName,
				email,
				signInStatus:true,
				paymentPlan:'',
				loggedIn:true,
				accessToken,
				refreshToken,
				isGuestProfile:false
			}
			break;
		}

		case 'SIGN_IN_GUEST_USER':{
			return{
				...state,
				isGuestProfile:true
			}
			break;
		}
		
		case 'LOGOUT_USER':{
			debugger;
			return initialState
			break;
		}

		case 'ACCESS_TOKEN':{
			return{
				...state,
				accessToken:payload
			}
		}

		case 'REFRESH_TOKEN':{
			return{
				...state,
				refreshToken:payload
			}
		}

		case 'IS_TOKEN_REFRESHING':{
			return{
				...state,
				isTokenRefreshing:payload
			}
		}

		default:{
			return state;
			break;
		}
	}
}

export default PersonalProfile;