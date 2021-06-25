import axios from "axios";

const CreateUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_OLIGARCH_SET_URL:
				process.env.REACT_APP_TEST_OLIGARCH_SET_URL;


export const createOligarchCardComment=async(commentData,accessToken)=>{
	try{
		const oligarchCommentCreationResponse=await axios.post(`${CreateUrl}/createOligarchCardComment`,{
			...commentData
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=oligarchCommentCreationResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const deleteOligarchComment=async(commentId,ownerId,accessToken)=>{
	try{
		const deletionCommentResponse=await axios.post(`${CreateUrl}/deleteOligarchCardComment`,{
			commentId,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deletionCommentResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const sponsorOligarchCard=async(oligarchCardId,userIdSponsoring,accessToken)=>{
	try{
		const sponsorOligarchCardResponse=await axios.post(`${CreateUrl}/sponsorOligarchCard`,{
			oligarchCardId,
			userIdSponsoring
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=sponsorOligarchCardResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const unsponsorOligarchCard=async(oligarchCardId,userIdSponsoring,accessToken)=>{
	try{
		const unsponsoredOligarchCardResponse=await axios.post(`${CreateUrl}/unsponsorOligarchCard`,{
			oligarchCardId,
			userIdSponsoring
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=unsponsoredOligarchCardResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const createOligarchVoterCard=async(voterCardInformation,accessToken)=>{
	try{
		const oligarchCardCreationResponse=await axios.post(`${CreateUrl}/createOligarchVoteCard`,{
			...voterCardInformation
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=oligarchCardCreationResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const editOligarchVoteCard=async({editedElectionSpeech,selectedOligarchCardId,ownerId,accessToken})=>{
	try{
		const editedOligarchCardResponse=await axios.post(`${CreateUrl}/editOligarchVoteCard`,{
			editedElectionSpeech,
			selectedOligarchCardId,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=editedOligarchCardResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const deleteOligarchVoteCard=async(oligarchCardId,ownerId,accessToken)=>{
	try{
		const deletedOligarchVoteCardResponse=await axios.post(`${CreateUrl}/deleteOligarchVoteCard`,{
			oligarchCardId,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deletedOligarchVoteCardResponse;
		return data;
	}catch(err){
		throw err;
	}
}



















