import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	retrieveOwnerSpecificResources,
	getSymposiumResources
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import CreateResources from "./CreateResource.js";
import Resources from "./Resources.js";
import SelectedResource from "./SelectedResource.js";


const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;

const InputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:50px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
`;



const SymposiumResources=(props)=>{
	const {
		closeModal,
		symposiumId,
		selectedResource,
		isGuestProfile,
		profileSpecificResourcesRequest,
		ownerId
	}=props;
	console.log("Test");
debugger;
	const [resources,changeResources]=useState([]);
	const [createResources,changeCreateResourceDisplay]=useState(false);
	const [highLightedResource,changeHighLightedResource]=useState(selectedResource);

	useEffect(()=>{

		if(profileSpecificResourcesRequest){
			retrieveOwnerSubmittedSpecialists();
		}else{
			fetchData();
		}
	},[]);


	const retrieveOwnerSubmittedSpecialists=async()=>{
		const {confirmation,data}=await retrieveOwnerSpecificResources(symposiumId,ownerId);

		if(confirmation=="Success"){
			const {message}=data;
			changeResources([...message]);
		}else{
			alert('Unfortunately an error has occured when retreiving your submitted resources. Please try again');
		}
	}

	const fetchData=async()=>{
		const {confirmation,data}=await getSymposiumResources(symposiumId);
		if(confirmation=="Success"){
			const {message}=data;
			changeResources([...message]);
		}else{	
			alert('Unfortunately there has been an error retrieving this symposium resources. Please try again');
		}
	}


	const displayCreateResource=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeCreateResourceDisplay(true);
		}
	}

	const closeCreationModal=()=>{
		changeCreateResourceDisplay(false);
	}

	const triggerAddSymposiumResource=(resource)=>{
		const currentResources=resources;
		currentResources.splice(0,0,resource);
		changeResources([...currentResources]);
		closeCreationModal();
	}

	const displayHighLightedResource=(resource)=>{
		changeHighLightedResource(resource);
	}

	const closeSelectedResourceModal=()=>{
		if(selectedResource==null){
			changeHighLightedResource(null);
		}else{
			closeModal();
		}
	}

	const removeResource=(highlightedSpecialistId)=>{
		for(var i=0;i<resources.length;i++){
			if(resources[i]._id==highlightedSpecialistId){
				resources.splice(i,1);
				break;
			}
		}
		changeResources([...resources])
		changeHighLightedResource(null);
	}
	return(
		<Container>
			{createResources==true?
				<CreateResources
					closeModal={closeCreationModal}
					triggerAddSymposiumResource={triggerAddSymposiumResource}
					symposiumId={symposiumId}
				/>:
				<React.Fragment>
					{highLightedResource==null?
						<Resources
							resources={resources}
							displayCreateResource={displayCreateResource}
							displayHighLightedResource={displayHighLightedResource}
						/>:
						<SelectedResource
							closeModal={closeSelectedResourceModal}
							highlightedSpecialist={highLightedResource}
							isGuestProfile={isGuestProfile}
							symposiumId={symposiumId}
							removeResource={removeResource}
						/>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default SymposiumResources;
