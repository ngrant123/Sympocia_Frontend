import axios from "axios";

const EmailUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_EMAIL_URL:
				process.env.REACT_APP_TEST_EMAIL_URL;

export const sendAnonymousTipsEmail=async({content})=>{
	try{
		debugger;
		console.log(process.env);
		const anonymousTipResponse=await axios.post(`${EmailUrl}/emailAnonyousSuggestion`,{
			content
		})

		const {data}=anonymousTipResponse;
		return data;
	}catch(err){
		return err;
	}
}
