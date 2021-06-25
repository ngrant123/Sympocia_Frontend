import axios from "axios";

 const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SYMPOSIUM_GET_URL:
				process.env.REACT_APP_TEST_SYMPOSIUM_GET_URL;



export const getImagesInIndustry=async(postFetchCriteria)=>{
	try{
		const imageResults=await axios.get(`${SearchUrl}/getImagesInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}

export const getRegularPostsInIndustry=async(postFetchCriteria)=>{
	try{
		const imageResults=await axios.get(`${SearchUrl}/getRegularPostInIndustry`,{
			params:{...postFetchCriteria}
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


export const getVideoInIndustry=async(postFetchCriteria)=>{
	try{
		const videoResponse=await axios.get(`${SearchUrl}/getVideosInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=videoResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const getBlogsInIndustry=async(postFetchCriteria)=>{
	try{
		const blogResponse=await axios.get(`${SearchUrl}/getBlogsInIndustry`,{
			params:{...postFetchCriteria}
		});

		const {data}=blogResponse;
		return data;
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


export const getIndustryInformation=async(industry,postCount,userId,postSessionManagmentToken)=>{
	try{
		
		const industryInformation=await axios.get(`${SearchUrl}/getIndustryInformation`,{
			params:{
				industry:industry,
				postCount:postCount,
				userId:userId,
				postSessionManagmentToken
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


export const retrieveBeacons=async(symposiumId,postType,beaconCounter)=>{
	try{
		const beaconResponse=await axios.get(`${SearchUrl}/getBeacons`,{
			params:{
				symposiumId,
	            postType,
	            beaconCounter
			}
		})

		const {data}=beaconResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveBeaconReplies=async(symposiumId,postType,beaconCounter,beaconId)=>{
	try{
		const beaconReplies=await axios.get(`${SearchUrl}/getBeaconReplies`,{
			params:{
				symposiumId,
	            postType,
	            beaconCounter,
	            beaconId
			}
		})
		const {data}=beaconReplies;
		return data;
	}catch(err){
		throw err;
	}
}







