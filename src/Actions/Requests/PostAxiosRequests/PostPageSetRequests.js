import axios from "axios";


export const createRegularPost=async(userId,searchCriteria,profileIndicator)=>{
	const CreateURl='http://localhost:4000/api/posts/alter';
	try{
		debugger;
			console.log("Regular post creation api working");
			const regularPostCreationVerification=await axios.post(`${CreateURl}/createRegularPost`,{
														id:userId,
														searchCriteria:searchCriteria,
														profileIndicator:profileIndicator
												});

			const results=regularPostCreationVerification.data;
			return results; 
	}catch(err){
		console.log(err);
		return err;
	}
}

export const createImagePost=async(_id,searchCriteria,profileIndicator)=>{
	try{
		debugger;
		console.log(_id);
		console.log(searchCriteria);
		const CreateURl='http://localhost:4000/api/posts/alter';
		const imagePost=await axios.post(`${CreateURl}/createImagePost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		})

		const {data}=imagePost;
		return data;

	}catch(err){
		console.log(err.message);
		return err.message;
	}
}

export const createVideoPost=async(_id,searchCriteria,profileIndicator)=>{
	try{
		debugger;
		console.log(_id);
		console.log(searchCriteria);
		const CreateURl='http://localhost:4000/api/posts/alter';
		const {data}=await axios.post(`${CreateURl}/createVideoPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		});
		debugger;
		return data;
	}catch(err){
		console.log(err.message);
		return err.message;
	}
}


export const createBlogPost=async(_id,searchCriteria,profileIndicator)=>{
	try{
		debugger;
		console.log(_id);
		console.log(searchCriteria);
		const CreateURl='http://localhost:4000/api/posts/alter';
		const blogPost=await axios.post(`${CreateURl}/createBlogPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		})

		console.log(blogPost);
		const {data}=blogPost;
		const blogCreationResponse=data.data;
		return blogCreationResponse;

	}catch(err){
		console.log(err.message);
		return err.message;
	}
}


export const addStampPost =async(userId,postId,profileType,postType)=>{
	try{
		debugger;
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const postStampResponse= await axios.post(`${CreateUrl}/addStamp`,{
			_id:userId,
			postId:postId,
			profileType:profileType,
			postType:postType
		});

		const {data}=postStampResponse;
		const postStampData=data.data;
		return postStampData;
	}catch(err){
		console.log(err);
	}

}

export const unStampPost=async(userId,postId,profileType,postType)=>{
	try{
		debugger;
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const unStampPostResponse=await axios.post(`${CreateUrl}/unStamp`,{
			_id:userId,
			postId:postId,
			profileType:profileType,
			postType:postType
		}) ;

		const {data}=unStampPostResponse.data;
		const unStampPostData=data.data;
		return unStampPostData;
	}catch(err){
		console.log(err);
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

		const CreateUrl='http://localhost:4000/api/posts/alter';
		const commentResponse=await axios.post(`${CreateUrl}/addCommentToPopularPost`,{
			userId:userId,
			profileIndicator:profileIndicator,
			questionId:questionId,
			questionType:questionType,
			comment:comment,
			industry:industry
		});
		const {data}=commentResponse;
		const commentData=data.data;
		return commentData;
	}catch(err){
		console.log(err);
		return err;
	}
}



export const updateCrownedImage=async(_id,updatedStatus,imageId)=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const updatedImage=await axios.post(`${CreateUrl}/updateCrownedImage`,{
			_id:_id,
			updateStatus:updatedStatus,
			imageId:imageId
		});

		const {confirmation}=updatedImage;
		return confirmation;
		
	}catch(err){
		console.log(err.message);
		return err;
	}
}

export const markPostAsAuthentic=async({_id,firstName,postOption,postId,comment})=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const approvePostResponse=await axios.post(`${CreateUrl}/markPostAsAuthentic`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment
		});
		const {data}=approvePostResponse;
		return data;
		
	}catch(err){
		console.log(err);
		return err;
	}
}

export const markPostAsFakeNews=async({_id,firstName,postOption,postId,comment})=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const fakeNewsPostResponse=await axios.post(`${CreateUrl}/markPostAsFakeNews`,{
			_id:_id,
			firstName:firstName,
			postOption:postOption,
			postId:postId,
			comment:comment
		});
		const {data}=fakeNewsPostResponse;
		return data;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const createComment=async(postType,postId,comment,profileObject)=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const commentResponse=await axios.post(`${CreateUrl}/createComment`,{
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


export const createReply=async({postType,postId,commentId,reply,profileObject})=>{
	try{		
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const commentResponse=await axios.post(`${CreateUrl}/createReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject
		})
		const {data}=commentResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const createVideoResponse=async({postType,commentId,videoSrc,currentProfile,postId})=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const videoResponse=await axios.post(`${CreateUrl}/createVideoResponse`,{
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

export const createVideoCommentReply=async({postType,postId,commentId,reply,profileObject})=>{
	try{
		debugger;
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const videoCommentResponse=await axios.post(`${CreateUrl}/createVideoReply`,{
			postType:postType,
			postId:postId,
			commentId:commentId,
			reply:reply,
			profileObject:profileObject
		})
		const {data}=videoCommentResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const updateCrownedVideo=async(_id,updatedStatus,videoId)=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const updatedVideo=await axios.post(`${CreateUrl}/updateCrownedVideo`,{
			_id:_id,
			updateStatus:updatedStatus,
			videoId:videoId
		});

		const {confirmation}=updatedVideo;
		return confirmation;
		
	}catch(err){
		console.log(err.message);
		return err;
	}
}


export const updateCrownedBlog=async(_id,updatedStatus,blogId)=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const updatedBlog=await axios.post(`${CreateUrl}/updateCrownedBlog`,{
			_id:_id,
			updateStatus:updatedStatus,
			blogId:blogId
		});

		const {confirmation}=updatedBlog;
		return confirmation;
		
	}catch(err){
		console.log(err.message);
		return err;
	}
}


export const updateCrownedRegularPost=async(_id,updatedStatus,regularPostId)=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const updatedRegularPost=await axios.post(`${CreateUrl}/updateCrownedRegularPost`,{
			_id:_id,
			updateStatus:updatedStatus,
			regularPostId:regularPostId
		});

		const {confirmation}=updatedRegularPost;
		return confirmation;
		
	}catch(err){
		console.log(err.message);
		return err;
	}
}

export const editPost=async({postType,postId,post,postS3,ownerId})=>{
	try{

		const CreateUrl='http://localhost:4000/api/posts/alter';
		const editedPostResponse=await axios.post(`${CreateUrl}/editPost`,{
			postType,
			postId,
			post,
			postS3,
			ownerId
		});
		const {data}=editedPostResponse;
		return data;

	}catch(err){
		console.log(err.message);
		return err;
	}
}


export const promotePost=async({postId,nodeId,postType})=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const promotionResponse=await axios.post(`${CreateUrl}/promotePost`,{
			postId,
			nodeId,
			postType
		});
		const {data}=promotionResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}

}

export const deletePost=async(postId,postType)=>{
	try{
		const CreateUrl='http://localhost:4000/api/posts/alter';
		const promotionResponse=await axios.post(`${CreateUrl}/deletePost`,{
			postId,
			postType
		});
		const {data}=promotionResponse;
		return data;

	}catch(err){
		console.log(err);
		return err;
	}
}

















