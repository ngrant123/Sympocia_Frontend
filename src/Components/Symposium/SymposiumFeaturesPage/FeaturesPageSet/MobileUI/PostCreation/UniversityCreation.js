import React,{useState,useContext} from "react";
import styled from "styled-components";
import {MobileUIContext} from "../MobileUIContext.js";
import PostCreation from "../../../FeaturesPageSet/Modals-Portals/SymposiumUniversity/UniversityPostCreation.js";
import PortalsHOC from "../../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";

const UniversityPostCreation=({
	currentSymposiumId,
	headerQuestions,
	currentQuestionIndex,
	selectedTextKnowledgeLevel})=>{

	const [displayUniversityPostUpload,changeUniversityUploadDisplay]=useState(true);
	const mobileUIContextInformation=useContext(MobileUIContext);

	const closeModal=()=>{
		mobileUIContextInformation.unDoButtonClickedStatus();
		changeUniversityUploadDisplay(false);
	}
	return(
		<React.Fragment>
			{displayUniversityPostUpload==true &&(
				<PortalsHOC
					closeModal={closeModal}
					component={
						<PostCreation
							closeModal={closeModal}
							selectedUploadType={headerQuestions[currentQuestionIndex].questionType}
							symposiumId={currentSymposiumId}
							questionId={headerQuestions[currentQuestionIndex].questionId}
							selectedTextKnowledgeLevel={selectedTextKnowledgeLevel}
						/>
					}
				/>
			)}
		</React.Fragment>
	)
}

export default UniversityPostCreation;