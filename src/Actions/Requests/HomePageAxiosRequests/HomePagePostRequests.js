import BASE_URL from "../Constants.js";
import axios from "axios";

const baseurl=BASE_URL.BASE_URL;

export function sendUserCommentAddition(comment,userId,postId,industryId){

	/*

	comment:Object
	userId:Integer
	postId:integer
	industryId:integer

	*/

	axios.post(`${baseurl}/InsertComment`,{

			params:{
				commment:comment
				userid:userId,
				postid:postId,
				industryid:industryId
			}
		}).then(res=>{

			console.log(res.data);

		}).catch(err=>{

			console.log(err.message);
		})
	

}

export function sendUserReplyAdditino(reply,userId,postId,industryid){

	/*

	reply:Object
	userId:integer
	postId:integer
	industryid:integer

	*/

	axios.post(`${baseurl}/InsertReplyUnderComment`,{

		params:{
			reply:reply,
			userid:userId,
			postid:postId,
			industryid:industryId

		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);
	})
}

export function changeShortCompanyBio(userId,companyShortBio){
	/*
	userId:integer
	companyShort:String

	*/

	axios.post(`${baseurl}/changeShortBio`,{
		params:{
			userid:userId,
			companyshortbio:companyShortBio

		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);

	})

}

export function changeCompanyIndustry(userId,industryChange){

	/*
		userid:integer
		industrychange:integer
	*/

	axios.post(`${baseurl}/changeIndustry`,{

		params:{
			userid:userId,
			industrychange:industryChange
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);

	})

}

export function changeCompanyName(userId,companyName){

	/*
		userId:integer
		companyname:integer
	*/

	axios.post(`${baseurl}/changeCompanyName`,{

		params:{
			userid:userId,
			companyName:companyName

		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);
	})
}

export function changeEmployeesData(userId,employeeData){
		/*
			userId:integer
			employeeData:object

		*/

		axios.post(`${baseurl}/changeEmployeeData`,{

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

export function Upgrade(userId,upgradeId){	

	/*
		userId:integer
		upgradeId:integer
	*/

	axios.post(`${baseurl}/Upgrade`,{

		params:{
			userid:userId,
			upgradeid:upgradeId
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{

		console.log(err.message);
	})

}

export function sendUsersNewsFeedAddition(newsfeed,userId,industId){
	/*
	userId:integer
	newsfeed:object

	*/
	axios.post(`${baseurl}/InsertIntoNewsFeed`, { params: 
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