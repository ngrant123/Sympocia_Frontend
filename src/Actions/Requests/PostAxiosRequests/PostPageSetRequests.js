import axios from "axios";

const CreateURl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_POST_SET_URL:
				process.env.REACT_APP_TEST_POST_SET_URL;

export const createRegularPost=async(userId,searchCriteria,profileIndicator,accessToken)=>{
	
	try{
		
			const regularPostCreationVerification=await axios.post(`${CreateURl}/createRegularPost`,{
														id:userId,
														searchCriteria:searchCriteria,
														profileIndicator:profileIndicator
												},{
													headers:{
														authorization:accessToken
													}
												});

			const results=regularPostCreationVerification.data;
			return results; 
	}catch(err){
		
		return err;
	}
}

export const createImagePost=async(_id,searchCriteria,profileIndicator,accessToken)=>{
	try{
		
		
		const imagePost=await axios.post(`${CreateURl}/createImagePost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		},{
			headers:{
				authorization:accessToken
			}
		})

		const {data}=imagePost;
		return data;

	}catch(err){
		return err.message;
	}
}

export const createVideoPost=async(_id,searchCriteria,profileIndicator,accessToken)=>{
	try{
		
		
		const {data}=await axios.post(`${CreateURl}/createVideoPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		},{
				headers:{
					authorization:accessToken
				}
			});
		
		return data;
	}catch(err){
		return err.message;
	}
}


export const createBlogPost=async(_id,searchCriteria,profileIndicator,accessToken)=>{
	try{
		const blogPost=await axios.post(`${CreateURl}/createBlogPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		},{
				headers:{
					authorization:accessToken
				}
			})

		const {data}=blogPost;
		return data;

	}catch(err){
		return err.message;
	}
}


export const addStampPost =async(postId,profileType,postType,userId,accessToken)=>{
	try{
		const postStampResponse= await axios.post(`${CreateURl}/addStamp`,{
			postId:postId,
			profileType:profileType,
			postType:postType,
			userId
		},{
			headers:{
				authorization:accessToken
			}
		});

		const {data}=postStampResponse;
		return data;
	}catch(err){
		return err.message;
	}

}

export const unStampPost=async(postId,profileType,postType,userId,accessToken)=>{
	try{
		const unStampPostResponse=await axios.post(`${CreateURl}/unStamp`,{
			postId:postId,
			profileType:profileType,
			postType:postType,
			userId
		},{
				headers:{
					authorization:accessToken
				}
			}) ;

		const {data}=unStampPostResponse;
		return data;
	}catch(err){
		
	}
}

export const addCommentToPopularQuestions=async(commentObject,accessToken)=>{
	try{
		const {
			userId,
			profileIndicator,
			questionId={},
			questionType,
			comment,
			industry
		}=commentObject;

		
		const commentResponse=await axios.post(`${CreateURl}/addCommentToPopularPost`,{
			userId:userId,
			profileIndicator:profileIndicator,
			questionId:questionId,
			questionType:questionType,
			comment:comment,
			industry:industry
		},{
				headers:{
					authorization:accessToken
				}
			});
		const {data}=commentResponse;
		return data;
	}catch(err){
		
		return err;
	}
}



export const updateCrownedImage=async(_id,updatedStatus,imageId,accessToken)=>{
	try{
		
		const updatedImage=await axios.post(`${CreateURl}/updateCrownedImage`,{
			_id:_id,
			updateStatus:updatedStatus,
			imageId:imageId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {confirmation}=updatedImage;
		return confirmation;
		
	}catch(err){
		return err;
	}
}

export const markPostAsAuthentic=async({_id,firstName,postOption,postId,comment,isOwnPost,accessToken})=>{
	try{
		
		const approvePostResponse=await axios.post(`${CreateURl}/markPostAsAuthentic`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment,
			isOwnPost
		},{
				headers:{
					authorization:accessToken
				}
			});
		const {data}=approvePostResponse;
		return data;
		
	}catch(err){
		
		return err;
	}
}

export const markPostAsFakeNews=async({_id,firstName,postOption,postId,comment,isOwnPost,accessToken})=>{
	try{
		
		const fakeNewsPostResponse=await axios.post(`${CreateURl}/markPostAsFakeNews`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment,
			isOwnPost
		},{
				headers:{
					authorization:accessToken
				}
			});
		const {data}=fakeNewsPostResponse;
		return data;

	}catch(err){
		
		return err;
	}
}

export const createComment=async(userId,postType,postId,comment,profileObject,accessToken)=>{
	try{
		
		const commentResponse=await axios.post(`${CreateURl}/createComment`,{
			userId,
			postType:postType,
			postId:postId,
			comment:comment,
			profileObject:profileObject
		},{
				headers:{
					authorization:accessToken
				}
			})
		const {data}=commentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const createReply=async({postType,postId,commentId,reply,profileObject,commentIndex,accessToken})=>{	
	try{	
		const commentResponse=await axios.post(`${CreateURl}/createReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject,
			commentIndex
		},{
				headers:{
					authorization:accessToken
				}
			})
		const {data}=commentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const createVideoResponse=async({postType,commentId,videoSrc,currentProfile,postId,accessToken})=>{
	try{
		
		const videoResponse=await axios.post(`${CreateURl}/createVideoResponse`,{
			postType:postType,
			videoSrc:videoSrc,
			currentProfile:currentProfile,
			postId:postId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {data}=videoResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const createVideoCommentReply=async({postType,postId,commentId,reply,profileObject,commentIndex,userId,accessToken})=>{
	try{
		const videoCommentResponse=await axios.post(`${CreateURl}/createVideoReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject,
			commentIndex,
			userId
		},{
				headers:{
					authorization:accessToken
				}
			})
		const {data}=videoCommentResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const updateCrownedVideo=async(_id,updatedStatus,videoId,accessToken)=>{
	try{
		
		const updatedVideo=await axios.post(`${CreateURl}/updateCrownedVideo`,{
			_id:_id,
			updateStatus:updatedStatus,
			videoId:videoId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {confirmation}=updatedVideo;
		return confirmation;
		
	}catch(err){
		return err;
	}
}


export const updateCrownedBlog=async(_id,updatedStatus,blogId,accessToken)=>{
	try{
		
		const updatedBlog=await axios.post(`${CreateURl}/updateCrownedBlog`,{
			_id:_id,
			updateStatus:updatedStatus,
			blogId:blogId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {confirmation}=updatedBlog;
		return confirmation;
		
	}catch(err){
		return err;
	}
}


export const updateCrownedRegularPost=async(_id,updatedStatus,regularPostId,accessToken)=>{
	try{
		
		const updatedRegularPost=await axios.post(`${CreateURl}/updateCrownedRegularPost`,{
			_id:_id,
			updateStatus:updatedStatus,
			regularPostId:regularPostId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {confirmation}=updatedRegularPost;
		return confirmation;
		
	}catch(err){
		return err;
	}
}

export const editPost=async({postType,postId,post,postS3,ownerId,accessToken})=>{
	try{
		const editedPostResponse=await axios.post(`${CreateURl}/editPost`,{
			postType,
			postId,
			post,
			postS3,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=editedPostResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const promotePost=async({postId,nodeId,postType,accessToken,userId})=>{
	try{
		const promotionResponse=await axios.post(`${CreateURl}/promotePost`,{
			postId,
			nodeId,
			postType,
			userId
		},{
			headers:{
				authorization:accessToken
			}
		});
		const {data}=promotionResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}

}

export const deletePost=async({postId,postType,industriesUploaded,profileId,accessToken,userId,isCrownedPost})=>{
	try{
		
		const deleteResponse=await axios.post(`${CreateURl}/deletePost`,{
			postId,
			postType,
			industriesUploaded,
			profileId,
			isCrownedPost,
			userId
		},{
				headers:{
					authorization:accessToken
				}
			});
		const {data}=deleteResponse;
		return data;

	}catch(err){
		
		return err;
	}
}


export const createIndustryFeatureImageResponse=async({image,industryId,questionId,questionIndex,question,userId,accessToken})=>{
	try{
		
		const imageFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureImageResponse`,{
			image,
			industryId,
			questionId,
			question,
			userId,
			questionIndex
		},{
			headers:{
				authorization:accessToken
			}
		});

		const {data}=imageFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}

export const createSpecificIndustryRegularPostAnswer=async(regularPostAnswer)=>{
	try{
		
		const {
			post,
			industryId,
			question,
			postLevel,
			userId,
			questionId,
			accessToken
		}=regularPostAnswer;

		const regularPostFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureRegularPostResponse`,{
			post,
			industryId,
			question,
			postLevel,
			userId,
			questionId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {data}=regularPostFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}

export const createSpecificIndustryVideoAnswer=async({video,industryId,questionId,question,userId,accessToken})=>{
	try{
		
		const videoFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureVideoResponse`,{
			video,
			industryId,
			question,
			userId,
			questionId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {data}=videoFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}

export const createSpecificIndustryAudioAnswer=async({audio,industryId,questionId,question,userId,accessToken})=>{
	try{
		
		const audioFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureAudioResponse`,{
			audio,
			industryId,
			question,
			userId,
			questionId
		},{
				headers:{
					authorization:accessToken
				}
			});

		const {data}=audioFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}


















