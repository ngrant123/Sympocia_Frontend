import constants from "../Constants.js";
import axios from "axios";

const baseUrl=constants.BASE_URL;



export function markInvestorContacted(investorId){


	axios.post(`${baseUrl}/markContacted`,{

		params:{
			investorId:investorId
		}
	}).then(res=>{

	}).catch(err=>{
	})
}