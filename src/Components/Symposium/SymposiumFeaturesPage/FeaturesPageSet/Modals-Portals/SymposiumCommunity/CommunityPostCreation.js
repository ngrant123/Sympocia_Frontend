import React,{useContext} from "react";
import styled from "styled-components";
import {QuestionUploadOption} from "../../../../ExtendedSymposium/SymposiumFeatures/SymposiumCommunityPortal.js"
import {useDispatch} from "react-redux";
import {FeaturesContext} from "../../../FeaturesPageSet/FeaturesPageContext.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	width:100%;
	height:100%;
`;

const CommunityPostCreation=(props)=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();
	const featuresPageConsumer=useContext(FeaturesContext);

	const {
		featuresPagePrimaryInformation:{
			headerQuestions,
			responses
		},
		updatePrimaryPosts
	}=featuresPageConsumer;

	const updatePosts=(uploadedPost)=>{
		let currentReplies=responses;
		currentReplies.splice(0,0,uploadedPost);
		updatePrimaryPosts(currentReplies,false);
		props.closeModal();
	}

	return(
		<Container>
			<QuestionUploadOption 
				updatePosts={updatePosts}
				dispatch={dispatch}
				personalInformation={personalInformation}
				userId={personalInformation.id}
				{...props}
			/>
		</Container>
	)
}

export default CommunityPostCreation;