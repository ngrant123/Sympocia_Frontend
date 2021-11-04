import axios from "axios";

const SearchUrl=process.env.NODE_ENV=="production"?
	process.env.REACT_APP_PAYMENT_PAGE_GET_URL:
	process.env.REACT_APP_TEST_PAYMENT_PAGE_GET_URL


export const retrieveItemizedOptions=async()=>{
	try{
		const itemizedOptionsResponse=await axios.get(`${SearchUrl}/retrieveItemizedOptions`);
		const {data}=itemizedOptionsResponse;
		return data;
	}catch(err){
		throw err;
	}
} 