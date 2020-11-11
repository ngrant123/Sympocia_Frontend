import axios from "axios";

const CreateUrl='http://localhost:4000/api/marketing/alter';
const SearchUrl='http://localhost:4000/api/marketing/search';

export const createResponse=async({text,name,profilePicture,email})=>{
	try{
		const response=await axios.post(`${CreateUrl}/createMarketResponse`,{
			text:text,
			profilePicture:profilePicture,
			name:name,
			email:email
		});

		const {data}=response;
		return data;
	}catch(err){
		return err;
	}
}

export const getInterestedProfiles=async(counter)=>{
	try{
		const response=await axios.get(`${SearchUrl}/getMarketingProfilesInterested`,{
			params:{
				counter:counter
			}
		});

		const {data}=response;
		return data;

	}catch(err){
		return err;
	}
}

export const recordEmail=async(email)=>{
	try{
		const recordedEmailResponse=await axios.post(`${CreateUrl}/recordEmail`,{
			email:email
		});

		const {data}=recordedEmailResponse;
		return data;

	}catch(err){
		return err;
	}
}

export const recordEmailCompany=async(email)=>{
		try{
			const recordedEmailResponse=await axios.post(`${CreateUrl}/recordEmailCompany`,{
				email:email
			});

			const {data}=recordedEmailResponse;
			return data;

		}catch(err){
			return err;
		}
}

export const uploadProfilePicture=async({id,profilePicture})=>{
		try{
			const recordedEmailResponse=await axios.post(`${CreateUrl}/uploadProfilePicture`,{
				_id:id,
				profilePicture:profilePicture
			});

			const {data}=recordedEmailResponse;
			return data;

		}catch(err){
			return err;
		}
}

export const verifyCode=async(code)=>{
	try{
		const verificationResponse=await axios.get(`${SearchUrl}/verifyCode`,{
			params:{
				code
			}
		});
		const {data}=verificationResponse;
		return data;
		
	}catch(err){
		return false;
	}
}

