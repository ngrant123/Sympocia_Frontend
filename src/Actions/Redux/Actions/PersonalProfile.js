

const addName=(firstName)=>{

console.log('Action :'+firstName);


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

const addAccountNumber=(accountNumber)=>{

	return{
		type:'ADD_ACCOUNT_NUMBER',
		payload:accountNumber
	} 
}

const addCardDate=(accountDate)=>{

	return{
		type:'ADD_CARD_DATE',
		payload:accountDate
	}
}

const addCvv=(accountCvv)=>{

	return{
		type:'ADD_CVV',
		payload:accountCvv
	}
}


const addPaymentPlan=(paymentPlan)=>{

	return{
		type:'ADD_PAYMENT_PLAN',
		payload:paymentPlan
	}
}


module.exports={
	addName,
	addLastName,
	addEmail,
	addPersonalIdentificationId,
	addSignInStatus,
	addCardDate,
	addAccountNumber,
	addCvv,
	addPaymentPlan
}