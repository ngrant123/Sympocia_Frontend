import axios from "axios";

const CreateUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SYMPOSIUM_SET_URL:
				process.env.REACT_APP_TEST_SYMPOSIUM_SET_URL;


export const addProfileToViewedOligarchNotification=async(symposiumId,profileId)=>{
	try{
		const addProfileResponse=await axios.post(`${CreateUrl}/addProfileToViewedOligarchNotification`,{
			symposiumId,
			profileId
		})
		const {data}=addProfileResponse;
		return data;
	}catch(err){
		throw err;
	}
}