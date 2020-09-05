//import BASE_URL from "../Constants.js";
import axios from "axios";

//const baseurl=BASE_URL.BASE_URL;
const SetUrl="http://localhost:4000/api/posts/alter";

/*
export function sendUserCommentAddition(comment,userId,postId,industryId){



	axios.post(`${baseurl}/InsertComment`,{

			params:{
				commment:comment,
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

export function sendUserReplyAdditino(reply,userId,postId,industryId){



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

*/

export const createGroupVideoCall=async({title,owner,description,_id})=>{
	try{
		const groupVideoCallResponse=await axios.post(`${SetUrl}/createGroupVideoCall`,{
			title:title,
			ownerId:owner,
			description:description,
			_id:_id
		});
		const {data}=groupVideoCallResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const testGroupCAll=async(socket,data)=>{
	try{
		const testGroupCAll=await axios.post(`${SetUrl}/testGroupCAll`,{
			data:data
		});

	}catch(err){
		console.log(err);
		return err;
	}
}















