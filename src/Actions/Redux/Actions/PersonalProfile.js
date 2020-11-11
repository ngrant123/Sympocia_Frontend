

const addName=(firstName)=>{
	return{
		type:'ADD_FIRST_NAME',
		payload:firstName
	}
}

const addLastName=(lastName)=>{

	return{
		type:'ADD_LAST_NAME',
		payload:lastName

	}
}

const addEmail=(email)=>{

	return{
		type:'ADD_EMAIL',
		payload:email
	}
}

const addPersonalIdentificationId=(userId)=>{


	return{
		type:'ADD_USER_ID',
		payload:userId
	}
}

const addSignInStatus=(signInStatus)=>{

	return{
		type:'UPDATE_SIGNIN_STATUS',
		payload:signInStatus
	}
}

const addPaymentPlan=(paymentPlan)=>{

	return{
		type:'ADD_PAYMENT_PLAN',
		payload:paymentPlan
	}
}


const firstTimeUsage=(firstTime)=>{
	return{
		type:'FIRST_TIME_INDICATOR',
		payload:firstTime
	}
}

const loginPersonalPage=(loginIndicator)=>{
	return{
		type:'LOGIN_PERSONAL_PAGE',
		payload:loginIndicator
	}
}

module.exports={
	addName,
	addLastName,
	addEmail,
	addPersonalIdentificationId,
	addSignInStatus,
	addPaymentPlan,
	firstTimeUsage,
	loginPersonalPage
}