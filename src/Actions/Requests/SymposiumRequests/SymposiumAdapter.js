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

export const addTag=async(symposiumId,tagName,ownerId,accessToken)=>{
	try{

		const addedTagResponse=await axios.post(`${CreateUrl}/addTag`,{
			symposiumId,
            tagName,
            ownerId
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=addedTagResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const updateBeaconsAcceptedAnswerStatus=async(updatedBeaconInformation)=>{
	try{
		const updatedBeaconResponse=await axios.post(`${CreateUrl}/updateBeaconsAcceptedAnswerStatus`,{
			...updatedBeaconInformation
		});
		const {data}=updatedBeaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const removeTag=async(tagId,symposiumId,ownerId,accessToken)=>{
	try{
		const removedTagResponse=await axios.post(`${CreateUrl}/removeTag`,{
			tagId,
			symposiumId,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=removedTagResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const addSymposiumSpecialist=async(symposiumSpecialist)=>{
	try{
		const {
			accessToken,
			...symposiumSpecialistInformation
		}=symposiumSpecialist;

		const addedSpecialistResponses=await axios.post(`${CreateUrl}/addSymposiumSpecialist`,{
			...symposiumSpecialistInformation
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=addedSpecialistResponses;
		return data;
	}catch(err){
		throw err;
	}
}

export const addSymposiumResources=async(addedSymposiumResourceInformation)=>{
	try{
		const addedSymposiumResourceResponse=await axios.post(`${CreateUrl}/addSymposiumResources`,{
			...addedSymposiumResourceInformation
		});
		const {data}=addedSymposiumResourceResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const deleteSymposiumSpecialist=async(symposiumId,specialistId,profileId)=>{
	try{
		const deletedSymposiumSpecialistResponse=await axios.post(`${CreateUrl}/deleteSymposiumSpecialist`,{
			symposiumId,
			specialistId,
			profileId
		})

		const {data}=deletedSymposiumSpecialistResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const deleteSymposiumResource=async(deletedSymposiumResourceInformation)=>{
	try{
		const deletedSymposiumResponse=await axios.post(`${CreateUrl}/deleteSymposiumResource`,{
			...deletedSymposiumResourceInformation
		});
		const {data}=deletedSymposiumResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const incrementSpecialistRanking=async(specialistId,updateOwnerId)=>{
	try{
		const incrementedSpecialistRankingResponse=await axios.post(`${CreateUrl}/incrementSpecialistRanking`,{
			specialistId,
			updateOwnerId
		});
		const {data}=incrementedSpecialistRankingResponse;
		return data;
	}catch(err){
		throw err;
	}
}



export const decrementSymposiumSpecialistRanking=async(specialistId,updateOwnerId)=>{
	try{
		const decrementedSpecialistRankingResponse=await axios.post(`${CreateUrl}/decrementSymposiumSpecialistRanking`,{
			specialistId,
			updateOwnerId
		});
		const {data}=decrementedSpecialistRankingResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const createCommunityQuestion=async(communityQuestionCreationInformationParams)=>{
	try{
		const{
			accessToken,
			...communityQuestionCreationInformation
		}=communityQuestionCreationInformationParams;

		const createdCommunityQuestionResponse=await axios.post(`${CreateUrl}/createCommunityQuestion`,{
			...communityQuestionCreationInformation
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=createdCommunityQuestionResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const upvoteCommunityQuestion=async(upVotedCommunityQuestionInformationParams)=>{
	try{
		const {
			accessToken,
			...upVotedCommunityQuestionInformation
		}=upVotedCommunityQuestionInformationParams;

		const updatedQuestionResponse=await axios.post(`${CreateUrl}/upvoteCommunityQuestion`,{
			...upVotedCommunityQuestionInformation
		},{
			headers:{
				authorization:accessToken
			}
		});

		const {data}=updatedQuestionResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const removeCommunityQuestion=async(communityQuestionId,symposiumId,profileId,accessToken)=>{
	try{
		const removedCommunityQuestionResponse=await axios.post(`${CreateUrl}/removeCommunityQuestion`,{
			communityQuestionId,
			symposiumId,
			profileId
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=removedCommunityQuestionResponse;
		return data;

	}catch(err){
		throw err;
	}
}

export const removeVoteFromCommunityQuestion=async({voterProfileId,questionId,symposiumId,accessToken})=>{
	try{
		const removedCommunityQuestionVoteResponse=await axios.post(`${CreateUrl}/removeVoteFromCommunityQuestion`,{
			voterProfileId,
			questionId,
			symposiumId
		},{
			headers:{
				authorization:accessToken
			}
		});

		const {data}=removedCommunityQuestionVoteResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const editTag=async(tagId,tagName,symposiumId,ownerId,accessToken)=>{
	try{
		const editedTagResponse=await axios.post(`${CreateUrl}/editTag`,{
			tagId,
			tagName,
			symposiumId,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		}) 
		const {data}=editedTagResponse;
		return data;
		
	}catch(err){
		throw err;
	}
}

export const createCommunityQuestionStandingComment=async(questionCommentInformationParams)=>{
	try{
		const {
			accessToken,
			...questionCommentInformation
		}=questionCommentInformationParams;

		const questionCommentResponse=await axios.post(`${CreateUrl}/createQuestionStandingComment`,{
			...questionCommentInformation
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=questionCommentResponse;
		return data;
	}catch(err){
		throw err;
	}
}	













