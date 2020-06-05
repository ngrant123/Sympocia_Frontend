import axios from "axios";


export async function getCompanyInformation(companyId){
	const CreateUrl='http://localhost:4000/api/company/search';
	console.log(companyId)
	try{
		const companyData=await axios.get(`${CreateUrl}/getCompaniesById`,{
			params:{
				_id:companyId
			}
		})
		const {data}=companyData;
		console.log(data.data)
		return data.data;
	}catch(err){
		console.log(err.message);
	}
}

export async function getCompanyVideos(userId){
	try{
	debugger;
	const CreateUrl='http://localhost:4000/api/company/search';
	const companyVideos=await axios.get(`${CreateUrl}/getCompanyVideos`,{
		params:{
			_id:userId
		}
	})
	debugger;

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
		debugger;
		const CreateUrl='http://localhost:4000/api/company/search';
		const companyBlogs=await axios.get(`${CreateUrl}/getCompanyBlogs`,{
			params:{
				_id:companyId
			}
		})
		debugger;

		const {data}=companyBlogs;
		console.log(data.data)
		return data.data;

	}catch(err){
			return err.message
	}
}


export async function getCompanyRegularPosts(companyId){
	try{
		debugger;
		const CreateUrl='http://localhost:4000/api/company/search';
		const companyRegularPosts=await axios.get(`${CreateUrl}/getCompanyRegularPosts`,{
			params:{
				_id:companyId
			}
		})
		debugger;

		const {data}=companyRegularPosts;
		const {regularPosts}=data.data;
		return regularPosts;

	}catch(err){
			return err.message
	}
}


export const getCompanyProfileForHomePage=async(id)=>{
	try{
		const CreateUrl='http://localhost:4000/api/company/search';
		const companyProfileResult=await axios.get(`${CreateUrl}/getCompanyProfileForHomePage`,{
			params:{
				_id:id
			}
		});
		const {data}=companyProfileResult;
		const companyProfileData=data.data;
		return companyProfileData;
	}catch(err){
		console.log(err);
		return err;
	}
}


export const getCompanyProfileGeneralMessages=async(companyId)=>{
	try{
		const CreateUrl='http://localhost:4000/api/company/search';
		const chatsResponse=await axios.post(`${CreateUrl}/chatMesasge`,{
			params:{
				_id:companyId
			}
		});

		const {data}=chatsResponse;
		const chatData=data.data;
		return chatData;

	}catch(err){
		console.log(err);
		return err.message;
	}
}

export const getCompanies=async()=>{
	try{
		const CreateUrl='http://localhost:4000/api/company/search';
		const companiesResponse=await axios.get(`${CreateUrl}/getCompanies`);
		const {data}=companiesResponse;
		const companiesData=data.data;
		return companiesData;

	}catch(err){
		console.log(err);
		return err;
	}
}




