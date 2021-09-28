import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
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



const SymposiumResources=({closeModal,symposiumId,selectedResource,isGuestProfile})=>{
	const [resources,changeResources]=useState([]);
	const [createResources,changeCreateResourceDisplay]=useState(false);
	const [highLightedResource,changeHighLightedResource]=useState(selectedResource);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getSymposiumResources(symposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeResources([...message]);
			}else{	
				alert('Unfortunately there has been an error retrieving this symposium resources. Please try again');
			}
		}
		fetchData();
	},[]);

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
						/>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default SymposiumResources;
