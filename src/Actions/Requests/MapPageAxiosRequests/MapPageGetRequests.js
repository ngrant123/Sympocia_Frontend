import axios from "axios";

const Url=process.env.NODE_ENV=='production'?
		  process.env.REACT_APP_MAP_GET_URL:
		  process.env.REACT_APP_TEST_MAP_GET_URL;

export async function quickSearchIndustry(id,industryArray){

	try{
	   const companies= await axios.get(`${Url}/getQuickSearch`,{
			params:{
				id:id,
				industries:industryArray
			}
		});

		const {data}=companies;
		const companyData=data.data;
		return companyData;
	}catch(err){
	}
}
/*

	it izz what it izzz
*/

export async function searchForCompanies(id,searchCriteria){

	try{
		const {state,industry,name}=searchCriteria;
		const companies=await axios.get(`${Url}/searchForCompanies`,{
			params:{
				id:id,
				state:state,
				industry:industry,
				name:name
			}
		});

		const {data}=companies;
		const companiesData=data.data;
		return companiesData;
	}catch(err){
	}
} 



