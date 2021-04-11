import React,{useContext} from "react";
import UserInput from "./UserInput.js";
import {UserContext} from "../../../../UserContext.js";
import {setFirstName} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";


const AlterFirstNamePrompt=({closeModal})=>{
	const UserValues=useContext(UserContext);

	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const bubbleUpResponse=async({userInput,changeSubmittingStatus,isAccessTokenUpdated,updatedAccessToken})=>{
		changeSubmittingStatus(true);
		const {confirmation,data}=await setFirstName({
										_id:personalInformation.id,
										firstName:userInput,
										accessToken:isAccessTokenUpdated==true?updatedAccessToken:
										personalInformation.accessToken
									});
		debugger;
		if(confirmation=="Success"){
			alert('First name has been changed');
			UserValues.updateFirstName(userInput);
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
				alert('An error has occured when changing your first name. Please try again');
				changeSubmittingStatus(false);
			}
		}
	}
	return(
		<UserInput
			closeModal={closeModal}
			editProfileParameter={"first name"}
			bubbleUpResponse={bubbleUpResponse}
		/>
	)
}

export default AlterFirstNamePrompt;