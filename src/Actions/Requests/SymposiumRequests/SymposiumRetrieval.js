import axios from "axios";

const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SYMPOSIUM_URL:
				process.env.REACT_APP_TEST_SYMPOSIUM_URL;



export const getImagesInIndustry=async(industry,postCounter)=>{
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
		return err;
	}
}

export const getRegularPostsInIndustry=async({industry,postCount,userId})=>{
	try{
		const imageResults=await axios.get(`${SearchUrl}/getRegularPostInIndustry`,{
			params:{
				industry,
				postCount,
				userId
			}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryImageFeatureAnswers=async({industryId,question,questionIndex,questionId})=>{
	try{
		const imageResponse=await axios.get(`${SearchUrl}/getIndustryImageFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionIndex,
				questionId
			}
		})
		const {data}=imageResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryVideoFeatureAnswers=async({industryId,question,questionIndex,questionId})=>{
	try{
		const videoResponse=await axios.get(`${SearchUrl}/getIndustryVideoFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionIndex,
				questionId
			}
		})
		const {data}=videoResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryRegularPostFeatureAnswers=async({industryId,question,questionIndex,questionLevel,questionId})=>{
	try{
		const regularPostResponse=await axios.get(`${SearchUrl}/getIndustryRegularPostFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionLevel,
				questionIndex,
				questionId
			}
		})
		const {data}=regularPostResponse;
		return data;
	}catch(err){
		return err;
	}
}



export const getVideoInIndustry=async(industry,postCounter)=>{
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
		return err;
	}
}


export const getBlogsInIndustry=async(industry,postCounter)=>{
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
		return err;
	}
}

export const getIndustryAudioFeatureAnswers=async({industryId,question,questionIndex,questionId})=>{
	try{
		const audioResponse=await axios.get(`${SearchUrl}/getIndustryAudioFeatureAnswers`,{
			params:{
				industryId,
				question,
				questionIndex,
				questionId
			}
		})
		const {data}=audioResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getIndustryInformation=async(industry,postCount,userId)=>{
	try{
		
		const industryInformation=await axios.get(`${SearchUrl}/getIndustryInformation`,{
			params:{
				industry:industry,
				postCount:postCount,
				userId:userId
			}
		})

		const {data}=industryInformation;
		return data;
	}catch(err){
		return err;
	}
}


export const getPopularQuestionReplies=async(industry,counter)=>{
	try{
		const popularQuestionResponse=await axios.get(`${SearchUrl}/getPopularQuestion`,{
			params:{
				industry:industry,
				counter:counter
			}
		})

		const {data}=popularQuestionResponse;
		return data;

	}catch(err){
		return err;
	}
}




