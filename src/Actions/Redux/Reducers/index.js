import PersonalReducer from './PersonalReducer';
import CompanyEmployeesReducer from './CompanyEmployeesReducer';
import CompanyReducer from './CompanyInformationReducer';
import CompanyNewsReducer from "./CompanyNewsReducer";
import { combineReducers } from 'redux';



const allReducers=combineReducers({
	personalInformation: PersonalReducer,
	companyEmployeeInformation:CompanyEmployeesReducer,
	companyInformation:CompanyReducer,
	companyNewsInformation:CompanyNewsReducer
});

export default allReducers;