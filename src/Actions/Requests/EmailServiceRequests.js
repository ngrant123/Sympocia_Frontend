import axios from "axios";

const EmailUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_EMAIL_URL:
				process.env.REACT_APP_TEST_EMAIL_URL;

export const sendAnonymousTipsEmail=async({content})=>{
	try{
		const anonymousTipResponse=await axios.post(`${EmailUrl}/emailAnonyousSuggestion`,{
			content
		})

		const {data}=anonymousTipResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const sendResetEmail=async(targetEmail)=>{
	try{
		const sendResetEmailResponse=await axios.post(`${EmailUrl}/sendResetEmail`,{
			targetEmail
		})
		const {data}=sendResetEmailResponse
		return data;
	}catch(err){
		return err;
	}
}

export const verifyCode=async(targetEmail,code)=>{
	try{
		const VerificationCodeResponse=await axios.get(`${EmailUrl}/verfiyCode`,{
			params:{
				targetEmail,
            	code
			}
		})
		const {data}=VerificationCodeResponse;
		return data;
	}catch(err){
		return err;
	}
}
