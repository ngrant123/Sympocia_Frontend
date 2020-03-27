import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";


const baseurl=BASE_URL.BASE_URL;
const CreateUrl='http://localhost:4000/api/profile/alter';

export function addEmployeeData(userId,employeeData){
	/*
		userId:number
		employeeData:object
	*/

	axios.put(`${baseurl}/addEmployee`,{

		params:{
			userid:userId,
			employeedata:employeeData
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);
	})
}


export function addNewsData(userId,newsData){

	/*
		userId:number
		newsdata:object
	*/

	axios.put(`${baseurl}/addNews`,{

		params:{
			userid:userId,
			newsdata:newsData
		}
	}).then(res=>{

		console.log(res.data);


	}).catch(err=>{

		console.log(err.message);

	})
}

export function addPostData(userId,postData){

	/*
		userId:number
		postdata:object
	*/

	axios.post(`${baseurl}/addPost`,{

		params:{
			userid:userId,
			postdata:postData
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);
	})
}

export function updateEmployee(userId,updatedEmployeeData){

	/*
		userId:number
		updateemployeedata:object
	*/

	axios.put(`${baseurl}/updateEmployee`,{
		params:{
			userid:userId,
			updatedemployeedata:updatedEmployeeData
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);
	})
}

export function createProfile(personalData){
	const {firstName,lastName,email,paymentPlan,isInvestor,location,stripToken}=personalData;
	let personalInformation;
	if(isInvestor==true){
		const {industries}=personalData;
		personalInformation={
			...personalData,
			firstTimeLoggedIn:true,
			industries:industries
		}
	}else{
		personalInformation={
		...personalData,
		firstTimeLoggedIn:true
		}
	}
	console.log(personalData);

	axios.post(`${CreateUrl}/createProfile`,personalInformation).then(profile=>{
		console.log(profile);
		return profile;
	}).catch(err=>{
		return err.message;
	})
}

export function setBio(personalId,bio){

	axios.post(`${CreateUrl}/setBio`,{
		_id:personalId,
		bio:bio
	}).then(profile=>{
		return profile;
	}).catch(err=>{
		console.log(err.message);
	})
}

export function setProfilePicture(profileId,pictureUrl){

	axios.post(`${CreateUrl}/setProfilePicture`,{
		_id:profileId,
		profilePicture:pictureUrl
	}).then(profile=>{
		return profile;
	}).catch(err=>{
		console.log(err.message);
	})
}













