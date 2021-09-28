import React,{useContext} from "react";
import styled from "styled-components";
import BeaconsCreation from "./BeaconCreation.js";
import CommunityCreation from "./CommunityCreation.js";
import UniversityPostCreation from "./UniversityCreation.js";
import {useSelector} from "react-redux";
import {FeaturesContext} from "../../FeaturesPageContext.js";

const PostCreation=({featurePageType,creationButtonClick})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPagePrimaryInformation,
		updatePrimaryPosts,
		currentSymposiumId,
		isDesktop
	}=featuresPageConsumer;

	const postCreationDecider=()=>{
		switch(featurePageType){
			case "Beacons":{
				return <BeaconsCreation
							featuresPagePrimaryInformation={featuresPagePrimaryInformation}
							updatePrimaryPosts={updatePrimaryPosts}
							currentSymposiumId={currentSymposiumId}
							isDesktop={isDesktop}
							personalInformation={personalInformation}
						/>
			}

			case "Community":{
				const {
					headerQuestions,
					currentIndex
				}=featuresPagePrimaryInformation;

				return 	<React.Fragment>
							{creationButtonClick==true &&(
								<CommunityCreation
									currentSymposiumId={currentSymposiumId}
									headerQuestions={headerQuestions}
									currentQuestionIndex={currentIndex}
								/>
							)}
						</React.Fragment>
			}

			case "University":{
				const {
					headerQuestions,
					currentIndex,
					selectedTextKnowledgeLevel
				}=featuresPagePrimaryInformation;

				return <React.Fragment>
							{creationButtonClick==true &&(
								<UniversityPostCreation
									currentSymposiumId={currentSymposiumId}
									headerQuestions={headerQuestions}
									currentQuestionIndex={currentIndex}
									selectedTextKnowledgeLevel={selectedTextKnowledgeLevel}
								/>
							)}
						</React.Fragment>
			}
		}
	}
	return(
		<React.Fragment>
			{postCreationDecider()}
		</React.Fragment>
	)
}


export default PostCreation;