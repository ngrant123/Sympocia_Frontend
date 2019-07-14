import axios from "axios";
import BASE_URL from "../Constants.js";

const baseurl=""+BASE_URL.BASE_URL;

export function getNewFeedUpdates(userId){

	console.log(BASE_URL.BASE_URL);


	axios.get(`${baseurl}/Posts`,{ 

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

	axios.get(`${baseurl}/Notifications`, { 

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