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

export const getFakeNewsComments=async(postId,postOption)=>{
	try{
		const postComments=await axios.get(`${SearchUrl}/getFakeNewsComments`,{
			params:{
				postId:postId,
				postOption:postOption
			}
		});

		const {data}=postComments;
		return data.data;

	}catch(err){
		console.log(err);
		return err;
	}
}


export const getAuthenticPostComments=async(postId,postOption)=>{
	try{
		const postComments=await axios.get(`${SearchUrl}/getAuthenticPostComments`,{
			params:{
				postId:postId,
				postOption:postOption
			}
		});

		const {data}=postComments;
		return data.data;

	}catch(err){https://www.youtube.com/watch?v=hmk1aHU0768
		console.log(err);
		return err;
	}
}

export const getRegularComments=async(postType,postId)=>{
	try{
		console.log(postType);
		const commentsResponse=await axios.get(`${SearchUrl}/getComments`,{
			params:{
				postId:postId,
				postType:postType
			}
		});
		const {data}=commentsResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getVideoComments=async(postType,postId)=>{
	try{
		const videoCommentsResponse=await axios.get(`${SearchUrl}/getVideoComments`,{
			params:{
				postId:postId,
				postType:postType
			}
		});
		const {data}=videoCommentsResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getVideoCommentsReplies=async(postId,positionIndicator,postType)=>{
	try{
		debugger;
		const videoCommentReplies=await axios.get(`${SearchUrl}/videoCommentReplies`,{
			params:{
				postId:postId,
				positionIndicator:positionIndicator,
				postType:postType
			}
		});

		const {data}=videoCommentReplies;
		return data;
	}catch(err){
		return err;
	}
}
export const getRepliesFromComment=async({postType,postId,commentIndex})=>{
	try{
		const replyResponse=await axios.get(`${SearchUrl}/getReplies`,{
			params:{
				postType:postType,
				postId:postId,
				commentIndex:commentIndex
			}
		});
		const {data}=replyResponse;
		console.log(data);
		return data;
	}catch(err){
		return err;
	}
}








