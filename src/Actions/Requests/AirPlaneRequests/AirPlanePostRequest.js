import axios from "axios";

const CreateURL=process.env.NODE_ENV=='production'?
	process.env.REACT_APP_AIRPLANE_PAGE_SET_URL:
	process.env.REACT_APP_TEST_AIRPLANE_SET_URL;

export const generateAirPlane=async(generatedAirPlaneInformation)=>{
	try{
		const generatedAirPlaneResponse=await axios.post(`${CreateURL}/generateAirPlane`,{
			...generatedAirPlaneInformation
		});
		const {data}=generatedAirPlaneResponse;
		return data;
	}catch(err){
		throw err;
	}
}