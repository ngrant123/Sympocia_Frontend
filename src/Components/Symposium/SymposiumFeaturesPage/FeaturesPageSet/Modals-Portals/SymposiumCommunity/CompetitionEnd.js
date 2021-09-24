import React,{useContext,useState,useEffect} from "react";
import styled from "styled-components";
import {FeaturesContext} from "../../../FeaturesPageSet/FeaturesPageContext.js";
import {getSymposiumQuestions} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";


const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;

const CompetitionEndModal=()=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		currentSymposiumName,
		currentSymposiumId,
		updatePrimaryInformation,
		featuresPagePrimaryInformation
	}=featuresPageConsumer;
	const [questions,changeQuestions]=useState([]);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getSymposiumQuestions(currentSymposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeQuestions([...message]);
				let communityPrimaryInformation=featuresPagePrimaryInformation;
				communityPrimaryInformation={
					...communityPrimaryInformation,
					headerQuestions:message
				}
				updatePrimaryInformation(communityPrimaryInformation);
			}else{
				alert("Unfortunately there has been an error retrieving this symposiums questions. Please try again");
			}
		}
		fetchData();
	},[]); 
	return(
		<Container>
			<p style={{fontSize:"20px"}}>
				<b>{currentSymposiumName} competition has ended !!!</b>
			</p>
			<p>Here are this months selected {currentSymposiumName} community questions</p>
			<hr/>
			{questions.map(data=>
				<React.Fragment>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"20px",color:"#C8B0F4"}}>
							<b>{data.question}</b>
						</p>
						<p>Question type:<b style={{marginLeft:"5%"}}>{data.questionType}</b></p>
					</div>
					<hr/>
				</React.Fragment>
			)}
		</Container>
	)
}

export default CompetitionEndModal;