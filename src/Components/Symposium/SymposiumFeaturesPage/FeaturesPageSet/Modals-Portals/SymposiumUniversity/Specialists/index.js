import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Creation from "./Creation.js";
import SpecialistsView from "./SpecialistsView.js";
import ExtendedSpecialist from "./ExtendedSpecialist.js";
import {
	getSymposiumSpecialists
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;

const SpecialistsModal=({closeModal,selectedSymposiumSpecialist,currentSymposiumId,isGuestProfile})=>{
	debugger;
	console.log("Specialists Modal");
	console.log(selectedSymposiumSpecialist);

	const [highlightedSpecialist,changeHighLightedSpecialist]=useState(selectedSymposiumSpecialist);
	const [displayCreation,changeDispalyCreation]=useState(false);
	const [specialists,changeSpecialists]=useState([]);

	useEffect(()=>{
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
		fetchData();
	},[]);

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