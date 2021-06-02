import axios from "axios";

const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SYMPOSIUM_SYMPOCIA_NEWS_GET_URL:
				process.env.REACT_APP_TEST_SYMPOSIUM_SYMPOCIA_NEWS_GET_URL;

export const hasUserViewedCommunity=async(profileId)=>{
	try{
		const userViewStatusResponse=await axios.get(`${SearchUrl}/hasUserViewedCommunity`,{
			params:{
				profileId
			}
		})
		const {data}=userViewStatusResponse;
		return data;
	}catch(err){
		throw err;
	}
}
