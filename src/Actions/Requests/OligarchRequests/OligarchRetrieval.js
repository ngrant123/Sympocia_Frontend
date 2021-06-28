import axios from "axios";

const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_OLIGARCH_GET_URL:
				process.env.REACT_APP_TEST_OLIGARCH_GET_URL;

export const getSymposiumOligarchCards=async(symposiumId)=>{
	try{
		const symposiumRetrievedResponse=await axios.get(`${SearchUrl}/symposiumOligarchCards`,{
			params:{
				symposiumId
			}
		})
		const {data}=symposiumRetrievedResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getOligarchCardComments=async(oligarchCardId)=>{
	try{
		const oligarchCardResponse=await axios.get(`${SearchUrl}/oligarchVoterCardComments`,{
			params:{
				oligarchCardId
			}
		})
		const {data}=oligarchCardResponse
		return data;
	}catch(err){
		throw err;
	}
}


export const getProfileSponsorOligarchCardStatus=async(oligarchCardId,userIdSponsoring)=>{
	try{
		const profileSponsorOligarchCardStatus=await axios.get(`${SearchUrl}/profileSponsorshipOligarchCardStatus`,{
			params:{
				oligarchCardId,
				userIdSponsoring
			}
		})
		const {data}=profileSponsorOligarchCardStatus;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveOwnerVoterCardIfItExits=async(symposiumId,ownerId)=>{
	try{
		const ownerVoterCardResponse=await axios.get(`${SearchUrl}/specificOwnerOligarchCard`,{
			params:{
				symposiumId,
            	ownerId
			}
		})
		const {data}=ownerVoterCardResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const searchForSpecificOligarchCard=async(symposiumId,searchQuery)=>{
	try{
		const searchOligarchCardResponse=await axios.get(`${SearchUrl}/oligarchSearch`,{
			params:{
				symposiumId,
				searchQuery
			}
		})
		const {data}=searchOligarchCardResponse;
		return data;
	}catch(err){
		throw err;
	}
}







