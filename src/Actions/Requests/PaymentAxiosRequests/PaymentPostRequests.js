import axios from "axios";

const CreateURL=process.env.NODE_ENV=="production"?
	process.env.REACT_APP_PAYMENT_PAGE_SET_URL:
	process.env.REACT_APP_TEST_PAYMENT_PAGE_SET_URL;


export const createCharge=async(chargeInformation)=>{
	try{
		const chargeResponse=await axios.post(`${CreateURL}/processCharge`,{
			...chargeInformation
		});
		const {data}=chargeResponse;
		return data;
	}catch(err){
		throw err;
	}
}
