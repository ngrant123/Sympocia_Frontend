import React from "react";
import UserInput from "./UserInput.js";

const AlterEmailPrompt=({closeModal})=>{
	const bubbleUpResponse=(userInput)=>{
		alert('Email has been changed');
		closeModal();
	}
	return(
		<React.Fragment>
			<p>Your current email is:</p>
			<UserInput
				closeModal={closeModal}
				editProfileParameter={"email"}
				bubbleUpResponse={bubbleUpResponse}
			/>
		</React.Fragment>
	)
}

export default AlterEmailPrompt;