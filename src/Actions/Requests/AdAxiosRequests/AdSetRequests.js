import axios from "axios";

const CreateURl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_AD_SET_URL:
				process.env.REACT_APP_TEST_AD_SET_URL;


export const createAd=async(postId,postType,userId)=>{
	try{
		const createdAdResponse=await axios.post(`${CreateURl}/createAd`,{
			postId,
			postType,
			userId
		})

		const {data}=createdAdResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const resumeAdStatus=async(postId,userId,postType)=>{
	try{
		const updatedAdResponse=await axios.post(`${CreateURl}/resumeAdStatus`,{
			postId,
			userId,
			postType
		});
		const {data}=updatedAdResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const pauseAdStatus=async(postId,userId,postType)=>{
	try{
		const updatedAdResponse=await axios.post(`${CreateURl}/pauseAdStatus`,{
			postId,
			userId,
			postType
		});
		const {data}=updatedAdResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const deleteAd=async(postId,postType,userId)=>{
	try{
		const deletedAdResponse=await axios.post(`${CreateURl}/deleteAd`,{
			postId,
			postType,
			userId
		});
		const {data}=deletedAdResponse;
		return data;
	}catch(err){
		throw err;
	}
}
