import axios from "axios";
import BASE_URL from "./Constants.js";

const baseurl=""+BASE_URL.BASE_URL;

export function getNewFeedUpdates(userId){

	console.log(BASE_URL.BASE_URL);


	axios.get(`${BASE_URL}Posts`,{ userId }).
		then(response=>{

			console.log(response.data);
		});

}

export function getNotificationsUpdate(userId){

	axios.get(`${BASE_URL}Notifications`, { userId }).
		then(response=>{

			console.log(response.data);
		})
}

export function sendUsersNewsFeedAddition(newsfeed,userId){

	axios.put(`${BASE_URL}InsertNewsFeed`,{ newsfeed, userId }).
		then(response=>{

			console.log(response.data);

		})

}