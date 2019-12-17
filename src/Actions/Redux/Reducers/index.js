import PersonalReducer from './PersonalReducer';
import CompanyEmployeesReducer from './CompanyEmployeesReducer';
import CompanyReducer from './CompanyInformationReducer';
import { combineReducers } from 'redux';



const allReducers=combineReducers({
	personalInformation: PersonalReducer,
	companyEmployeeReducer:CompanyEmployeesReducer,
	companyReducer:CompanyReducer
});

export default allReducers;