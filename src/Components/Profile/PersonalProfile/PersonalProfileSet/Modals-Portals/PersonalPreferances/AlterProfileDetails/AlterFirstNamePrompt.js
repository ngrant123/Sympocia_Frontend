import React from "react";
import UserInput from "./UserInput.js";


const AlterFirstNamePrompt=({closeModal})=>{
	const bubbleUpResponse=(userInput)=>{

	}
	return(
		<React.Fragment>
			<UserInput
				closeModal={closeModal}
				bubbleUpResponse={bubbleUpResponse}
			/>
		</React.Fragment>
	)
}

export default AlterFirstNamePrompt;