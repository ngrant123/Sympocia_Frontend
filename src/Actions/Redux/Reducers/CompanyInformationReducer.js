

const initialState ={
	companyName:"",
	companyIndustry:"",
	companyLocation:"",
	companyIcon:"",
	companyBio:"",
	companyCoverPhoto:""
}


export function CompanyInformationReducer(state=initialState, action){

	const { type,payload }=action;

	switch(type){

		case 'UPDATE_COMPANY_NAME':
			return {...,
					companyName:payload.companyName
					}
			break;

		case 'UPDATE_COMPANY_INDUSTRY':
			return {...,
					companyIndustry:payload.companyIndustry
					}
				break;

		case 'UPDATE_COMPANY_LOCATION':
			return {...,
					companyLocation:payload.companyLocation
					}
			break;

		case 'UPDATE_COMPANY_ICON':
			return {...,
					companyIcon:payload.companyIcon
					}
			break;

		case 'UPDATE_COMPANY_BIO':
			return {...,
					companyBio:payload.companyBio
					}
			break;

		case 'UPDATE_COMPANY_COVER_PHOTO':
			return {...,
					companyCoverPhoto:payload.companyCoverPhoto
					}
			break;

		default:
			return state;
			break;
	}
}