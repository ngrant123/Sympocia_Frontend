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

export function getProfile(userId){


	const getUrl='localhost:4000/api/seacrh';

	axios.get(`${getUrl}/`,{
		params:{
			id:userId
		}
	}).then(profile=>{
		return profile;

	}).catch(err=>{
		return err.message
	})

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