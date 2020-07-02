import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const baseurl=""+BASE_URL.BASE_URL;
const GetUrl="http://localhost:4000/api/posts/search";

export function getNewFeedUpdates(userId){
	//userId:number

	console.log(BASE_URL.BASE_URL);


	axios.get(`${baseurl}/Posts`,{

		params:{
			userId
			} 
		}).
		then(response=>{

			console.log(response.data);
		}).
		catch(err=>{
			console.log(err.message);
		})

}

export function getNotificationsUpdate(userId){
	//userId:number

	axios.get(`${baseurl}/Notifications`, { 

		params: { 
			id:userId 
			}
		}).
		then(response=>{

			console.log(response.data);
		}).
		catch(err=>{

			console.log(err.message);
		})
}


export function getPosts(industryid){
	//industryId:number


	axios.get(`${baseurl}/getPosts`, {
		params:{ 
				industryid: industryid 
			}
		}).
		then(response=>{
			console.log(response.data);
		}).
		catch(err=>{
			console.log("An Error has occured");
		})
}

export function getUserCompanyInformation(userId){

	axios.get(`${baseurl}/getUserCompanyInfo`,{
		params:{
			userid:userId
		}
	}).then(res=>{

		console.log(res.data);
	}).catch(err=>{
		console.log(err.message);
	})
}

export function getUserDataInfo(userId){


	axios.get(`${baseurl}/getUserData`,{
		params:{
			userid:userId
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);
	})
}


export function getCommunitiesNotFollowed(userId){

	axios.get(`${GetUrl}/getCommunitiesNotFollowed`,{
		_id:userId
	}).then(posts=>{
		return posts;
	}).catch(err=>{

		console.log(err.message);
	})
}

export function getCommunityById(communityId){

	axios.get(`${GetUrl}/getCommunityById`,{
		_id:communityId
	}).then(communityData=>{

		return communityData;
	}).catch(err=>{
		console.log(err.message);
	})
}


export async function getPostsForHomePage(userId,industrySelected,postTypes){
	try{
		debugger;
		console.log(industrySelected);
		console.log(JSON.stringify(industrySelected));
		const postResponse=await axios.get(`${GetUrl}/getPostsForHomePage`,{
			params:{
				id:userId,
				industry:JSON.stringify(industrySelected),
				postTypes:postTypes
			}
		});
		console.log(postResponse);
		const {data}=postResponse;
		const posts=data.data;
		return posts;

	}catch(err){
		console.log(err);
		const {data}=err;
		return data;
	}
}

export const getSymposiumId=async(name)=>{
	try{
		const symposiumResponse=await axios.get(`${GetUrl}/getSymposiumId`,{
			params:{
				industryName:name
			}
		});
		const {data}=symposiumResponse;
		const symposiumIdData=data.data;
		return data;

	}catch(err){
		console.log(err);
		return err;
	}

}

export const exploreImagePosts=async(id,postCount)=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getExploreImagePosts`,{
			params:{
				_id:id,
				postCount:postCount
			}
		});

		const {data}=imageResults;
		const imageData=data.data;
		return imageData;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const exploreVideoPosts=async(id,postCount)=>{
	try{
		debugger;
		const videoResults=await axios.get(`${GetUrl}/getExploreVideoPosts`,{
			params:{
				_id:id,
				postCount:postCount
			}
		});

		const {data}=videoResults;
		const videoData=data.data;
		return videoData;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const exploreBlogPosts=async(id,postCount)=>{
	try{
		const blogResults=await axios.get(`${GetUrl}/getExploreBlogsPosts`,{
			params:{
				_id:id,
				postCount:postCount
			}
		});

		const {data}=blogResults;
		const blogData=data.data;
		return blogData;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const getImagesInIndustry=async(industry,postCount)=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getImagesInIndustry`,{
			params:{
				industry:industry,
				postCount:postCount
			}
		});

		const {data}=imageResults;
		const imageData=data.data;
		return imageData;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const getVideoInIndustry=async(industry,postCount)=>{
	try{
		const videoResults=await axios.get(`${GetUrl}/getVideosInIndustry`,{
			params:{
				industry:industry,
				postCount:postCount
			}
		});

		const {data}=videoResults;
		const videoData=data.data;
		return videoData;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const getBlogsInIndustry=async(industry,postCount)=>{
	try{
		const blogResults=await axios.get(`${GetUrl}/getBlogsInIndustry`,{
			params:{
				industry:industry,
				postCount:postCount
			}
		});

		const {data}=blogResults;
		const blogData=data.data;
		return blogData;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const getRegularPostsInIndustry=async(industry,postCount)=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getRegularPostInIndustry`,{
			params:{
				industry:industry,
				postCount:postCount
			}
		});

		const {data}=imageResults;
		const imageData=data.data;
		return imageData;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const getIndustryInformation=async(industry,postCount,userId)=>{
	try{
		const industryInformation=await axios.get(`${GetUrl}/getIndustryInformation`,{
			params:{
				industry:industry,
				postCount:postCount,
				userId:userId
			}
		})

		const {data}=industryInformation;
		const industryInformationData=data.data;
		return industryInformationData;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const getPopularQuestionReplies=async(industry,counter)=>{
	try{
		const popularQuestionResponse=await axios.get(`${GetUrl}/getPopularQuestion`,{
			params:{
				industry:industry,
				counter:counter
			}
		})

		const {data}=popularQuestionResponse;
		const popularQuestionsData=data.data;
		return popularQuestionsData;

	}catch(err){
		console.log(err);
		return err;
	}
}





