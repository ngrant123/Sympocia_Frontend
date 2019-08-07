import constants from "../Constants.js";
import axios from "axios";


const baseUrl= constants.BASE_URL;

export function getInvestor(name){

	/*
		name: String

	*/


	axios.get(`${baseUrl}/getInvestor`,{

		params:{
			name:name
		}
	}).then(res=>{

		console.log(res.data);


	}).catch(err=>{
		console.log(err.message);
	})
};

export function getInvestorsByName(name){

	axios.get(`${baseUrl}/InvestorsByName`,{

		params:{
			name:name
		}
	}).then(res=>{
		console.log(res.data);
	}).catch(err=>{
		console.log(err.message);
	})
}

export function getInvestorsByIndustry (industryId){

	axios.get(`${baseUrl}/InvestorsIndustry`,{
		params:{
			industryId:industry
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);

	})
}

export getAllInvestors(){

		axios.get(`${baseUrl}/getInvestors`).
			then(res=>{

				console.log(res.data);

			}).catch(err=>{

				console.log(err.message);

			})
	}





