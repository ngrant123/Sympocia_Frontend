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
	console.log(data.data)
	return data.data;

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
		console.log(data.data)
		return data.data;

	}catch(err){
			return err.message
	}
}







