import axios from "axios";
import BASE_URL from "../Constants.js";

const baseurl=BASE_URL.BASE_URL;

export function getActivityLog(userId){
	//userId:number

	axios.get(`${baseurl}/ActivityLog`,{

		param:{

			userid:userId
		}
	}).then(res=>{

		console.log(res.data);


	}).catch(err=>{

		console.log(err.message);
	})
}

export function getFriendships(userId){
	//userId:number

	axios.get(`${baseurl}/Friendships`,{

		params:{
			userid:userId
		}
	})
	.then(response=>{


	}).catch(err=>{


	})
}

export function getCoverPhotoImage(userId){
	//userId:number

	axios.get(`${baseurl}/CoverPhoto`,{

		params:{
			userid:userid
		}
	}).then(res=>{

		console.log(res.data);
	}).catch(err=>{

		console.log(err.message);
	})
}

export function getCompanyIcon(userId){
	//userId:number


	axios.get(`${baseurl}/CompanyIcon`,{

		params:{
			userid:userId
		}

	}).then(res=>{
		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);

	})
}

export function getCompanyBio(userId){
	//userId:number

	axios.get(`${baseurl}/CompanyBio`,{

		params:{
			userid:userId
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);

	})
}