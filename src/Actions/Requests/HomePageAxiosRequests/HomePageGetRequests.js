import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const GetUrl=process.env.NODE_ENV=='production'?
			process.env.REACT_APP_HOME_GET_URL:
			process.env.REACT_APP_TEST_HOME_GET_URL;


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
		return err;
	}
}

export const exploreImagePosts=async({id,postCount,accessToken,isGuestProfile})=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getExploreImagePosts`,{
			params:{
				_id:id,
				postCount:postCount
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}

export const exploreVideoPosts=async({id,postCount,accessToken,isGuestProfile})=>{
	try{
		
		const videoResults=await axios.get(`${GetUrl}/getExploreVideoPosts`,{
			params:{
				_id:id,
				postCount:postCount
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});

		const {data}=videoResults;
		return data;

	}catch(err){
		return err;
	}
}

export const exploreBlogPosts=async({id,postCount,accessToken,isGuestProfile})=>{
	try{
		const blogResults=await axios.get(`${GetUrl}/getExploreBlogsPosts`,{
			params:{
				_id:id,
				postCount:postCount
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});

		const {data}=blogResults;
		return data;
	}catch(err){
		return err;
	}
}

export const exploreRegularPosts=async({id,postCount,accessToken,isGuestProfile})=>{
	try{
		const regularPostResults=await axios.get(`${GetUrl}/getExploreRegularPosts`,{
			params:{
				_id:id,
				postCount:postCount
			},
			headers:{
				authorization:accessToken,
				isGuestProfile 
			}
		});

		const {data}=regularPostResults;
		return data; 
	}catch(err){
		return err;
	}
}

export const getImagesInIndustry=async({industry,postCount,userId})=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getImagesInIndustry`,{
			params:{
				industry,
				postCount,
				userId
			}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}

export const getVideoInIndustry=async({industry,postCount,userId})=>{
	try{
		const videoResults=await axios.get(`${GetUrl}/getVideosInIndustry`,{
			params:{
				industry,
				postCount,
				userId
			}
		});

		const {data}=videoResults;
		return data;

	}catch(err){
		return err;
	}
}

export const getBlogsInIndustry=async({industry,postCount,userId})=>{
	try{
		const blogResults=await axios.get(`${GetUrl}/getBlogsInIndustry`,{
			params:{
				industry,
				postCount,
				userId
			}
		});

		const {data}=blogResults;
		return data;
	}catch(err){
		return err;
	}
}

export const getRegularPostsInIndustry=async({industry,postCount,userId})=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getRegularPostInIndustry`,{
			params:{
				industry,
				postCount,
				userId
			}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}



export const getGroupVideoCallOwner=async({symposiumId,groupCallId})=>{
	try{
		const groupVideoCallResponse=await axios.get(`${GetUrl}/getGroupVideoCall`,{
			params:{
				symposiumId:symposiumId,
				groupCallId:groupCallId
			}
		});
		const {data}=groupVideoCallResponse;
		return data;
	}catch(err){
		return err;
	}
}




