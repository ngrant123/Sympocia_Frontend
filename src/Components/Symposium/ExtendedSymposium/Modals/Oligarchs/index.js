import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {BackgroundModalContainer} from "../../indexCSS.js";
import ElectionDisplay from "./ElectionDisplay.js";
import ExtendedOligarichElectionCard from "./ExtendedOligarchElectionCard.js";
import CreationSubmission from "./CreateSubmission.js";
import CurrentOligarchs from "./CurrentOligarchs.js";
import OligarchOnboarding from "../../../../OnBoarding/OligarchOnboarding.js";
import {
	retrieveProfileFirstTimeViewingCompetitionStatus
} from "../../../../../Actions/Requests/OligarchRequests/OligarchRetrieval.js";

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

		#currentOligarchsDropDown{
			margin-left:-200px !important;
		}
	}

	@media screen and (max-width:650px){
		height:80%;
		#electionSpeechDiv{
			margin-bottom:15% !important;
		}
		#mobileOligarchOptionsDropDown{
			display:block !important;
		}
		#desktopOligarchDisplay{
			display:none !important;
		}

		#desktopCreationIcon{
			display:none !important;
		}

		#mobileDropDown{
			width:200px !important;
			height:200px !important;
			padding:20px !important;
		}

		#backButtonCurrentOligarchs{
			display:block !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:10%;
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

const Oligarchs=({symposiumId,closeOligarchModal,profileId})=>{
	const [oligarchModalType,changeOligarchsModalType]=useState("Election");
	const [selectedElectionCardInformation,changeSelectionCardInformation]=useState();
	const [newContestant,changeNewContestant]=useState();
	const [displayOnboardingModal,changeDisplayOnboarding]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveProfileFirstTimeViewingCompetitionStatus(profileId);
			if(confirmation=="Success"){
				const {message}=data;
				changeDisplayOnboarding(message);
			}
		}
		fetchData();
	},[]);


	const displayElectionCard=(data)=>{
		changeOligarchsModalType("ElectionCard");
		changeSelectionCardInformation(data);
	}
	const closeModalAndDisplayElection=()=>{
		changeOligarchsModalType("Election");
	}
	const displayCurrentOligarchsMobile=()=>{
		changeOligarchsModalType("CurrentOligarchs");
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
							symposiumId={symposiumId}
							displayCurrentOligarchsMobile={displayCurrentOligarchsMobile}
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
							symposiumId={symposiumId}
						/>
			}
			case "CurrentOligarchs":{
				return <CurrentOligarchs
							symposiumId={symposiumId}
							closeModal={closeModalAndDisplayElection}
						/>	
			}
		}
	}

	const closeOligarchOnboardingModal=()=>{
		changeDisplayOnboarding(false);
	}

	const oligarchOnboardModal=()=>{
		return(
			<React.Fragment>
				{displayOnboardingModal==true &&(
					<OligarchOnboarding
						closeModal={closeOligarchOnboardingModal}
						profileId={profileId}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			<Container>
				{oligarchOnboardModal()}
				{modalDecider()}
			</Container>

			<BackgroundModalContainer 
				onClick={()=>closeOligarchModal()}
			/>
		</React.Fragment>
	)
}

export default Oligarchs;