import axios from "axios";


const CreateUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SYMPOSIUM_SYMPOCIA_NEWS_POST_URL:
				process.env.REACT_APP_TEST_SYMPOSIUM_SYMPOCIA_NEWS_POST_URL;



export const addUserToCommunityViewedList=async(profileId)=>{
	try{
		const addedUserToViewListResponse=await axios.post(`${CreateUrl}/addUserToCommunityViewedList`,{
			profileId
		})
		const {data}=addedUserToViewListResponse;
		return data;
	}catch(err){
		throw err;
	}
}