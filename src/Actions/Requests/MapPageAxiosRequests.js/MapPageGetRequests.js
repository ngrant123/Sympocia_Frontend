import axios from "axios";
import { BASEURL } from "";

const baseUrl=BASEURL;

export function getCompaniesWithinIndustry(industry,area){

	let baseUrl=BASEURL;

	axios.get(`${baseUrl}/CompaniesWithinIndustry`,{

		params:{
			industry:area,
			area:area

		}
	}).then(res=>{

		console.log(res.data);
	}).catch(err=>{
		console.log(err);
	})
}

export function getCompaniesByName(name){

	axios.get(`${baseUrl}/CompanyByName`,{
		params:{
			name:name
		}
	}).then(res=>{

		console.log(res.data);
	}).catch(err=>{
		console.log(err);
	})
}

export function getUserLocation(name){

	axios.get(`${baseUrl}/UserLocation`,{
		params:{
			name:name
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err);
	})
}


export function getCompaniesWithArea(area){

	axios.get(`${baseUrl}/AreaCompanies`,{
		params:{

			area:area
		}


	}).then(res=>{

		console.log(res.data);
	}).catch(err=>{

		console.log(err);
	})
}





