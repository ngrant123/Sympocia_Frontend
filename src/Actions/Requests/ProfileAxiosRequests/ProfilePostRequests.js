import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";


const baseurl=BASE_URL.BASE_URL;
const CreateUrl='/api/profile/alter';

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

	}).catch(err=>{
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
	}).catch(err=>{

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

	}).catch(err=>{

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


	}).catch(err=>{
	})
}

export async function createProfile(personalData){
	
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

	const profileCreationResults=await axios.post(`${CreateUrl}/createProfile`,personalInformation);
	const {data}=profileCreationResults;
	return data;
}

export function setBio(personalId,bio){

	axios.post(`${CreateUrl}/setBio`,{
		_id:personalId,
		bio:bio
	}).then(profile=>{
		return profile;
	}).catch(err=>{
	})
}

export async function setProfilePicture(profileId,pictureUrl){
	try{
		const profilePictureVerification=await axios.post(`${CreateUrl}/setProfilePicture`,{
				_id:profileId,
				profilePicture:pictureUrl
			});

		const {data}=profilePictureVerification;
		return data;
	}catch(err){
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
		return err;
	}

}


export const addRecruit=async(personalProfile,targetedProfile)=>{
	try{
		
		const recruitResponse=await axios.post(`${CreateUrl}/addRecruit`,{
			personalProfileId:personalProfile,
			targetProfile:targetedProfile
		});
		const {data}=recruitResponse;
		const recruitData=data.data;
		return recruitData;

	}catch(err){
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
		return err;
	}
}

//get axios request not allowing me to pass in array values which is why this is here

export const getSymposiumsExplore=async(id,symposiums)=>{
	try{
		
		const symposiumResponse=await axios.post(`${CreateUrl}/getSymposiumsExplore`,{
				_id:id,
				symposiums:symposiums
		});

		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;

	}catch(err){
		return err;
	}
}




export const addSymposium=async(profileId,symposium,subSymposium)=>{
	try{
		var symposiumResponse=await axios.post(`${CreateUrl}/addSymposium`,{
			profileId,
			symposium,
			subSymposium
		});
		const {data}=symposiumResponse;
		const symposiumData=data.data;
		return symposiumData;

	}catch(err){
		return err;
	}
}

export const removeSymposium=async(profileId,symposium,subSymposium)=>{
	try{

		var symposiumResponse=await axios.post(`${CreateUrl}/removeSymposium`,{
			profileId,
			symposium,
			subSymposium
		});
		const {data}=symposiumResponse;
		return data;

	}catch(err){
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
		return err;
	}
}


export const completeOnboardingExplorePage=async(id)=>{
	try{
		const onBoardingExplorePageResponse=await axios.put(`${CreateUrl}/onBoardingCompleteExplorePage`,{
			_id:id
		});
		const {data}=onBoardingExplorePageResponse;
		return data;
	}catch(err){
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
		return err;
	}
}


export const completeOnboardingArenaPage=async(id)=>{
	try{
		const onBoardingArenaPageResponse=await axios.post(`${CreateUrl}/onBoardingCompleteArena`,{
			_id:id
		});
		const {data}=onBoardingArenaPageResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const editSocialMediaUrls=async({instagramUrl,tikTokUrl,profileId})=>{
	try{
		const socialMediaResponse=await axios.post(`${CreateUrl}/editSocialMediaUrls`,{
			instagramUrl,
			tikTokUrl,
			profileId
		})
		const {data}=socialMediaResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const removeRecruitProfileIsFollowing=async({personalProfileId,targetProfile})=>{
	try{
		const removedRecruitResponse=await axios.post(`${CreateUrl}/removeRecruitThatProfileFollows`,{
			personalProfileId,
			targetProfile
		})
		const {data}=removedRecruitResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const removeRecruitProfileIsntFollowing=async({personalProfileId,targetProfile})=>{
	try{
		const removedRecruitResponse=await axios.post(`${CreateUrl}/removeRecruitThatProfileDoesntFollow`,{
			personalProfileId,
			targetProfile
		})
		const {data}=removedRecruitResponse;
		return data;
	}catch(err){
		return err;
	}
}


export const changeHasViewedArenaWinnersIndicator=async(_id)=>{
	try{
		const indicatorResponse=await axios.post(`${CreateUrl}/changeHasViewedArenaWinnersIndicator`,{
			_id
		});

		const {data}=indicatorResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const loginProfile=async(email,password)=>{
	try{
		
		const loginResponse=await axios.post(`${CreateUrl}/loginProfile`,{
									email,
									password
							});

		const {data}=loginResponse;
		const loginData=data.data;
		return loginData;
	}catch(err){
		return err;
	}
}









