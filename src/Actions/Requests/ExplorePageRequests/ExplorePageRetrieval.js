import axios from "axios";

const GetUrl=process.env.NODE_ENV=='production'?
			process.env.REACT_APP_EXPLORE_PAGE_GET_URL:
			process.env.REACT_APP_TEST_EXPLORE_PAGE_GET_URL;

export const exploreImagePosts=async({
				id,
				postCount,
				accessToken,
				isGuestProfile,
				postSessionManagmentToken})=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getExploreImagePosts`,{
			params:{
				_id:id,
				postCount:postCount,
				postSessionManagmentToken
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}

export const exploreVideoPosts=async({
				id,
				postCount,
				accessToken,
				isGuestProfile,
				postSessionManagmentToken
			})=>{
	try{
		
		const videoResults=await axios.get(`${GetUrl}/getExploreVideoPosts`,{
			params:{
				_id:id,
				postCount:postCount,
				postSessionManagmentToken
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});

		const {data}=videoResults;
		return data;

	}catch(err){
		return err;
	}
}

export const exploreBlogPosts=async({		
				id,
				postCount,
				accessToken,
				isGuestProfile,
				postSessionManagmentToken})=>{
	try{
		const blogResults=await axios.get(`${GetUrl}/getExploreBlogsPosts`,{
			params:{
				_id:id,
				postCount:postCount,
				postSessionManagmentToken
			},
			headers:{
				authorization:accessToken,
				isGuestProfile
			}
		});

		const {data}=blogResults;
		return data;
	}catch(err){
		return err;
	}
}

export const exploreRegularPosts=async({
				id,
				postCount,
				accessToken,
				isGuestProfile,
				postSessionManagmentToken})=>{
	try{
		const regularPostResults=await axios.get(`${GetUrl}/getExploreRegularPosts`,{
			params:{
				_id:id,
				postCount:postCount,
				postSessionManagmentToken
			},
			headers:{
				authorization:accessToken,
				isGuestProfile 
			}
		});

		const {data}=regularPostResults;
		return data; 
	}catch(err){
		return err;
	}
}