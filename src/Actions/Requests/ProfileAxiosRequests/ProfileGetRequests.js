import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const baseurl=BASE_URL.BASE_URL;
const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_PROFILE_GET_URL:
				process.env.REACT_APP_TEST_PROFILE_GET_URL;

export function getActivityLog(userId){
	//userId:number

	axios.get(`${baseurl}/ActivityLog`,{

		param:{
			userid:userId
		}
	}).then(res=>{
	}).catch(err=>{
	})
}


export async function getProfile({userId,visitorId,accessToken}){

	try{
		const profile=await axios.get(`${SearchUrl}/getProfile`,{
			params:{
				id:userId,
				visitorId
			},
			headers:{
				authorization:accessToken
			}
		}); 
		debugger;
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

export async function getVideosFromUser({userId,visitorId,accessToken}){
	try{
		const videos=await axios.get(`${SearchUrl}/getUserVideos`,{
			params:{
				id:userId,
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
export async function getBlogFromUser({userId,visitorId,accessToken}){
	try{
		const blogsPostsData=await axios.get(`${SearchUrl}/getUserBlogs`,{
			params:{
				id:userId,
				visitorId
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


export async function getRegularPostFromUser({userId,visitorId,accessToken}){
	try{
		const regularPostsResults=await axios.get(`${SearchUrl}/getUserRegularPosts`,{
			params:{
				id:userId,
				visitorId
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

export const getProfileForHomePage=async(id)=>{
	try{
		
		const profileResult=await axios.get(`${SearchUrl}/getProfileForHomePage`,{
			params:{
				_id:id
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

export const getUserImages=async(userId)=>{
	try{
		const userImageResponse=await axios.get(`${SearchUrl}/getUserImages`,{
			params:{
				_id:userId
			}
		});
		const {data}=userImageResponse;
		const userImageData=data.data;
		return userImageData;

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
		const symposiumData=data.data;
		return symposiumData;
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
		const symposiumData=data.data;
		return symposiumData;
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




