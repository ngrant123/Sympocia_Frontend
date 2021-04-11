import React,{useContext} from "react";
import UserInput from "./UserInput.js";
import {UserContext} from "../../../../UserContext.js";
import {setLastName} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const AlterLastNamePrompt=({closeModal})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();
	
	const bubbleUpResponse=async({userInput,changeSubmittingStatus,isAccessTokenUpdated,updatedAccessToken})=>{
		changeSubmittingStatus(true);
		const {confirmation,data}=await setLastName({
								_id:personalInformation.id,
								lastName:userInput,
								accessToken:isAccessTokenUpdated==true?updatedAccessToken:
								personalInformation.accessToken
							});

		if(confirmation=="Success"){
			alert('Last name has been changed');
			closeModal();
		}else{
			debugger;
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					bubbleUpResponse,
					dispatch,
					{userInput,changeSubmittingStatus},
					false
				);
			}else{
				alert('An error has occured when changing your last name. Please try again');
				changeSubmittingStatus(false);
			}
		}
	}
	return(
		<UserInput
			closeModal={closeModal}
			editProfileParameter={"last name"}
			bubbleUpResponse={bubbleUpResponse}
		/>
	)
}

export default AlterLastNamePrompt;



