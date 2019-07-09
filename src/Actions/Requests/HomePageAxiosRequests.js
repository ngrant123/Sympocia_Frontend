import axios from "axios";
import BASE_URL from "./Constants.js";

const baseurl=""+BASE_URL.BASE_URL;

export function getNewFeedUpdates(userId){

	console.log(BASE_URL.BASE_URL);


	axios.get(`${BASE_URL}Posts`,{ 

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

	axios.get(`${BASE_URL}Notifications`, { 

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

export function sendUsersNewsFeedAddition(newsfeed,userId){

	axios.put(`${BASE_URL}InsertNewsFeed`, { params: 
			{ 
				newsFeed: newsfeed,
				id: userId
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