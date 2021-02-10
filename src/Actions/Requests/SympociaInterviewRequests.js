import axios from "axios";


const GetUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_INTERVIEW_GET_URL:
				process.env.REACT_APP_TEST_INTERVIEW_GET_URL;

export const getSympociaInterviews=async({interviewMetaData})=>{
	try{
		const interviewResponse=await axios.get(`${GetUrl}/interviews`,{
			params:{
				interviews:interviewMetaData
			}
		})

		const {data}=interviewResponse;
		return data;
	}catch(err){
		return err;
	}
}