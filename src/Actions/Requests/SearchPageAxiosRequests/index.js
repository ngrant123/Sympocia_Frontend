import axios from "axios";
const SearchUrl='http://localhost:4000/api/search';

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
		console.log(err);
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
		console.log(err);
		return err;
	}
}


export const getPostsFromSearch=async({searchUrl,postType})=>{
	try{
		const postsSearch=await axios.get(`${SearchUrl}/getPosts`,{
			params:{
				searchUrl,
            	postType 
			}
		})

		const {data}=postsSearch;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}

}