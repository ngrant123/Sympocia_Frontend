


const initialState={
	id:0,
	firstName:'',
	lastName:'',
	email:'',
	signInStatus:false,
	accountNumber:0,
	dateOnCard:'',
	cvv:0,
	paymentPlan:'',
	firstTimeIndicator:false
}

const PersonalProfile=(state={initialState},action)=>{

	const { type, payload }=action;
	
	switch(type){

		case 'ADD_EMAIL':
			return {
				...state,
				email:payload
			}
			break;

		case 'ADD_FIRST_NAME':
			return {
				...state,
				firstName:payload
			}
			break;

		case 'ADD_LAST_NAME':
			return{
				...state,
				lastName:payload
			}
			break;

		case 'ADD_USER_ID':
			return{
				...state,
				id:payload
			}
			break;

		case 'UPDATE_SIGNIN_STATUS':
			return {
				...state,
				signInStatus:payload
			}
			break;

		case 'ADD_ACCOUNT_NUMBER':
			return{
				...state,
				accountNumber:payload
			}
			break;

		case 'ADD_CARD_DATE':
			return{
				...state,
				dateOnCard:payload
			}
			break;

		case 'ADD_CVV':
			return{
				...state,
				cvv:payload
			}
			break;

		case 'ADD_PAYMENT_PLAN':

			return{
				...state,
				paymentPlan:payload
			}
			break;

		case 'FIRST_TIME_INDICATOR':

			return{
				...state,
				firstTimeIndicator:payload
			}
			break;

	

		default:
			return state;
			break;
	}
}

export default PersonalProfile;