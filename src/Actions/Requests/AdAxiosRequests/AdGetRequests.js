import axios from "axios";

const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_AD_GET_URL:
				process.env.REACT_APP_TEST_AD_GET_URL;

export const getAds=async(adRequestInformation)=>{
	try{
		const adsResponse=await axios.get(`${SearchUrl}/getAds`,{
			params:{
				...adRequestInformation
			}
		});
		const {data}=adsResponse;
		return data;
	}catch(err){
		throw err;
	}
}

export const getAdStatistics=async(postId,userId)=>{
	try{
		const adStatistics=await axios.get(`${SearchUrl}/getAdStatistics`,{
			params:{
				postId,
				userId
			}
		});
		const {data}=adStatistics;
		return data;
	}catch(err){
		throw err;
	}
}

export const retrieveTotalAdsAllocatedPerProfile=async(profileId)=>{
	try{
		const allocatedAdsResponse=await axios.get(`${SearchUrl}/getTotalAdsAllocatedPerProfile`,{
			params:{
				profileId
			}
		})
		const {data}=allocatedAdsResponse;
		return data;
	}catch(err){
		throw err;
	}
}


export const getCurrentAdCountPerProfile=async(profileId)=>{
	try{
		const currentAdCountResponse=await axios.get(`${SearchUrl}/getCurrentAdCountPerProfile`,{
			params:{
				profileId
			}
		});
		const {data}=currentAdCountResponse;
		return data;
	}catch(err){
		throw err;
	}
}







