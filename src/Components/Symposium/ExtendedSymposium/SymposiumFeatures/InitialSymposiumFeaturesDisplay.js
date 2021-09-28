import React from "react";
import Chat from "../Modals/ChatRoom.js";
import SpecificFeatureSymposium from "./SpecificSymposiumFeaturesQuestions/index.js";
import {
	SymposiumChatContainer,
	SymposiumFeatureContainer
} from "../indexCSS.js";

const symposiumFeatures=(props)=>{
	const {
		selectedSymposiumTitle,
		symposiumId,
		chatRoom,
		profileId,
		socket,
		closeSymposiumFeatureModal,
		headerAnimation,
		symposiumUniversityQuestions,
		isGuestProfile,
		displaySpecficSymposiumFeature,
		isSimplified
	}=props;

	if(selectedSymposiumTitle=="General"||
		selectedSymposiumTitle=="Religion"||
		selectedSymposiumTitle=="Gaming"||
		selectedSymposiumTitle=="Philosophy"){
		const features={
			requestedComponent:<Chat
							  		roomId={symposiumId}
							  		chat={chatRoom}
							  		profileId={profileId}
							  		socket={socket}
							  		closePostModal={closeSymposiumFeatureModal}
							  		isSimplified={isSimplified}
								/>,
			isGeneral:true
		}
		return features;
	}else{
		return {requestedComponent:<SpecificFeatureSymposium
							  			symposium={selectedSymposiumTitle}
							  			symposiumId={symposiumId}
							  			questions={symposiumUniversityQuestions}
							  			isGuestProfile={isGuestProfile}
							  			isSimplified={isSimplified}
							  		/>
		  	}
	}
	
}
const symposiumFeaturesAndChat=(props)=>{
	const {requestedComponent,isGeneral}=symposiumFeatures(props);
  	return (
  		<>
	  		{isGeneral==true?
	  			<SymposiumChatContainer>
		  			{requestedComponent}
				</SymposiumChatContainer>
			  	:<SymposiumFeatureContainer headerAnimation={props.headerAnimation}>
				  	{requestedComponent}
			  	</SymposiumFeatureContainer>
	  		} 
  		</>
  	)
  }

const InitialSymposiumFeaturesDisplay=(props)=>{
	const {
		headerAnimation,
		displaySpecficSymposiumFeature
	}=props;

	return(
		<React.Fragment>
			{(headerAnimation==false || displaySpecficSymposiumFeature==true)==true && (
				<React.Fragment>
					{symposiumFeaturesAndChat(props)}
				</React.Fragment>
			)}
		 </React.Fragment>
	)
}
export{
	InitialSymposiumFeaturesDisplay,
	symposiumFeaturesAndChat,
	symposiumFeatures
}






