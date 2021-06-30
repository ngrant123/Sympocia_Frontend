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

export const addCommentToPopularQuestions=async(commentObject,accessToken,isMobile)=>{
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
			industry:industry,
			isMobile
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

export const markPostAsAuthentic=async({_id,firstName,postOption,postId,comment,isOwnPost,accessToken,ownerId})=>{
	try{
		
		const approvePostResponse=await axios.post(`${CreateURl}/markPostAsAuthentic`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment,
			isOwnPost,
			ownerId
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

export const createComment=async(
							userId,
							postType,
							postId,
							comment,
							profileObject,
							accessToken,
							ownerId,
							commentPoolId
							)=>{
	try{
		const commentResponse=await axios.post(`${CreateURl}/createComment`,{
			userId,
			postType:postType,
			postId:postId,
			comment:comment,
			profileObject:profileObject,
			ownerId,
			commentPoolId
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

export const deleteCommentOrReply=async(commentId,userId,accessToken)=>{
	try{
		debugger;
		const deletedCommentResponse=await axios.post(`${CreateURl}/deleteCommentOrReply`,{
			commentId,
			userId
		},{
			headers:{
				authorization:accessToken
			}
		})

		const {data}=deletedCommentResponse;
		return data;
	}catch(err){
		throw err;
	}
}




export const createReply=async({postType,postId,commentId,reply,profileObject,accessToken,ownerId})=>{	
	try{	
		const commentResponse=await axios.post(`${CreateURl}/createReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject,
			ownerId
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


export const createVideoResponse=async({
									postType,
									commentId,
									videoSrc,
									currentProfile,
									postId,
									accessToken,
									commentPoolId,
									ownerId,
									isMobile
								})=>{
	try{
		const videoResponse=await axios.post(`${CreateURl}/createVideoResponse`,{
			postType:postType,
			videoSrc:videoSrc,
			currentProfile:currentProfile,
			postId:postId,
			commentPoolId,
			ownerId,
			isMobile
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

export const createVideoCommentReply=async({
									postType,
									postId,
									commentId,
									reply,
									profileObject,
									userId,
									commentOwnerId,
									accessToken})=>{
	try{

		const videoCommentResponse=await axios.post(`${CreateURl}/createVideoReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject,
			commentOwnerId,
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

export const deleteVideoCommentOrReply=async(videoCommentId,userId,accessToken)=>{
	try{
		const deletedVideoCommentResponse=await axios.post(`${CreateURl}/deleteVideoResponseOrReply`,{
			videoCommentId,
			userId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deletedVideoCommentResponse;
		return data;
	}catch(err){
		throw err;
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

export const editPost=async({
					postType,postId,post,
					postS3,ownerId,accessToken,
					isPhoneUIEnabled})=>{
	try{
		const editedPostResponse=await axios.post(`${CreateURl}/editPost`,{
			postType,
			postId,
			post,
			postS3,
			ownerId,
			isPhoneUIEnabled
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

export const createSpecificIndustryVideoAnswer=async({
									video,industryId,questionId,
									question,userId,accessToken,isMobile})=>{
	try{
		
		const videoFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureVideoResponse`,{
			video,
			industryId,
			question,
			userId,
			questionId,
			isMobile
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


export const createBeacon=async({
				postUrl,
				beaconDescription,
				postType,
				ownerId,
				isMobile,
				symposiumId
			})=>{
	try{
		const createBeaconResponse=await axios.post(`${CreateURl}/createBeacon`,{
			postUrl,
			beaconDescription,
			postType,
			ownerId,
			symposiumId,
			isMobile
		})
		const {data}=createBeaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const createBeaconReply=async({
				postUrl,
				beaconDescription,
				postType,
				ownerId,
				symposiumId,
				beaconId,
				isMobile,
				originalBeaconOwnerId,
				originalBeaconPostId
			})=>{
	try{
		const createBeaconReplyResponse=await axios.post(`${CreateURl}/createBeaconReply`,{
			beaconId,
			postUrl,
			beaconDescription,
			postType,
			ownerId,
			isMobile,
			symposiumId,
			originalBeaconOwnerId,
			originalBeaconPostId
		})
		const {data}=createBeaconReplyResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const createCommentPool=async({
	        userId,
            postId,
            postType,
            commentType,
            commentPoolDescription,
            accessToken
		})=>{
	try{
		const createdCommentPoolResponse=await axios.post(`${CreateURl}/createCommentPool`,{
			userId,
            postId,
            postType,
            commentType,
            commentPoolDescription
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=createdCommentPoolResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const deleteCommentPool=async({
	        userId,
            postId,
            postType,
            commentPoolId,
            commentType,
            accessToken
		})=>{
	try{
		const deletedCommentPoolResponse=await axios.post(`${CreateURl}/deleteCommentPool`,{
	        userId,
            postId,
            postType,
            commentPoolId,
            commentType
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deletedCommentPoolResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const deleteBeacon=async({
				symposiumId,
				beaconId,
				beaconType,
				ownerId,
				accessToken
			})=>{
	try{
		const deletedBeaconResponse=await axios.post(`${CreateURl}/deleteBeacon`,{
			symposiumId,
			beaconId,
			beaconType,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deletedBeaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const deleteBeaconReply=async({
			symposiumId,
			beaconId,
			replyBeaconId,
			beaconType,
			ownerId,
			accessToken
		})=>{
	try{
		debugger;
		const deletedBeaconReplyResponse=await axios.post(`${CreateURl}/deleteBeaconReply`,{
			symposiumId,
			beaconId,
			replyBeaconId,
			beaconType,
			ownerId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deletedBeaconReplyResponse;
		return data;
	}catch(err){
		throw err;
	}
}



export const deleteCommentToPopularQuestions=async({
			questionId,
            targetDeletionResponseId,
            symposiumId,
            userId,
            accessToken
	})=>{
	try{
		const deleteCommentToPopularPostResponse=await axios.post(`${CreateURl}/deleteCommentToPopularPost`,{
				questionId,
	            targetDeletionResponseId,
	            symposiumId,
	            userId
		},{
			headers:{
				authorization:accessToken
			}
		})
		const {data}=deleteCommentToPopularPostResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const deleteSpecificSymposiumAnswer=async({
		postType,
		symposiumId,
		symposiumAnswerId,
		postAnswerLevel,
		userId,
		accessToken,
		symposiumQuestionId
	})=>{
		try{
			const deletedSymposiumAnswerResponse=await axios.post(`${CreateURl}/deleteSpecificSymposiumAnswer`,{
				postType,
				symposiumId,
				symposiumAnswerId,
				postAnswerLevel,
				userId,
				symposiumQuestionId
			},{
				headers:{
					authorization:accessToken
				}
			})
			const {data}=deletedSymposiumAnswerResponse;
			return data;
		}catch(err){
			throw err;
		}
}















