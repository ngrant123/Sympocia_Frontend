import constants from "";


const initialState = {

	profilePicture:"",
	companyBio:"",
	companyIcon:"",
	coverPhoto:"",
	companyIndustry:""

};

export default (state = initialState, action){


	switch(action.type){

		case "UPDATE_PROFILE_PICTURE":
			return {...state,
					 profilePicture: action.profilePicture
					};
			break;

		case "UPDATE_COMPANY_BIO":
			return {...state,
					 companyBio:action.companyBio
					}
			break;

		case "UPDATE_COMPANY_ICON":
			return {...state, 
					 action.companyIcon
					}
			break;

		case "UPDATE_COMPANY_COVER_PHOTO":
			return {...state,
   				     action.coverPhoto
					}
			break;

		case "UPDATE_INDUSTRY":
			return {...state,
					 action.companyIndustry
					}

			break;
		default:
			return initialState;

	}
}