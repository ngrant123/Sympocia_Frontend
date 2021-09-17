import axios from "axios";

 const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SYMPOSIUM_GET_URL:
				process.env.REACT_APP_TEST_SYMPOSIUM_GET_URL;



export const getImagesInIndustry=async(postFetchCriteria)=>{
	try{
		const imageResults=await axios.get(`${SearchUrl}/getImagesInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}

export const getRegularPostsInIndustry=async(postFetchCriteria)=>{
	try{
		const imageResults=await axios.get(`${SearchUrl}/getRegularPostInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryImageFeatureAnswers=async({industryId,question,questionIndex,questionId})=>{
	try{
		const imageResponse=await axios.get(`${SearchUrl}/getIndustryImageFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionIndex,
				questionId
			}
		})
		const {data}=imageResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryVideoFeatureAnswers=async({industryId,question,questionIndex,questionId})=>{
	try{
		const videoResponse=await axios.get(`${SearchUrl}/getIndustryVideoFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionIndex,
				questionId
			}
		})
		const {data}=videoResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryRegularPostFeatureAnswers=async({industryId,question,questionIndex,questionLevel,questionId})=>{
	try{
		const regularPostResponse=await axios.get(`${SearchUrl}/getIndustryRegularPostFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionLevel,
				questionIndex,
				questionId
			}
		})
		const {data}=regularPostResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getVideoInIndustry=async(postFetchCriteria)=>{
	try{
		const videoResponse=await axios.get(`${SearchUrl}/getVideosInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=videoResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getBlogsInIndustry=async(postFetchCriteria)=>{
	try{
		const blogResponse=await axios.get(`${SearchUrl}/getBlogsInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=blogResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryAudioFeatureAnswers=async({industryId,question,questionIndex,questionId})=>{
	try{
		const audioResponse=await axios.get(`${SearchUrl}/getIndustryAudioFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionIndex,
				questionId
			}
		})
		const {data}=audioResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryInformation=async(industry,postCount,userId,postSessionManagmentToken)=>{
	try{
		
		const industryInformation=await axios.get(`${SearchUrl}/getIndustryInformation`,{
			params:{
				industry:industry,
				postCount:postCount,
				userId:userId,
				postSessionManagmentToken
			}
		})

		const {data}=industryInformation;
		return data;
	}catch(err){
		return err;
	}
}


export const getPopularQuestionReplies=async(industry,counter)=>{
	try{
		const popularQuestionResponse=await axios.get(`${SearchUrl}/getPopularQuestion`,{
			params:{
				industry:industry,
				counter:counter
			}
		})

		const {data}=popularQuestionResponse;
		return data;

	}catch(err){
		return err;
	}
}


export const retrieveBeacons=async(symposiumId,postType,beaconCounter)=>{
	try{
		const beaconResponse=await axios.get(`${SearchUrl}/getBeacons`,{
			params:{
				symposiumId,
	            postType,
	            beaconCounter
			}
		})

		const {data}=beaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveBeaconReplies=async(symposiumId,postType,beaconId,currentSessionToken,ownerId)=>{
	try{
		const beaconReplies=await axios.get(`${SearchUrl}/getBeaconReplies`,{
			params:{
				symposiumId,
	            postType,
	            beaconId,
	            currentPostSessionManagment:currentSessionToken,
	            ownerId
			}
		})
		const {data}=beaconReplies;
		return data;
	}catch(err){
		throw err;
	}
}

export const isOligarch=async(profileId,symposium,accessToken)=>{
	try{
		const isOligarchResponse=await axios.get(`${SearchUrl}/isProfileOligarchStatus`,{
			params:{
				profileId,
				symposium
			},
			headers:{
				authorization:accessToken
			}
		})
		const {data}=isOligarchResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getOligarchPerSymposium=async(symposiumId)=>{
	try{
		const oligarchsResponse=await axios.get(`${SearchUrl}/getOligarchPerSymposium`,{
			params:{
				symposiumId
			}
		})
		const {data}=oligarchsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getSymposiumUniversityPostsApi=async(information)=>{
	try{
		const postsResponse=await axios.get(`${SearchUrl}/getSymposiumUniversityPosts`,{
			params:{...information}
		});
		const {data}=postsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getSymposiumUniversityPage=async(symposiumId,ownerId,currentPostSessionManagmentToken)=>{
	try{
		const symposiumUniversityPageResponse=await axios.get(`${SearchUrl}/getSymposiumUniversityPage`,{
			params:{
				symposiumId,
				ownerId,
				currentPostSessionManagmentToken
			}
		});

		const {data}=symposiumUniversityPageResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getSymposiumSpecialists=async(symposiumId)=>{
	try{
		const symposiumSpecialistsResponse=await axios.get(`${SearchUrl}/getSymposiumSpecialists`,{
			params:{
				symposiumId
			}
		})
		const {data}=symposiumSpecialistsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getSymposiumResources=async(symposiumId)=>{
	try{
		const symposiumResourcesResponse=await axios.get(`${SearchUrl}/getSymposiumResources`,{
			params:{
				symposiumId
			}
		})

		const {data}=symposiumResourcesResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getBeacons=async(beaconRetrievalInformation)=>{
	try{
		const beaconsResponse=await axios.get(`${SearchUrl}/getBeacons`,{
			params:{...beaconRetrievalInformation}
		})
		const {data}=beaconsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getBeaconReplies=async(beaconRepliesRetrievalInformation)=>{
	try{
		const beaconRepliesResponse=await axios.get(`${SearchUrl}/getBeaconReplies`,{
			params:{...beaconRepliesRetrievalInformation}
		});
		const {data}=beaconRepliesResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getBeaconsFeaturePage=async(beaconFeaturePageRequestInformation)=>{
	try{

		const beaconsFeaturePageResponse=await axios.get(`${SearchUrl}/getBeaconsFeaturePage`,{
			params:{...beaconFeaturePageRequestInformation}
		})

		const {data}=beaconsFeaturePageResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getProgressBarBreakDown=async(profileId,symposiumId)=>{
	try{

		const progressBarBreakDownResponse=await axios.get(`${SearchUrl}/getProgressBarBreakDown`,{
			params:{
				profileId,
				symposiumId
			}
		});
		const {data}=progressBarBreakDownResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getProgressBarBeaconsAnswered=async(symposiumId,postType,profileId)=>{
	try{

		const progressBarBeaconsAnsweredResponse=await axios.get(`${SearchUrl}/getProgressBarBeaconsAnswered`,{
			params:{
				symposiumId,
				postType,
				profileId
			}
		})

		const {data}=progressBarBeaconsAnsweredResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getProgressBarBeaconsAccepeted=async(symposiumId,postType,profileId)=>{
	try{
		const progressBarBeaconsAcceptedResponse=await axios.get(`${SearchUrl}/getProgressBarBeaconsAccepeted`,{
			params:{
				symposiumId,
				postType,
				profileId
			}
		});
		const {data}=progressBarBeaconsAcceptedResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveSpecificBeacon=async(postType,beaconId)=>{
	try{
		const retrieveBeaconResponse=await axios.get(`${SearchUrl}/retrieveSpecificBeacon`,{
			params:{
				postType,
				beaconId
			}
		})

		const {data}=retrieveBeaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveCurrentSubmissions=async(symposiumId)=>{
	try{
		const currentSubmissionsResponse=await axios.get(`${SearchUrl}/retrieveCurrentSubmissions`,{
			params:{symposiumId}
		})
		const {data}=currentSubmissionsResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getCommunityFeaturesPage=async(symposiumId,ownerId)=>{
	try{

		const communtiyFeaturesPageResponses=await axios.get(`${SearchUrl}/getCommunityFeaturesPage`,{
			params:{
				symposiumId,
				ownerId
			}
		})

		const {data}=communtiyFeaturesPageResponses;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveCommunityPosts=async(communityPostsRetrievalInformation)=>{
	try{
		const retrievedCommunityPostsResponse=await axios.get(`${SearchUrl}/retrieveCommunityPosts`,{
			params:{...communityPostsRetrievalInformation}
		})

		const {data}=retrievedCommunityPostsResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getSymposiumName=async(symposiumId)=>{
	try{
		const symposiumNameResponse=await axios.get(`${SearchUrl}/getSymposiumName`,{
			params:{
				symposiumId
			}
		})

		const {data}=symposiumNameResponse;
		return data;
	}catch(err){
		throw err;
	}
}





export const getOwnerTags=async(ownerId,symposiumId)=>{
	try{
		const ownerTagsResponses=await axios.get(`${SearchUrl}/retrieveOwnersTags`,{
			params:{
				ownerId,
				symposiumId
			}
		});
		const {data}=ownerTagsResponses;
		return data;
	}catch(err){
		throw err;
	}
}

export const getBeaconsTargetIdInteractedWith=async(beaconInteractionParams)=>{
	try{
		const beaconOwnerInteractedWithResponse=await axios.get(`${SearchUrl}/getBeaconsTargetIdInteractedWith`,{
			params:{...beaconInteractionParams}
		});
		const {data}=beaconOwnerInteractedWithResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getTargetIdAcceptedBeacons=async(targetOwnerIdBeaconParams)=>{
	try{
		const ownerBeaconsAccepted=await axios.get(`${SearchUrl}/getTargetIdAcceptedBeacons`,{
			params:{...targetOwnerIdBeaconParams}
		})

		const {data}=ownerBeaconsAccepted;
		return data;
	}catch(err){
		throw err;
	}
}


export const getSymposiumTags=async(symposiumId)=>{
	try{
		const symposiumTagsResponse=await axios.get(`${SearchUrl}/getSymposiumTags`,{
			params:{
				symposiumId
			}
		});
		const {data}=symposiumTagsResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getSymposiumId=async(name)=>{
	try{
		debugger;
		const symposiumResponse=await axios.get(`${SearchUrl}/getSymposiumId`,{
			params:{
				symposiumName:name
			}
		});
		const {data}=symposiumResponse;
		return data;

	}catch(err){
		return err;
	}
}
export const getRecentSymposiumTags=async(symposiumId)=>{
	try{
		const recentSymposiumTagsResponse=await axios.get(`${SearchUrl}/getRecentSymposiumTags`,{
			params:{
				symposiumId
			}
		});
		const {data}=recentSymposiumTagsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getHottestSymposiumTags=async(symposiumId)=>{
	try{
		const hottestSymposiumTagsResponse=await axios.get(`${SearchUrl}/getHottestSymposiumTags`,{
			params:{
				symposiumId
			}
		});
		const {data}=hottestSymposiumTagsResponse;
		return data;
	}catch(err){
		throw err;
	}
}




















