import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {ImagePostUpload} from "../../../../ExtendedSymposium/SymposiumFeatures/University/UniversityPosts/ImagePostModal.js";
import {VideoPostUpload} from "../../../../ExtendedSymposium/SymposiumFeatures/University/UniversityPosts/VideoPostModal.js";
import {TextPostUpload} from "../../../../ExtendedSymposium/SymposiumFeatures/University/UniversityPosts/RegularPostModal.js";
import {AudioPostUpload} from "../../../../ExtendedSymposium/SymposiumFeatures/University/UniversityPosts/AudioPostModal.js";
import {useSelector} from "react-redux";
import {FeaturesContext} from "../../../FeaturesPageSet/FeaturesPageContext.js";

const Container=styled.div`
	width:100%;
	height:100%;
`;

const UniversityPostCreation=({closeModal,selectedUploadType,symposiumId,questionId,selectedTextKnowledgeLevel})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const featuresPageConsumer=useContext(FeaturesContext);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);
	const {
		featuresPagePrimaryInformation:{
			headerQuestions,
			currentPostQuestionReplies
		},
		updatePrimaryPosts
	}=featuresPageConsumer;


	const triggerUIChange=()=>{
		if(window.innerWidth<740){
			changeDisplayPhoneUI(true);

		}else{
			changeDisplayPhoneUI(false);
		}
	}

	window.addEventListener('resize',triggerUIChange);
	useEffect(()=>{
		triggerUIChange();
	},[]);
	const updatePosts=(post)=>{
		let currentReplies=currentPostQuestionReplies;
		currentReplies.splice(0,0,post);
		updatePrimaryPosts(currentReplies,false);
		closeModal();
	}

	const closeCreationModal=()=>{
		closeModal();
	}

	const postModalDecider=()=>{
		const postUniversityProps={
			closeModal,
			symposiumId,
			questionId,
			userId:personalInformation.id,
			personalInformation,
			updatePosts,
			selectedUploadType
		}
		switch(selectedUploadType){
			case "Image":{
				return <ImagePostUpload {...postUniversityProps}/>
			}

			case "Video":{
				return <VideoPostUpload 
							{...postUniversityProps}
							displayPhoneUI={displayPhoneUI}
						/>
			}

			case "Text":{
				return <TextPostUpload
							{...postUniversityProps}
							displayCurrentLevel={selectedTextKnowledgeLevel}
							closeCreationModal={closeCreationModal}
						/>
			}

			case "Audio":{
				return <AudioPostUpload {...postUniversityProps}/>
			}
		}
	}
	return(
		<Container>
			{postModalDecider()}
		</Container>
	)
}

export default UniversityPostCreation;