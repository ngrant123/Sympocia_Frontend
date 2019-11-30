import PersonalReducer from './PersonalReducer';
import { combineReducers } from 'redux';



const allReducers=combineReducers({
	personalInformation: PersonalReducer
});

export default allReducers;