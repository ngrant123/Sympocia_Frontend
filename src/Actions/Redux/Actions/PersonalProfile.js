

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


module.exports={
	addName,
	addLastName,
	addEmail,
	addPersonalIdentificationId
}