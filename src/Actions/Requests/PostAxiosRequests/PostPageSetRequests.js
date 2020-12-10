import axios from "axios";

const CreateURl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_POST_SET_URL:
				process.env.REACT_APP_TEST_POST_SET_URL;

export const createRegularPost=async(userId,searchCriteria,profileIndicator)=>{
	
	try{
		
			const regularPostCreationVerification=await axios.post(`${CreateURl}/createRegularPost`,{
														id:userId,
														searchCriteria:searchCriteria,
														profileIndicator:profileIndicator
												});

			const results=regularPostCreationVerification.data;
			return results; 
	}catch(err){
		
		return err;
	}
}

export const createImagePost=async(_id,searchCriteria,profileIndicator)=>{
	try{
		
		
		const imagePost=await axios.post(`${CreateURl}/createImagePost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		})

		const {data}=imagePost;
		return data;

	}catch(err){
		return err.message;
	}
}

export const createVideoPost=async(_id,searchCriteria,profileIndicator)=>{
	try{
		
		
		const {data}=await axios.post(`${CreateURl}/createVideoPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		});
		
		return data;
	}catch(err){
		return err.message;
	}
}


export const createBlogPost=async(_id,searchCriteria,profileIndicator)=>{
	try{
		const blogPost=await axios.post(`${CreateURl}/createBlogPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		})

		const {data}=blogPost;
		return data;

	}catch(err){
		return err.message;
	}
}


export const addStampPost =async(postId,profileType,postType)=>{
	try{
		
		
		const postStampResponse= await axios.post(`${CreateURl}/addStamp`,{
			postId:postId,
			profileType:profileType,
			postType:postType
		});

		const {data}=postStampResponse;
		const postStampData=data.data;
		return postStampData;
	}catch(err){
		
	}

}

export const unStampPost=async(postId,profileType,postType)=>{
	try{
		const unStampPostResponse=await axios.post(`${CreateURl}/unStamp`,{
			postId:postId,
			profileType:profileType,
			postType:postType
		}) ;

		const {data}=unStampPostResponse.data;
		const unStampPostData=data.data;
		return unStampPostData;
	}catch(err){
		
	}
}

export const addCommentToPopularQuestions=async(commentObject)=>{
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
		});
		const {data}=commentResponse;
		return data;
	}catch(err){
		
		return err;
	}
}



export const updateCrownedImage=async(_id,updatedStatus,imageId)=>{
	try{
		
		const updatedImage=await axios.post(`${CreateURl}/updateCrownedImage`,{
			_id:_id,
			updateStatus:updatedStatus,
			imageId:imageId
		});

		const {confirmation}=updatedImage;
		return confirmation;
		
	}catch(err){
		return err;
	}
}

export const markPostAsAuthentic=async({_id,firstName,postOption,postId,comment})=>{
	try{
		
		const approvePostResponse=await axios.post(`${CreateURl}/markPostAsAuthentic`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment
		});
		const {data}=approvePostResponse;
		return data;
		
	}catch(err){
		
		return err;
	}
}

export const markPostAsFakeNews=async({_id,firstName,postOption,postId,comment})=>{
	try{
		
		const fakeNewsPostResponse=await axios.post(`${CreateURl}/markPostAsFakeNews`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment
		});
		const {data}=fakeNewsPostResponse;
		return data;

	}catch(err){
		
		return err;
	}
}

export const createComment=async(postType,postId,comment,profileObject)=>{
	try{
		
		const commentResponse=await axios.post(`${CreateURl}/createComment`,{
			postType:postType,
			postId:postId,
			comment:comment,
			profileObject:profileObject
		})
		const {data}=commentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const createReply=async({postType,postId,commentId,reply,profileObject,commentIndex})=>{	
	try{	
		const commentResponse=await axios.post(`${CreateURl}/createReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject,
			commentIndex
		})
		const {data}=commentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const createVideoResponse=async({postType,commentId,videoSrc,currentProfile,postId})=>{
	try{
		
		const videoResponse=await axios.post(`${CreateURl}/createVideoResponse`,{
			postType:postType,
			videoSrc:videoSrc,
			currentProfile:currentProfile,
			postId:postId
		});

		const {data}=videoResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const createVideoCommentReply=async({postType,postId,commentId,reply,profileObject,commentIndex})=>{
	try{
		const videoCommentResponse=await axios.post(`${CreateURl}/createVideoReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject,
			commentIndex
		})
		const {data}=videoCommentResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const updateCrownedVideo=async(_id,updatedStatus,videoId)=>{
	try{
		
		const updatedVideo=await axios.post(`${CreateURl}/updateCrownedVideo`,{
			_id:_id,
			updateStatus:updatedStatus,
			videoId:videoId
		});

		const {confirmation}=updatedVideo;
		return confirmation;
		
	}catch(err){
		return err;
	}
}


export const updateCrownedBlog=async(_id,updatedStatus,blogId)=>{
	try{
		
		const updatedBlog=await axios.post(`${CreateURl}/updateCrownedBlog`,{
			_id:_id,
			updateStatus:updatedStatus,
			blogId:blogId
		});

		const {confirmation}=updatedBlog;
		return confirmation;
		
	}catch(err){
		return err;
	}
}


export const updateCrownedRegularPost=async(_id,updatedStatus,regularPostId)=>{
	try{
		
		const updatedRegularPost=await axios.post(`${CreateURl}/updateCrownedRegularPost`,{
			_id:_id,
			updateStatus:updatedStatus,
			regularPostId:regularPostId
		});

		const {confirmation}=updatedRegularPost;
		return confirmation;
		
	}catch(err){
		return err;
	}
}

export const editPost=async({postType,postId,post,postS3,ownerId})=>{
	try{

		
		const editedPostResponse=await axios.post(`${CreateURl}/editPost`,{
			postType,
			postId,
			post,
			postS3,
			ownerId
		});
		const {data}=editedPostResponse;
		return data;

	}catch(err){
		return err;
	}
}


export const promotePost=async({postId,nodeId,postType})=>{
	try{
		
		const promotionResponse=await axios.post(`${CreateURl}/promotePost`,{
			postId,
			nodeId,
			postType
		});
		const {data}=promotionResponse;
		return data;
	}catch(err){
		
		return err;
	}

}

export const deletePost=async({postId,postType,industriesUploaded,profileId})=>{
	try{
		
		const deleteResponse=await axios.post(`${CreateURl}/deletePost`,{
			postId,
			postType,
			industriesUploaded,
			profileId
		});
		const {data}=deleteResponse;
		return data;

	}catch(err){
		
		return err;
	}
}


export const createIndustryFeatureImageResponse=async({image,industryId,questionId,questionIndex,question,userId})=>{
	try{
		
		const imageFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureImageResponse`,{
			image,
			industryId,
			questionId,
			question,
			userId,
			questionIndex
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
			questionId
		}=regularPostAnswer;

		const regularPostFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureRegularPostResponse`,{
			post,
			industryId,
			question,
			postLevel,
			userId,
			questionId
		});

		const {data}=regularPostFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}

export const createSpecificIndustryVideoAnswer=async({video,industryId,questionId,question,userId})=>{
	try{
		
		const videoFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureVideoResponse`,{
			video,
			industryId,
			question,
			userId,
			questionId
		});

		const {data}=videoFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}

export const createSpecificIndustryAudioAnswer=async({audio,industryId,questionId,question,userId})=>{
	try{
		
		const audioFeatureResponse=await axios.post(`${CreateURl}/createIndustryFeatureAudioResponse`,{
			audio,
			industryId,
			question,
			userId,
			questionId
		});

		const {data}=audioFeatureResponse
		return data;
	}catch(err){
		
		return err;
	}
}


















