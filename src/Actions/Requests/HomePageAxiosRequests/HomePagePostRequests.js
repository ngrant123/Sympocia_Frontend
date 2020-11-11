//import BASE_URL from "../Constants.js";
import axios from "axios";

//const baseurl=BASE_URL.BASE_URL;
const SetUrl="http://localhost:4000/api/posts/alter";

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
		return err;
	}
}

export const testGroupCAll=async(socket,data)=>{
	try{
		const testGroupCAll=await axios.post(`${SetUrl}/testGroupCAll`,{
			data:data
		});

	}catch(err){
		return err;
	}
}















