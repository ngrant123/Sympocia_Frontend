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
		return data;
	}catch(err){
		console.log(err.message);
	}
}