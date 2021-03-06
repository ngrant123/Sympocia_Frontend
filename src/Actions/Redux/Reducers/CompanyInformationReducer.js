

const initialState ={
	companyName:'',
	companyIndustry:'',
	companyLocation:'',
	companyIcon:'',
	companyBio:'',
	companyCoverPhoto:'',
	id:0,
	firstTimeIndicator:true,
	loggedIn:false
}


const CompanyInformationReducer=(state=initialState, action)=>{

	const { type,payload }=action;

	switch(type){

		case 'UPDATE_COMPANY_NAME':
			return {
					...state,
					companyName:payload
					}
			break;

		case 'UPDATE_COMPANY_ID':

			return{
				...state,
				id:payload
			}
			break;

		case 'UPDATE_FIRST_TIME_USAGE':
			return{
				...state,
				firstTimeIndicator:payload
			}
			break;

		case 'UPDATE_COMPANY_INDUSTRY':
			return {...state,
					companyIndustry:payload
					}
				break;

		case 'UPDATE_COMPANY_LOCATION':
			return {...state,
					companyLocation:payload
					}
			break;

		case 'UPDATE_COMPANY_ICON':
			return {...state,
					companyIcon:payload
					}
			break;

		case 'UPDATE_COMPANY_BIO':
			return {...state,
					companyBio:payload
					}
			break;

		case 'UPDATE_COMPANY_COVER_PHOTO':
			return {...state,
					companyCoverPhoto:payload
					}
			break;

		case 'UPDATE_PAYMENT_PLAN':
			return{
				...state,
				paymentPlan:payload
			}
		break;

		case 'LOGIN_COMPANY_PAGE':
			return{
				...state,
				loggedIn:payload
			}
			break;

		default:
			return state;
			break;
	}
}


export default CompanyInformationReducer;