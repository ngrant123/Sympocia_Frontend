
const addCompanyName=(companyName)=>{
	console.log('Company Name accessed');
	console.log(companyName);
	return{

		type:'UPDATE_COMPANY_NAME',
		payload:companyName
	}
}


const addCompanyLocation=(companyLocation)=>{

	return{
		type:'UPDATE_COMPANY_LOCATION',
		payload:companyLocation
	}
}

const addCompanyType=(companyType)=>{

	return{
		type:'UPDATE_COMPANY_INDUSTRY',
		payload:companyType
	}
}


const addCompanyBio=(companyBio)=>{

	return{
		type:'UPDATE_COMPANY_BIO',
		payload:companyBio
	}
}

const addCompanyIcon=(companyIcon)=>{

	return{
		type:'UPDATE_COMPANY_ICON',
		payload:companyIcon
	}
}

const addCompanyCoverPhoto=(companyCoverPhoto)=>{

	return{
		type:'UPDATE_COMPANY_COVER_PHOTO',
		payload:companyCoverPhoto
	}
}

const addCompanyId=(companyId)=>{

	return{
		type:'UPDATE_COMPANY_ID',
		payload:companyId
	}
}

const updatefirstTimeUsage=(indicator)=>{
	return{
		type:'UPDATE_FIRST_TIME_USAGE',
		payload:indicator
	}
}

const addPaymentPlan=(paymentPlan)=>{

	return{
		type:'UPDATE_PAYMENT_PLAN',
		payload:paymentPlan
	}

}


const loginCompanyPage=(loginIndicator)=>{
	return{
		type:'LOGIN_COMPANY_PAGE',
		payload:loginIndicator
	}
}


module.exports={
	addCompanyName,
	addCompanyType,
	addCompanyLocation,
	addCompanyBio,
	addCompanyIcon,
	addCompanyCoverPhoto,
	addCompanyId,
	updatefirstTimeUsage,
	addPaymentPlan,
	loginCompanyPage
}