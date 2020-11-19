//import BASE_URL from "../Constants.js";
import axios from "axios";

//const baseurl=BASE_URL.BASE_URL;
const SetUrl=process.env.NODE_ENV=='production'?
			 process.env.REACT_APP_HOME_SET_URL:
			 process.env.REACT_APP_TEST_HOME_SET_URL;

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















