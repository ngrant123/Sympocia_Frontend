
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


module.exports={
	addCompanyName,
	addCompanyType,
	addCompanyLocation,
	addCompanyBio,
	addCompanyIcon,
	addCompanyCoverPhoto

}