import axios from "axios";

const GetUrl=process.env.NODE_ENV=='production'?
			process.env.REACT_APP_EXPLORE_PAGE_GET_URL:
			process.env.REACT_APP_TEST_EXPLORE_PAGE_GET_URL;

export const explorePagePosts=async({
		id,
		postCount,
		accessToken,
		requestedPostType,
		postSessionManagmentToken})=>{
	try{
		const imageResults=await axios.get(`${GetUrl}/getExplorePagePosts`,{
			params:{
				_id:id,
				requestedPostType,
				postSessionManagmentToken
			},
			headers:{
				authorization:accessToken
			}
		});

		const {data}=imageResults;
		return data;
	}catch(err){
		return err;
	}
}