import axios from "axios";

const CreateUrl='/api/company/search';
export async function getCompanyInformation(companyId){
	try{
		const companyData=await axios.get(`${CreateUrl}/getCompaniesById`,{
			params:{
				_id:companyId
			}
		})
		const {data}=companyData;
	
		return data.data;
	}catch(err){
		return err.message;
	}
}

export async function getCompanyVideos(userId){
	try{
	
	
	const companyVideos=await axios.get(`${CreateUrl}/getCompanyVideos`,{
		params:{
			_id:userId
		}
	})
	

	const {data}=companyVideos;
	const {headerVideo,videoPosts}=data.data;
	const videoObject={
						headerVideo:headerVideo,
						videos:videoPosts
				      };
		return videoObject;
	}catch(err){
		return err.message
	}
}

export async function getCompanyBlogs(companyId){
	try{
		
		
		const companyBlogs=await axios.get(`${CreateUrl}/getCompanyBlogs`,{
			params:{
				_id:companyId
			}
		})
		

		const {data}=companyBlogs;
	
		return data.data;

	}catch(err){
			return err.message
	}
}


export async function getCompanyRegularPosts(companyId){
	try{
		
		
		const companyRegularPosts=await axios.get(`${CreateUrl}/getCompanyRegularPosts`,{
			params:{
				_id:companyId
			}
		})
		

		const {data}=companyRegularPosts;
		const {regularPosts}=data.data;
		return regularPosts;

	}catch(err){
			return err.message
	}
}


export const getCompanyProfileForHomePage=async(id)=>{
	try{
		
		const companyProfileResult=await axios.get(`${CreateUrl}/getCompanyProfileForHomePage`,{
			params:{
				_id:id
			}
		});
		const {data}=companyProfileResult;
		const companyProfileData=data.data;
		return companyProfileData;
	}catch(err){
		return err;
	}
}


export const getCompanyProfileGeneralMessages=async(companyId)=>{
	try{
		
		const chatsResponse=await axios.post(`${CreateUrl}/chatMesasge`,{
			params:{
				_id:companyId
			}
		});

		const {data}=chatsResponse;
		const chatData=data.data;
		return chatData;

	}catch(err){
		return err.message;
	}
}

export const getCompanies=async()=>{
	try{
		
		const companiesResponse=await axios.get(`${CreateUrl}/getCompanies`);
		const {data}=companiesResponse;
		const companiesData=data.data;
		return companiesData;

	}catch(err){
		return err;
	}
}

export const getFollowedSymposiumsCompanyHome=async(id)=>{
	try{
		
		const symposiumResponse=await axios.get(`${CreateUrl}/getFollowedSymposiumsHomePage`,{
			params:{
				_id:id
			}
		});

		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;
	}catch(err){
		return err;
	}
}




