import axios from "axios";
import BASE_URL from "../../../Constants/constants.js";

const baseurl=BASE_URL.BASE_URL;
const SearchUrl='http://localhost:4000/api/profile/search';

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
			userid:userId
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

export async function getProfile(userId){

	try{
		const profile=await axios.get(`${SearchUrl}`,{
			params:{
				id:userId
			}
		});

		const {data}=profile;
		const profileData=data.data;
		return profileData

	}catch(err){
		console.log(err.message);
	}
	
}



export function getVideos(profileId){

	axios.get(`${SearchUrl}/getVideos`,{
		_id:profileId
	}).then(videos=>{
		return videos;
	}).catch(err=>{
		console.log(err.message);
	})
} 

export function getImages(profileId){

	axios.get(`${SearchUrl}/getImages`,{
		_id:profileId
	}).then(images=>{
		return images;
	}).catch(err=>{
		console.log(err.message);
	})
}

export function getBlogs(profileId){


	axios.get(`${SearchUrl}/getBlogs`,{
			_id:profileId
		}).then(blogs=>{
			return blogs;
		}).catch(err=>{
			console.log(err.message);
		})
}


export async function getProfileByName(profileName){	

	try{

		const profile=await axios.get(`${SearchUrl}/getProfileByName`,{
				params:{
					name:profileName
				}
			});

		const {data}=profile;
		return profile;

	}catch(err){
		console.log(err.message);
		return err.message;
	}
}

export async function getInvestorsInIndustryAndArea(investorsSearchCriteria){

	try{
		console.log("Test api calls");
		const {industry,location}=investorsSearchCriteria;
		console.log(investorsSearchCriteria);
		const industryArray=[];
		industryArray.push(industry);
		const investorProfiles=await axios.get(`${SearchUrl}/getInvestorProfiles`,{
			params:{
				industry:industryArray,
				location:location
			}
		});

		const {data}=investorProfiles;
		const investorResults=data.data;
		return investorResults;

	}catch(err){
		console.log(err.message);
		return err.message;
	}
}

export async function getNewestInvestors(investors){

	try{

		const newestInvestors=await axios.get(`${SearchUrl}/getNewestInvestors`,{
			params:{
				investos:investors
			}
		})


		const{data}=newestInvestors;
		const result=data.data;
		return data;

	}catch(err){
		console.log(err.message);
	}
}

export async function getActiveInvestors(investors){
	try{
		const activeInvestors=await axios.get(`${SearchUrl}/getActiveInvestors`,{
			params:{
				investos:investors
			}
		})


		const{data}=activeInvestors;
		const result=data.data;
		return data;


	}catch(err){
		console.log(err.message);
	}
}


export async function getMostPopular(investors){
	try{
		const mostPopularInvestors=await axios.get(`${SearchUrl}/getMostPopularInvestors`,{
			params:{
				investos:investors
			}
		})

		const{data}=mostPopularInvestors;
		const result=data.data;
		return data;


	}catch(err){
		console.log(err.message);
	}
}









