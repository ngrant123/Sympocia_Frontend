import React,{useState} from "react";
import styled from "styled-components";
import {BackgroundModalContainer} from "../../indexCSS.js";
import ElectionDisplay from "./ElectionDisplay.js";
import ExtendedOligarichElectionCard from "./ExtendedOligarchElectionCard.js";
import CreationSubmission from "./CreateSubmission.js";


const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:60%;
	height:70%;
	z-index:41;
	left:20%;
	top:15%;
	padding:20px;
	display:flex;
	flex-direction:column;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:20%;
		width:65%;
		left:15%;
	}
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	margin-top:2%;
	
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const Oligarchs=({closeOligarchModal})=>{
	const [oligarchModalType,changeOligarchsModalType]=useState("Election");
	const [selectedElectionCardInformation,changeSelectionCardInformation]=useState();
	const [newContestant,changeNewContestant]=useState();


	const displayElectionCard=(data)=>{
		changeOligarchsModalType("ElectionCard");
		changeSelectionCardInformation(data);
	}
	const closeModalAndDisplayElection=()=>{
		changeOligarchsModalType("Election");
	}

	const displayCreationModal=()=>{
		changeOligarchsModalType("Creation");
	}

	const addNewElectionContestant=(contestant)=>{
		changeNewContestant(contestant);
		changeOligarchsModalType("Election");
	}

	const modalDecider=()=>{
		switch(oligarchModalType){
			case "Election":{
				return <ElectionDisplay
							displayElectionCard={displayElectionCard}
							displayCreationModal={displayCreationModal}
							newContestant={newContestant}
						/>
			}
			case "ElectionCard":{
				return <ExtendedOligarichElectionCard
							electionCardInformation={selectedElectionCardInformation}
							closeOligarchCardModal={closeModalAndDisplayElection}
						/>
			}

			case "Creation":{
				return <CreationSubmission
							closeCreationModal={closeModalAndDisplayElection}
							addNewElectionContestant={addNewElectionContestant}
						/>
			}
		}
	}

	return(
		<React.Fragment>
			<Container>
				{modalDecider()}
			</Container>

			<BackgroundModalContainer 
				onClick={()=>closeOligarchModal()}
			/>
		</React.Fragment>
	)
}

export default Oligarchs;