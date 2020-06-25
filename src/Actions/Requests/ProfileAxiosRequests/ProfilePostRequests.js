import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";


const baseurl=BASE_URL.BASE_URL;
const CreateUrl='http://localhost:4000/api/profile/alter';
const CreatePostUrl='http://localhost:4000/api/posts/alter';

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

export async function createProfile(personalData){
	debugger;
	console.log("Profile create profile route");
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

	const profileCreationResults=await axios.post(`${CreateUrl}/createProfile`,personalInformation);
	const {data}=profileCreationResults;
	var profileData=data.data;
	return profileData;
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

export async function setProfilePicture(profileId,pictureUrl){
	try{
		console.log("Profile picture api reached");
		const profilePictureVerification=await axios.post(`${CreateUrl}/setProfilePicture`,{
				_id:profileId,
				profilePicture:pictureUrl
			});

		const profileChangeResults=profilePictureVerification.data;
		const results=profileChangeResults.data;
		return results;
	}catch(err){
		console.log(err);
	}
}


export const createChampion=async(profileId,championData)=>{
	try{
		const championCreationResponse=await axios.post(`${CreateUrl}/createChampion`,{
			_id:profileId,
			championData:championData
		});

		const {data}=championCreationResponse.data;
		const championResponse=data.data;
		return championResponse;
	}catch(err){
		console.log(err);
		return err;
	}

}


export const addRecruit=async(personalProfile,targetedProfile)=>{
	try{
		console.log("Add recruit");
		debugger;
		const recruitResponse=await axios.post(`${CreateUrl}/addRecruit`,{
			personalProfileId:personalProfile,
			targetProfile:targetedProfile
		});
		const {data}=recruitResponse;
		const recruitData=data.data;
		return recruitData;

	}catch(err){
		console.log(err);
		return err;
	}

}

export const sendMessagePersonal=async(owner,message,participants)=>{
	try{
		const messageResponse=await axios.post(`${CreateUrl}/sendMessagePersonal`,{
			message:message,
			participants:participants,
			owner:owner
		});

		const {data}=messageResponse;
		const messageData=data.data;
		return messageData;

	}catch(err){
		console.log(err);
		return err;
	}
}


export const createChat=async(owner,message,participants)=>{
	try{
		const messageResponse=await axios.post(`${CreateUrl}/createMessagePersonal`,{
			message:message,
			participants:participants,
			owner:owner
		});

		const {data}=messageResponse;
		const messageData=data.data;
		return messageData;

	}catch(err){
		console.log(err);
		return err;
	}
}

//get axios request not allowing me to pass in array values which is why this is here

export const getSymposiumsExplore=async(id,symposiums)=>{
	try{
		debugger;
		const symposiumResponse=await axios.post(`${CreateUrl}/getSymposiumsExplore`,{
				_id:id,
				symposiums:symposiums
		});

		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;

	}catch(err){
		console.log(err);
		return err;
	}
}


export const getSymposiumsFollowed=async(id,symposiumsMap)=>{
	try{
		const symposiumResponse=await axios.get(`${CreateUrl}/getSymposiumsFollowed`,{
				_id:id,
				symposiumsMap:symposiumsMap
		});

		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;
	}catch(err){
		console.log(err);
		return err;
	}
}











