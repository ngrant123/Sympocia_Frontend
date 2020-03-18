import axios from "axios";

export function quickSearchIndustry(id,industryArray){

	const Url="http://localhost:4000/api/map/search";

	axios.get(`${Url}/getQuickSearch`,{
		params:{
			id:id,
			industries:industryArray
		}
	}).then(companies=>{

		return companies;
	}).catch(err=>{
		console.log(err);
		return err;
	})

}
/*

	it izz what it izzz
*/

export function searchForCompanies(id,searchCriteria){
	const Url="http://localhost:4000/api/map/search";
	const {state,industry,name}=searchCriteria;

	axios.get(`${Url}/searchForCompanies`,{
		params:{
			id:id,
			searchCriteria:{
				state:state,
				industry:industry,
				name:name
			}
		}
	}).then(companies=>{
		return companies;
	}).catch(err=>{
		console.log(err);
		return err;
	})
} 



