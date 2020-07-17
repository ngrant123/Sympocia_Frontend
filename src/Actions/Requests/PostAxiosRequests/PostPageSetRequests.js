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

		console.log(imagePost);
		const {data}=imagePost;
		const imageCreationResponse=data.data;
		return imageCreationResponse;

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
		const videoPost=await axios.post(`${CreateURl}/createVideoPost`,{
			_id:_id,
			searchCriteria:searchCriteria,
			profileIndicator:profileIndicator
		})

		console.log(videoPost);
		const {data}=videoPost;
		const videoCreationResponse=data.data;
		return videoCreationResponse;

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
			questionId,
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
		return data.data;
		
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
		return data.data;

	}catch(err){
		console.log(err);
		return err;
	}
}




















