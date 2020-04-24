import axios from "axios";


export const createRegularPost=async(userId,searchCriteria)=>{
	const CreateURl='http://localhost:4000/api/posts/alter';
	try{
		debugger;
			console.log("Regular post creation api working");
			const regularPostCreationVerification=await axios.post(`${CreateURl}/createRegularPost`,{
														id:userId,
														searchCriteria:searchCriteria
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

export const createVideoPost=async(_id,searchCriteria)=>{
	try{
		debugger;
		console.log(_id);
		console.log(searchCriteria);
		const CreateURl='http://localhost:4000/api/posts/alter';
		const videoPost=await axios.post(`${CreateURl}/createVideoPost`,{
			_id:_id,
			searchCriteria:searchCriteria
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


export const createBlogPost=async(_id,searchCriteria)=>{
	try{
		debugger;
		console.log(_id);
		console.log(searchCriteria);
		const CreateURl='http://localhost:4000/api/posts/alter';
		const blogPost=await axios.post(`${CreateURl}/createBlogPost`,{
			_id:_id,
			searchCriteria:searchCriteria
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