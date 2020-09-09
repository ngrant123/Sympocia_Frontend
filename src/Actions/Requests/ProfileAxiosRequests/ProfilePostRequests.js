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




export const addSymposium=async(profileId,symposium,subSymposium)=>{
	try{
		var symposiumResponse=await axios.post(`${CreateUrl}/addSymposium`,{
			profileId:profileId,
			symposium:symposium,
			subSymposium:subSymposium
		});
		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const removeSymposium=async(profileId,symposium,subSymposium)=>{
	try{

		var symposiumResponse=await axios.post(`${CreateUrl}/removeSymposium`,{
			profileId:profileId,
			symposium:symposium,
			subSymposium:subSymposium
		});
		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const concatVideoTogether=async(videos)=>{
	try{
		const concatedVideos=await axios.post(`${CreateUrl}/concatVideos`,{
			videosArray:videos
		});
		const {data}=concatedVideos;
		return data.data;
	}catch(err){
		console.log(err);
		return err;
	}
}



export const createLevel=async({name,description,recruits,_id,nodeCounter})=>{
	try{
		const levelResponse=await axios.post(`${CreateUrl}/createLevel`,{
			name:name,
			description:description,
			recruits:recruits,
			_id:_id,
			nodeCounter:nodeCounter
		});
		const {data}=levelResponse;
		return data;

	}catch(err){
		return err;
	}
}


export const removeLevel=async({_id,levelId})=>{
	try{
		const levelResponse=await axios.post(`${CreateUrl}/removeLevel`,{
			_id:_id,
			levelId:levelId
		});
		const {data}=levelResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const changeRecruitLevelStatus=async({recruitId,_id,levelCounter})=>{
	try{

		const levelResponse=await axios.post(`${CreateUrl}/changeRecruitLevelStatus`,{
			recruitId:recruitId,
			_id:_id,
			levelCounter:levelCounter
		});
		const {data}=levelResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const editNodeInformation=async({_id,name,levelId,description})=>{
	try{
		const levelResponse=await axios.post(`${CreateUrl}/editNodeInformation`,{
			_id:_id,
			name:name,
			description:description,
			levelId:levelId
		});
		const {data}=levelResponse;
		return data;

	}catch(err){
		return err;
	}
}


export const promoteRecruitRequest=async({node,selectedRecruits,_id})=>{
	try{
		const promoteRecruitResponse=await axios.post(`${CreateUrl}/promoteRecruit`,{
													node:node,
													recruits:selectedRecruits,
													_id:_id
												});
		const {data}=promoteRecruitResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const completeOnboardingPersonalPage=async(id)=>{
	try{
		const onBoardingPersonalPageResponse=await axios.post(`${CreateUrl}/onBoardingCompletePersonalPage`,{
			_id:id
		});
		const {data}=onBoardingPersonalPageResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}


export const completeOnboardingExplorePage=async(id)=>{
	try{
		const onBoardingExplorePageResponse=await axios.post(`${CreateUrl}/onBoardingCompleteExplorePage`,{
			_id:id
		});
		const {data}=onBoardingExplorePageResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const completeOnboardingSymposiumPage=async(id)=>{
	try{
		const onBoardingSymposiumPageResponse=await axios.post(`${CreateUrl}/onBoardingCompleteSymposiumPage`,{
			_id:id
		});
		const {data}=onBoardingSymposiumPageResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}












