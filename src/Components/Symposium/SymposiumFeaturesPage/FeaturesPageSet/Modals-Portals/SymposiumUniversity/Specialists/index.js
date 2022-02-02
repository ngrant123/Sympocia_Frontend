import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Creation from "./Creation.js";
import SpecialistsView from "./SpecialistsView.js";
import ExtendedSpecialist from "./ExtendedSpecialist.js";
import {
	getSymposiumSpecialists,
	retrieveOwnerSpecificSubmittedSpecialist
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";


const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;

const SpecialistsModal=(props)=>{

	const {
		closeModal,
		selectedSymposiumSpecialist,
		currentSymposiumId,
		isGuestProfile,
		profileSpecificSpecialistRequest,
		ownerId
	}=props;

	const [highlightedSpecialist,changeHighLightedSpecialist]=useState(selectedSymposiumSpecialist);
	const [displayCreation,changeDispalyCreation]=useState(false);
	const [specialists,changeSpecialists]=useState([]);

	useEffect(()=>{
		if(profileSpecificSpecialistRequest==true){
			retrieveOwnerSubmittedSpecialists();
		}else{
			fetchData();
		}
	},[]);


	const fetchData=async()=>{
		if(highlightedSpecialist==null){
			const{confirmation,data}=await getSymposiumSpecialists(currentSymposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeSpecialists([...message]);
			}else{	
				alert('Unfortunately there has been an error retrieving this symposims specialists. Please try again');
			}
		}
	}

	
	const retrieveOwnerSubmittedSpecialists=async()=>{
		const {confirmation,data}=await retrieveOwnerSpecificSubmittedSpecialist(currentSymposiumId,ownerId);

		if(confirmation=="Success"){
			const {message}=data;
			changeSpecialists([...message]);
		}else{
			alert('Unfortunately an error has occured when retreiving your submitted specalists. Please try again');
		}
	}


	const triggerBackButton=()=>{
		changeHighLightedSpecialist(null);
		if(displayCreation==true && selectedSymposiumSpecialist==null){
			changeDispalyCreation(false);
		}else if(selectedSymposiumSpecialist!=null){
			closeModal();
		}else if(highlightedSpecialist!=null && selectedSymposiumSpecialist==null){
			changeDispalyCreation(false);
		}
	}

	const triggerCreationModal=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeDispalyCreation(true);
		}
	}

	const displayHighLightedSpecialist=(specialistData)=>{
		changeHighLightedSpecialist(specialistData);
	}


	const triggerAddSymposiumSpecialist=(specialist)=>{
		const currentSpecialists=specialists;
		currentSpecialists.splice(0,0,specialist);
		changeSpecialists([...currentSpecialists]);
		triggerBackButton();
	}

	const removeSpecialist=(selectedSymposiumSpecialistId)=>{
		for(var i=0;i<specialists.length;i++){
			if(specialists[i]._id==selectedSymposiumSpecialistId){
				specialists.splice(i,1);
				break;
			}
		}
		changeSpecialists([...specialists]);
		changeHighLightedSpecialist(null);
	}

	return(
		<Container>	
			{displayCreation==true?	
				<Creation
					closeModal={triggerBackButton}
					triggerAddSymposiumSpecialist={triggerAddSymposiumSpecialist}
					symposiumId={currentSymposiumId}
				/>:
				<React.Fragment>
					{highlightedSpecialist!=null?
						<ExtendedSpecialist
							selectedSymposiumSpecialist={highlightedSpecialist}
							closeModal={triggerBackButton}
							isGuestProfile={isGuestProfile}
							removeSpecialist={highlightedSpecialist==null?null:removeSpecialist}
						/>:
						<SpecialistsView
							specialists={specialists}
							triggerCreationModal={triggerCreationModal}
							displayHighLightedSpecialist={displayHighLightedSpecialist}
							closeModal={triggerBackButton}
							isGuestProfile={isGuestProfile}
						/>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default SpecialistsModal;