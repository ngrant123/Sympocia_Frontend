import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const baseurl=""+BASE_URL.BASE_URL;

export function getNewFeedUpdates(userId){
	//userId:number

	console.log(BASE_URL.BASE_URL);


	axios.get(`${baseurl}/Posts`,{

		params:{
			userId
			} 
		}).
		then(response=>{

			console.log(response.data);
		}).
		catch(err=>{
			console.log(err.message);
		})

}

export function getNotificationsUpdate(userId){
	//userId:number

	axios.get(`${baseurl}/Notifications`, { 

		params: { 
			id:userId 
			}
		}).
		then(response=>{

			console.log(response.data);
		}).
		catch(err=>{

			console.log(err.message);
		})
}


export function getPosts(industryid){
	//industryId:number


	axios.get(`${baseurl}/getPosts`, {
		params:{ 
				industryid: industryid 
			}
		}).
		then(response=>{
			console.log(response.data);
		}).
		catch(err=>{
			console.log("An Error has occured");
		})
}

export function getUserCompanyInformation(userId){

	axios.get(`${baseurl}/getUserCompanyInfo`,{
		params:{
			userid:userId
		}
	}).then(res=>{

		console.log(res.data);
	}).catch(err=>{
		console.log(err.message);
	})
}

export function getUserDataInfo(userId){


	axios.get(`${baseurl}/getUserData`,{
		params:{
			userid:userId
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);
	})
}