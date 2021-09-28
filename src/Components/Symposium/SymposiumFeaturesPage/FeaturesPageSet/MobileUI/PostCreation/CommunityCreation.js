import React,{useState,useContext} from "react";
import styled from "styled-components";
import PortalsHOC from "../../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";
import PostCreation from "../../../FeaturesPageSet/Modals-Portals/SymposiumCommunity/CommunityPostCreation.js";
import {MobileUIContext} from "../MobileUIContext.js";

const CommunityPostCreation=({currentSymposiumId,headerQuestions,currentQuestionIndex})=>{
	const [displayCommunityPostCreation,changeDisplayCommunityPostCreation]=useState(true);
	const mobileUIContextInformation=useContext(MobileUIContext);

	const closeModal=()=>{
		mobileUIContextInformation.unDoButtonClickedStatus();
		changeDisplayCommunityPostCreation(false);
	}
	return(
		<React.Fragment>
			{displayCommunityPostCreation==true &&(
				<PortalsHOC
					closeModal={closeModal}
					component={
						<PostCreation
							closeModal={closeModal}
							symposiumId={currentSymposiumId}
							questions={headerQuestions}
							questionId={headerQuestions[currentQuestionIndex]._id}
							currentQuestionType={headerQuestions[currentQuestionIndex].questionType}
						/>
					}
				/>
			)}
		</React.Fragment>
	)
}


export default CommunityPostCreation;