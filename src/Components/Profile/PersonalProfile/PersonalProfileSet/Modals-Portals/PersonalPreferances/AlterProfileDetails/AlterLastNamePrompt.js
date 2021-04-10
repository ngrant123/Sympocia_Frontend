import React from "react";
import UserInput from "./UserInput.js";

const AlterLastNamePrompt=({closeModal})=>{
	const bubbleUpResponse=(userInput)=>{
		alert('Last name has been changed');
		closeModal();
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



