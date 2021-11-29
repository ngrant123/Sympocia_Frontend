import axios from "axios";

const SearchURL=process.env.NODE_ENV=='production'?
	process.env.REACT_APP_AIRPLANE_PAGE_GET_URL:
	process.env.REACT_APP_TEST_AIRPLANE_GET_URL;


export const retrieveAirPlanes=async(profileId,pageType,pageTypeParamsId)=>{
	try{
		const generatedAirPlaneResponse=await axios.get(`${SearchURL}/retrieveAirPlanes`,{
			params:{
				profileId,
				pageType,
				pageTypeParamsId
			}
		});
		const {data}=generatedAirPlaneResponse;
		return data;
	}catch(err){
		throw err;
	}
}