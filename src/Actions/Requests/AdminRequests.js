import axios from "axios";

const AdminUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_ADMIN_URL:
				process.env.REACT_APP_TEST_ADMIN_URL;

export const verifyAdmin=async(token)=>{
	try{
		const verifyAdminResponse=await axios.put(`${AdminUrl}/verifyAdmin`,{
			token
		})

		const {data}=verifyAdminResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const uploadFakePostsAdmin=async(props)=>{
	try{
		const uploadFakePostResponse=await axios.post(`${AdminUrl}/uploadFakePostsAdmin`,{
			...props
		});
		const {data}=uploadFakePostResponse;
		return data;
	}catch(err){
		return err;
	}
}
