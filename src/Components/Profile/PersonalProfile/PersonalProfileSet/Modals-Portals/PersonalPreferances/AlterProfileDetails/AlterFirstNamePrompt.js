import React,{useContext} from "react";
import UserInput from "./UserInput.js";
import {UserContext} from "../../../../UserContext.js";


const AlterFirstNamePrompt=({closeModal})=>{
	const UserValues=useContext(UserContext);

	const bubbleUpResponse=(userInput)=>{
		alert('First name has been changed');
		UserValues.updateFirstName(userInput);
		closeModal();
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