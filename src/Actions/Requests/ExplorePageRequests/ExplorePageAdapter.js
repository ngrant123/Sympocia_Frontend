import axios from "axios";

const CreateURL=process.env.NODE_ENV=='production'?
			process.env.REACT_APP_EXPLORE_PAGE_SET_URL:
			process.env.REACT_APP_TEST_EXPLORE_PAGE_SET_URL;

export const alterProfileToSymposiumRelationship=async(profileId,symposiumId,adapterValue)=>{
	try{
		debugger;
		const alteredRelationshipResponse=await axios.post(`${CreateURL}/alterProfileToSymposiumRelationship`,{
			profileId,
			symposiumId,
			adapterValue
		});
		const {data}=alteredRelationshipResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const clearFeedRecommendations=async(profileId,postType)=>{
	try{
		const clearFeedResponse=await axios.post(`${CreateURL}/clearFeedRecommendations`,{
			profileId,
			postType
		})

		const {data}=clearFeedResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const deleteSymposiumFeedRecommedonations=async(profileId,symposiumId,postType)=>{
	try{
		const deleteSymposiumFeedResponse=await axios.post(`${CreateURL}/deleteSymposiumFeedRecommedonations`,{
			profileId,
			symposiumId,
			postType
		})

		const {data}=deleteSymposiumFeedResponse;
		return data;
	}catch(err){
		throw err;
	}
}