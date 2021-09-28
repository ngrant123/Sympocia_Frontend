import React,{useContext} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {FeaturesContext} from "../../FeaturesPageContext.js";
import {
	getRecentSymposiumTags,
	getHottestSymposiumTags
} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";

const Container=styled.div`
	position:fixed;
	left:5%;
	top:50%;
	height:30%;
	width:20%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	padding:5px;
	box-shadow: 1px 1px 5px #C1C1C1;
	overflow-y:auto;
	padding:20px;

	@media screen and (min-width:1920px){
		top:22%;
    }

	@media screen and (max-width:1370px){
		width:40%;
		top:25%;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:50%;
		top:25%;
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0);
	z-index:29;
	top:0px;
`;

const TagsPortal=({closeModal,ownerCreationTagStatus,symposiumId,isGuestProfile})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	let {
		featuresPageSecondaryInformation,
		updateSecondaryInformation
	}=featuresPageConsumer;

	const displayBeaconsTagCreationModal=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			featuresPageConsumer.triggerBeaconTagsCreationDisplay();
			closeModal();
		}
	}

	const displayExtendedTagsModal=()=>{
		featuresPageConsumer.triggerDisplayExtendedTagsModal();
		closeModal();
	}

	const fetchRecentTags=async()=>{
		const {confirmation,data}=await getRecentSymposiumTags(symposiumId);
		if(confirmation=="Success"){
			const {message}=data;	

			featuresPageSecondaryInformation={
				...featuresPageSecondaryInformation,
				tags:{
					...featuresPageSecondaryInformation.tags,
					symposiumTags:message
				}
			}
			updateSecondaryInformation(featuresPageSecondaryInformation);
		}else{
			alert('Unfortunately an error has occured when retrieving recent tags.Please try again');
		}
		closeModal();
	}

	const fetchHottestTags=async()=>{
		const {confirmation,data}=await getHottestSymposiumTags(symposiumId);
		if(confirmation=="Success"){
			const {message}=data;	

			featuresPageSecondaryInformation={
				...featuresPageSecondaryInformation,
				tags:{
					...featuresPageSecondaryInformation.tags,
					symposiumTags:message
				}
			}
			updateSecondaryInformation(featuresPageSecondaryInformation);
		}else{
			alert('Unfortunately an error has occured when retrieving recent tags.Please try again');
		}
		closeModal();
	}

	return(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<li style={{listStyle:"none",cursor:"pointer"}}
					onClick={()=>displayBeaconsTagCreationModal()}>
					Create Tag
				</li>
				<hr/>

				{ownerCreationTagStatus==true &&(
					<React.Fragment>
						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>displayExtendedTagsModal()}>
							Edit/View Tags
						</li>
						<hr/>
					</React.Fragment>
				)}

				<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>fetchRecentTags()}>
					Most Recent
				</li>
				<hr/>

				<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>fetchHottestTags()}>
					Hottest Tag
				</li>
			</Container>
		</React.Fragment>
	)
}

export default TagsPortal;