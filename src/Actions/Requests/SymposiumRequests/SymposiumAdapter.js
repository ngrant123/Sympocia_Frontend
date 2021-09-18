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

export const addTag=async(symposiumId,tagName,ownerId)=>{
	try{

		const addedTagResponse=await axios.post(`${CreateUrl}/addTag`,{
			symposiumId,
            tagName,
            ownerId
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

export const removeTag=async(tagId,symposiumId,ownerId)=>{
	try{
		const removedTagResponse=await axios.post(`${CreateUrl}/removeTag`,{
			tagId,
			symposiumId,
			ownerId
		});
		const {data}=removedTagResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const addSymposiumSpecialist=async(symposiumId,firstName,profileId)=>{
	try{
		const addedSpecialistResponses=await axios.post(`${CreateUrl}/addSymposiumSpecialist`,{
			symposiumId,
			firstName,
			profileId
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

export const updateSpecialistReputation=async(reputationScore,specialistId,symposiumId)=>{
	try{
		const updatedSpecialistReputationResponse=await axios.post(`${CreateUrl}/updateSpecialistReputation`,{
			reputationScore,
			specialistId,
			symposiumId
		})

		const {data}=updatedSpecialistReputationResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const createCommunityQuestion=async(communityQuestionCreationInformation)=>{
	try{
		const createdCommunityQuestionResponse=await axios.post(`${CreateUrl}/createCommunityQuestion`,{
			...communityQuestionCreationInformation
		});
		const {data}=createdCommunityQuestionResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const upvoteCommunityQuestion=async(upVotedCommunityQuestionInformation)=>{
	try{
		const updatedQuestionResponse=await axios.post(`${CreateUrl}/upvoteCommunityQuestion`,{
			...upVotedCommunityQuestionInformation
		})
		const {data}=updatedQuestionResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const removeCommunityQuestion=async(communityQuestionId,symposiumId,profileId)=>{
	try{
		const removedCommunityQuestionResponse=await axios.post(`${CreateUrl}/removeCommunityQuestion`,{
			communityQuestionId,
			symposiumId,
			profileId
		});
		const {data}=removedCommunityQuestionResponse;
		return data;

	}catch(err){
		throw err;
	}
}

export const removeVoteFromCommunityQuestion=async(voterProfileId,questionId,symposiumId)=>{
	try{
		const removedCommunityQuestionVoteResponse=await axios.post(`${CreateUrl}/removeVoteFromCommunityQuestion`,{
			voterProfileId,
			questionId,
			symposiumId
		});
		const {data}=removedCommunityQuestionVoteResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const editTag=async(tagId,tagName,symposiumId)=>{
	try{
		const editedTagResponse=await axios.post(`${CreateUrl}/editTag`,{
			tagId,
			tagName,
			symposiumId
		}) 
		const {data}=editedTagResponse;
		return data;
		
	}catch(err){
		throw err;
	}
}















