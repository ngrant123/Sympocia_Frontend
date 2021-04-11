import React,{useContext} from "react";
import UserInput from "./UserInput.js";
import {setEmail} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const AlterEmailPrompt=({closeModal})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();


	const bubbleUpResponse=async({userInput,changeSubmittingStatus,isAccessTokenUpdated,updatedAccessToken})=>{
		changeSubmittingStatus(true);
		const {confirmation,data}=await setEmail({
										_id:personalInformation.id,
										submittedEmail:userInput,
										accessToken:isAccessTokenUpdated==true?updatedAccessToken:
										personalInformation.accessToken
									});

		if(confirmation=="Success"){
			alert('Email has been changed');
			closeModal();
		}else{
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
			}else if(statusCode==200){
				alert('This email has been taken please try again.');
			}else{
				alert('An error has occured when changing your email. Please try again');
			}
			changeSubmittingStatus(false);
		}
	}
	return(
		<React.Fragment>
			<UserInput
				closeModal={closeModal}
				editProfileParameter={"email"}
				bubbleUpResponse={bubbleUpResponse}
			/>
		</React.Fragment>
	)
}

export default AlterEmailPrompt;