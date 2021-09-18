import React,{useContext} from "react";
import styled from "styled-components";
import {FeaturesContext} from "../../FeaturesPageContext.js";

const SpecialistContainer=styled.div`
	position:fixed;
	left:10%;
	top:40%;
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

const ResourcesContainer=styled.div`
	position:fixed;
	left:10%;
	top:65%;
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

const SymposiumUniversitySpecialistsDropDown=({closeModal,retrieveSymposiumSpecialists})=>{

	const featuresPageConsumer=useContext(FeaturesContext);
	let {
		featuresPageSecondaryInformation,
		updateSecondaryInformation,
		currentSymposiumId
	}=featuresPageConsumer;

	const retrieveRecentSpecialists=async()=>{
		
	}

	const retrieveMostPopularSpecialists=()=>{

	}
	return(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<SpecialistContainer>
				<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>retrieveSymposiumSpecialists()}>
					View all
				</li>
				<hr/>
				<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>retrieveMostPopularSpecialists()}>
					Most Popular
				</li>
				<hr/>
				<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>retrieveRecentSpecialists()}>
					Recent
				</li>
			</SpecialistContainer>
		</React.Fragment>
	)
}



const SymposiumUniversityResourcesDropDown=({closeModal})=>{
	return(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<ResourcesContainer>
				<li style={{listStyle:"none",cursor:"pointer"}}>
					Recent
				</li>
			</ResourcesContainer>
		</React.Fragment>
	)
}


export{
	SymposiumUniversitySpecialistsDropDown,
	SymposiumUniversityResourcesDropDown
}