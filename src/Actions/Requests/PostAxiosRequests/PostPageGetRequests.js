import axios from "axios";

const SearchUrl='http://localhost:4000/api/posts/search';

export const getImagesPosts=async(industry,postCounter)=>{
	try{
		const imageResponse=await axios.get(`${SearchUrl}/getImagesInIndustry`,{
			params:{
				industry:industry,
				postCount:postCounter
			}
		})
		const {data}=imageResponse;
		const imageData=data.data;
		return imageData;

	}catch(err){
		console.log(err);
		return err;
	}
}


export const getVideosPosts=async(industry,postCounter)=>{
	try{
		const videoResponse=await axios.get(`${SearchUrl}/getVideosInIndustry`,{
			params:{
				industry:industry,
				postCount:postCounter
			}
		})
		const {data}=videoResponse;
		const videoData=data.data;
		return videoData;
	}catch(err){
		console.log(err);
		return err;
	}
}


export const getBlogPosts=async(industry,postCounter)=>{
	try{
		const blogResponse=await axios.get(`${SearchUrl}/getBlogsInIndustry`,{
			params:{
				industry:industry,
				postCount:postCounter
			}
		})
		const {data}=blogResponse;
		const blogData=data.data;
		return blogData;

	}catch(err){
		console.log(err);
		return err;
	}
}