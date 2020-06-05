import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const baseurl=BASE_URL.BASE_URL;
const SearchUrl='http://localhost:4000/api/profile/search';

export function getActivityLog(userId){
	//userId:number

	axios.get(`${baseurl}/ActivityLog`,{

		param:{

			userid:userId
		}
	}).then(res=>{

		console.log(res.data);


	}).catch(err=>{

		console.log(err.message);
	})
}


export async function getProfile(userId){

	try{
		console.log("Connected with profile route");
		const profile=await axios.get(`${SearchUrl}/getProfile`,{
			params:{
				id:userId
			}
		});
		const {data}=profile;
		const profileData=data.data;
		return profileData;
	}catch(err){
		console.log(err.message);
	}
}

export function getVideos(profileId){

	axios.get(`${SearchUrl}/getVideos`,{
		_id:profileId
	}).then(videos=>{
		return videos;
	}).catch(err=>{
		console.log(err.message);
	})
} 

export function getImages(profileId){

	axios.get(`${SearchUrl}/getImages`,{
		_id:profileId
	}).then(images=>{
		return images;
	}).catch(err=>{
		console.log(err.message);
	})
}

export function getBlogs(profileId){


	axios.get(`${SearchUrl}/getBlogs`,{
			_id:profileId
		}).then(blogs=>{
			return blogs;
		}).catch(err=>{
			console.log(err.message);
		})
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
		console.log(err.message);
		return err.message;
	}
}

export async function getInvestorsInIndustryAndArea(investorsSearchCriteria){

	try{
		console.log("Test api calls");
		const {industry,location}=investorsSearchCriteria;
		console.log(investorsSearchCriteria);
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
		console.log(err.message);
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
		console.log(err.message);
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
		console.log(err.message);
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
		console.log(err.message);
	}
}

export async function getVideosFromUser(userId){
	try{
		console.log("Video Route for requests");
		const videos=await axios.get(`${SearchUrl}/getUserVideos`,{
			params:{
				id:userId
			}
		});

		const {data}=videos;
		const {headerVideo,videoPosts}=data.data;
		const videoObject={
							headerVideo:headerVideo,
							videos:videoPosts
						  };
		return videoObject;

	}catch(err){
		console.log(err);
	}
}
export async function getBlogFromUser(userId){
	try{
		const blogsPostsData=await axios.get(`${SearchUrl}/getUserBlogs`,{
			params:{
				id:userId
			}
		})

		const {data}=blogsPostsData;
		const {headerBlog,blogPosts}=data.data;
		const blogObject={
							headerBlog:headerBlog,
							blogs:blogPosts
						  };
		return blogObject;

	}catch(err){
		console.log(err);
	}
}


export async function getRegularPostFromUser(userId){
	try{
		console.log("Testing regular posts api call");
		const regularPostsResults=await axios.get(`${SearchUrl}/getUserRegularPosts`,{
			params:{
				id:userId
			}
		})
		debugger;

		const {data}=regularPostsResults;
		const {regularPosts}=data.data;
		return regularPosts;

	}catch(err){
		console.log(err);
	}
}

export const getProfileForHomePage=async(id)=>{
	try{
		debugger;
		const profileResult=await axios.get(`${SearchUrl}/getProfileForHomePage`,{
			params:{
				_id:id
			}
		});
		const {data}=profileResult;
		const profileData=data.data;
		return profileData;

	}catch(err){
		console.log(err);
		return err;
	}
}


export const getRecruitsPostsHomePage=async(id,currentTime)=>{
	try{
		const {data}=await axios.get(`${SearchUrl}/getRecruitsPostsHomePage`,{
			params:{
				id:id,
				currentTime:currentTime
			}
		});

		const recruitPostResponse=data.data;
		return recruitPostResponse;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const getUserImages=async(userId)=>{
	try{
		console.log("User imaegs");
		const userImageResponse=await axios.get(`${SearchUrl}/getUserImages`,{
			params:{
				_id:userId
			}
		});
		console.log(userImageResponse);
		const {data}=userImageResponse;
		const userImageData=data.data;
		return userImageData;

	}catch(err){
		console.log(err);
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
		debugger;
		const {data}=emailResponse;
		const emailData=data.data;
		return emailData;
	}catch(err){
		console.log(err);
		return err.message;
	}

}

export const loginProfile=async(email,password)=>{
	try{

		const loginResponse=await axios.get(`${SearchUrl}/loginProfile`,{
									params:{
										email:email,
										password:password
									}
								});

		const {data}=loginResponse;
		const loginData=data.data;
		return loginData;
	}catch(err){
		console.log(err);
		return err;
	}

}


export const getRecruitsInformation=async(userId)=>{
	try{
		const recruitsInformationResponse=await axios.get(`${SearchUrl}/getRecruitsInformation`,{
			params:{
				_id:userId
			}
		});

		const {data}=recruitsInformationResponse;
		const recruitsData=data.data;
		return recruitsData;
	}catch(err){
		console.log(err);
	}
}

export const getPersonalProfileGeneralMessages=async(personalId)=>{
	try{
		debugger;
		const chatsResponse=await axios.get(`${SearchUrl}/chatMessages`,{
			params:{
				_id:personalId
			}
		});

		const {data}=chatsResponse;
		const {chatMessage}=data.data;
		return chatMessage;
	}catch(err){
		console.log(err);
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
		console.log(err);
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
		console.log(err);
		return err;
	}
}








