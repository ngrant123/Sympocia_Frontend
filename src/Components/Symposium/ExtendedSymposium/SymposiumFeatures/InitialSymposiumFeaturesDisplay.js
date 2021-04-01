import React from "react";
import styled from "styled-components";
import Chat from "../Modals/ChatRoom.js";
import SpecificFeatureSymposium from "./SpecificSymposiumFeaturesQuestions/index.js";
import {
	SymposiumChatContainer,
	SymposiumFeatureContainer
} from "../indexCSS.js";

const InitialSymposiumFeaturesDisplay=(props)=>{
	const {
		selectedSymposiumTitle,
		symposiumId,
		chatRoom,
		profileId,
		socket,
		closeSymposiumFeatureModal,
		headerAnimation,
		symposiumFeatureQuestions,
		isGuestProfile,
		displaySpecficSymposiumFeature
	}=props;
	const symposiumFeaturesAndChat=()=>{
	  	return (
	  		<>
		  		{(selectedSymposiumTitle=="General"||
					selectedSymposiumTitle=="Religion"||
					selectedSymposiumTitle=="Gaming"||
					selectedSymposiumTitle=="Philosophy")?
		  			<SymposiumChatContainer>
			  			<Chat
					  		roomId={symposiumId}
					  		chat={chatRoom}
					  		profileId={profileId}
					  		socket={socket}
					  		closePostModal={closeSymposiumFeatureModal}
						/>
					</SymposiumChatContainer>
				  	:<SymposiumFeatureContainer headerAnimation={headerAnimation}>
					  	<SpecificFeatureSymposium
				  			symposium={selectedSymposiumTitle}
				  			symposiumId={symposiumId}
				  			questions={symposiumFeatureQuestions}
				  			isGuestProfile={isGuestProfile}
				  		/>
				  	</SymposiumFeatureContainer>
		  		} 
	  		</>
	  	)
	  }

	return(
		<React.Fragment>
			{(headerAnimation==false || displaySpecficSymposiumFeature==true)==true && (
				<React.Fragment>
					{symposiumFeaturesAndChat()}
				</React.Fragment>
			)}
		 </React.Fragment>
	)
}
export default InitialSymposiumFeaturesDisplay;






