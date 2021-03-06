import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const baseurl=BASE_URL.BASE_URL;
const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_PROFILE_GET_URL:
				process.env.REACT_APP_TEST_PROFILE_GET_URL;

export function getActivityLog(userId){
	axios.get(`${baseurl}/ActivityLog`,{

		param:{
			userid:userId
		}
	}).then(res=>{
	}).catch(err=>{
	})
}


export async function getProfile({userId,visitorId,accessToken,isGuestProfileIndicator}){

	try{
		const profile=await axios.get(`${SearchUrl}/getProfile`,{
			params:{
				id:userId,
				visitorId
			},
			headers:{
				authorization:accessToken,
				isGuestProfile:isGuestProfileIndicator
			}
		}); 
	
		const {data}=profile;
		return data;
	}catch(err){
	}
}

export async function getProfileByName(profileName){	

	try{

		const profile=await axios.get(`${SearchUrl}/getProfileByName`,{
				params:{
					name:profileName
				}
			});

		const {data}=profile;
		return profile;

	}catch(err){
		return err.message;
	}
}

export async function getInvestorsInIndustryAndArea(investorsSearchCriteria){

	try{
		const {industry,location}=investorsSearchCriteria;
		const industryArray=[];
		industryArray.push(industry);
		const investorProfiles=await axios.get(`${SearchUrl}/getInvestorProfiles`,{
			params:{
				industry:industryArray,
				location:location
			}
		});

		const {data}=investorProfiles;
		const investorResults=data.data;
		return investorResults;

	}catch(err){
		return err.message;
	}
}

export async function getNewestInvestors(investors){

	try{

		const newestInvestors=await axios.get(`${SearchUrl}/getNewestInvestors`,{
			params:{
				investos:investors
			}
		})


		const{data}=newestInvestors;
		const result=data.data;
		return data;

	}catch(err){
	}
}

export async function getActiveInvestors(investors){
	try{
		const activeInvestors=await axios.get(`${SearchUrl}/getActiveInvestors`,{
			params:{
				investos:investors
			}
		})


		const{data}=activeInvestors;
		const result=data.data;
		return data;


	}catch(err){
	}
}


export async function getMostPopular(investors){
	try{
		const mostPopularInvestors=await axios.get(`${SearchUrl}/getMostPopularInvestors`,{
			params:{
				investos:investors
			}
		})

		const{data}=mostPopularInvestors;
		const result=data.data;
		return data;


	}catch(err){
	}
}


export async function getVideosFromUser({userId,requestedFriendsGaugeNodeId,visitorId,postCount,accessToken}){
	try{
		const videos=await axios.get(`${SearchUrl}/getUserVideos`,{
			params:{
				id:userId,
				visitorId,
				postCount,
				requestedFriendsGaugeNodeId,
				visitorId
			},
			headers:{
				authorization:accessToken
			}
		});

		const {data}=videos;
		
		return data;

	}catch(err){
		
	}
}

export async function getBlogFromUser({userId,requestedFriendsGaugeNodeId,visitorId,postCount,accessToken}){
	try{
		const blogsPostsData=await axios.get(`${SearchUrl}/getUserBlogs`,{
			params:{
				id:userId,
				visitorId,
				postCount,
				visitorId,
				requestedFriendsGaugeNodeId
			},
			headers:{
				authorization:accessToken
			}
		})

		const {data}=blogsPostsData;
		return data;

	}catch(err){
		
	}
}


export async function getRegularPostFromUser({userId,requestedFriendsGaugeNodeId,visitorId,postCount,accessToken}){
	try{
		const regularPostsResults=await axios.get(`${SearchUrl}/getUserRegularPosts`,{
			params:{
				id:userId,
				visitorId,
				postCount,
				visitorId,
				requestedFriendsGaugeNodeId
			},
			headers:{
				authorization:accessToken
			}
		});
		

		const {data}=regularPostsResults;
		return data;;

	}catch(err){
		
	}
}

export const getProfileForHomePage=async(id,isGuestProfileIndicator)=>{
	try{
		
		const profileResult=await axios.get(`${SearchUrl}/getProfileForHomePage`,{
			params:{
				_id:id
			},
			headers:{
				isGuestProfile:isGuestProfileIndicator
			}
		});
		const {data}=profileResult;
		return data;

	}catch(err){
		
		return err;
	}
}

export const getRecruitsPostsHomePage=async({id,currentTime,postType,recruits})=>{
	try{
		const recruitPostResponse=await axios.get(`${SearchUrl}/getRecruitsPostsHomePage`,{
			params:{
				id,
				currentTime,
				postType,
				recruits
			}
		});

		const {data}=recruitPostResponse;
		return data;
	}catch(err){
		
		return err;
	}
}

export const getUserImages=async({userId,requestedFriendsGaugeNodeId,visitorId,postCount,accessToken,isGuestProfile})=>{
	try{
		const userImageResponse=await axios.get(`${SearchUrl}/getUserImages`,{
			params:{
				_id:userId,
				visitorId,
				postCount,
				requestedFriendsGaugeNodeId
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});
		const {data}=userImageResponse;
		return data;

	}catch(err){
		
		return err;
	}
}


export const checkIfEmailIsUsed=async(email)=>{
	try{

		const emailResponse=await axios.get(`${SearchUrl}/searchForEmail`,{
			params:{
				email:email
			}
		});
		
		const {data}=emailResponse;
		const emailData=data.data;
		return emailData;
	}catch(err){
		
		return err.message;
	}

}

export const getPersonalProfileGeneralMessages=async(personalId)=>{
	try{
		
		const chatsResponse=await axios.get(`${SearchUrl}/chatMessages`,{
			params:{
				_id:personalId
			}
		});

		const {data}=chatsResponse;
		const chatMessage=data.data;
		return chatMessage;
	}catch(err){
		
		return err.message;
	}
}

export const getPersonalProfileChat=async(personalId,chatId)=>{
	try{

		const chatResponse=await axios.get(`${SearchUrl}/getChat`,{
			params:{
				_id:personalId,
				chatId:chatId
			}
		});

		const {data}=chatResponse;
		const chatData=data.data;
		return chatData;

	}catch(err){
		
		return err.message;
	}
}


export const getProfiles=async()=>{
	try{
		const profilesResponse=await axios.get(`${SearchUrl}/getProfiles`);
		const {data}=profilesResponse;
		const profilesData=data.data;
		return profilesData

	}catch(err){
		
		return err;
	}
}

export const isUserFollwingProfile=async(userId,targetProfileId)=>{
	try{
		const friendIndicator=await axios.get(`${SearchUrl}/isProfileFollowing`,{
			params:{
				userId:userId,
				targetProfile:targetProfileId
			}
		});
		const {data}=friendIndicator;
		const indicatorResonse=data.data;
		return indicatorResonse;

	}catch(err){
		
		return err
	}
}

export const getSymposiumsFollowedPersonal=async(id)=>{
	try{
		const symposiumResponse=await axios.get(`${SearchUrl}/getSymposiumsFollowedPersonal`,{
			params:{
				_id:id
			}
		});

		const {data}=symposiumResponse;
		return data;
	}catch(err){
		
		return err;
	}
}

export const getSymposiumsFollowedHome=async(id)=>{
	try{
		const symposiumResponse=await axios.get(`${SearchUrl}/getFollowedSymposiumsHomePage`,{
			params:{
				_id:id
			}
		});

		const {data}=symposiumResponse;
		return data;
	}catch(err){
		
		return err;
	}
}

export const getSymposiumsNotFollowed=async(_id)=>{
	try{
		const symposiumResponse=await axios.get(`${SearchUrl}/getSymposiumsNotFollowed`,{
			params:{
				_id:_id
			}
		});

		const {data}=symposiumResponse;
		return data;
	}catch(err){
		return err;
	}

}

export const getRecruits=async(profileId)=>{
	try{
		const recruitsResponse=await axios.get(`${SearchUrl}/getRecruits`,{
			params:{
				profileId
			}
		})
		const {data}=recruitsResponse;
		return data;
	}catch(err){ 
		return err;
	}
}

export const getProfilePicture=async(_id)=>{
	try{
		const profilePictureResponse=await axios.get(`${SearchUrl}/getProfilePicture`,{
			params:{
				_id
			}
		})
		const {data}=profilePictureResponse;
		return data;
	}catch(err){
		
		return err;
	}
}

export const firstTimePostInteractedStatus=async(_id)=>{
	try{
		const firstTimePostInteraction=await axios.get(`${SearchUrl}/firstTimePostInteratedIndicator`,{
			params:{
				_id
			}
		})
		const {data}=firstTimePostInteraction;
		return data;
	}catch(err){
		return err;
	}
}


export const getPromotedRecruits=async({id,accessToken})=>{
	try{
		const promotedRecruits=await axios.get(`${SearchUrl}/recruitsPromoted`,{
			params:{
				profileId:id
			},
			headers:{
				authorization:accessToken
			}
		});
		const {data}=promotedRecruits;
		return data;
	}catch(err){
		throw err;
	}
}

export const getNodesSpecificToRecruit=async(profileId,recruitId,accessToken)=>{
	try{
		const nodesSpecificToRoute=await axios.get(`${SearchUrl}/nodeAssignedToRecruit`,{
			params:{
				profileId,
				recruitId
			},
			headers:{
				authorization:accessToken
			}
		})
		const {data}=nodesSpecificToRoute;
		return data;
	}catch(err){
		throw err;
	}
}

export const notificationProfileRetrieval=async(profileId)=>{
	try{
		const notificationProfileResponse=await axios.get(`${SearchUrl}/notificationProfileRetrieval`,{
			params:{
				profileId
			}
		})
		const {data}=notificationProfileResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const recruitsLocatedInNode=async(profileId,levelNodeId,accessToken)=>{
	try{
		const recruitsLocatedInNodeResponse=await axios.get(`${SearchUrl}/recruitsInNode`,{
			params:{
				profileId,
				levelNodeId
			},
			headers:{
				authorization:accessToken
			}
		})
		const {data}=recruitsLocatedInNodeResponse;
		return data;
	}catch(err){
		throw err;
	}
}



export const profilesRequestedAccessToNodeFetch=async(nodeId,accessToken)=>{
	try{
		const profileThatRequestedAccess=await axios.get(`${SearchUrl}/profilesRequestedAccessToNode`,{
			params:{
				nodeId
			},headers:{
				authorization:accessToken
			}
		})

		const {data}=profileThatRequestedAccess;
		return data;
	}catch(err){
		throw err;
	}
}





export const retrieveSymposiumsProfileIsAnOligarch=async(profileId)=>{
	try{
		const retrievedProfileSymposiumsOligarchsListResponse=await axios.get(`${SearchUrl}/profilesOligarchRetrieval`,{
			params:{
				profileId
			}
		})
		const {data}=retrievedProfileSymposiumsOligarchsListResponse;
		return data;
	}catch(err){
		throw err;
	}
}



export const retrieveProfileSpecificSwimmingPosts=async(userId,postType)=>{
	try{
		const swimmingPosts=await axios.get(`${SearchUrl}/getProfileSpecificSwimmingPosts`,{
			params:{
				userId,
				postType
			}
		})
		const {data}=swimmingPosts;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveHighRankingProfileSpecificPosts=async(profileId,postType)=>{
	try{
		const highRankingPostsResponse=await axios.get(`${SearchUrl}/getProfilesHighRankingPosts`,{
			params:{
				profileId,
				postType
			}
		})

		const {data}=highRankingPostsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveProfileTokenInformation=async(profileId)=>{
	try{
		const tokenResponse=await axios.get(`${SearchUrl}/retrieveProfileTokenInformation`,{
			params:{
				profileId
			}
		});
		const {data}=tokenResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveUnlockedUserTokenBreakDown=async(profileId)=>{
	try{
		const unlockedUsersTokenBreakDown=await axios.get(`${SearchUrl}/retrieveUnlockedUserTokenBreakDown`,{
			params:{
				profileId
			}
		});
		const {data}=unlockedUsersTokenBreakDown;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveProfilesInTokenTier=async(tokenTier)=>{
	try{
		const profilesInTokenResponse=await axios.get(`${SearchUrl}/retrieveProfilesInTokenTier`,{
			params:{
				tokenTier
			}
		})

		const {data}=profilesInTokenResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveFriendsGaugeNodePaymentVerification=async(profileId)=>{
	try{
		const nodePaymentVerificationResponse=await axios.get(`${SearchUrl}/retrieveFriendsGaugeNodePaymentVerification`,{
			params:{
				profileId
			}
		})

		const {data}=nodePaymentVerificationResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveSympociaFriendsGaugeNodeAvatars=async()=>{
	try{
		const sympociaFriendGaugeAvatarsResponse=await axios.get(`${SearchUrl}/retrieveSympociaFriendsGaugeNodeAvatars`);
		const {data}=sympociaFriendGaugeAvatarsResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveFriendsGaugeMaxLimitPaymentVerification=async(profileId,accessToken)=>{
	try{
		const maxLimitFriendGaugePaymentVerificationResponse=await axios.get(`${SearchUrl}/retrieveFriendsGaugeMaxLimitPaymentVerification`,{
			params:{
				profileId
			},
			headers:{
				authorization:accessToken
			}
		})
		const {data}=maxLimitFriendGaugePaymentVerificationResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getProfileAscensionStatus=async(profileId)=>{
	try{
		const ascensionStatusResponse=await axios.get(`${SearchUrl}/getProfileAscensionStatus`,{
			params:{
				profileId
			}
		});
		const {data}=ascensionStatusResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const adPageVerification=async(profileId,accessToken)=>{
	try{
		const adPageVerificationResponse=await axios.get(`${SearchUrl}/adPageVerification`,{
			params:{
				profileId
			},
			headers:{
				authorization:accessToken
			}
		});
		const {data}=adPageVerificationResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const retrieveBadgePostStatus=async(profileId,postId)=>{
	try{
		const badgePostStatusResponse=await axios.get(`${SearchUrl}/retrieveBadgePostStatus`,{
			params:{
				profileId,
				postId
			}
		});
		const {data}=badgePostStatusResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveBadgeInformation=async(profileId)=>{
	try{
		const badgeInformationResponse=await axios.get(`${SearchUrl}/retrieveBadgeInformation`,{
			params:{
				profileId
			}
		});
		const {data}=badgeInformationResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveAirPlaneEnabledStatus=async(profileId)=>{
	try{
		const airPlanesEnabledStatus=await axios.get(`${SearchUrl}/retrieveAirPlaneEnabledStatus`,{
			params:{
				profileId
			}
		});
		const {data}=airPlanesEnabledStatus;
		return data;
	}catch(err){
		throw err;
	}
}






