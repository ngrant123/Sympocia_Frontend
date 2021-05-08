import axios from "axios";

const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_POST_GET_URL:
				process.env.REACT_APP_TEST_POST_GET_URL;



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
		return err;
	}
}

export const getRegularComments=async(postType,postId)=>{
	try{

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
		return data;
	}catch(err){
		return err;
	}
}




export const getCommentByID=async({postType,commentId,postId})=>{
	try{
		const commentResponse=await axios.get(`${SearchUrl}/getCommentByID`,{
			params:{
				postType,
				commentId,
				postId
			}
		})
		const {data}=commentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getVideoCommentById=async({postType,commentId,postId})=>{
	try{
		const videoCommentResponse=await axios.get(`${SearchUrl}/getVideoCommentById`,{
			params:{
				postType,
				commentId,
				postId
			}
		})
		const {data}=videoCommentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getAuthenticPostById=async({postType,commentId,postId})=>{
	try{
		const authenticPostResponse=await axios.get(`${SearchUrl}/getAuthenticPostById`,{
			params:{
				postType,
				commentId,
				postId
			}
		})
		const {data}=authenticPostResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getVideoCommentReplyById=async({postId,postType,replyId,commentID})=>{
	try{
		const videoCommentReplyResponse=await axios.get(`${SearchUrl}/getVideoCommentReplyById`,{
			params:{
				postId,
				postType,
				replyId,
				commentID
			}
		})
		const {data}=videoCommentReplyResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getRegularCommentReplyById=async({postId,postType,replyId,commentID})=>{
	try{
		const regularPostResponse=await axios.get(`${SearchUrl}/getRegularCommentReplyById`,{
			params:{
				postId,
				postType,
				replyId,
				commentID
			}
		})
		const {data}=regularPostResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getPostById=async({postId,userId,postType})=>{
	try{
		const postResponse=await axios.get(`${SearchUrl}/getPostById`,{
			params:{
				postId,
				userId,
				postType
			}
		})
		const {data}=postResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getVideoUrl=async(retrievalId)=>{
	try{
		const videoUrlResponse=await axios.get(`${SearchUrl}/videoUrl`,{
			params:{
				videoTokenId:retrievalId
			}
		})

		const {data}=videoUrlResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getImgUrl=async(retrievalId)=>{
	try{
		const imgUrlResponse=await axios.get(`${SearchUrl}/imgUrl`,{
			params:{
				imageId:retrievalId
			}
		})

		const {data}=imgUrlResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getSpecificBeacon=async({beaconId,postType})=>{
	try{
		const beaconResponse=await axios.get(`${SearchUrl}/beacon`,{
			params:{
				beaconId,
				postType
			}
		})

		const {data}=beaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getPostCreationUpdateStatuses=async(profileId)=>{
	try{
		const postCreationUpdateStatusResponse=await axios.get(`${SearchUrl}/postCreationUpdateStatuses`,{
			params:{
				profileId
			}
		})
		const {data}=postCreationUpdateStatusResponse;
		return data;
	}catch(err){
		throw err;
	}
}

















