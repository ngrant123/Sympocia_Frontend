import axios from "axios";
import BASE_URL from "./Constants.js";

const baseurl=""+BASE_URL.BASE_URL;

export function getNewFeedUpdates(userId){


	axios.get(`${baseurl}Posts`,{ userId }).
		then(response=>{

			console.log(response.data);
		}).
		catch(err =>{

			console.log(err);

		});

}

export function getNotificationsUpdate(userId){

	axios.get(`${baseurl}Notifications`, { userId }).
		then(response=>{

			console.log(response.data);
		})
}

export function sendUsersNewsFeedAddition(newsfeed,userId){

	axios.put(`${baseurl}InsertNewsFeed`,{ newsfeed, userId }).
		then(response=>{

			console.log(response.data);

		})

}