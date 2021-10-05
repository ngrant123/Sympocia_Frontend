import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const Container=styled.div`
	position:fixed;
	left:65%;
	top:25%;
	width:20%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	box-shadow: 1px 1px 5px #C1C1C1;

	@media screen and (max-width:1370px){
		width:40%;
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

const SymposiumAndChatInformationCSS={
	color:"#5298F8",
	borderRadius:"5px",
	padding:"10px",
	marginRight:"2px",
	cursor:"pointer",
	height:"20%",
	width:"100%"
}


const SymposiumOptionsPortal=({
		closeModal,
		symposiumInformation,
		changeDisplayHighLightQuesition,
		selectedSymposiumTitle,
		changeDisplaySpecficSymposiumFeatures
	})=>{
    const isUserFollowingSymposium=(followingIndicator)=>{
    	return(
    		<React.Fragment>
    			{followingIndicator==false?
			 		<p>Follow {selectedSymposiumTitle} Symposium</p>:
			 		<p>Unfollow Symposium</p>
			 	}
    		</React.Fragment>
    	)
    }

	return createPortal(
		<React.Fragment>
			<Container>
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.handleFollowSymposium()}>
					{isUserFollowingSymposium(symposiumInformation.isUserFollowingSymposium())}
				</div>

				<hr/>
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>changeDisplayHighLightQuesition(true)}>
					Community Questions
				</div>

				<hr/>

				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.displayPopularVideos()}>
					Popular videos
				</div>

				<hr/>

				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.handleSeeAllPeopleActiveModal()}>
					Active people
				</div>

				<hr/>
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>changeDisplaySpecficSymposiumFeatures(true)}>
					{
						selectedSymposiumTitle=="General"||
						selectedSymposiumTitle=="Religion"||
						selectedSymposiumTitle=="Gaming"||
						selectedSymposiumTitle=="Philosophy"?
						<p>Chat </p>:
						<p> Symposium University </p>
					}	
				</div>
			</Container>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
}


export default SymposiumOptionsPortal;