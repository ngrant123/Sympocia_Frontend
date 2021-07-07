import axios from "axios";
const SearchUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_SEARCH_URL:
				process.env.REACT_APP_TEST_SEARCH_URL;

export const getProfilesFromSearch=async(searchUrl)=>{
	try{
		const profileSearch=await axios.get(`${SearchUrl}/getProfiles`,{
			params:{
				searchUrl
			}
		})

		const {data}=profileSearch;
		return data;
	}catch(err){
		return err;
	}
}

export const getSymposiumsFromSearch=async(searchUrl)=>{
	try{
		const symposiumSearch=await axios.get(`${SearchUrl}/getSymposiums`,{
			params:{
				searchUrl
			}
		})

		const {data}=symposiumSearch;
		return data;
	}catch(err){
		return err;
	}
}


export const getPostsFromSearch=async({searchUrl,postType,userId,postCount})=>{
	try{
		const postsSearch=await axios.get(`${SearchUrl}/getPosts`,{
			params:{
				searchUrl,
            	postType,
            	userId,
            	postCount
			}
		})

		const {data}=postsSearch;
		return data;
	}catch(err){
		return err;
	}

}


export const getProfilePostsSearch=async({
	searchUrl,
    postType,
    targetProfileId,
    postCount,
    levelNode
})=>{
	try{

		const profilePostsSearch=await axios.get(`${SearchUrl}/getProfilePosts`,{
			params:{
				searchUrl,
			    postType,
			    targetProfileId,
			    postCount,
			    levelNode
			}
		})
		const {data}=profilePostsSearch;
		return data;
	}catch(err){
		return err;
	}
}




